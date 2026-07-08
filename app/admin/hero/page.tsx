import { getHeroContent } from "@/lib/content";
import HeroForm from "./HeroForm";

export default async function EditHeroPage() {
  let heroContent;
  let loadError: string | null = null;

  try {
    heroContent = await getHeroContent();
  } catch {
    loadError = "Failed to load hero content. Please try again.";
  }

  if (loadError || !heroContent) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Edit Hero Section
        </h1>
        <div className="rounded-md bg-red-50 border border-red-200 p-4">
          <p className="text-sm font-medium text-red-800">
            {loadError ?? "Unable to load hero content."}
          </p>
          <a
            href="/admin/hero"
            className="mt-3 inline-block text-sm font-medium text-red-700 underline hover:text-red-900"
          >
            Retry
          </a>
        </div>
      </div>
    );
  }

  return <HeroForm initialData={heroContent} />;
}
