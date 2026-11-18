'use client';

import { useState } from 'react';
import { CircleCheck } from 'lucide-react';
import { buttonClass } from '@/components/ui';
import { submitVolunteerForm } from '@/app/admin/actions/submissions';

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
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  function validate(data: FormFields): FormErrors {
    const errs: FormErrors = {};
    if (!data.fullName.trim()) errs.fullName = 'Please tell us your name.';
    if (!data.email.trim()) {
      errs.email = 'We need an email address to reply to you.';
    } else if (!EMAIL_REGEX.test(data.email.trim())) {
      errs.email = 'That email address does not look right. Please check it.';
    }
    if (!data.phone.trim()) errs.phone = 'Please add a phone number we can reach you on.';
    if (!data.areaOfInterest) errs.areaOfInterest = 'Please choose the area you would most like to help in.';
    if (!data.motivation.trim()) errs.motivation = 'Please tell us a little about why you want to volunteer.';
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
      const result = await submitVolunteerForm(fields);
      if (result.error) {
        setServerError(result.error);
      } else {
        setSubmitted(true);
      }
    } catch {
      setServerError('We could not send your application. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div role="status" className="py-6 text-center">
        <CircleCheck className="mx-auto h-14 w-14 text-green-600" strokeWidth={1.5} aria-hidden="true" />
        <h2 className="mt-5 text-2xl font-black tracking-tight text-slate-900">
          Thank you, {fields.fullName.trim().split(' ')[0]}. We have your application.
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-7 text-slate-600">
          A member of the TVN team will be in touch at{' '}
          <span className="font-semibold text-slate-900">{fields.email}</span> to talk through
          next steps.
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

      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-slate-900">
          Full name <span aria-hidden="true" className="text-[#E91E63]">*</span>
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
          className="field"
          placeholder="Your first and last name"
        />
        {errors.fullName && (
          <p id="fullName-error" role="alert" className="mt-2 text-sm text-red-700">
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-900">
          Email address <span aria-hidden="true" className="text-[#E91E63]">*</span>
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
          placeholder="you@example.com"
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-2 text-sm text-red-700">
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-slate-900">
          Phone number <span aria-hidden="true" className="text-[#E91E63]">*</span>
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
          className="field"
          placeholder="e.g. 0801 234 5678"
        />
        {errors.phone && (
          <p id="phone-error" role="alert" className="mt-2 text-sm text-red-700">
            {errors.phone}
          </p>
        )}
      </div>

      {/* Area of Interest */}
      <div>
        <label htmlFor="areaOfInterest" className="mb-2 block text-sm font-semibold text-slate-900">
          Where would you like to help? <span aria-hidden="true" className="text-[#E91E63]">*</span>
        </label>
        <select
          id="areaOfInterest"
          name="areaOfInterest"
          value={fields.areaOfInterest}
          onChange={handleChange}
          aria-describedby={errors.areaOfInterest ? 'areaOfInterest-error' : undefined}
          aria-invalid={!!errors.areaOfInterest}
          className="field"
        >
          <option value="" disabled>Choose an area…</option>
          {AREAS_OF_INTEREST.map((area) => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
        {errors.areaOfInterest && (
          <p id="areaOfInterest-error" role="alert" className="mt-2 text-sm text-red-700">
            {errors.areaOfInterest}
          </p>
        )}
      </div>

      {/* Motivation */}
      <div>
        <label htmlFor="motivation" className="mb-2 block text-sm font-semibold text-slate-900">
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
          className="field resize-y"
          placeholder="A few sentences is plenty. What skills would you bring, and what do you hope to get out of it?"
        />
        {errors.motivation && (
          <p id="motivation-error" role="alert" className="mt-2 text-sm text-red-700">
            {errors.motivation}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={buttonClass('primary', 'lg', 'w-full')}
      >
        {submitting ? 'Sending…' : 'Send my application'}
      </button>
    </form>
  );
}
