# Good General Publications & Stationery — Company Website

A polished, minimal, and professional company website for **Good General Publications & Stationery**, an educational publishing and stationery business based in Greater Accra, Ghana.

The website adapts the company landing page template in place as its foundation, tailoring its layout, rhythm, and components to Good General's verified brand identity, operational model, and primary conversion goal: **private school heads and bursars in Greater Accra enquiring about a school books or stationery project**.

---

## Architectural & Library Foundation

- **Framework**: [Next.js](https://nextjs.org/) 16 (App Router, Turbopack) & [React 19](https://react.dev/)
- **UI Components & Primitives**: 
  - [Mantine](https://mantine.dev/) (`@mantine/core`, `@mantine/hooks`)
  - [shadcn/ui](https://ui.shadcn.com/) primitives built on [Radix UI](https://www.radix-ui.com/) (`@radix-ui/react-slot`, `@radix-ui/react-accordion`, `@radix-ui/react-label`)
- **Animation & Transitions**: [Framer Motion](https://www.framer.com/motion/) for subtle, restrained reveals respecting `prefers-reduced-motion`
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/postcss`
- **Typography**: Editorial serif (**Newsreader**) paired with geometric sans-serif (**Plus Jakarta Sans**) via `next/font/google`
- **Package Manager**: [pnpm](https://pnpm.io/)

---

## Template Adaptation & Layout Cadence

The site preserves the alternating section rhythm and structural conventions of the foundation template:

1. **Header & Hero (Deep Navy)**: Sleek navigation bar with logo, brand wordmark, quiet links, Newsreader serif headline, supporting context, and consistent gold CTA button.
2. **The School Challenge (White)**: Asymmetric editorial layout with a 3-point operational ledger addressing supply coordination, institutional identity, and reopening assurance.
3. **Alternating Feature 1 — Customised Books (White)**: Exercise books, notebooks, diaries, report booklets with school crest and colours, paired with publication photography.
4. **Alternating Feature 2 — Trusted Partners (Soft Grey)**: Explains coordination with book production, design, and logistics partners without claiming in-house manufacturing.
5. **Alternating Feature 3 — In-School Bookshop Support (Deep Navy)**: Turnkey on-campus distribution support presented as a discussion option for suitable schools.
6. **Alternating Feature 4 — Stationery Supply (White)**: Writing tools, rulers, geometry sets, markers, and classroom packs for school bookshops.
7. **Offers Overview (3 Columns, Soft Grey)**: Adapted from the template's tier layout into 3 core services (*Customised Books*, *Stationery Supply* highlighted in deep navy, *Bookshop Support*). **No prices or price tables published.**
8. **Reopening Delivery Banner (Deep Navy)**: Highlights class-by-class packing and scheduled delivery before day one.
9. **5-Step Operating Standard (White)**: Sequential process rail (*Discover* $\rightarrow$ *Specify* $\rightarrow$ *Design* $\rightarrow$ *Produce* $\rightarrow$ *Deliver*) detailing physical sample approval and pre-production deposit governance.
10. **Partner Ecosystem Bar (Soft Grey)**: Highlights the production, design, and drop-off partner network.
11. **Mission International School Case Study (Deep Navy)**: Sole supplied project example showcasing branded notebooks, grade-level cover colourways, and standardized attribution labels.
12. **Institutional Mission & Promise (Soft Grey)**:
    - *“Building generations through knowledge.”*
    - *“Dependable quality. Thoughtful design. Reliable delivery. Every time.”*
    - *“Made for Africa. Made to last.”*
13. **Common Questions (White)**: Keyboard-accessible Radix UI Accordion answering all supported operational and commercial questions.
14. **Executive Enquiry Desk & Form (Deep Navy)**: Inset form built with Mantine / shadcn components (`Input`, `Label`, `Textarea`, `Button`) collecting Name, School, Email, Phone, Primary Need, and Message, with transparent WhatsApp & Email transmission fallback.
15. **Footer (Deep Navy)**: Full brand mark, contact channels, location, and copyright.

---

## Single Primary Action & Consistent Button Architecture

Every call to action across all 15 sections uses:
- **Identical Label**: `Enquire about a school project`
- **Identical Anchor**: Links directly to the `#enquire` contact form
- **Consistent Button Component**: Built with `@/components/ui/button` using consistent height (`h-11`), radius (`rounded-md`), and typography.

---

## Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v24.x)
- pnpm (tested on pnpm v11.x)

### Running Locally

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
# Build optimized production bundle
pnpm build

# Start production server
pnpm start -p 3000
```

---

## Verified Contact Details

- **Call / WhatsApp**: `059 639 1615` (`tel:0596391615`, [`https://wa.me/233596391615`](https://wa.me/233596391615))
- **Email**: `info@goodgeneralgh.com` (`mailto:info@goodgeneralgh.com`)
- **Social Identifier**: `Good General GH`
- **Location**: Greater Accra, Ghana
