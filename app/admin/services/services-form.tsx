"use client";

import { useActionState, useRef, useState, useEffect } from "react";
import {
  updateServicesAction,
  type ActionState,
} from "@/app/admin/actions/services";
import type { ServiceItem } from "@/types";

const MAX_SERVICES = 6;
const MIN_SERVICES = 1;

function generateId(): string {
  return `service-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const emptyService: () => ServiceItem = () => ({
  id: generateId(),
  title: "",
  description: "",
  icon: "",
  expanded: "",
});

export function ServicesForm({
  initialServices,
}: {
  initialServices: ServiceItem[];
}) {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    updateServicesAction,
    { success: false }
  );

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state.success) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  function updateService(
    index: number,
    field: keyof ServiceItem,
    value: string
  ) {
    setServices((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }

  function addService() {
    if (services.length >= MAX_SERVICES) return;
    setServices((prev) => [...prev, emptyService()]);
  }

  function removeService(index: number) {
    if (services.length <= MIN_SERVICES) return;
    setServices((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(formData: FormData) {
    // Serialize the current services array as JSON into the form data
    formData.set("services", JSON.stringify(services));
    formAction(formData);
  }

  return (
    <form ref={formRef} action={handleSubmit}>
      {/* Success/Error feedback */}
      {showSuccess && (
        <div
          className="mb-6 rounded-md border border-green-200 bg-green-50 p-4 cursor-pointer"
          role="status"
          aria-live="polite"
          onClick={() => setShowSuccess(false)}
        >
          <p className="text-sm font-medium text-green-800">
            Services updated successfully!
          </p>
        </div>
      )}

      {state.error && (
        <div
          className="mb-6 rounded-md border border-red-200 bg-red-50 p-4"
          role="alert"
          aria-live="assertive"
        >
          <p className="text-sm font-medium text-red-800">
            {typeof state.error === "string"
              ? state.error
              : "Validation errors occurred. Please check the fields below."}
          </p>
        </div>
      )}

      {/* Service items */}
      <div className="space-y-6">
        {services.map((service, index) => (
          <div
            key={service.id}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-700">
                Service {index + 1}
              </h3>
              {services.length > MIN_SERVICES && (
                <button
                  type="button"
                  onClick={() => removeService(index)}
                  className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors"
                  aria-label={`Remove service ${index + 1}`}
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div>
                <label
                  htmlFor={`service-title-${index}`}
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Title <span className="text-slate-400">(max 50)</span>
                </label>
                <input
                  id={`service-title-${index}`}
                  type="text"
                  value={service.title}
                  onChange={(e) =>
                    updateService(index, "title", e.target.value)
                  }
                  maxLength={50}
                  placeholder="e.g., Community Outreach"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1565C0] focus:outline-none focus:ring-1 focus:ring-[#1565C0]"
                />
              </div>

              {/* Icon */}
              <div>
                <label
                  htmlFor={`service-icon-${index}`}
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Icon{" "}
                  <span className="text-slate-400">(Lucide icon name)</span>
                </label>
                <input
                  id={`service-icon-${index}`}
                  type="text"
                  value={service.icon}
                  onChange={(e) =>
                    updateService(index, "icon", e.target.value)
                  }
                  placeholder="e.g., Heart, Users, Globe"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1565C0] focus:outline-none focus:ring-1 focus:ring-[#1565C0]"
                />
                <p className="mt-1 text-xs text-slate-500">
                  Browse icons at{" "}
                  <a
                    href="https://lucide.dev/icons"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1565C0] hover:underline"
                  >
                    lucide.dev/icons
                  </a>
                </p>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label
                  htmlFor={`service-description-${index}`}
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Description <span className="text-slate-400">(max 200)</span>
                </label>
                <textarea
                  id={`service-description-${index}`}
                  value={service.description}
                  onChange={(e) =>
                    updateService(index, "description", e.target.value)
                  }
                  maxLength={200}
                  rows={2}
                  placeholder="Brief description of this service"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1565C0] focus:outline-none focus:ring-1 focus:ring-[#1565C0] resize-none"
                />
              </div>

              {/* Expanded (optional) */}
              <div className="md:col-span-2">
                <label
                  htmlFor={`service-expanded-${index}`}
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Expanded Description{" "}
                  <span className="text-slate-400">(optional)</span>
                </label>
                <textarea
                  id={`service-expanded-${index}`}
                  value={service.expanded ?? ""}
                  onChange={(e) =>
                    updateService(index, "expanded", e.target.value)
                  }
                  rows={2}
                  placeholder="Longer description for the services page"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1565C0] focus:outline-none focus:ring-1 focus:ring-[#1565C0] resize-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add service button */}
      {services.length < MAX_SERVICES && (
        <button
          type="button"
          onClick={addService}
          className="mt-4 w-full rounded-md border-2 border-dashed border-slate-300 py-3 text-sm font-medium text-slate-600 hover:border-[#1565C0] hover:text-[#1565C0] transition-colors"
        >
          + Add Service ({services.length}/{MAX_SERVICES})
        </button>
      )}

      {/* Item count indicator */}
      <p className="mt-3 text-xs text-slate-500">
        {services.length} of {MAX_SERVICES} services (minimum {MIN_SERVICES})
      </p>

      {/* Submit button */}
      <div className="mt-6 flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-[#1565C0] px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#1255A1] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {pending ? "Saving..." : "Save Changes"}
        </button>
        {pending && (
          <span className="text-sm text-slate-500">Updating services...</span>
        )}
      </div>
    </form>
  );
}
