import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getCategories } from "@/lib/actions/categories";
import { getTags } from "@/lib/actions/tags";
import { CreateBlogForm } from "@/components/create-blog-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CreateBlogPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const [categories, tags] = await Promise.all([getCategories(), getTags()]);

  return (
    <div>
      <section className="border-b border-border bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href="/blogs" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold">Create New Blog</h1>
            <p className="text-lg text-muted-foreground">
              Share your thoughts and ideas with the world.
            </p>
          </div>
        </div>
      </section>

      <CreateBlogForm categories={categories} tags={tags} />
    </div>
  );
}
