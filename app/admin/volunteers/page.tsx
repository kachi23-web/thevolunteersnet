import Link from "next/link";
import { getVolunteerSubmissions } from "@/lib/submissions";

export default async function AdminVolunteersPage() {
  const submissions = await getVolunteerSubmissions();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Volunteer Applications
        </h1>
        <p className="mt-1 text-slate-600">
          View all volunteer form submissions.
        </p>
      </div>

      {submissions.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-white p-10 text-center">
          <p className="text-slate-500">No volunteer applications yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-slate-600">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">
                  Email
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">
                  Area of Interest
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">
                  Date
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {sub.fullName}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{sub.email}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {sub.areaOfInterest}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {new Date(sub.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/volunteers/${sub.id}`}
                      className="text-[#1565C0] font-medium hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
