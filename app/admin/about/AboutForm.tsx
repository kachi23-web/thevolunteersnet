"use client";

import { useActionState, useState, useEffect, useRef } from "react";
import { updateAboutAction } from "../actions/about";
import type { AboutContent } from "@/types";
import type { ActionState } from "../actions/about";

interface AboutFormProps {
  initialData: AboutContent;
}

const initialState: ActionState = { success: false };

export default function AboutForm({ initialData }: AboutFormProps) {
  const [state, formAction, pending] = useActionState(
    updateAboutAction,
    initialState
  );

  const [formData, setFormData] = useState<AboutContent>(initialData);

  const [imageMode, setImageMode] = useState<"upload" | "url">(
    initialData.hero.heroImage.startsWith("http") ? "url" : "upload"
  );
  const [imagePreview, setImagePreview] = useState<string>(initialData.hero.heroImage);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileUpload(file: File) {
    setUploadError(null);
    setUploading(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const data = await res.json();

      if (!res.ok) {
        setUploadError(data.error || "Upload failed");
        return;
      }

      updateHero("heroImage", data.path);
      setImagePreview(data.path);
    } catch {
      setUploadError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

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

  // --- Hero field handlers ---
  function updateHero(field: keyof AboutContent["hero"], value: string) {
    setFormData((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }));
  }

  // --- Approach handlers ---
  function updateApproachDescription(value: string) {
    setFormData((prev) => ({
      ...prev,
      approach: { ...prev.approach, description: value },
    }));
  }

  function updateApproachItem(
    index: number,
    field: "title" | "icon",
    value: string
  ) {
    setFormData((prev) => {
      const items = [...prev.approach.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, approach: { ...prev.approach, items } };
    });
  }

  function addApproachItem() {
    if (formData.approach.items.length >= 4) return;
    setFormData((prev) => ({
      ...prev,
      approach: {
        ...prev.approach,
        items: [...prev.approach.items, { title: "", icon: "" }],
      },
    }));
  }

  function removeApproachItem(index: number) {
    setFormData((prev) => ({
      ...prev,
      approach: {
        ...prev.approach,
        items: prev.approach.items.filter((_, i) => i !== index),
      },
    }));
  }

  // --- Values handlers ---
  function updateValue(
    index: number,
    field: "title" | "description",
    value: string
  ) {
    setFormData((prev) => {
      const values = [...prev.values];
      values[index] = { ...values[index], [field]: value };
      return { ...prev, values };
    });
  }

  function addValue() {
    if (formData.values.length >= 6) return;
    setFormData((prev) => ({
      ...prev,
      values: [...prev.values, { title: "", description: "" }],
    }));
  }

  function removeValue(index: number) {
    if (formData.values.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index),
    }));
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Edit About Page
      </h1>

      {showSuccess && (
        <div
          className="mb-6 rounded-md bg-green-50 border border-green-200 p-4 cursor-pointer"
          onClick={() => setShowSuccess(false)}
        >
          <p className="text-sm font-medium text-green-800">
            About content updated successfully!
          </p>
        </div>
      )}

      {state.error && typeof state.error === "string" && (
        <div className="mb-6 rounded-md bg-red-50 border border-red-200 p-4">
          <p className="text-sm font-medium text-red-800">{state.error}</p>
        </div>
      )}

      <form action={formAction} className="space-y-8">
        {/* Hidden input with JSON payload */}
        <input type="hidden" name="about" value={JSON.stringify(formData)} />

        {/* ===== Hero Section ===== */}
        <fieldset className="border border-gray-200 rounded-md p-4">
          <legend className="text-sm font-medium text-gray-700 px-2">
            Hero Section
          </legend>
          <div className="space-y-4">
            {/* Badge */}
            <div>
              <label
                htmlFor="hero-badge"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Badge Text
              </label>
              <input
                type="text"
                id="hero-badge"
                value={formData.hero.badge}
                onChange={(e) => updateHero("badge", e.target.value)}
                maxLength={60}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              {getFieldError("hero.badge") && (
                <p className="mt-1 text-sm text-red-600">
                  {getFieldError("hero.badge")![0]}
                </p>
              )}
            </div>

            {/* Heading Line 1 */}
            <div>
              <label
                htmlFor="hero-headingLine1"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Heading Line 1
              </label>
              <input
                type="text"
                id="hero-headingLine1"
                value={formData.hero.headingLine1}
                onChange={(e) => updateHero("headingLine1", e.target.value)}
                maxLength={40}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              {getFieldError("hero.headingLine1") && (
                <p className="mt-1 text-sm text-red-600">
                  {getFieldError("hero.headingLine1")![0]}
                </p>
              )}
            </div>

            {/* Heading Highlight */}
            <div>
              <label
                htmlFor="hero-headingHighlight"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Heading Highlight
              </label>
              <input
                type="text"
                id="hero-headingHighlight"
                value={formData.hero.headingHighlight}
                onChange={(e) => updateHero("headingHighlight", e.target.value)}
                maxLength={40}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              {getFieldError("hero.headingHighlight") && (
                <p className="mt-1 text-sm text-red-600">
                  {getFieldError("hero.headingHighlight")![0]}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="hero-description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="hero-description"
                value={formData.hero.description}
                onChange={(e) => updateHero("description", e.target.value)}
                maxLength={300}
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              {getFieldError("hero.description") && (
                <p className="mt-1 text-sm text-red-600">
                  {getFieldError("hero.description")![0]}
                </p>
              )}
            </div>

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
                  value={formData.hero.heroImage}
                  onChange={(e) => {
                    updateHero("heroImage", e.target.value);
                    setImagePreview(e.target.value);
                  }}
                  placeholder="https://example.com/image.png"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              )}

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
                    {formData.hero.heroImage}
                  </p>
                </div>
              )}

              {getFieldError("hero.heroImage") && (
                <p className="mt-1 text-sm text-red-600">
                  {getFieldError("hero.heroImage")![0]}
                </p>
              )}
            </div>
          </div>
        </fieldset>

        {/* ===== Mission ===== */}
        <div>
          <label
            htmlFor="mission"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mission
          </label>
          <textarea
            id="mission"
            value={formData.mission}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, mission: e.target.value }))
            }
            maxLength={300}
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {getFieldError("mission") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError("mission")![0]}
            </p>
          )}
        </div>

        {/* ===== Vision ===== */}
        <div>
          <label
            htmlFor="vision"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Vision
          </label>
          <textarea
            id="vision"
            value={formData.vision}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, vision: e.target.value }))
            }
            maxLength={300}
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {getFieldError("vision") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError("vision")![0]}
            </p>
          )}
        </div>

        {/* ===== Approach ===== */}
        <fieldset className="border border-gray-200 rounded-md p-4">
          <legend className="text-sm font-medium text-gray-700 px-2">
            Approach
          </legend>
          <div className="space-y-4">
            {/* Approach Description */}
            <div>
              <label
                htmlFor="approach-description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Approach Description
              </label>
              <textarea
                id="approach-description"
                value={formData.approach.description}
                onChange={(e) => updateApproachDescription(e.target.value)}
                maxLength={300}
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              {getFieldError("approach.description") && (
                <p className="mt-1 text-sm text-red-600">
                  {getFieldError("approach.description")![0]}
                </p>
              )}
            </div>

            {/* Approach Items */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Approach Items ({formData.approach.items.length}/4)
                </span>
                <button
                  type="button"
                  onClick={addApproachItem}
                  disabled={formData.approach.items.length >= 4}
                  className="inline-flex items-center rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  + Add Item
                </button>
              </div>
              {getFieldError("approach.items") && (
                <p className="mb-2 text-sm text-red-600">
                  {getFieldError("approach.items")![0]}
                </p>
              )}
              <div className="space-y-3">
                {formData.approach.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-md border border-gray-200 p-3"
                  >
                    <div className="flex-1 space-y-2">
                      <div>
                        <label
                          htmlFor={`approach-item-title-${index}`}
                          className="block text-xs font-medium text-gray-600 mb-1"
                        >
                          Title
                        </label>
                        <input
                          type="text"
                          id={`approach-item-title-${index}`}
                          value={item.title}
                          onChange={(e) =>
                            updateApproachItem(index, "title", e.target.value)
                          }
                          maxLength={50}
                          className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`approach-item-icon-${index}`}
                          className="block text-xs font-medium text-gray-600 mb-1"
                        >
                          Icon (Lucide icon name)
                        </label>
                        <input
                          type="text"
                          id={`approach-item-icon-${index}`}
                          value={item.icon}
                          onChange={(e) =>
                            updateApproachItem(index, "icon", e.target.value)
                          }
                          placeholder="e.g. Heart, Users, Shield"
                          className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeApproachItem(index)}
                      className="mt-5 rounded-md p-1 text-red-500 hover:bg-red-50 hover:text-red-700"
                      aria-label={`Remove approach item ${index + 1}`}
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </fieldset>

        {/* ===== Values ===== */}
        <fieldset className="border border-gray-200 rounded-md p-4">
          <legend className="text-sm font-medium text-gray-700 px-2">
            Values
          </legend>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Values ({formData.values.length}/6)
              </span>
              <button
                type="button"
                onClick={addValue}
                disabled={formData.values.length >= 6}
                className="inline-flex items-center rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                + Add Value
              </button>
            </div>
            {getFieldError("values") && (
              <p className="text-sm text-red-600">
                {getFieldError("values")![0]}
              </p>
            )}
            <div className="space-y-3">
              {formData.values.map((value, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-md border border-gray-200 p-3"
                >
                  <div className="flex-1 space-y-2">
                    <div>
                      <label
                        htmlFor={`value-title-${index}`}
                        className="block text-xs font-medium text-gray-600 mb-1"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id={`value-title-${index}`}
                        value={value.title}
                        onChange={(e) =>
                          updateValue(index, "title", e.target.value)
                        }
                        maxLength={30}
                        className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`value-description-${index}`}
                        className="block text-xs font-medium text-gray-600 mb-1"
                      >
                        Description
                      </label>
                      <textarea
                        id={`value-description-${index}`}
                        value={value.description}
                        onChange={(e) =>
                          updateValue(index, "description", e.target.value)
                        }
                        maxLength={150}
                        rows={2}
                        className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeValue(index)}
                    disabled={formData.values.length <= 1}
                    className="mt-5 rounded-md p-1 text-red-500 hover:bg-red-50 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={`Remove value ${index + 1}`}
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </fieldset>

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
