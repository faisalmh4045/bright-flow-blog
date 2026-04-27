"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createPost } from "@/lib/actions/posts";
import type { Category } from "@/lib/actions/categories";
import type { Tag } from "@/lib/actions/tags";

const schema = z.object({
  title: z
    .string()
    .min(5, "At least 5 characters")
    .max(100, "Max 100 characters"),
  excerpt: z
    .string()
    .min(10, "At least 10 characters")
    .max(250, "Max 250 characters"),
  content: z.string().min(50, "At least 50 characters"),
  categoryId: z.string().min(1, "Pick a category"),
  coverImage: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  readingTime: z.coerce.number().min(1).max(60),
});

type FormValues = z.infer<typeof schema>;

export function CreateBlogForm({
  categories,
  tags,
}: {
  categories: Category[];
  tags: Tag[];
}) {
  const router = useRouter();
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      categoryId: "",
      coverImage: "",
      readingTime: 5,
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  function toggleTag(id: string) {
    setSelectedTagIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  }

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      await createPost({
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        categoryId: data.categoryId,
        coverImage: data.coverImage || undefined,
        readingTime: data.readingTime,
        tagIds: selectedTagIds,
      });
      toast.success("Blog published!");
      router.push("/blogs/manage");
    } catch {
      toast.error("Failed to publish. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
          <CardDescription>Fill in the information below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input
                  id="title"
                  placeholder="Your post title..."
                  {...register("title")}
                  disabled={isSubmitting}
                />
                <FieldError>{errors.title?.message}</FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="excerpt">Excerpt</FieldLabel>
                <Textarea
                  id="excerpt"
                  placeholder="Short summary shown in listings..."
                  className="min-h-20 resize-none"
                  {...register("excerpt")}
                  disabled={isSubmitting}
                />
                <FieldDescription>Max 250 characters.</FieldDescription>
                <FieldError>{errors.excerpt?.message}</FieldError>
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor="categoryId">Category</FieldLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pick a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldError>{errors.categoryId?.message}</FieldError>
                    </Field>
                  )}
                />

                <Field>
                  <FieldLabel htmlFor="readingTime">
                    Reading Time (minutes)
                  </FieldLabel>
                  <Input
                    id="readingTime"
                    type="number"
                    min={1}
                    max={60}
                    {...register("readingTime", { valueAsNumber: true })}
                    disabled={isSubmitting}
                  />
                  <FieldError>{errors.readingTime?.message}</FieldError>
                </Field>
              </div>

              <Field>
                <FieldLabel>Tags</FieldLabel>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag.id}
                      variant={
                        selectedTagIds.includes(tag.id) ? "default" : "outline"
                      }
                      className="cursor-pointer font-mono text-xs"
                      onClick={() => toggleTag(tag.id)}
                    >
                      #{tag.name}
                    </Badge>
                  ))}
                </div>
                <FieldDescription>
                  {selectedTagIds.length} selected
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="coverImage">
                  Cover Image URL (optional)
                </FieldLabel>
                <Input
                  id="coverImage"
                  placeholder="https://..."
                  {...register("coverImage")}
                  disabled={isSubmitting}
                />
                <FieldError>{errors.coverImage?.message}</FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="content">Content</FieldLabel>
                <Textarea
                  id="content"
                  placeholder="Write your post in Markdown..."
                  className="min-h-72 font-mono text-sm resize-y"
                  {...register("content")}
                  disabled={isSubmitting}
                />
                <FieldDescription>Markdown is supported.</FieldDescription>
                <FieldError>{errors.content?.message}</FieldError>
              </Field>

              <div className="flex gap-3 pt-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Publishing..." : "Publish Post"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/blogs">Cancel</Link>
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
