'use client';

import { useState } from 'react';
import { CircleCheck } from 'lucide-react';
import { buttonClass } from '@/components/ui';
import { submitPartnerForm } from '@/app/admin/actions/submissions';

interface FormFields {
  organizationName: string;
  contactName: string;
  email: string;
  organizationType: string;
  volunteerNeeds: string;
}

interface FormErrors {
  organizationName?: string;
  contactName?: string;
  email?: string;
  organizationType?: string;
  volunteerNeeds?: string;
}

const ORGANIZATION_TYPES = [
  'NGO / Nonprofit',
  'Community Organization',
  'Educational Institution',
  'Healthcare Organization',
  'Government Agency',
  'Social Enterprise',
  'Other',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PartnerForm() {
  const [fields, setFields] = useState<FormFields>({
    organizationName: '',
    contactName: '',
    email: '',
    organizationType: '',
    volunteerNeeds: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  function validate(data: FormFields): FormErrors {
    const errs: FormErrors = {};
    if (!data.organizationName.trim()) errs.organizationName = 'Please tell us the name of your organization.';
    if (!data.contactName.trim()) errs.contactName = 'Please tell us who we should speak to.';
    if (!data.email.trim()) {
      errs.email = 'We need an email address to reply to you.';
    } else if (!EMAIL_REGEX.test(data.email.trim())) {
      errs.email = 'That email address does not look right. Please check it.';
    }
    if (!data.organizationType) errs.organizationType = 'Please choose the option that best describes your organization.';
    if (!data.volunteerNeeds.trim()) errs.volunteerNeeds = 'Please tell us a little about the help you need.';
    return errs;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError('');
    const errs = validate(fields);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitPartnerForm(fields);
      if (result.error) {
        setServerError(result.error);
      } else {
        setSubmitted(true);
      }
    } catch {
      setServerError('We could not send your request. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div role="status" className="py-6 text-center">
        <CircleCheck className="mx-auto h-14 w-14 text-green-600" strokeWidth={1.5} aria-hidden="true" />
        <h2 className="mt-5 text-2xl font-black tracking-tight text-slate-900">
          Thank you. We have your request.
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-7 text-slate-600">
          A member of the TVN team will reach out to{' '}
          <span className="font-semibold text-slate-900">{fields.contactName}</span> at{' '}
          <span className="font-semibold text-slate-900">{fields.email}</span> to talk through
          what {fields.organizationName} needs.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {serverError && (
        <div role="alert" className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {serverError}
        </div>
      )}

      {/* Organization Name */}
      <div>
        <label htmlFor="organizationName" className="mb-2 block text-sm font-semibold text-slate-900">
          Organization name <span aria-hidden="true" className="text-[#E91E63]">*</span>
        </label>
        <input
          id="organizationName"
          name="organizationName"
          type="text"
          autoComplete="organization"
          value={fields.organizationName}
          onChange={handleChange}
          aria-describedby={errors.organizationName ? 'organizationName-error' : undefined}
          aria-invalid={!!errors.organizationName}
          className="field"
          placeholder="e.g. Helping Hands Foundation"
        />
        {errors.organizationName && (
          <p id="organizationName-error" role="alert" className="mt-2 text-sm text-red-700">
            {errors.organizationName}
          </p>
        )}
      </div>

      {/* Contact Name */}
      <div>
        <label htmlFor="contactName" className="mb-2 block text-sm font-semibold text-slate-900">
          Your name <span aria-hidden="true" className="text-[#E91E63]">*</span>
        </label>
        <input
          id="contactName"
          name="contactName"
          type="text"
          autoComplete="name"
          value={fields.contactName}
          onChange={handleChange}
          aria-describedby={errors.contactName ? 'contactName-error' : undefined}
          aria-invalid={!!errors.contactName}
          className="field"
          placeholder="Your first and last name"
        />
        {errors.contactName && (
          <p id="contactName-error" role="alert" className="mt-2 text-sm text-red-700">
            {errors.contactName}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-900">
          Work email <span aria-hidden="true" className="text-[#E91E63]">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={fields.email}
          onChange={handleChange}
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={!!errors.email}
          className="field"
          placeholder="you@organization.org"
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-2 text-sm text-red-700">
            {errors.email}
          </p>
        )}
      </div>

      {/* Organization Type */}
      <div>
        <label htmlFor="organizationType" className="mb-2 block text-sm font-semibold text-slate-900">
          Type of organization <span aria-hidden="true" className="text-[#E91E63]">*</span>
        </label>
        <select
          id="organizationType"
          name="organizationType"
          value={fields.organizationType}
          onChange={handleChange}
          aria-describedby={errors.organizationType ? 'organizationType-error' : undefined}
          aria-invalid={!!errors.organizationType}
          className="field"
        >
          <option value="" disabled>Select a type…</option>
          {ORGANIZATION_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.organizationType && (
          <p id="organizationType-error" role="alert" className="mt-2 text-sm text-red-700">
            {errors.organizationType}
          </p>
        )}
      </div>

      {/* Volunteer Needs */}
      <div>
        <label htmlFor="volunteerNeeds" className="mb-2 block text-sm font-semibold text-slate-900">
          What do you need volunteers for? <span aria-hidden="true" className="text-[#E91E63]">*</span>
        </label>
        <textarea
          id="volunteerNeeds"
          name="volunteerNeeds"
          rows={4}
          value={fields.volunteerNeeds}
          onChange={handleChange}
          aria-describedby={errors.volunteerNeeds ? 'volunteerNeeds-error' : undefined}
          aria-invalid={!!errors.volunteerNeeds}
          className="field resize-y"
          placeholder="The roles you need filled, roughly how many people, and for how long. Rough numbers are fine."
        />
        {errors.volunteerNeeds && (
          <p id="volunteerNeeds-error" role="alert" className="mt-2 text-sm text-red-700">
            {errors.volunteerNeeds}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={buttonClass('primary', 'lg', 'w-full')}
      >
        {submitting ? 'Sending…' : 'Send my request'}
      </button>
    </form>
  );
}
