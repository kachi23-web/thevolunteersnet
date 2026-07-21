import Link from "next/link";
import { notFound } from "next/navigation";
import { getPartnerSubmission } from "@/lib/submissions";

export default async function AdminPartnerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const submission = await getPartnerSubmission(id);

  if (!submission) {
    notFound();
  }

  const fields = [
    { label: "Organization Name", value: submission.organizationName },
    { label: "Contact Person", value: submission.contactName },
    { label: "Email Address", value: submission.email },
    { label: "Organization Type", value: submission.organizationType },
    { label: "Volunteer Needs", value: submission.volunteerNeeds, multiline: true },
    {
      label: "Submitted At",
      value: new Date(submission.submittedAt).toLocaleString(),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/partners"
          className="text-sm text-[#1565C0] hover:underline"
        >
          ← Back to Partner Inquiries
        </Link>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">
          Partner Inquiry
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
