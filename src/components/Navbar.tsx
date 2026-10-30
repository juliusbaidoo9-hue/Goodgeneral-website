"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { brandContent } from "@/data/content";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Services", href: "#offer" },
    { name: "Workflow", href: "#process" },
    { name: "About", href: "#about" },
    { name: "Enquire", href: "#enquire" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#102A43] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo and Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group focus-visible:outline-2 focus-visible:outline-amber-400 rounded"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0">
              <Image
                src="/brand/logo-light-transparent.png"
                alt="Good General Publications & Stationery"
                width={36}
                height={36}
                className="object-contain w-auto h-8 sm:h-9"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-editorial text-lg font-bold text-white tracking-tight leading-none">
                Good General
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-stone-200 hover:text-white transition-colors py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Single CTA */}
          <div className="hidden lg:flex items-center">
            <Button asChild variant="gold" size="default">
              <a href="#enquire">{brandContent.ctaLabel}</a>
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-300 hover:text-white rounded focus-visible:outline-2 focus-visible:outline-amber-400"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#142C4E] bg-[#071526] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-stone-200 hover:text-white hover:bg-[#0D2545] rounded-md"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-2 px-1">
            <Button asChild variant="gold" className="w-full">
              <a href="#enquire" onClick={() => setMobileMenuOpen(false)}>
                {brandContent.ctaLabel}
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
