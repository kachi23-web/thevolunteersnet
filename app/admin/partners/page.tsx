import Link from "next/link";
import { getPartnerSubmissions } from "@/lib/submissions";

export default async function AdminPartnersPage() {
  const submissions = await getPartnerSubmissions();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Partner Inquiries
        </h1>
        <p className="mt-1 text-slate-600">
          View all partner form submissions.
        </p>
      </div>

      {submissions.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-white p-10 text-center">
          <p className="text-slate-500">No partner inquiries yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-slate-600">
                  Organization
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">
                  Contact
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">
                  Type
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
                    {sub.organizationName}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {sub.contactName}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {sub.organizationType}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {new Date(sub.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/partners/${sub.id}`}
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
