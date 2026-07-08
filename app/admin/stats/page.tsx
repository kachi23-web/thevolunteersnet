import { getStats } from "@/lib/content";
import { StatsForm } from "./stats-form";

export default async function StatsPage() {
  let stats;
  let loadError: string | null = null;

  try {
    stats = await getStats();
  } catch {
    loadError = "Failed to load stats data.";
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Stats</h1>
      {loadError ? (
        <div className="rounded-md bg-red-50 border border-red-200 p-4 text-red-800">
          <p>{loadError}</p>
          <a
            href="/admin/stats"
            className="mt-3 inline-block rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-200 transition-colors"
          >
            Retry
          </a>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6">
            Manage your impact statistics. You can have between 1 and 4 stats.
          </p>
          <StatsForm initialStats={stats!} />
        </>
      )}
    </div>
  );
}
