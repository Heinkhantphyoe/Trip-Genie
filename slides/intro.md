<!--
  Marp deck — TripGenie intro
  Theme: product-demo (from vibe-code-tours/marp-templates)
  Render:  npx @marp-team/marp-cli slides/intro.md -o slides/intro.html
           npx @marp-team/marp-cli slides/intro.md -o slides/intro.pdf
-->
---
marp: true
paginate: true
size: 16:9
---

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@500&display=swap');
:root { --bg:#f8fafc; --ink:#0f172a; --muted:#64748b; --accent:#0d9488; --line:#e2e8f0; --code:#0f172a; }
section {
  background:var(--bg); color:var(--ink);
  font-family:'Inter','Noto Sans',sans-serif;
  font-size:26px; line-height:1.5; padding:48px 64px;
}
h1 { color:var(--ink); font-weight:800; font-size:1.6em; }
h2 { color:var(--accent); font-weight:600; }
h3 { color:var(--muted); font-weight:600; }
strong { color:var(--accent); }
a { color:var(--accent); text-decoration:none; }
img { border-radius:12px; box-shadow:0 12px 30px rgba(15,23,42,.18); }
code { background:#e6fffb; color:#0f766e; padding:.06em .35em; border-radius:5px; font-family:'JetBrains Mono',monospace; }
pre  { background:var(--code); border-radius:10px; }
pre code { background:none; color:#e2e8f0; }
blockquote { border-left:4px solid var(--accent); background:#ecfeff; color:#155e75; padding:.5em 1em; }
header,footer,section::after { color:var(--muted); font-size:.5em; }
section.cover {
  background:radial-gradient(800px 360px at 82% 14%, rgba(13,148,136,.18), transparent 60%), var(--bg);
}
section.cover h1 { font-size:2.3em; }
section.cover h2 { color:var(--muted); font-weight:400; }
section.shot { background:#0f172a; color:#e2e8f0; padding:0; display:flex; align-items:center; justify-content:center; }
section.shot img { box-shadow:0 20px 50px rgba(0,0,0,.5); border-radius:8px; max-width:88%; max-height:82%; }
</style>

<!-- _class: cover -->

# TripGenie ✈️

## AI-powered travel planning — from idea to itinerary in minutes

---

# The problem

- Travel planning means **10+ browser tabs** — flights, hotels, activities, budgets
- Hard to estimate real costs before you book
- Local tips and cultural insights are scattered across blogs and forums
- Putting it all together into a day-by-day plan takes hours

---

# What TripGenie does

- **Search destinations** by climate, activities, budget, and season
- **Compare flights & hotels** in one place
- **Generate day-by-day itineraries** with activities, transit, and meals
- **Estimate costs** with category breakdowns and savings tips
- **Get local tips** — cultural norms, packing lists, useful phrases

One app. One plan. Zero tab overload.

---

<!-- _class: shot -->

![Home screen](../screenshots/home.png)

---

<!-- _class: shot -->

![Choose destination](../screenshots/choose_destination.png)

---

<!-- _class: shot -->

![Travel plan](../screenshots/travel_plan.png)

---

<!-- _class: shot -->

![Budget breakdown](../screenshots/budger.png)

---

<!-- _class: shot -->

![Tips and useful phrases](../screenshots/tips_and_userfulPhrases.png)

---

# How it's built

| Layer | Technology |
|-------|------------|
| Frontend | **React 19** |
| Build tool | **Vite 8** |
| Routing | **React Router v7** |
| Styling | **Tailwind CSS 4** |
| AI | 4 specialized agents — research, budget, itinerary, tips |

```bash
npm install && npm run dev   # → localhost:5173
```

---

# Who it's for

- **Solo travelers** who want a quick plan without the research spiral
- **Groups** splitting planning tasks — one shared itinerary
- **Budget-conscious** travelers who need cost estimates before booking
- **Anyone** who'd rather travel than plan travel

---

# Try it

- **Repo:** `github.com/Heinkhantphyoe/TripGenie`
- **Run locally:** `npm run dev`

*Built with React 19 · Vite 8 · Tailwind CSS 4 · Claude Code*
