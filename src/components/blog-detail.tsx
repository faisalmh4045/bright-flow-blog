import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import type { PostWithRelations } from "@/lib/actions/posts";
import type { getRelatedPosts } from "@/lib/actions/posts";

type RelatedPost = Awaited<ReturnType<typeof getRelatedPosts>>[number];

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function BlogDetail({
  post,
  related,
}: {
  post: PostWithRelations;
  related: RelatedPost[];
}) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back */}
      <div className="pt-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/blogs" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="py-8 space-y-4 border-b border-border">
        <Badge variant="secondary">{post.category.name}</Badge>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          {post.title}
        </h1>
        <p className="text-lg text-muted-foreground">{post.excerpt}</p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-2">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            {post.author.name}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {formatDate(post.createdAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {post.readingTime} min read
          </span>
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="text-xs font-mono text-muted-foreground"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="w-full h-72 md:h-96 overflow-hidden rounded-lg my-8">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="py-8 prose prose-neutral dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Related Posts */}
      {related.length > 0 && (
        <div className="py-12 border-t border-border">
          <h2 className="text-2xl font-bold mb-6">Related Blogs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {related.map((rel) => (
              <Card
                key={rel.id}
                className="border-border hover:border-primary/50 transition-colors group"
              >
                {rel.coverImage && (
                  <div className="w-full h-36 overflow-hidden rounded-t-lg">
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader className="pb-2">
                  <Badge variant="secondary" className="w-fit text-xs">
                    {rel.category.name}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <Link href={`/blogs/${rel.id}`}>
                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
                      {rel.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-muted-foreground mt-1">
                    {rel.author.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="pb-16" />
    </div>
  );
}
