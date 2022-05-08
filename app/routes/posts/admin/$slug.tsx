import { marked } from "marked";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useActionData, useTransition } from "@remix-run/react";
import { getPost, updatePost } from "~/models/post.server";
import invariant from "tiny-invariant";
import EditPostForm from "~/components/posts/EditPostForm";

import type { Post } from "~/models/post.server";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";

type LoaderData = { post: Post; html: string };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `params.slug is required`);

  const post = await getPost(params.slug);
  invariant(post, `Post not found: ${params.slug}`);

  const html = marked(post.markdown);
  return json<LoaderData>({ post, html });
};

export const action: ActionFunction = async ({ request }) => {
  console.log("here", request);
};

export default function PostSlug() {
  const { post } = useLoaderData() as LoaderData;
  const errors = useActionData();
  const transition = useTransition();
  const isCreating = Boolean(transition.submission);
  
  return (
    <EditPostForm
      errors={errors}
      isInTransit={isCreating}
      isCreateMode={false}
      post={post}
    />
  );
}
