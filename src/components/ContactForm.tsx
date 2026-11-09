"use client";

import { useState } from "react";
import { brandContent, contactDetails } from "@/data/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Check, Mail, MessageSquare } from "lucide-react";

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
  const [serverError, setServerError] = useState<string | null>(null);

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
    if (serverError) setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch("/api/enquire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit enquiry");
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("Enquiry submission error:", err);
      setServerError(
        err?.message || "There was an issue sending your message. Please try again or message us directly on WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
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

  return (
    <div className="bg-white rounded-lg border border-stone-200 p-6 sm:p-8 lg:p-10 shadow-lg text-stone-900">
      {submitted ? (
        <div className="space-y-6">
          <div className="flex items-start gap-3.5 border-l-2 border-[#102A43] pl-4 py-1">
            <div className="w-8 h-8 rounded-full bg-[#102A43] text-white flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <div>
              <h3 className="font-editorial text-2xl font-bold text-[#102A43]">
                Message sent successfully
              </h3>
              <p className="mt-1 text-sm text-stone-600 leading-relaxed">
                Thank you, <strong className="text-stone-900 font-semibold">{formData.name}</strong> from{" "}
                <strong className="text-stone-900 font-semibold">{formData.school}</strong>. Your enquiry has been delivered directly to <span className="font-medium text-[#102A43]">{contactDetails.email}</span>.
              </p>
            </div>
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
              Need immediate answers? You can also connect directly with our coordination desk via WhatsApp:
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Button asChild variant="gold">
                <a
                  href={`${contactDetails.whatsappUrl}?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp ({contactDetails.phone})</span>
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
              Send another enquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {serverError && (
            <div className="p-3.5 rounded bg-rose-50 border border-rose-200 text-xs text-rose-700 leading-relaxed">
              {serverError}
            </div>
          )}

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
                placeholder="e.g. St. Andrew Academy"
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
                placeholder="head@standrew.edu.gh"
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
                Phone / WhatsApp number <span className="text-rose-600" aria-hidden="true">*</span>
              </Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="024 123 4567"
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
              Primary requirement <span className="text-rose-600" aria-hidden="true">*</span>
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
              className={`flex h-11 w-full rounded-md border bg-white px-3.5 py-2 text-sm text-stone-900 transition-colors focus-visible:outline-none focus-visible:border-[#102A43] focus-visible:ring-1 focus-visible:ring-[#102A43] ${
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
              {isSubmitting ? "Sending message..." : brandContent.ctaLabel}
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
