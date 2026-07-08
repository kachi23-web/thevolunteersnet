"use client";

import { useActionState, useState, useEffect } from "react";
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
          <label
            htmlFor="heroImage"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Hero Image Path
          </label>
          <input
            type="text"
            id="heroImage"
            name="heroImage"
            defaultValue={initialData.heroImage}
            placeholder="/hero-img.png or https://..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {getFieldError("heroImage") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError("heroImage")![0]}
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
            {pending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
