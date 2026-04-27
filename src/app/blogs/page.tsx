import { getPosts } from "@/lib/actions/posts";
import { getCategories } from "@/lib/actions/categories";
import { getTags } from "@/lib/actions/tags";
import { BlogsClient } from "@/components/blogs-client";
import { Suspense } from "react";

type SearchParams = Promise<{
  q?: string;
  category?: string;
  tag?: string;
}>;

async function BlogsContent({
  searchParams,
}: {
  searchParams: Awaited<SearchParams>;
}) {
  const search = searchParams.q ?? "";
  const categorySlug = searchParams.category ?? "";
  const tagSlug = searchParams.tag ?? "";

  const [posts, categories, tags] = await Promise.all([
    getPosts({ search, categorySlug, tagSlug }),
    getCategories(),
    getTags(),
  ]);

  return (
    <BlogsClient
      posts={posts}
      categories={categories}
      tags={tags}
      currentSearch={search}
      currentCategory={categorySlug}
      currentTag={tagSlug}
    />
  );
}

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  return (
    <div>
      <section className="border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">All Blogs</h1>
            <p className="text-lg text-muted-foreground">
              Discover insightful articles from our community of writers.
            </p>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
        <BlogsContent searchParams={params} />
      </Suspense>
    </div>
  );
}
