import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { createJobApi } from "@/api/jobs";

export default function CreateJobPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [jobImage, setJobImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !category || !budget) {
      toast({ title: "Error", description: "Please fill all required fields." });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("budget", budget);
    if (deadline) formData.append("deadline", deadline);
    if (jobImage) formData.append("jobImage", jobImage);

    setLoading(true);
    try {
      const newJob = await createJobApi(formData);
      toast({ title: "Success", description: "Job created successfully." });
      console.log("Job created at:", newJob.createdAt); 
      navigate("/client/jobs");
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to create job." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto py-20 px-6 space-y-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Create a New Job</h1>
        <p className="text-muted-foreground text-lg">
          Post a new job to attract skilled freelancers. The creation date is automatically set.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="title">Job Title</Label>
          <Input id="title" placeholder="Enter job title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Describe your project in detail" value={description} onChange={(e) => setDescription(e.target.value)} rows={6} />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select onValueChange={setCategory} value={category}>
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

        <div>
          <Label htmlFor="budget">Budget (USD)</Label>
          <Input id="budget" type="number" placeholder="Enter budget" value={budget} onChange={(e) => setBudget(e.target.value)} />
        </div>

        <div>
          <Label htmlFor="deadline">Deadline (optional)</Label>
          <Input id="deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        </div>

        <div>
          <Label htmlFor="jobImage">Job Image (optional)</Label>
          <Input id="jobImage" type="file" accept="image/*" onChange={(e) => setJobImage(e.target.files?.[0] ?? null)} />
          {jobImage && <p className="text-sm mt-1 text-muted-foreground">Selected file: {jobImage.name}</p>}
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? "Creating..." : "Create Job"}
        </Button>
      </form>
    </section>
  );
}