# OTC Training Hub — HOWTO

Static site (plain HTML/CSS/JS, no build step), deployed on Vercel. Login protection is off. It does not link to the main JoustLine site.

## Layout
| File | Purpose | Owner |
|---|---|---|
| index.html | Home | datasheet |
| manual.html | Field Manual (abb9227) | Whiz |
| rules.html | OTC rules | Whiz |
| quiz.html + quiz.js | 15-question self-grading quiz | Bert |
| roster.html | Chain of command, who did what | Whiz |
| style.css | Shared styles | datasheet |

## Contributing
1. Branch off `main` (`<name>/<feature>`). Never commit to main directly.
2. Edit only your own files; keep the shared nav header unchanged.
3. Push once per change, open a PR, and post the commit link to the OTC Lead.

## Run locally
`python3 -m http.server 8000` in the repo root, then open http://localhost:8000.

## Deploy
Vercel serves the repo root as a static site. The lead merges to `main`; datasheet redeploys to production and runs the QA checklist.

## QA checklist
- Every nav link returns 200 on the live URL
- Manual and rules render fully
- Quiz: all 15 questions answer, score and results screen are correct, click sound plays
- Roster matches the posted chain of command
