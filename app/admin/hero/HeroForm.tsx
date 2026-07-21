"use client";

import { useActionState, useState, useEffect, useRef } from "react";
import { updateHeroAction } from "../actions/hero";
import type { HeroContent } from "@/types";
import type { ActionState } from "../actions/hero";

interface HeroFormProps {
  initialData: HeroContent;
}

const initialState: ActionState = { success: false };

export default function HeroForm({ initialData }: HeroFormProps) {
  const [state, formAction, pending] = useActionState(
    updateHeroAction,
    initialState
  );

  const [imageMode, setImageMode] = useState<"upload" | "url">(
    initialData.heroImage.startsWith("http") ? "url" : "upload"
  );
  const [imagePreview, setImagePreview] = useState<string>(initialData.heroImage);
  const [imageValue, setImageValue] = useState<string>(initialData.heroImage);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  async function handleFileUpload(file: File) {
    setUploadError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        credentials: "same-origin",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setUploadError(data?.error || `Upload failed (${res.status})`);
        return;
      }

      const data = await res.json();
      setImageValue(data.path);
      setImagePreview(data.path);
    } catch (err) {
      console.error("Upload error:", err);
      setUploadError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Edit Hero Section
      </h1>

      {showSuccess && (
        <div
          className="mb-6 rounded-md bg-green-50 border border-green-200 p-4 cursor-pointer"
          onClick={() => setShowSuccess(false)}
        >
          <p className="text-sm font-medium text-green-800">
            Hero content updated successfully!
          </p>
        </div>
      )}

      {state.error && typeof state.error === "string" && (
        <div className="mb-6 rounded-md bg-red-50 border border-red-200 p-4">
          <p className="text-sm font-medium text-red-800">{state.error}</p>
        </div>
      )}

      <form action={formAction} className="space-y-6">
        {/* Badge */}
        <div>
          <label
            htmlFor="badge"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Badge Text
          </label>
          <input
            type="text"
            id="badge"
            name="badge"
            defaultValue={initialData.badge}
            maxLength={60}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {getFieldError("badge") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError("badge")![0]}
            </p>
          )}
        </div>

        {/* Heading Line 1 */}
        <div>
          <label
            htmlFor="headingLine1"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Heading Line 1
          </label>
          <input
            type="text"
            id="headingLine1"
            name="headingLine1"
            defaultValue={initialData.headingLine1}
            maxLength={40}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {getFieldError("headingLine1") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError("headingLine1")![0]}
            </p>
          )}
        </div>

        {/* Heading Highlight */}
        <div>
          <label
            htmlFor="headingHighlight"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Heading Highlight
          </label>
          <input
            type="text"
            id="headingHighlight"
            name="headingHighlight"
            defaultValue={initialData.headingHighlight}
            maxLength={40}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {getFieldError("headingHighlight") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError("headingHighlight")![0]}
            </p>
          )}
        </div>

        {/* Heading Line 2 */}
        <div>
          <label
            htmlFor="headingLine2"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Heading Line 2
          </label>
          <input
            type="text"
            id="headingLine2"
            name="headingLine2"
            defaultValue={initialData.headingLine2}
            maxLength={40}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {getFieldError("headingLine2") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError("headingLine2")![0]}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={initialData.description}
            maxLength={300}
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {getFieldError("description") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError("description")![0]}
            </p>
          )}
        </div>

        {/* Primary CTA */}
        <fieldset className="border border-gray-200 rounded-md p-4">
          <legend className="text-sm font-medium text-gray-700 px-2">
            Primary CTA
          </legend>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="primaryCtaLabel"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Label
              </label>
              <input
                type="text"
                id="primaryCtaLabel"
                name="primaryCtaLabel"
                defaultValue={initialData.primaryCta.label}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              {getFieldError("primaryCta") && (
                <p className="mt-1 text-sm text-red-600">
                  {getFieldError("primaryCta")![0]}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="primaryCtaHref"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Link (href)
              </label>
              <input
                type="text"
                id="primaryCtaHref"
                name="primaryCtaHref"
                defaultValue={initialData.primaryCta.href}
                placeholder="/ or https://..."
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </fieldset>

        {/* Secondary CTA */}
        <fieldset className="border border-gray-200 rounded-md p-4">
          <legend className="text-sm font-medium text-gray-700 px-2">
            Secondary CTA
          </legend>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="secondaryCtaLabel"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Label
              </label>
              <input
                type="text"
                id="secondaryCtaLabel"
                name="secondaryCtaLabel"
                defaultValue={initialData.secondaryCta.label}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              {getFieldError("secondaryCta") && (
                <p className="mt-1 text-sm text-red-600">
                  {getFieldError("secondaryCta")![0]}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="secondaryCtaHref"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Link (href)
              </label>
              <input
                type="text"
                id="secondaryCtaHref"
                name="secondaryCtaHref"
                defaultValue={initialData.secondaryCta.href}
                placeholder="/ or https://..."
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </fieldset>

        {/* Hero Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hero Image
          </label>

          {/* Mode Toggle */}
          <div className="flex gap-2 mb-3">
            <button
              type="button"
              onClick={() => setImageMode("upload")}
              className={`px-3 py-1.5 text-sm rounded-md border ${
                imageMode === "upload"
                  ? "bg-[#1565C0] text-white border-[#1565C0]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Upload File
            </button>
            <button
              type="button"
              onClick={() => setImageMode("url")}
              className={`px-3 py-1.5 text-sm rounded-md border ${
                imageMode === "url"
                  ? "bg-[#1565C0] text-white border-[#1565C0]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Image URL
            </button>
          </div>

          {imageMode === "upload" ? (
            <div>
              <div
                className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-[#1565C0] transition-colors"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add("border-[#1565C0]", "bg-blue-50");
                }}
                onDragLeave={(e) => {
                  e.currentTarget.classList.remove("border-[#1565C0]", "bg-blue-50");
                }}
                onDrop={async (e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove("border-[#1565C0]", "bg-blue-50");
                  const file = e.dataTransfer.files[0];
                  if (file) await handleFileUpload(file);
                }}
              >
                <svg
                  className="mx-auto h-10 w-10 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="mt-2 text-sm text-gray-600">
                  {uploading ? "Uploading..." : "Click or drag & drop an image"}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  PNG, JPG, WebP, GIF, SVG up to 5MB
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) await handleFileUpload(file);
                }}
              />
              {uploadError && (
                <p className="mt-2 text-sm text-red-600">{uploadError}</p>
              )}
            </div>
          ) : (
            <input
              type="text"
              value={imageValue}
              onChange={(e) => {
                setImageValue(e.target.value);
                setImagePreview(e.target.value);
              }}
              placeholder="https://example.com/image.png"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          )}

          {/* Hidden input to submit the final image value */}
          <input type="hidden" name="heroImage" value={imageValue} />

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-1">Preview:</p>
              <div className="relative w-full max-w-xs h-40 rounded-md overflow-hidden border border-gray-200 bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreview}
                  alt="Hero preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500 truncate max-w-xs">
                {imageValue}
              </p>
            </div>
          )}

          {getFieldError("heroImage") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError("heroImage")![0]}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex items-center gap-3">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center rounded-md bg-[#1565C0] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#0d47a1] focus:outline-none focus:ring-2 focus:ring-[#1565C0] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="submit"
            name="publish"
            value="true"
            disabled={pending}
            className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? "Publishing..." : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
}
