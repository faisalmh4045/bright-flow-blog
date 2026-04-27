"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { PostWithRelations } from "@/lib/actions/posts";
import type { Category } from "@/lib/actions/categories";
import type { Tag } from "@/lib/actions/tags";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

type Props = {
  posts: PostWithRelations[];
  categories: Category[];
  tags: Tag[];
  currentSearch: string;
  currentCategory: string;
  currentTag: string;
};

export function BlogsClient({
  posts,
  categories,
  tags,
  currentSearch,
  currentCategory,
  currentTag,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParams(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/blogs?${params.toString()}`);
  }

  const handleSearch = useDebouncedCallback((value: string) => {
    updateParams("q", value || null);
  }, 400);

  function handleCategory(slug: string) {
    updateParams("category", currentCategory === slug ? null : slug);
  }

  function handleTag(slug: string) {
    updateParams("tag", currentTag === slug ? null : slug);
  }

  return (
    <div>
      {/* Filters and Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search by title, author, or excerpt..."
              className="pl-10"
              defaultValue={currentSearch}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Category
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={!currentCategory ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => updateParams("category", null)}
              >
                All
              </Badge>
              {categories.map((cat) => (
                <Badge
                  key={cat.id}
                  variant={currentCategory === cat.slug ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleCategory(cat.slug)}
                >
                  {cat.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Tags
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={!currentTag ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => updateParams("tag", null)}
              >
                All
              </Badge>
              {tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant={currentTag === tag.slug ? "default" : "outline"}
                  className="cursor-pointer font-mono text-xs"
                  onClick={() => handleTag(tag.slug)}
                >
                  #{tag.name}
                </Badge>
              ))}
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            {posts.length} {posts.length === 1 ? "post" : "posts"} found
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="pb-16">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
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
                  <Link
                    href={`/blogs/${post.id}`}
                    className="flex-1 flex flex-col"
                  >
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
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No blogs found.</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
