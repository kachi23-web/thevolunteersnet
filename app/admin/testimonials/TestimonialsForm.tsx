"use client";

import { useActionState, useRef, useState, useEffect } from "react";
import { updateTestimonialsAction, type ActionState } from "../actions/testimonials";
import type { TestimonialItem } from "@/types";

interface TestimonialsFormProps {
  initialTestimonials: TestimonialItem[];
}

export function TestimonialsForm({ initialTestimonials }: TestimonialsFormProps) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    updateTestimonialsAction,
    { success: false }
  );

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(
    initialTestimonials
  );

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state.success) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const formRef = useRef<HTMLFormElement>(null);

  const addTestimonial = () => {
    if (testimonials.length >= 6) return;
    setTestimonials([
      ...testimonials,
      {
        id: `testimonial-${Date.now()}`,
        name: "",
        role: "",
        quote: "",
      },
    ]);
  };

  const removeTestimonial = (index: number) => {
    if (testimonials.length <= 1) return;
    setTestimonials(testimonials.filter((_, i) => i !== index));
  };

  const updateField = (
    index: number,
    field: keyof Omit<TestimonialItem, "id">,
    value: string
  ) => {
    setTestimonials(
      testimonials.map((t, i) => (i === index ? { ...t, [field]: value } : t))
    );
  };

  const handleSubmit = (formData: FormData) => {
    formData.set("testimonials", JSON.stringify(testimonials));
    formAction(formData);
  };

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-6">
      {/* Success feedback */}
      {showSuccess && (
        <div
          className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 cursor-pointer"
          onClick={() => setShowSuccess(false)}
        >
          <p className="text-sm font-medium text-green-800">
            Testimonials updated successfully!
          </p>
        </div>
      )}

      {/* Error feedback */}
      {state.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-800">
            {typeof state.error === "string"
              ? state.error
              : Object.entries(state.error)
                  .map(([key, msgs]) => `${key}: ${(msgs as string[]).join(", ")}`)
                  .join("; ")}
          </p>
        </div>
      )}

      {/* Testimonial items */}
      <div className="space-y-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-700">
                Testimonial {index + 1}
              </h3>
              {testimonials.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTestimonial(index)}
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="space-y-4">
              {/* Name field */}
              <div>
                <label
                  htmlFor={`name-${index}`}
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Name{" "}
                  <span className="text-slate-400 font-normal">(max 50)</span>
                </label>
                <input
                  id={`name-${index}`}
                  type="text"
                  value={testimonial.name}
                  onChange={(e) => updateField(index, "name", e.target.value)}
                  maxLength={50}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-[#1565C0] focus:outline-none focus:ring-1 focus:ring-[#1565C0]"
                  placeholder="e.g., Sarah Johnson"
                />
              </div>

              {/* Role field */}
              <div>
                <label
                  htmlFor={`role-${index}`}
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Role{" "}
                  <span className="text-slate-400 font-normal">(max 60)</span>
                </label>
                <input
                  id={`role-${index}`}
                  type="text"
                  value={testimonial.role}
                  onChange={(e) => updateField(index, "role", e.target.value)}
                  maxLength={60}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-[#1565C0] focus:outline-none focus:ring-1 focus:ring-[#1565C0]"
                  placeholder="e.g., NGO Program Director"
                />
              </div>

              {/* Quote field */}
              <div>
                <label
                  htmlFor={`quote-${index}`}
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Quote{" "}
                  <span className="text-slate-400 font-normal">(max 300)</span>
                </label>
                <textarea
                  id={`quote-${index}`}
                  value={testimonial.quote}
                  onChange={(e) => updateField(index, "quote", e.target.value)}
                  maxLength={300}
                  rows={3}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-[#1565C0] focus:outline-none focus:ring-1 focus:ring-[#1565C0] resize-y"
                  placeholder="Enter the testimonial quote..."
                />
                <p className="mt-1 text-xs text-slate-400">
                  {testimonial.quote.length}/300 characters
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Submit controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={addTestimonial}
          disabled={testimonials.length >= 6}
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Add Testimonial
        </button>
        <p className="text-xs text-slate-500">
          {testimonials.length}/6 testimonials (min 1)
        </p>
      </div>

      <div className="pt-4 border-t border-slate-200">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-[#1565C0] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#1255A1] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {pending ? "Saving..." : "Save Testimonials"}
        </button>
      </div>
    </form>
  );
}
