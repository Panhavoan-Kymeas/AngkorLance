import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { fetchJobDetailApi, updateJobApi } from "@/api/jobs";
import type { JobDetail } from "@/types/jobs";
import { JOB_CATEGORIES } from "@/lib/categories";
import { parseApiError } from "@/lib/apiError";

export default function EditJobPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");

  useEffect(() => {
    const loadJob = async () => {
      setLoading(true);
      try {
        const data = await fetchJobDetailApi(Number(id));
        setJob(data);
        setTitle(data.title);
        setDescription(data.description);
        setCategory(data.category);
        setBudget(String(data.budget));
      } catch (err) {
        toast({ variant: "destructive", title: "Error", description: parseApiError(err, "Failed to load job details.") });
      } finally {
        setLoading(false);
      }
    };
    loadJob();
  }, [id, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !category || !budget) {
      toast({ variant: "destructive", title: "Missing fields", description: "Please fill all required fields." });
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
      toast({ title: "Job updated", description: "Your changes have been saved." });
      navigate(`/client/jobs/${id}`);
    } catch (err) {
      toast({ variant: "destructive", title: "Could not update job", description: parseApiError(err) });
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
        <div>
          <Label htmlFor="title">Job Title</Label>
          <Input id="title" placeholder="Enter job title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

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

        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {JOB_CATEGORIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="budget">Budget (USD)</Label>
          <Input
            id="budget"
            type="number"
            min={1}
            placeholder="Enter budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={actionLoading}>
          {actionLoading ? "Updating..." : "Update Job"}
        </Button>
      </form>
    </section>
  );
}
