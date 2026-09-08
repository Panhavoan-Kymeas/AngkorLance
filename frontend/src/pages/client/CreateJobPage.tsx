import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { createJobApi } from "@/api/jobs";
import { JOB_CATEGORIES } from "@/lib/categories";
import { parseApiError } from "@/lib/apiError";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];

export default function CreateJobPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [jobImage, setJobImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        toast({ variant: "destructive", title: "Invalid image", description: "Use a PNG, JPEG or WEBP file." });
        e.target.value = "";
        return;
      }
      if (file.size > MAX_IMAGE_BYTES) {
        toast({ variant: "destructive", title: "Image too large", description: "Maximum size is 5 MB." });
        e.target.value = "";
        return;
      }
    }
    setJobImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !category || !budget) {
      toast({ variant: "destructive", title: "Missing fields", description: "Please fill all required fields." });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("budget", budget);
    if (jobImage) formData.append("jobImage", jobImage);

    setLoading(true);
    try {
      const newJobId = await createJobApi(formData);
      toast({ title: "Job created", description: "Your job is now open for proposals." });
      navigate(`/client/jobs/${newJobId}`);
    } catch (err) {
      toast({ variant: "destructive", title: "Could not create job", description: parseApiError(err) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto py-20 px-6 space-y-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Create a New Job</h1>
        <p className="text-muted-foreground text-lg">
          Post a job to attract skilled freelancers.
        </p>
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
            placeholder="Describe your project in detail"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
          />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select onValueChange={setCategory} value={category}>
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

        <div>
          <Label htmlFor="jobImage">Job Image (optional)</Label>
          <Input id="jobImage" type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImageChange} />
          {jobImage && <p className="text-sm mt-1 text-muted-foreground">Selected file: {jobImage.name}</p>}
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? "Creating..." : "Create Job"}
        </Button>
      </form>
    </section>
  );
}
