import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight } from "phosphor-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image?: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "How to Hire the Best Freelancers in 2026",
    excerpt:
      "Learn the secrets to finding top talent quickly and efficiently for your projects.",
    date: "Mar 6, 2026",
    author: "Admin",
    image: "/blog1.jpg",
  },
  {
    id: 2,
    title: "Top 10 Skills Freelancers Need Today",
    excerpt:
      "Discover the most in-demand skills and how to attract the best clients.",
    date: "Mar 1, 2026",
    author: "Admin",
    image: "/blog2.jpg",
  },
  {
    id: 3,
    title: "Managing Remote Teams Successfully",
    excerpt:
      "Practical tips for leading distributed teams and keeping projects on track.",
    date: "Feb 25, 2026",
    author: "Admin",
  },
];

const BlogPage: React.FC = () => {
  return (
    <section className="py-28 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">AngkorLance Blog</h1>
        <p className="text-lg text-muted-foreground">
          Insights, tips, and guides for clients and freelancers to grow together.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {BLOG_POSTS.map((post) => (
          <Card
            key={post.id}
            className="transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
          >
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-md"
              />
            )}
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">
                {post.date} &bull; {post.author}
              </p>
              <h2 className="font-semibold text-lg mb-2">{post.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
              <Link
                to={`/blog/${post.id}`}
                className="inline-flex items-center text-primary font-medium hover:underline gap-1"
              >
                Read More <ArrowRight size={16} weight="bold" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default BlogPage;