import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchJobDetailApi } from "@/api/jobs";
import type { JobDetail } from "@/types/jobs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Shadcn components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const JobDetailPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const { toast } = useToast();

  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const [applyOpen, setApplyOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const [coverLetter, setCoverLetter] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!jobId) return;

    const fetchJob = async () => {
      try {
        setLoading(true);
        const data = await fetchJobDetailApi(Number(jobId));
        setJob(data);
      } catch (err: unknown) {
        toast({
          variant: "destructive",
          title: "Failed to load job",
          description: err instanceof Error ? err.message : "Unknown error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId, toast]);

  if (loading) return <p>Loading job details...</p>;
  if (!job) return <p>Job not found.</p>;

  const handleApply = () => {
    if (!coverLetter && !file) {
      toast({
        title: "Empty Application",
        description: "Add a cover letter or file.",
      });
      return;
    }

    // Example: send FormData to backend
    const formData = new FormData();
    formData.append("coverLetter", coverLetter);
    if (file) formData.append("attachment", file);

    // TODO: call your backend API
    toast({
      title: "Application Sent!",
      description: "Your application has been submitted successfully.",
    });
    setApplyOpen(false);
  };

  const handleSendMessage = () => {
    // TODO: call backend API to send message to client
    toast({
      title: "Message Sent!",
      description: "Your message has been delivered to the client.",
    });
    setChatOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
      {/* Job Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold">{job.title}</h1>
          <p className="text-gray-500 mt-1">{job.category}</p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-400">
            Posted on {new Date(job.createdAt).toLocaleDateString()}
          </span>
          <span className="font-semibold text-lg">${job.budget}</span>
          <span className="text-sm text-gray-600">
            Client: {job.clientName}
          </span>
          <span
            className={`mt-1 px-2 py-1 rounded text-sm font-medium ${
              job.status === "OPEN"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {job.status}
          </span>
        </div>
      </div>

      {/* Job Description */}
      <div className="mt-6 text-gray-700 leading-relaxed">
        {job.description}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        {/* Apply Modal */}
        <Dialog open={applyOpen} onOpenChange={setApplyOpen}>
          <DialogTrigger asChild>
            <Button variant="default">Apply</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Apply for this Job</DialogTitle>
              <DialogDescription>
                Write your cover letter and attach relevant files.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4 mt-4">
              <div>
                <Label htmlFor="coverLetter">Cover Letter</Label>
                <Textarea
                  id="coverLetter"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Write your cover letter..."
                  className="mt-1 w-full"
                  rows={6}
                />
              </div>

              <div>
                <Label htmlFor="file">Attach File (optional)</Label>
                <Input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  className="mt-1"
                />
              </div>

              <Button onClick={handleApply}>Submit Application</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Chat Modal */}
        <Dialog open={chatOpen} onOpenChange={setChatOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Message Client</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Send Message</DialogTitle>
              <DialogDescription>
                Write your message to the client regarding this job.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4 mt-4">
              <Textarea
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
              />
              <Button onClick={handleSendMessage}>Send Message</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default JobDetailPage;
