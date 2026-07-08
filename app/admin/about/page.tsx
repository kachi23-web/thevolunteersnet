import { getAboutContent } from "@/lib/content";
import AboutForm from "./AboutForm";

export default async function EditAboutPage() {
  let aboutContent;
  let loadError: string | null = null;

  try {
    aboutContent = await getAboutContent();
  } catch {
    loadError = "Failed to load about content. Please try again.";
  }

  if (loadError || !aboutContent) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Edit About Page
        </h1>
        <div className="rounded-md bg-red-50 border border-red-200 p-4">
          <p className="text-sm font-medium text-red-800">
            {loadError ?? "Unable to load about content."}
          </p>
          <a
            href="/admin/about"
            className="mt-3 inline-block text-sm font-medium text-red-700 underline hover:text-red-900"
          >
            Retry
          </a>
        </div>
      </div>
    );
  }

  return <AboutForm initialData={aboutContent} />;
}
