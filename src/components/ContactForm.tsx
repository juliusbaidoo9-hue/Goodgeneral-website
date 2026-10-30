"use client";

import { useState } from "react";
import { brandContent, contactDetails } from "@/data/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface FormState {
  name: string;
  school: string;
  email: string;
  phone: string;
  need: string;
  message: string;
}

interface FormErrors {
  name?: string;
  school?: string;
  email?: string;
  phone?: string;
  need?: string;
}

const needOptions = [
  "Customised school books (exercise books, notebooks, diaries)",
  "Stationery bulk supply for school bookshop",
  "In-school bookshop discussion",
  "Both custom books and stationery supply",
  "Other / Custom requirement",
];

export function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    school: "",
    email: "",
    phone: "",
    need: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!formData.school.trim()) {
      newErrors.school = "Please enter your school or organisation name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter a valid email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter a phone or WhatsApp number.";
    } else if (formData.phone.replace(/[^0-9]/g, "").length < 9) {
      newErrors.phone = "Please enter a valid phone number (at least 9 digits).";
    }

    if (!formData.need) {
      newErrors.need = "Please select your primary requirement.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 300);
  };

  const generateWhatsAppMessage = () => {
    const text = `Hello Good General,

I would like to enquire about a school project:
- Name: ${formData.name}
- School / Organisation: ${formData.school}
- Email: ${formData.email}
- Phone / WhatsApp: ${formData.phone}
- Primary Need: ${formData.need}
${formData.message ? `- Project Details: ${formData.message}` : ""}

Thank you.`;
    return encodeURIComponent(text);
  };

  const generateMailtoLink = () => {
    const subject = encodeURIComponent(
      `School Project Enquiry - ${formData.school || "Good General"}`
    );
    const body = encodeURIComponent(`Dear Good General Publications & Stationery team,

I would like to enquire about a school project:

Name: ${formData.name}
School / Organisation: ${formData.school}
Email: ${formData.email}
Phone / WhatsApp: ${formData.phone}
Primary Need: ${formData.need}

Project Details:
${formData.message || "We would like to discuss specifications and sample coordination."}

Best regards,
${formData.name}`);

    return `mailto:${contactDetails.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-white rounded-lg border border-stone-200 p-6 sm:p-8 lg:p-10 shadow-lg text-stone-900">
      {submitted ? (
        <div className="space-y-6">
          <div className="border-l-2 border-[#0A1C33] pl-4 py-1">
            <h3 className="font-editorial text-2xl font-bold text-[#0A1C33]">
              Enquiry compiled
            </h3>
            <p className="mt-1.5 text-sm text-stone-600 leading-relaxed">
              Thank you, <strong className="text-stone-900 font-semibold">{formData.name}</strong> from{" "}
              <strong className="text-stone-900 font-semibold">{formData.school}</strong>. Your enquiry details have been organized.
            </p>
          </div>

          <div className="bg-stone-50 rounded border border-stone-200 p-4 text-xs space-y-2 text-stone-700">
            <p>
              <span className="font-semibold text-stone-900">Requirement:</span> {formData.need}
            </p>
            <p>
              <span className="font-semibold text-stone-900">Contact:</span> {formData.email} &bull; {formData.phone}
            </p>
            {formData.message && (
              <p>
                <span className="font-semibold text-stone-900">Notes:</span> {formData.message}
              </p>
            )}
          </div>

          <div className="space-y-3 pt-1">
            <p className="text-xs text-stone-600">
              Choose your direct transmission channel to send these details to our team right away:
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Button asChild variant="primary">
                <a
                  href={`https://wa.me/233596391615?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Send via WhatsApp (059 639 1615)
                </a>
              </Button>

              <Button asChild variant="secondary">
                <a href={generateMailtoLink()}>
                  Send via Email ({contactDetails.email})
                </a>
              </Button>
            </div>
          </div>

          <div className="pt-3 hairline-t">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: "",
                  school: "",
                  email: "",
                  phone: "",
                  need: "",
                  message: "",
                });
              }}
              className="text-xs text-stone-500 hover:text-stone-900 underline underline-offset-4"
            >
              Start another enquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">
                Your full name <span className="text-rose-600" aria-hidden="true">*</span>
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Samuel Mensah"
                required
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={errors.name ? "border-rose-500 ring-1 ring-rose-500" : ""}
              />
              {errors.name && (
                <p id="name-error" className="text-[11px] text-rose-600">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="school">
                School or organisation <span className="text-rose-600" aria-hidden="true">*</span>
              </Label>
              <Input
                type="text"
                id="school"
                name="school"
                value={formData.school}
                onChange={handleChange}
                placeholder="e.g. St. Andrew Academy, Accra"
                required
                aria-required="true"
                aria-invalid={!!errors.school}
                aria-describedby={errors.school ? "school-error" : undefined}
                className={errors.school ? "border-rose-500 ring-1 ring-rose-500" : ""}
              />
              {errors.school && (
                <p id="school-error" className="text-[11px] text-rose-600">
                  {errors.school}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">
                Email address <span className="text-rose-600" aria-hidden="true">*</span>
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="bursar@school.edu.gh"
                required
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={errors.email ? "border-rose-500 ring-1 ring-rose-500" : ""}
              />
              {errors.email && (
                <p id="email-error" className="text-[11px] text-rose-600">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone">
                Phone or WhatsApp number <span className="text-rose-600" aria-hidden="true">*</span>
              </Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="024 XXX XXXX or 059 XXX XXXX"
                required
                aria-required="true"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={errors.phone ? "border-rose-500 ring-1 ring-rose-500" : ""}
              />
              {errors.phone && (
                <p id="phone-error" className="text-[11px] text-rose-600">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="need">
              What does your school need? <span className="text-rose-600" aria-hidden="true">*</span>
            </Label>
            <select
              id="need"
              name="need"
              value={formData.need}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={!!errors.need}
              aria-describedby={errors.need ? "need-error" : undefined}
              className={`flex h-11 w-full rounded-md border bg-white px-3.5 py-2 text-sm text-stone-900 transition-colors focus-visible:outline-none focus-visible:border-[#0A1C33] focus-visible:ring-1 focus-visible:ring-[#0A1C33] ${
                errors.need ? "border-rose-500 ring-1 ring-rose-500" : "border-stone-300"
              }`}
            >
              <option value="">Select primary requirement...</option>
              {needOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.need && (
              <p id="need-error" className="text-[11px] text-rose-600">
                {errors.need}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <Label htmlFor="message">Project details or questions</Label>
              <span className="text-[11px] text-stone-400">Optional</span>
            </div>
            <Textarea
              id="message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Estimated learner numbers, grade levels, reopening timeline, or preferred notebook specifications."
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="w-full h-11 text-sm font-semibold"
            >
              {isSubmitting ? "Processing..." : brandContent.ctaLabel}
            </Button>
            <p className="mt-2 text-[11px] text-stone-500 text-center">
              Direct consultation for private school heads and bursars in Greater Accra. No obligation.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
