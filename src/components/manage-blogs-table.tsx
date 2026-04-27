"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deletePost } from "@/lib/actions/posts";
import type { getPostsByAuthor } from "@/lib/actions/posts";

type Post = Awaited<ReturnType<typeof getPostsByAuthor>>[number];

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function ManageBlogsTable({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [toDelete, setToDelete] = useState<Post | null>(null);
  const [isPending, startTransition] = useTransition();

  function confirmDelete() {
    if (!toDelete) return;
    startTransition(async () => {
      try {
        await deletePost(toDelete.id);
        setPosts((prev) => prev.filter((p) => p.id !== toDelete.id));
        toast.success("Post deleted.");
      } catch {
        toast.error("Failed to delete.");
      } finally {
        setToDelete(null);
      }
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-8">
        <Card className="border-border">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Blogs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{posts.length}</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Published
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {posts.filter((p) => p.published).length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border col-span-2 sm:col-span-1">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {new Set(posts.map((p) => p.category.name)).size}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <div className="pb-16">
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Published Blogs</CardTitle>
            <CardDescription>
              Your published blogs are visible to everyone.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {posts.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Category
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Tags
                      </TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Date
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map((post) => (
                      <TableRow
                        key={post.id}
                        className="border-border hover:bg-muted/50"
                      >
                        <TableCell className="font-medium max-w-xs">
                          <span className="line-clamp-1">{post.title}</span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="secondary">
                            {post.category.name}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag.id}
                                className="text-xs font-mono text-muted-foreground"
                              >
                                #{tag.name}
                              </span>
                            ))}
                            {post.tags.length > 2 && (
                              <span className="text-xs text-muted-foreground">
                                +{post.tags.length - 2}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">
                          {formatDate(post.createdAt)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/blogs/${post.id}`}>
                                <Eye className="w-4 h-4" />
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => setToDelete(post)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-16 space-y-3">
                <p className="text-muted-foreground">No blogs yet.</p>
                <Button asChild>
                  <Link href="/blogs/create">Write your first blog</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Dialog */}
      <Dialog
        open={!!toDelete}
        onOpenChange={(open) => !open && setToDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{toDelete?.title}&quot;?
              This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setToDelete(null)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
