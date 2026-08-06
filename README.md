# King QR

A no-login, client-side QR code generator. Everything runs in the browser —
no accounts, no servers, no tracking.

## Features

- 5 QR types: **URL**, **Text**, **WiFi**, **Contact** (vCard), **Email** (mailto)
- Live QR preview as you type (300ms debounce)
- Download as **PNG** or **SVG** at 3 sizes (256 / 512 / 1024 px)
- Copy QR to clipboard as PNG
- Dark mode toggle (resets on refresh — no persistence by design)
- Responsive — works on desktop and mobile
- Purple/green brand, Bricolage Grotesque type

## Tech

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (semantic design tokens, `@custom-variant dark`)
- [`qr-code-styling`](https://github.com/kozakdenys/qr-code-styling) for rendering
- QR output always black-on-white with M error correction for max scannability

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```
