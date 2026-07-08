"use client";

import { useActionState } from "react";
import { deleteBlogPostAction } from "../actions/blog";

export function DeletePostButton({ slug }: { slug: string }) {
  const [state, formAction, pending] = useActionState(deleteBlogPostAction, {
    success: false,
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to delete this post? This action cannot be undone."
    );
    if (confirmed) {
      const formData = new FormData(event.currentTarget);
      formAction(formData);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="slug" value={slug} />
      <button
        type="submit"
        disabled={pending}
        className="px-3 py-1 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
      >
        {pending ? "Deleting..." : "Delete"}
      </button>
      {state.error && (
        <p className="text-xs text-red-600 mt-1">
          {typeof state.error === "string" ? state.error : "Delete failed"}
        </p>
      )}
      {state.success && (
        <p className="text-xs text-green-600 mt-1">Deleted</p>
      )}
    </form>
  );
}
