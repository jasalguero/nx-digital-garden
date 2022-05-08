import type { ActionFunction } from "@remix-run/node";
import invariant from "tiny-invariant";
import { json, redirect } from "@remix-run/node";
import { updatePost } from "~/models/post.server";

export type ActionData =
  | {
      title: null | string;
      slug: null | string;
      markdown: null | string;
    }
  | undefined;


export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get("title");
    const slug = formData.get("slug");
    const markdown = formData.get("markdown");
  
    const errors: ActionData = {
      title: title ? null : "Title is required",
      slug: slug ? null : "Slug is required",
      markdown: markdown ? null : "Markdown is required",
    };
  
    const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  
    if (hasErrors) {
      return json<ActionData>(errors);
    }
  
    invariant(typeof title === "string", "title must be a string");
    invariant(typeof slug === "string", "slug must be a string");
    invariant(typeof markdown === "string", "markdown must be a string");
  
    await updatePost({ title, slug, markdown });
  
    return redirect("/posts/admin");
  };