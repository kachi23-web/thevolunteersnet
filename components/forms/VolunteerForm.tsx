'use client';

import { useState } from 'react';

interface FormFields {
  fullName: string;
  email: string;
  phone: string;
  areaOfInterest: string;
  motivation: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  areaOfInterest?: string;
  motivation?: string;
}

const AREAS_OF_INTEREST = [
  'Education & Tutoring',
  'Health & Wellness',
  'Environment & Conservation',
  'Community Development',
  'Arts & Culture',
  'Technology & Digital Skills',
  'Other',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function VolunteerForm() {
  const [fields, setFields] = useState<FormFields>({
    fullName: '',
    email: '',
    phone: '',
    areaOfInterest: '',
    motivation: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(data: FormFields): FormErrors {
    const errs: FormErrors = {};
    if (!data.fullName.trim()) errs.fullName = 'Full name is required.';
    if (!data.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!EMAIL_REGEX.test(data.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!data.phone.trim()) errs.phone = 'Phone number is required.';
    if (!data.areaOfInterest) errs.areaOfInterest = 'Please select an area of interest.';
    if (!data.motivation.trim()) errs.motivation = 'Please share your motivation.';
    return errs;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field as the user types
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
        <div className="text-4xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Thank you, {fields.fullName}!</h2>
        <p className="text-slate-600 leading-7">
          Your volunteer application has been received. A member of the TVN team will be in touch
          with you at <span className="font-medium text-slate-900">{fields.email}</span> shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-slate-900 mb-1.5">
          Full Name <span aria-hidden="true" className="text-[#E91E63]">*</span>
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          value={fields.fullName}
          onChange={handleChange}
          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          aria-invalid={!!errors.fullName}
          className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1565C0] transition-colors ${
            errors.fullName ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'
          }`}
          placeholder="Jane Doe"
        />
        {errors.fullName && (
          <p id="fullName-error" role="alert" className="mt-1.5 text-xs text-red-600">
            {errors.fullName}
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
          placeholder="jane@example.com"
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-900 mb-1.5">
          Phone Number <span aria-hidden="true" className="text-[#E91E63]">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={fields.phone}
          onChange={handleChange}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          aria-invalid={!!errors.phone}
          className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1565C0] transition-colors ${
            errors.phone ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'
          }`}
          placeholder="+1 (555) 000-0000"
        />
        {errors.phone && (
          <p id="phone-error" role="alert" className="mt-1.5 text-xs text-red-600">
            {errors.phone}
          </p>
        )}
      </div>

      {/* Area of Interest */}
      <div>
        <label htmlFor="areaOfInterest" className="block text-sm font-medium text-slate-900 mb-1.5">
          Area of Interest <span aria-hidden="true" className="text-[#E91E63]">*</span>
        </label>
        <select
          id="areaOfInterest"
          name="areaOfInterest"
          value={fields.areaOfInterest}
          onChange={handleChange}
          aria-describedby={errors.areaOfInterest ? 'areaOfInterest-error' : undefined}
          aria-invalid={!!errors.areaOfInterest}
          className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1565C0] transition-colors appearance-none bg-no-repeat bg-[right_1rem_center] ${
            errors.areaOfInterest ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'
          }`}
        >
          <option value="" disabled>Select an area…</option>
          {AREAS_OF_INTEREST.map((area) => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
        {errors.areaOfInterest && (
          <p id="areaOfInterest-error" role="alert" className="mt-1.5 text-xs text-red-600">
            {errors.areaOfInterest}
          </p>
        )}
      </div>

      {/* Motivation */}
      <div>
        <label htmlFor="motivation" className="block text-sm font-medium text-slate-900 mb-1.5">
          Why do you want to volunteer? <span aria-hidden="true" className="text-[#E91E63]">*</span>
        </label>
        <textarea
          id="motivation"
          name="motivation"
          rows={4}
          value={fields.motivation}
          onChange={handleChange}
          aria-describedby={errors.motivation ? 'motivation-error' : undefined}
          aria-invalid={!!errors.motivation}
          className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1565C0] transition-colors resize-none ${
            errors.motivation ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'
          }`}
          placeholder="Tell us what drives you to volunteer and what you hope to contribute…"
        />
        {errors.motivation && (
          <p id="motivation-error" role="alert" className="mt-1.5 text-xs text-red-600">
            {errors.motivation}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-[#1565C0] text-white text-sm font-semibold px-8 py-3.5 hover:bg-[#0D47A1] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1565C0]"
      >
        Submit Application
      </button>
    </form>
  );
}
