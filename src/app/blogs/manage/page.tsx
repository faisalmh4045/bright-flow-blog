import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getPostsByAuthor } from "@/lib/actions/posts";
import { ManageBlogsTable } from "@/components/manage-blogs-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";

export default async function ManageBlogPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const posts = await getPostsByAuthor();

  return (
    <div>
      <section className="border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href="/blogs" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold">Manage Blogs</h1>
              <p className="text-lg text-muted-foreground">
                View and manage all your published and draft blogs.
              </p>
            </div>
            <Button asChild>
              <Link href="/blogs/create" className="flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                New Blog
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <ManageBlogsTable initialPosts={posts} />
    </div>
  );
}
