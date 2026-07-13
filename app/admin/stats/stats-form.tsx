"use client";

import { useActionState, useState, useEffect } from "react";
import { updateStatsAction, type ActionState } from "../actions/stats";
import type { StatItem } from "@/types";

function generateId(): string {
  return `stat-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function StatsForm({ initialStats }: { initialStats: StatItem[] }) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    updateStatsAction,
    { success: false }
  );
  const [stats, setStats] = useState<StatItem[]>(initialStats);

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state.success) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const addStat = () => {
    if (stats.length >= 4) return;
    setStats([...stats, { id: generateId(), value: "", label: "" }]);
  };

  const removeStat = (index: number) => {
    if (stats.length <= 1) return;
    setStats(stats.filter((_, i) => i !== index));
  };

  const updateField = (
    index: number,
    field: keyof Omit<StatItem, "id">,
    value: string
  ) => {
    setStats(
      stats.map((stat, i) => (i === index ? { ...stat, [field]: value } : stat))
    );
  };

  const handleSubmit = (formData: FormData) => {
    formData.set("stats", JSON.stringify(stats));
    formAction(formData);
  };

  return (
    <form action={handleSubmit}>
      {/* Success feedback (Req 6.5) */}
      {showSuccess && (
        <div
          className="mb-6 rounded-md bg-green-50 border border-green-200 p-4 text-green-800 cursor-pointer"
          role="status"
          onClick={() => setShowSuccess(false)}
        >
          Stats updated successfully!
        </div>
      )}

      {/* Error feedback (Req 6.6) */}
      {state.error && (
        <div
          className="mb-6 rounded-md bg-red-50 border border-red-200 p-4 text-red-800"
          role="alert"
        >
          {typeof state.error === "string"
            ? state.error
            : Object.entries(state.error)
                .map(([key, msgs]) => `${key}: ${(msgs as string[]).join(", ")}`)
                .join("; ")}
        </div>
      )}

      {/* Stats list */}
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div
            key={stat.id}
            className="border border-gray-200 rounded-lg p-4 bg-white"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-700">
                Stat #{index + 1}
              </h3>
              {stats.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeStat(index)}
                  className="text-sm text-red-600 hover:text-red-800 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor={`stat-value-${index}`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Value{" "}
                  <span className="text-gray-400 font-normal">(max 10 chars)</span>
                </label>
                <input
                  id={`stat-value-${index}`}
                  type="text"
                  maxLength={10}
                  value={stat.value}
                  onChange={(e) => updateField(index, "value", e.target.value)}
                  placeholder="e.g. 100+"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor={`stat-label-${index}`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Label{" "}
                  <span className="text-gray-400 font-normal">(max 30 chars)</span>
                </label>
                <input
                  id={`stat-label-${index}`}
                  type="text"
                  maxLength={30}
                  value={stat.label}
                  onChange={(e) => updateField(index, "label", e.target.value)}
                  placeholder="e.g. Volunteers Mobilized"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add button (max 4 stats) */}
      {stats.length < 4 && (
        <button
          type="button"
          onClick={addStat}
          className="mt-4 inline-flex items-center gap-1 rounded-md border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors"
        >
          + Add Stat
        </button>
      )}

      {/* Submit */}
      <div className="mt-6 flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-[#1565C0] px-6 py-2 text-sm font-medium text-white hover:bg-[#0d47a1] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {pending ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="submit"
          name="publish"
          value="true"
          disabled={pending}
          className="rounded-md bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {pending ? "Publishing..." : "Publish"}
        </button>
      </div>
    </form>
  );
}
