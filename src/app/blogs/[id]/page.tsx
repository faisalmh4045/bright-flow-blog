import { notFound } from "next/navigation";
import { getPostById, getRelatedPosts, getPosts } from "@/lib/actions/posts";
import { BlogDetail } from "@/components/blog-detail";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ id: post.id }));
}

type Props = { params: Promise<{ id: string }> };

export default async function BlogDetailsPage({ params }: Props) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  const related = await getRelatedPosts(post.categoryId, post.id);

  return <BlogDetail post={post} related={related} />;
}
