"use client";

import { useActionState, useState, useEffect, useCallback } from "react";
import { updateHeroAction } from "../actions/hero";
import type { HeroContent, HeroSlideContent } from "@/types";
import type { ActionState } from "../actions/hero";
import { ImagePicker } from "@/components/admin/ImagePicker";

interface HeroFormProps {
  initialData: HeroContent;
}

const initialState: ActionState = { success: false };

// ---------------------------------------------------------------------------
// Blank extra-slide template
// ---------------------------------------------------------------------------
const BLANK_SLIDE: HeroSlideContent = {
  badge: "",
  headingLine1: "",
  headingHighlight: "",
  headingLine2: "",
  description: "",
  primaryCta: { label: "", href: "/" },
  secondaryCta: { label: "", href: "/" },
  heroImage: "",
  imageAlt: "",
};

// ---------------------------------------------------------------------------
// Small reusable field components
// ---------------------------------------------------------------------------
function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {hint && <span className="ml-1 text-xs text-gray-400">({hint})</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500";

// ---------------------------------------------------------------------------
// Single slide editor panel
// ---------------------------------------------------------------------------
function SlideEditor({
  slide,
  index,
  isFirst,
  onChange,
  onRemove,
}: {
  slide: Partial<HeroSlideContent> & { primaryCta: { label: string; href: string }; heroImage: string };
  index: number;
  isFirst: boolean;
  onChange: (updated: typeof slide) => void;
  onRemove?: () => void;
}) {
  const set = useCallback(
    (key: string, value: unknown) => onChange({ ...slide, [key]: value }),
    [slide, onChange]
  );
  const setCta = useCallback(
    (which: "primaryCta" | "secondaryCta", key: "label" | "href", value: string) =>
      onChange({ ...slide, [which]: { ...(slide[which] ?? { label: "", href: "/" }), [key]: value } }),
    [slide, onChange]
  );

  const labelPrefix = isFirst ? "" : `Slide ${index + 1} — `;

  return (
    <div className="space-y-5">
      {/* Badge */}
      <Field id={`badge-${index}`} label="Badge text" hint="60 chars max">
        <input id={`badge-${index}`} type="text" value={slide.badge ?? ""} maxLength={60} onChange={(e) => set("badge", e.target.value)} className={inputCls} />
      </Field>

      {/* Headings */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Field id={`h1-${index}`} label="Heading line 1">
          <input id={`h1-${index}`} type="text" value={slide.headingLine1 ?? ""} maxLength={40} onChange={(e) => set("headingLine1", e.target.value)} className={inputCls} />
        </Field>
        <Field id={`hh-${index}`} label="Highlight">
          <input id={`hh-${index}`} type="text" value={slide.headingHighlight ?? ""} maxLength={40} onChange={(e) => set("headingHighlight", e.target.value)} className={inputCls} />
        </Field>
        <Field id={`h2-${index}`} label="Heading line 2">
          <input id={`h2-${index}`} type="text" value={slide.headingLine2 ?? ""} maxLength={40} onChange={(e) => set("headingLine2", e.target.value)} className={inputCls} />
        </Field>
      </div>

      {/* Live heading preview */}
      <div className="rounded-lg bg-gray-900 p-4 text-white select-none" aria-hidden="true">
        <p className="text-xs text-gray-400 mb-2 uppercase tracking-widest">Preview</p>
        <p className="text-2xl font-black uppercase leading-tight">
          <span className="block">{slide.headingLine1 || <span className="text-gray-600 italic">Line 1…</span>}</span>
          <span className="block text-[#1565C0]">{slide.headingHighlight || <span className="text-gray-600 italic">Highlight…</span>}</span>
          <span className="block">{slide.headingLine2 || <span className="text-gray-600 italic">Line 2…</span>}</span>
        </p>
        <p className="mt-2 text-xs text-gray-400 leading-relaxed max-w-xs">
          {slide.description || <span className="italic">Description…</span>}
        </p>
        <div className="flex gap-2 mt-3 flex-wrap">
          {slide.primaryCta?.label && (
            <span className="px-3 py-1 text-xs font-bold uppercase bg-[#F57C00] text-white">{slide.primaryCta.label}</span>
          )}
          {slide.secondaryCta?.label && (
            <span className="px-3 py-1 text-xs font-bold uppercase bg-[#1565C0] text-white">{slide.secondaryCta.label}</span>
          )}
        </div>
      </div>

      {/* Description */}
      <Field id={`desc-${index}`} label="Description" hint="300 chars max">
        <textarea id={`desc-${index}`} value={slide.description ?? ""} maxLength={300} rows={3} onChange={(e) => set("description", e.target.value)} className={inputCls} />
      </Field>

      {/* CTAs */}
      <div className="grid sm:grid-cols-2 gap-4">
        <fieldset className="border border-gray-200 rounded-md p-3">
          <legend className="text-xs font-semibold text-gray-600 px-1">Primary CTA <span className="text-[#F57C00]">●</span></legend>
          <div className="space-y-2 mt-1">
            <input type="text" placeholder="Label" value={slide.primaryCta?.label ?? ""} maxLength={40} onChange={(e) => setCta("primaryCta", "label", e.target.value)} className={inputCls} />
            <input type="text" placeholder="/ or https://…" value={slide.primaryCta?.href ?? "/"} onChange={(e) => setCta("primaryCta", "href", e.target.value)} className={inputCls} />
          </div>
        </fieldset>
        <fieldset className="border border-gray-200 rounded-md p-3">
          <legend className="text-xs font-semibold text-gray-600 px-1">Secondary CTA <span className="text-[#1565C0]">●</span></legend>
          <div className="space-y-2 mt-1">
            <input type="text" placeholder="Label (optional)" value={slide.secondaryCta?.label ?? ""} maxLength={40} onChange={(e) => setCta("secondaryCta", "label", e.target.value)} className={inputCls} />
            <input type="text" placeholder="/ or https://…" value={slide.secondaryCta?.href ?? "/"} onChange={(e) => setCta("secondaryCta", "href", e.target.value)} className={inputCls} />
          </div>
        </fieldset>
      </div>

      {/* Hero image */}
      <Field id={`img-${index}`} label="Background image">
        <ImagePicker id={`img-${index}`} value={slide.heroImage ?? ""} onChange={(v) => set("heroImage", v)} />
      </Field>

      {/* Image alt */}
      {!isFirst && (
        <Field id={`alt-${index}`} label="Image alt text" hint="for accessibility">
          <input id={`alt-${index}`} type="text" value={(slide as HeroSlideContent).imageAlt ?? ""} maxLength={120} onChange={(e) => set("imageAlt", e.target.value)} className={inputCls} />
        </Field>
      )}

      {/* Remove button (extra slides only) */}
      {onRemove && (
        <div className="pt-1">
          <button type="button" onClick={onRemove} className="text-sm text-red-600 hover:text-red-800 underline">
            Remove this slide
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main form
// ---------------------------------------------------------------------------
export default function HeroForm({ initialData }: HeroFormProps) {
  const [state, formAction, pending] = useActionState(updateHeroAction, initialState);

  // Slide 1 (DB-driven, required fields)
  const [slide1, setSlide1] = useState({
    badge: initialData.badge,
    headingLine1: initialData.headingLine1,
    headingHighlight: initialData.headingHighlight,
    headingLine2: initialData.headingLine2,
    description: initialData.description,
    primaryCta: initialData.primaryCta,
    secondaryCta: initialData.secondaryCta,
    heroImage: initialData.heroImage,
  });

  // Extra slides (slides 2–5)
  const [extraSlides, setExtraSlides] = useState<HeroSlideContent[]>(
    initialData.extraSlides ?? []
  );

  const [activeTab, setActiveTab] = useState(0); // 0 = slide 1, 1+ = extra slides
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state.success) {
      setShowSuccess(true);
      const t = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(t);
    }
  }, [state]);

  function addSlide() {
    if (extraSlides.length >= 4) return;
    setExtraSlides((prev) => [...prev, { ...BLANK_SLIDE }]);
    setActiveTab(extraSlides.length + 1); // switch to the new tab
  }

  function removeSlide(i: number) {
    setExtraSlides((prev) => prev.filter((_, idx) => idx !== i));
    setActiveTab(0);
  }

  function updateExtraSlide(i: number, updated: HeroSlideContent) {
    setExtraSlides((prev) => prev.map((s, idx) => (idx === i ? updated : s)));
  }

  function getFieldError(field: string): string | undefined {
    if (state.error && typeof state.error === "object") {
      const errs = state.error as Record<string, string[]>;
      return errs[field]?.[0];
    }
    return undefined;
  }

  const tabs = [
    { label: "Slide 1 (Main)", index: 0 },
    ...extraSlides.map((_, i) => ({ label: `Slide ${i + 2}`, index: i + 1 })),
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Hero Carousel</h1>
        <span className="text-xs text-gray-400 bg-gray-100 rounded px-2 py-1">
          {1 + extraSlides.length} / 5 slides
        </span>
      </div>

      {showSuccess && (
        <div className="mb-6 rounded-md bg-green-50 border border-green-200 p-4 cursor-pointer" onClick={() => setShowSuccess(false)}>
          <p className="text-sm font-medium text-green-800">✓ Carousel updated successfully!</p>
        </div>
      )}
      {state.error && typeof state.error === "string" && (
        <div className="mb-6 rounded-md bg-red-50 border border-red-200 p-4">
          <p className="text-sm font-medium text-red-800">{state.error}</p>
        </div>
      )}

      {/* Slide tabs */}
      <div className="flex items-center gap-1 mb-6 border-b border-gray-200 overflow-x-auto pb-px">
        {tabs.map((tab) => (
          <button
            key={tab.index}
            type="button"
            onClick={() => setActiveTab(tab.index)}
            className={[
              "flex-shrink-0 px-4 py-2 text-sm font-medium border-b-2 transition-colors",
              activeTab === tab.index
                ? "border-[#1565C0] text-[#1565C0]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
        {extraSlides.length < 4 && (
          <button
            type="button"
            onClick={addSlide}
            className="flex-shrink-0 ml-2 px-3 py-1.5 text-sm border border-dashed border-gray-300 rounded text-gray-500 hover:border-[#1565C0] hover:text-[#1565C0] transition-colors"
          >
            + Add slide
          </button>
        )}
      </div>

      <form
        action={formAction}
        onSubmit={(e) => {
          // Inject hidden fields before submit
          const form = e.currentTarget;
          // Remove any previous hidden extraSlides input
          form.querySelectorAll("[data-extra-slides]").forEach((el) => el.remove());
          const hidden = document.createElement("input");
          hidden.type = "hidden";
          hidden.name = "extraSlides";
          hidden.setAttribute("data-extra-slides", "true");
          hidden.value = JSON.stringify(extraSlides);
          form.appendChild(hidden);
        }}
        className="space-y-8"
      >
        {/* Hidden fields for slide 1 */}
        <input type="hidden" name="badge" value={slide1.badge} />
        <input type="hidden" name="headingLine1" value={slide1.headingLine1} />
        <input type="hidden" name="headingHighlight" value={slide1.headingHighlight} />
        <input type="hidden" name="headingLine2" value={slide1.headingLine2} />
        <input type="hidden" name="description" value={slide1.description} />
        <input type="hidden" name="primaryCtaLabel" value={slide1.primaryCta.label} />
        <input type="hidden" name="primaryCtaHref" value={slide1.primaryCta.href} />
        <input type="hidden" name="secondaryCtaLabel" value={slide1.secondaryCta.label} />
        <input type="hidden" name="secondaryCtaHref" value={slide1.secondaryCta.href} />
        <input type="hidden" name="heroImage" value={slide1.heroImage} />

        {/* Active tab panel */}
        <div>
          {activeTab === 0 ? (
            <SlideEditor
              slide={slide1}
              index={0}
              isFirst
              onChange={(updated) => setSlide1(updated as typeof slide1)}
            />
          ) : (
            <SlideEditor
              slide={extraSlides[activeTab - 1]}
              index={activeTab}
              isFirst={false}
              onChange={(updated) => updateExtraSlide(activeTab - 1, updated as HeroSlideContent)}
              onRemove={() => removeSlide(activeTab - 1)}
            />
          )}
        </div>

        {/* Global field errors */}
        {state.error && typeof state.error === "object" && (
          <div className="rounded-md bg-red-50 border border-red-200 p-3">
            <p className="text-xs font-semibold text-red-700 mb-1">Please fix the following:</p>
            <ul className="list-disc list-inside space-y-0.5">
              {Object.entries(state.error as Record<string, string[]>).map(([field, errs]) =>
                errs.map((e, i) => (
                  <li key={`${field}-${i}`} className="text-xs text-red-600">{field}: {e}</li>
                ))
              )}
            </ul>
          </div>
        )}

        {/* Save button */}
        <div className="pt-2 flex items-center gap-3 border-t border-gray-100">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-md bg-[#1565C0] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0d47a1] focus:outline-none focus:ring-2 focus:ring-[#1565C0] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Saving…
              </>
            ) : (
              "Save & Publish"
            )}
          </button>
          <span className="text-xs text-gray-400">Changes go live on the homepage immediately.</span>
        </div>
      </form>
    </div>
  );
}
