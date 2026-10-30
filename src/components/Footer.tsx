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
                  src="/brand/logo-light-transparent.png"
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
                059 639 1615
              </a>
            </p>
            <p>
              Email:{" "}
              <a href={contactDetails.emailMailto} className="text-white hover:underline">
                {contactDetails.email}
              </a>
            </p>
            <p>Social identifier: {contactDetails.socialName}</p>
            <p>{contactDetails.location}</p>
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
