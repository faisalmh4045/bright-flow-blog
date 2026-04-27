"use server";

import { prisma as db } from "@/lib/prisma";

export type PostWithRelations = Awaited<ReturnType<typeof getPosts>>[number];
export type PostFilters = {
  search?: string;
  categorySlug?: string;
  tagSlug?: string;
};

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
