import Link from "next/link";
import { notFound } from "next/navigation";
import { getVolunteerSubmission } from "@/lib/submissions";

export default async function AdminVolunteerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const submission = await getVolunteerSubmission(id);

  if (!submission) {
    notFound();
  }

  const fields = [
    { label: "Full Name", value: submission.fullName },
    { label: "Email Address", value: submission.email },
    { label: "Phone Number", value: submission.phone },
    { label: "Area of Interest", value: submission.areaOfInterest },
    { label: "Motivation", value: submission.motivation, multiline: true },
    {
      label: "Submitted At",
      value: new Date(submission.submittedAt).toLocaleString(),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/volunteers"
          className="text-sm text-[#1565C0] hover:underline"
        >
          ← Back to Volunteer Applications
        </Link>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">
          Volunteer Application
        </h1>

        <dl className="space-y-5">
          {fields.map(({ label, value, multiline }) => (
            <div key={label}>
              <dt className="text-sm font-medium text-slate-500">{label}</dt>
              <dd
                className={`mt-1 text-slate-900 ${
                  multiline ? "whitespace-pre-wrap" : ""
                }`}
              >
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
