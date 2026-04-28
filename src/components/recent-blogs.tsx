import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPosts } from "@/lib/actions/posts";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export async function RecentBlogs() {
  const recentBlogs = await getPosts({ limit: 3 });

  if (recentBlogs.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recentBlogs.map((post) => (
        <Card
          key={post.id}
          className="border-border pt-0 hover:border-primary/50 transition-colors overflow-hidden group flex flex-col"
        >
          {post.coverImage && (
            <div className="w-full h-48 overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <Link href={`/blogs/${post.id}`} className="flex-1 flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {post.category.name}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {post.readingTime} min read
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 flex-1 flex flex-col">
              <div className="flex-1">
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mt-2">
                  {post.excerpt}
                </p>
              </div>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag.id}
                      className="text-xs text-muted-foreground font-mono"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex justify-between items-center text-xs text-muted-foreground pt-4 border-t border-border">
                <span>{post.author.name}</span>
                <span>{formatDate(post.createdAt)}</span>
              </div>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
}
