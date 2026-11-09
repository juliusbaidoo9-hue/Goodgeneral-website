import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { brandContent, contactDetails } from "@/data/content";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-[#050E1A] text-stone-300 border-t border-[#142C4E]/80 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-12 border-b border-[#142C4E]/60">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src="/brand/actual-emblem-white-gold.png"
                  alt="Good General Publications & Stationery"
                  width={32}
                  height={32}
                  className="object-contain w-auto h-8"
                />
              </div>
              <div>
                <span className="font-editorial text-base font-bold text-white block leading-tight">
                  {brandContent.name}
                </span>
                <span className="text-xs text-amber-300 font-medium">
                  {brandContent.mission}
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              {brandContent.promise}
            </p>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-1.5 text-xs text-stone-300">
            <h3 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-2.5">
              Contact &amp; Location
            </h3>
            <p>
              Phone / WhatsApp:{" "}
              <a href={contactDetails.phoneTel} className="text-white hover:underline">
                {contactDetails.phone}
              </a>
            </p>
            <p>
              WhatsApp Direct:{" "}
              <a
                href={contactDetails.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:underline"
              >
                {contactDetails.phone}
              </a>
            </p>
            <p>
              Email:{" "}
              <a href={contactDetails.emailMailto} className="text-white hover:underline">
                {contactDetails.email}
              </a>
            </p>
            <p>{contactDetails.location}</p>

            {/* Social Media Links */}
            <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-stone-300">
              <a
                href={contactDetails.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Good General on Facebook"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4 fill-current shrink-0"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
              </a>

              <span className="text-stone-600" aria-hidden="true">&bull;</span>

              <a
                href={contactDetails.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Good General on Instagram"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4 fill-currentColor shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span>Instagram</span>
              </a>

              <span className="text-stone-600" aria-hidden="true">&bull;</span>

              <a
                href={contactDetails.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Good General on TikTok"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4 fill-current shrink-0"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.88-4.47V8.82a8.27 8.27 0 0 0 4.89 1.57V6.94a4.87 4.87 0 0 1-1-.25z" />
                </svg>
                <span>TikTok</span>
              </a>
            </div>
          </div>

          {/* Single Action Link */}
          <div className="md:col-span-3 flex flex-col justify-start space-y-2.5">
            <h3 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-1">
              School Enquiries
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Planning custom books or stationery supply for private schools in Greater Accra.
            </p>
            <div className="pt-1">
              <Button asChild variant="gold" size="sm">
                <a href="#enquire">
                  <span>{brandContent.ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} {brandContent.name}. All rights reserved.
          </p>
          <p>
            Educational Publishing &amp; Stationery Coordination &bull; Greater Accra, Ghana
          </p>
        </div>
      </div>
    </footer>
  );
}
