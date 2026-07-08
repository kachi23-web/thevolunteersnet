import { getCtaContent } from "@/lib/content";
import CtaForm from "./CtaForm";

export default async function EditCtaPage() {
  let ctaContent;
  let loadError: string | null = null;

  try {
    ctaContent = await getCtaContent();
  } catch {
    loadError = "Failed to load CTA content. Please try again.";
  }

  if (loadError || !ctaContent) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Edit CTA Section
        </h1>
        <div className="rounded-md bg-red-50 border border-red-200 p-4">
          <p className="text-sm font-medium text-red-800">
            {loadError ?? "Unable to load CTA content."}
          </p>
          <a
            href="/admin/cta"
            className="mt-3 inline-block text-sm font-medium text-red-700 underline hover:text-red-900"
          >
            Retry
          </a>
        </div>
      </div>
    );
  }

  return <CtaForm initialData={ctaContent} />;
}
