# Samarth Bhandegaonkar — Portfolio

Personalized from the MIT-licensed [portfolio-website repository](https://github.com/red1-for-hek/portfolio-website). The original React, TypeScript, Three.js, GSAP, Lenis, career timeline, pinned project gallery, tech-stack pyramid, and interactive chess page are retained.

## Run locally

```bash
npm ci
cp .env.example .env.local
# Add your GROQ_API_KEY to .env.local to enable the portfolio chat
npm run dev
```

Open the local URL printed by Vite. The portfolio and chess page run without the chat key. The local Vite middleware exposes the same `/api/chat` endpoint used by the Vercel deployment.

## Build

```bash
npm run build
```

## Personal details and links

- `src/config.ts` contains the resume-derived profile, education, experience, projects, achievements, skills, and contact details.
- `src/components/TechStackNew.tsx` contains the linked tech pyramid.
- `public/Samarth_Resume.pdf` is the resume download linked from the page.
- `public/images/MultimodalSearch.svg`, `NightOwl.svg`, and `FindHUB.svg` are original project cover illustrations.
- The resume did not include a public link for the Multimodal Semantic Search Engine, so its project card is not linked yet. Night OWL and FindHUB link to their matching public GitHub repositories.

The supplied template's MIT license is retained in `LICENSE`.
