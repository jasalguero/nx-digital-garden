import { Form } from "@remix-run/react";
import type { Post } from "~/models/post.server";

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

type EditPostFormProps = {
  errors?: any;
  isInTransit: boolean;
  isCreateMode: boolean;
  post?: Post;
};

export default function EditPostForm({
  errors,
  isInTransit,
  isCreateMode,
  post,
}: EditPostFormProps) {
  const submitButtonText = isCreateMode ? "Create Post" : "Update Post";
  return (
    <Form method="post">
      <p>
        <label>
          Post Title:{" "}
          {errors?.title ? (
            <em className="text-red-600">{errors.title}</em>
          ) : null}
          <input
            type="text"
            name="title"
            className={inputClassName}
            defaultValue={post?.title}
          />
        </label>
      </p>
      <p>
        <label>
          Post Slug:{" "}
          {errors?.slug ? (
            <em className="text-red-600">{errors.slug}</em>
          ) : null}
          <input
            type="text"
            name="slug"
            className={inputClassName}
            defaultValue={post?.slug}
            readOnly={!isCreateMode}
          />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">
          Markdown:
          {errors?.markdown ? (
            <em className="text-red-600">{errors.markdown}</em>
          ) : null}
        </label>
        <br />
        <textarea
          id="markdown"
          rows={20}
          name="markdown"
          defaultValue={post?.markdown}
          className={`${inputClassName} font-mono`}
        />
      </p>
      <p className="text-right">
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
          disabled={isInTransit}
        >
          {isInTransit ? "Sending..." : submitButtonText}
        </button>
      </p>
    </Form>
  );
}
