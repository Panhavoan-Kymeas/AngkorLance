import { useEffect, useState, type ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { fetchJobDetailApi, updateJobApi } from "@/api/jobs";
import type { ClientJob } from "@/types/jobs";

export default function EditJobPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [job, setJob] = useState<ClientJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [jobImage, setJobImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");

  // Load job details
  useEffect(() => {
    const loadJob = async () => {
      setLoading(true);
      try {
        const data = await fetchJobDetailApi(Number(id));
        setJob(data);
        setTitle(data.title);
        setDescription(data.description);
        setCategory(data.category);
        setBudget(data.budget.toString());
        setDeadline(data.deadline?.split("T")[0] ?? "");
        setPreviewImage(data.jobImage ?? "");
      } catch (err) {
        console.error(err);
        toast({ title: "Error", description: "Failed to load job details." });
      } finally {
        setLoading(false);
      }
    };
    loadJob();
  }, [id, toast]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setJobImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !category || !budget) {
      toast({ title: "Error", description: "Please fill all required fields." });
      return;
    }

    setActionLoading(true);
    try {
      await updateJobApi(Number(id), {
        title,
        description,
        category,
        budget: Number(budget),
      });
      toast({ title: "Success", description: "Job updated successfully." });
      navigate(`/client/jobs/${id}`);
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to update job." });
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-muted-foreground">Loading job...</div>;
  if (!job) return <div className="text-center py-20 text-muted-foreground">Job not found.</div>;

  return (
    <section className="max-w-3xl mx-auto py-20 px-6 space-y-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Edit Job</h1>
        <p className="text-muted-foreground">Update your job details and submit changes.</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            placeholder="Enter job title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your project"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
          />
        </div>

        {/* Category */}
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="web_development">Web Development</SelectItem>
              <SelectItem value="mobile_development">Mobile Development</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="writing">Writing</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Budget */}
        <div>
          <Label htmlFor="budget">Budget (USD)</Label>
          <Input
            id="budget"
            type="number"
            placeholder="Enter budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>

        {/* Deadline */}
        <div>
          <Label htmlFor="deadline">Deadline</Label>
          <Input
            id="deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>

        {/* Job Image */}
        <div>
          <Label htmlFor="jobImage">Job Image</Label>
          <input
            type="file"
            id="jobImage"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-muted-foreground"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-2 w-48 h-32 object-cover rounded-lg border"
            />
          )}
        </div>

        {/* Submit */}
        <Button type="submit" size="lg" className="w-full" disabled={actionLoading}>
          {actionLoading ? "Updating..." : "Update Job"}
        </Button>
      </form>
    </section>
  );
}