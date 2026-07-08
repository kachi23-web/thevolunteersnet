"use client";

import { useActionState, useState, useEffect } from "react";
import { createBlogPostAction } from "../../actions/blog";
import type { ActionState } from "../../actions/blog";

const initialState: ActionState = { success: false };

export default function BlogNewForm() {
  const [state, formAction, pending] = useActionState(
    createBlogPostAction,
    initialState
  );

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state.success) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  // Helper to get field errors from state
  function getFieldError(fieldName: string): string[] | undefined {
    if (
      state.error &&
      typeof state.error === "object" &&
      !Array.isArray(state.error)
    ) {
      const errors = state.error as Record<string, string[]>;
      return errors[fieldName];
    }
    return undefined;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Create New Blog Post
      </h1>

      {showSuccess && (
        <div
          className="mb-6 rounded-md bg-green-50 border border-green-200 p-4 cursor-pointer"
          onClick={() => setShowSuccess(false)}
        >
          <p className="text-sm font-medium text-green-800">
            Blog post created successfully!
          </p>
        </div>
      )}

      {state.error && typeof state.error === "string" && (
        <div className="mb-6 rounded-md bg-red-50 border border-red-200 p-4">
          <p className="text-sm font-medium text-red-800">{state.error}</p>
        </div>
      )}

      <form action={formAction} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            maxLength={100}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {getFieldError("title") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError("title")![0]}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            maxLength={30}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {getFieldError("category") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError("category")![0]}
            </p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder="https://..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {getFieldError("image") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError("image")![0]}
            </p>
          )}
        </div>

        {/* Excerpt */}
        <div>
          <label
            htmlFor="excerpt"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            maxLength={200}
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {getFieldError("excerpt") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError("excerpt")![0]}
            </p>
          )}
        </div>

        {/* Body */}
        <div>
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Body
          </label>
          <textarea
            id="body"
            name="body"
            maxLength={10000}
            rows={10}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {getFieldError("body") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError("body")![0]}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center rounded-md bg-[#1565C0] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#0d47a1] focus:outline-none focus:ring-2 focus:ring-[#1565C0] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? "Creating..." : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
