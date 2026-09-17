# Prisonology App — PSR Analysis Prototype

A front-end prototype for **Prisonology App**, a concept product that analyses a federal
Presentence Investigation Report (PSR) and returns a security designation assessment.

The Presentence Investigation Report is the document that follows a defendant through
incarceration: it drives the BOP 1–29 security score, facility placement, Public Safety
Factor (PSF) flags, and eligibility for programs such as RDAP. This prototype demonstrates
the end-to-end customer journey for a service that extracts that data from an uploaded PSR
and produces an "Inmate Load and Security Designation" report.

> **This is a UI prototype only.** There is no backend, no AI model, no document parsing and
> no payment processing. The upload, extraction and checkout steps are scripted simulations
> with hard-coded results, built to demonstrate and test the user flow.

## Features

### Marketing landing page
- **Hero section** introducing the AI-powered PSR analysis offering, with a primary call to action.
- **"Why Your PSR Determines Your Future"** — three feature cards covering the permanent-record
  risk and the Rule 32 14-day objection window, security and placement impact, and time off a
  sentence via RDAP.
- **"How It Works"** — a three-step process walkthrough (secure upload → AI extraction → instant delivery).
- **Pricing section** — a flat-rate $1,000-per-file card listing what the analysis includes.
- **Sticky header** with in-page navigation, a "Sign In" action, and a persistent CTA button.

### Guided analysis flow
The whole journey runs inside a single modal, advanced by client-side state
(`isLoggedIn`, `hasPaid`, `uploadedFile`, `intakeForm`):

1. **Sign in / create account** — an email and password form that gates the rest of the flow.
2. **Client intake form** — first and last name, date of birth, SSN, PSR status
   (initial draft or finalized), multi-select sentencing goals (minimize security
   classification, RDAP, First Step Act credits, medical/compassionate designation), and a
   free-text field for disputed facts or external mitigating context.
3. **Document upload** — a drag-and-drop zone with a browse-files fallback, styled for PDFs
   up to 200MB.
4. **Processing simulation** — an animated terminal that streams a 20+ step extraction log
   (PII masking, OCR, Part A offense-conduct extraction, 1–29 score calculation, PSF checks,
   RDAP markers, schema validation). The log is personalised from the intake form.
5. **Results with paywall** — headline data cards (defendant name, security score, confidence
   score) shown in the clear, while designation level, flagged Public Safety Factors and RDAP
   eligibility stay blurred behind an unlock overlay.
6. **Mock checkout** — a Stripe-styled payment panel that, once "paid", unblurs the full
   results and reveals a PDF download button.

### Presentation
- Dark, glassmorphic theme driven by CSS custom properties in `style.css`.
- View-enter animations, drag-over states, a loading spinner and a scrolling log terminal.
- Google Fonts (Outfit and Roboto Mono), with responsive layout for the landing sections.

## Tech stack

Vanilla JavaScript and CSS, bundled by [Vite](https://vite.dev). No framework, no runtime
dependencies.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build into dist/
npm run preview  # preview the production build locally
```

Requires Node.js 20 or newer.

## Project structure

```
index.html              App shell: header, view container, modal, toast container
main.js                 All views, state and flow logic (the actual entry point)
style.css               Theme tokens and every component style
vite.config.js          Vite config; `base` is set to /psr-prototype/ for GitHub Pages
public/                 Static assets served as-is (favicon, icons)
src/                    Leftover Vite starter scaffolding — not used by the app
.github/workflows/      GitHub Pages deployment workflow
```

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds the site and publishes
`dist/` to GitHub Pages. Because `vite.config.js` sets `base: '/psr-prototype/'`, the app
expects to be served from that path.
