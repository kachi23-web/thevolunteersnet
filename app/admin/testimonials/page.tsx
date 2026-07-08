import { getTestimonials } from "@/lib/content";
import { TestimonialsForm } from "./TestimonialsForm";

export default async function TestimonialsAdminPage() {
  let testimonials;
  let loadError = false;

  try {
    testimonials = await getTestimonials();
  } catch {
    loadError = true;
  }

  if (loadError || !testimonials) {
    return (
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">
          Edit Testimonials
        </h1>
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-700 font-medium">
            Failed to load testimonials data.
          </p>
          <p className="mt-2 text-sm text-red-600">
            Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">
        Edit Testimonials
      </h1>
      <TestimonialsForm initialTestimonials={testimonials} />
    </div>
  );
}
