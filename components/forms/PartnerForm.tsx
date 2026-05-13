'use client';

import { useState } from 'react';

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

  function validate(data: FormFields): FormErrors {
    const errs: FormErrors = {};
    if (!data.organizationName.trim()) errs.organizationName = 'Organization name is required.';
    if (!data.contactName.trim()) errs.contactName = 'Contact name is required.';
    if (!data.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!EMAIL_REGEX.test(data.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!data.organizationType) errs.organizationType = 'Please select an organization type.';
    if (!data.volunteerNeeds.trim()) errs.volunteerNeeds = 'Please describe your volunteer needs.';
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        role="alert"
        className="rounded-2xl bg-green-50 border border-green-200 p-10 text-center"
      >
        <div className="text-4xl mb-4">🤝</div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Thank you, {fields.organizationName}!
        </h2>
        <p className="text-slate-600 leading-7">
          Your partnership inquiry has been received. A member of the TVN team will reach out to{' '}
          <span className="font-medium text-slate-900">{fields.contactName}</span> at{' '}
          <span className="font-medium text-slate-900">{fields.email}</span> shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Organization Name */}
      <div>
        <label htmlFor="organizationName" className="block text-sm font-medium text-slate-900 mb-1.5">
          Organization Name <span aria-hidden="true" className="text-[#E91E63]">*</span>
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
          className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1565C0] transition-colors ${
            errors.organizationName ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'
          }`}
          placeholder="Helping Hands Foundation"
        />
        {errors.organizationName && (
          <p id="organizationName-error" role="alert" className="mt-1.5 text-xs text-red-600">
            {errors.organizationName}
          </p>
        )}
      </div>

      {/* Contact Name */}
      <div>
        <label htmlFor="contactName" className="block text-sm font-medium text-slate-900 mb-1.5">
          Contact Person Name <span aria-hidden="true" className="text-[#E91E63]">*</span>
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
          className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1565C0] transition-colors ${
            errors.contactName ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'
          }`}
          placeholder="Jane Doe"
        />
        {errors.contactName && (
          <p id="contactName-error" role="alert" className="mt-1.5 text-xs text-red-600">
            {errors.contactName}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-1.5">
          Email Address <span aria-hidden="true" className="text-[#E91E63]">*</span>
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
          className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1565C0] transition-colors ${
            errors.email ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'
          }`}
          placeholder="jane@organization.org"
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      {/* Organization Type */}
      <div>
        <label htmlFor="organizationType" className="block text-sm font-medium text-slate-900 mb-1.5">
          Organization Type <span aria-hidden="true" className="text-[#E91E63]">*</span>
        </label>
        <select
          id="organizationType"
          name="organizationType"
          value={fields.organizationType}
          onChange={handleChange}
          aria-describedby={errors.organizationType ? 'organizationType-error' : undefined}
          aria-invalid={!!errors.organizationType}
          className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1565C0] transition-colors appearance-none bg-no-repeat bg-[right_1rem_center] ${
            errors.organizationType ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'
          }`}
        >
          <option value="" disabled>Select a type…</option>
          {ORGANIZATION_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.organizationType && (
          <p id="organizationType-error" role="alert" className="mt-1.5 text-xs text-red-600">
            {errors.organizationType}
          </p>
        )}
      </div>

      {/* Volunteer Needs */}
      <div>
        <label htmlFor="volunteerNeeds" className="block text-sm font-medium text-slate-900 mb-1.5">
          Volunteer Needs <span aria-hidden="true" className="text-[#E91E63]">*</span>
        </label>
        <textarea
          id="volunteerNeeds"
          name="volunteerNeeds"
          rows={4}
          value={fields.volunteerNeeds}
          onChange={handleChange}
          aria-describedby={errors.volunteerNeeds ? 'volunteerNeeds-error' : undefined}
          aria-invalid={!!errors.volunteerNeeds}
          className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1565C0] transition-colors resize-none ${
            errors.volunteerNeeds ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'
          }`}
          placeholder="Describe the types of volunteers you need and the activities they would support…"
        />
        {errors.volunteerNeeds && (
          <p id="volunteerNeeds-error" role="alert" className="mt-1.5 text-xs text-red-600">
            {errors.volunteerNeeds}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-[#1565C0] text-white text-sm font-semibold px-8 py-3.5 hover:bg-[#0D47A1] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1565C0]"
      >
        Submit Inquiry
      </button>
    </form>
  );
}
