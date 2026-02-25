import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { fetchMyJobsApi } from "@/api/jobs";
import type { ClientJob } from "@/types/jobs";

export default function MyJobsPage() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<ClientJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [statusFilter, setStatusFilter] = useState<ClientJob["status"] | "all">("all");
  const [search, setSearch] = useState("");

  const loadJobs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchMyJobsApi();

      // Local filtering
      let filtered = response;
      if (statusFilter && statusFilter !== "all") {
        filtered = filtered.filter(job => job.status === statusFilter);
      }
      if (search) {
        filtered = filtered.filter(job => job.title.toLowerCase().includes(search.toLowerCase()));
      }

      // Pagination
      const start = page * size;
      const end = start + size;
      setJobs(filtered.slice(start, end));
      setTotalPages(Math.ceil(filtered.length / size));
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to load jobs." });
    } finally {
      setLoading(false);
    }
  }, [page, size, statusFilter, search, toast]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const getStatusVariant = (status: ClientJob["status"]) => {
    switch (status) {
      case "OPEN": return "outline";
      case "IN_PROGRESS": return "secondary";
      case "COMPLETED": return "default";
      case "CLOSED": return "destructive";
      default: return "default";
    }
  };

  return (
    <section className="max-w-6xl mx-auto py-20 px-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-4xl font-bold">My Jobs ({jobs.length})</h1>
        <Button onClick={() => navigate("/client/jobs/create")}>Create Job</Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
        <Input
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          onValueChange={(v) => setStatusFilter(v as ClientJob["status"] | "all")}
          value={statusFilter}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="OPEN">Open</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="CLOSED">Closed</SelectItem>
          </SelectContent>
        </Select>
        <Button
          className="mt-2 sm:mt-0"
          onClick={() => { setPage(0); loadJobs(); }}
        >
          Apply
        </Button>
      </div>

      {/* Jobs List */}
      {loading ? (
        <div className="text-center text-lg text-muted-foreground">Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <p className="text-center text-muted-foreground">No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map(job => (
            <Card
              key={job.id}
              className="flex flex-col md:flex-row overflow-hidden shadow-md rounded-xl hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative w-full md:w-48 h-48 md:h-auto flex-shrink-0">
                <img
                  src={job.jobImage ?? "/placeholder-job.png"}
                  alt={job.title}
                  className="w-full h-full object-cover"
                />
                {/* Status Badge top-right */}
                <div className="absolute top-2 right-2">
                  <Badge variant={getStatusVariant(job.status)}>
                    {job.status}
                  </Badge>
                </div>
              </div>
              <CardContent className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <CardHeader className="p-0">
                    <CardTitle className="text-xl font-semibold">{job.title}</CardTitle>
                  </CardHeader>
                  <p className="text-muted-foreground mb-3">{job.category}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Proposals: {job.proposalCount}</Badge>
                    {job.createdAt && (
                      <Badge variant="secondary">
                        Created: {new Date(job.createdAt).toLocaleDateString()}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    size="sm"
                    onClick={() => navigate(`/client/jobs/${job.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button disabled={page === 0} onClick={() => setPage(page - 1)}>
            Previous
          </Button>
          <span>Page {page + 1} of {totalPages}</span>
          <Button disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>
            Next
          </Button>
        </div>
      )}
    </section>
  );
}