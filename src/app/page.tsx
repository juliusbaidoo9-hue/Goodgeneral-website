import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import {
  brandContent,
  heroContent,
  offerContent,
  processSteps,
  contactDetails,
} from "@/data/content";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import {
  ScrollReveal,
  ScrollStaggerContainer,
  ScrollStaggerItem,
  MotionScaleOnHover,
} from "@/components/ui/motion";

export default function HomePage() {
  return (
    <div className="bg-white text-stone-900">
      {/* 1. HERO SECTION WITH BACKGROUND VIDEO & OVERLAY */}
      <section
        className="relative bg-[#102A43] min-h-[600px] sm:min-h-[680px] lg:min-h-[760px] flex items-center justify-center overflow-hidden"
        aria-labelledby="hero-heading"
      >
        {/* Background Ambient Video */}
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/videos/hero-video-poster.jpg"
            className="w-full h-full object-cover object-center scale-105"
          >
            <source src="/videos/tent-30.mp4" type="video/mp4" />
          </video>

          {/* Smooth vertical fade: from matching navbar Deep Navy (#102A43) down to exact page section background (#F8F7F4) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#102A43] via-[#102A43]/70 via-50% to-[#F8F7F4]" />
          {/* Top blend to seamlessly merge with navbar */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#102A43] via-[#102A43]/90 to-transparent pointer-events-none" />
          {/* Bottom feathering into exact section background (#F8F7F4) */}
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#F8F7F4] via-[#F8F7F4]/90 to-transparent pointer-events-none" />
        </div>

        {/* Hero Content on Overlay */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28 sm:pt-32 sm:pb-36 lg:pt-36 lg:pb-40 relative z-10 text-center space-y-6">
          <ScrollReveal delay={0.05} direction="up">
            <h1
              id="hero-heading"
              className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12] drop-shadow-[0_2px_12px_rgba(16,42,67,0.8)]"
            >
              {heroContent.headline}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.15} direction="up">
            <p className="text-base sm:text-lg lg:text-xl text-stone-100 leading-relaxed max-w-2xl mx-auto font-normal drop-shadow-[0_1px_6px_rgba(16,42,67,0.7)]">
              {heroContent.subheadline}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.22} direction="up" className="pt-4 flex justify-center">
            <Button asChild variant="gold" size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
              <a href="#enquire">
                <span>{brandContent.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. OFFERS OVERVIEW */}
      <section id="offer" className="py-20 sm:py-28 bg-[#F8F7F4] hairline-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#102A43] tracking-tight">
              What Good General can{" "}
              <span className="relative inline-block">
                help with
                <span className="absolute left-0 bottom-1 w-full h-2 bg-[#D4A72C]/30 -z-10" />
              </span>
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              Tailored project coordination for private schools in Greater Accra. Terms, quantities, and specifications agreed per project.
            </p>
          </ScrollReveal>

          {/* 3 Structured Columns with Staggered Scroll Animation */}
          <ScrollStaggerContainer staggerDelay={0.14} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Column 1: Customised Books */}
            <ScrollStaggerItem className="flex">
              <MotionScaleOnHover className="w-full flex">
                <div className="w-full bg-white border border-stone-200 rounded-lg p-6 sm:p-8 flex flex-col justify-between shadow-sm">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-editorial text-2xl font-bold text-[#102A43]">
                        Customised Books
                      </h3>
                      <p className="text-xs text-stone-500">
                        School-branded educational publications
                      </p>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed pt-2 border-t border-stone-100">
                      Exercise books, notebooks, diaries, and report booklets featuring your school’s crest, name, and grade-coded covers.
                    </p>

                    <ul className="space-y-2 text-xs text-stone-700 pt-3">
                      {offerContent[0].details.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#D4A72C] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-stone-100 mt-6">
                    <Button asChild variant="primary" className="w-full">
                      <a href="#enquire">
                        <span>{brandContent.ctaLabel}</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </MotionScaleOnHover>
            </ScrollStaggerItem>

            {/* Column 2: Stationery Supply */}
            <ScrollStaggerItem className="flex">
              <MotionScaleOnHover className="w-full flex">
                <div className="w-full bg-white border border-stone-200 rounded-lg p-6 sm:p-8 flex flex-col justify-between shadow-sm">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-editorial text-2xl font-bold text-[#102A43]">
                        Stationery Supply
                      </h3>
                      <p className="text-xs text-stone-500">
                        Classroom writing essentials &amp; bulk packs
                      </p>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed pt-2 border-t border-stone-100">
                      Bulk writing materials, classroom tools, and student packs supplied reliably to campus ahead of reopening.
                    </p>

                    <ul className="space-y-2 text-xs text-stone-700 pt-3">
                      {offerContent[1].details.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#D4A72C] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-stone-100 mt-6">
                    <Button asChild variant="primary" className="w-full">
                      <a href="#enquire">
                        <span>{brandContent.ctaLabel}</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </MotionScaleOnHover>
            </ScrollStaggerItem>

            {/* Column 3: In-School Bookshops */}
            <ScrollStaggerItem className="flex">
              <MotionScaleOnHover className="w-full flex">
                <div className="w-full bg-white border border-stone-200 rounded-lg p-6 sm:p-8 flex flex-col justify-between shadow-sm">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-editorial text-2xl font-bold text-[#102A43]">
                        Bookshop Support
                      </h3>
                      <p className="text-xs text-stone-500">
                        On-campus stocking discussion
                      </p>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed pt-2 border-t border-stone-100">
                      For suitable schools looking to set up or stock an on-campus bookshop, discussed per school needs.
                    </p>

                    <ul className="space-y-2 text-xs text-stone-700 pt-3">
                      {offerContent[2].details.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#D4A72C] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-stone-100 mt-6">
                    <Button asChild variant="secondary" className="w-full">
                      <a href="#enquire">
                        <span>{brandContent.ctaLabel}</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </MotionScaleOnHover>
            </ScrollStaggerItem>
          </ScrollStaggerContainer>
        </div>
      </section>

      {/* 3. PHYSICAL SPECIMENS GALLERY (Minimal editorial showcase) */}
      <section id="specimens" className="py-16 sm:py-24 bg-white hairline-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Minimal 4-column photo grid with restrained borders & subtle hover scale */}
          <ScrollStaggerContainer staggerDelay={0.08} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <ScrollStaggerItem>
              <div className="relative rounded-lg overflow-hidden bg-stone-100 border border-stone-200/80 aspect-[3/4] shadow-xs">
                <Image
                  src="/images/mis/mis-books-flatlay-full.jpg"
                  alt="Actual exercise book covers and notebook collection flatlay"
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 280px"
                  className="object-cover object-center"
                />
              </div>
            </ScrollStaggerItem>

            <ScrollStaggerItem>
              <div className="relative rounded-lg overflow-hidden bg-stone-100 border border-stone-200/80 aspect-[3/4] shadow-xs">
                <Image
                  src="/images/mis/mis-note3-standing.jpg"
                  alt="Standing notebook specimen showing reinforced yellow cloth spine tape"
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 280px"
                  className="object-cover object-center"
                />
              </div>
            </ScrollStaggerItem>

            <ScrollStaggerItem>
              <div className="relative rounded-lg overflow-hidden bg-stone-100 border border-stone-200/80 aspect-[3/4] shadow-xs">
                <Image
                  src="/images/mis/mis-fanned-purple.jpg"
                  alt="Fanned purple notebook series displaying school crest and student details"
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 280px"
                  className="object-cover object-center"
                />
              </div>
            </ScrollStaggerItem>

            <ScrollStaggerItem>
              <div className="relative rounded-lg overflow-hidden bg-stone-100 border border-stone-200/80 aspect-[3/4] shadow-xs">
                <Image
                  src="/images/mis/mis-shelf-clean.jpg"
                  alt="Neatly arranged notebook batches on school shelving ready for term issue"
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 280px"
                  className="object-cover object-center"
                />
              </div>
            </ScrollStaggerItem>
          </ScrollStaggerContainer>
        </div>
      </section>

      {/* 4. BANNER SECTION */}
      <section className="py-20 sm:py-24 bg-[#102A43] text-white text-center relative overflow-hidden">
        <ScrollReveal direction="scale" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Dependable delivery, directly to your{" "}
            <span className="relative inline-block text-[#D4A72C]">
              school compound
            </span>
          </h2>

          <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Every order is boxed, packed by class, and delivered directly to your school compound according to the agreed schedule ahead of reopening day.
          </p>

          <div className="pt-2">
            <Button asChild variant="gold" size="lg">
              <a href="#enquire">
                <span>{brandContent.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. THE 5-STEP PROCESS */}
      <section id="process" className="py-20 sm:py-28 bg-white hairline-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" className="max-w-2xl mb-16 space-y-2">
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#102A43] tracking-tight">
              How the process works
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              A straightforward five-step workflow from initial enquiry to class-by-class delivery on campus.
            </p>
          </ScrollReveal>

          {/* 5-Step Process Horizontal Rail with Staggered Scroll Animation */}
          <ScrollStaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-5 gap-6 hairline-t pt-8">
            {processSteps.map((step) => (
              <ScrollStaggerItem key={step.number} className="space-y-3">
                <span className="font-editorial text-2xl font-bold text-[#D4A72C] block">
                  {step.number}
                </span>
                <h3 className="text-base font-bold text-[#102A43]">
                  {step.name}
                </h3>
                <p className="text-xs font-medium text-stone-800 leading-snug">
                  {step.summary}
                </p>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {step.description}
                </p>
              </ScrollStaggerItem>
            ))}
          </ScrollStaggerContainer>
        </div>
      </section>


      {/* 6. INSTITUTIONAL ABOUT & VALUES */}
      <section id="about" className="py-20 sm:py-28 bg-[#F8F7F4] hairline-b text-center">
        <ScrollReveal direction="up" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102A43] tracking-tight">
            Building generations through knowledge.
          </h2>
          <p className="font-editorial text-lg sm:text-xl text-[#D4A72C] italic pt-1">
            “{brandContent.promise}”
          </p>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Good General Publications &amp; Stationery is an educational publishing and stationery partner based in Greater Accra, Ghana. We work alongside private schools, school heads, and bursars to organize customized notebooks, exercise books, and stationery supply through vetted production, design, and logistics partners.
          </p>
          <p className="text-xs font-semibold text-[#102A43] pt-2">
            {brandContent.tagline}
          </p>

          <div className="pt-2">
            <Button asChild variant="primary">
              <a href="#enquire">
                <span>{brandContent.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </ScrollReveal>
      </section>

      {/* 7. EXECUTIVE ENQUIRY DESK & CONTACT FORM */}
      <section
        id="enquire"
        className="py-20 sm:py-28 bg-[#102A43] text-white scroll-mt-16"
        aria-labelledby="contact-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Consultation Guidance with Scroll Reveal */}
            <ScrollReveal direction="left" className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <h2
                  id="contact-heading"
                  className="font-editorial text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight"
                >
                  Enquire about a school project
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                If you are a school head, bursar, or administrator in Greater Accra planning for the upcoming term, let us know your requirements. We will discuss formats, quantities, sample production, and timelines.
              </p>

              <div className="border-t border-[#142C4E] pt-5 space-y-3.5 text-xs text-stone-300">
                <div>
                  <span className="text-stone-400 font-medium block mb-0.5">
                    Location &amp; Coverage
                  </span>
                  <span className="text-stone-200">
                    Greater Accra, Ghana &bull; Dedicated delivery to school compounds
                  </span>
                </div>

                <div>
                  <span className="text-stone-400 font-medium block mb-0.5">
                    Phone &amp; WhatsApp
                  </span>
                  <a
                    href={contactDetails.phoneTel}
                    className="text-stone-200 hover:text-white transition-colors"
                  >
                    {contactDetails.phone}
                  </a>
                </div>

                <div>
                  <span className="text-stone-400 font-medium block mb-0.5">
                    Direct Email
                  </span>
                  <a
                    href={contactDetails.emailMailto}
                    className="text-stone-200 hover:text-white transition-colors"
                  >
                    {contactDetails.email}
                  </a>
                </div>

                <div>
                  <span className="text-stone-400 font-medium block mb-0.5">
                    Project Terms
                  </span>
                  <span className="text-stone-200">
                    Terms agreed per project &bull; Deposit required prior to production
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* Interactive Form Component with Scroll Reveal */}
            <ScrollReveal direction="right" delay={0.15} className="lg:col-span-7">
              <div className="bg-white text-stone-900 rounded-lg p-6 sm:p-8 lg:p-10 shadow-2xl">
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
