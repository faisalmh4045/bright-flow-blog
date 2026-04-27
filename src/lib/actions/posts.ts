"use server";

import { prisma as db } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export type PostWithRelations = Awaited<ReturnType<typeof getPosts>>[number];
export type PostFilters = {
  search?: string;
  categorySlug?: string;
  tagSlug?: string;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ─── Public reads ────────────────────────────────────────────

export async function getPosts(filters: PostFilters = {}) {
  const { search, categorySlug, tagSlug } = filters;

  return db.post.findMany({
    where: {
      published: true,
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { excerpt: { contains: search, mode: "insensitive" } },
          { author: { name: { contains: search, mode: "insensitive" } } },
        ],
      }),
      ...(categorySlug && {
        category: { slug: categorySlug },
      }),
      ...(tagSlug && {
        tags: { some: { slug: tagSlug } },
      }),
    },
    include: {
      author: { select: { name: true, image: true } },
      category: true,
      tags: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPostById(id: string) {
  return db.post.findUnique({
    where: { id },
    include: {
      author: { select: { name: true, image: true } },
      category: true,
      tags: true,
    },
  });
}

export async function getRelatedPosts(categoryId: string, excludeId: string) {
  return db.post.findMany({
    where: {
      published: true,
      categoryId,
      NOT: { id: excludeId },
    },
    include: {
      author: { select: { name: true } },
      category: true,
      tags: true,
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  });
}

// ─── Mutations ───────────────────────────────────────────────

export type CreatePostInput = {
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  categoryId: string;
  tagIds: string[];
  readingTime: number;
};

export async function createPost(data: CreatePostInput) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");

  const baseSlug = slugify(data.title);
  const existing = await db.post.findMany({
    where: { slug: { startsWith: baseSlug } },
    select: { slug: true },
  });
  const slug = existing.length > 0 ? `${baseSlug}-${Date.now()}` : baseSlug;

  const post = await db.post.create({
    data: {
      title: data.title,
      slug,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage || null,
      readingTime: data.readingTime,
      categoryId: data.categoryId,
      tags: { connect: data.tagIds.map((id) => ({ id })) },
      authorId: session.user.id,
      published: true,
    },
  });

  revalidatePath("/blogs");
  return post;
}
