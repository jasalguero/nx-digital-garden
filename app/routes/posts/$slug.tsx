import { marked } from "marked";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPost } from "~/models/post.server";
import invariant from "tiny-invariant";
import type { Post } from "~/models/post.server";

type LoaderData = { post: Post; html: string };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `params.slug is required`);

  const post = await getPost(params.slug);
  invariant(post, `Post not found: ${params.slug}`);

  const html = marked(post.markdown);
  return json<LoaderData>({ post, html });
};

export default function PostSlug() {
  const { post } = useLoaderData() as LoaderData;

  return (
    <main className="max-w-4xl mx-auto">
      <h1 className="my-6 text-3xl text-center border-b-2">{post.title}</h1>
    </main>
  );
}