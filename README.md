# Body Recomposition Blueprint 🏋️‍♂️

> A personalized, evidence-based web app and handbook designed for simultaneous fat loss and muscle hypertrophy.
> Built with a modern, mobile-friendly **HTML5 + CSS3 + Vanilla JavaScript** stack with vibrant bubble/Materialize UI components.

---

## 🎯 Personal Profile Baseline

* **Height:** 184 cm (~6'0.5")
* **Current Weight:** 85 kg (~187 lbs)
* **Training Status:** Novice / Just starting out (High sensitivity to hypertrophic stimuli)
* **Dietary Protocol:** Omnivore (100% Seafood-Free / Fish-Allergy Safe — Chicken, eggs, low-fat paneer, dahi, soya, whey isolate, legumes, whole grains, algal omega-3)
* **Training Split:** 4-Day Upper/Lower Split (Commercial Gym equipment: barbells, dumbbells, cables, machines)
* **Primary Target:** Simultaneous fat loss and lean muscle accrual (Body Recomposition)

---

## 🎨 Web App Features

* **Dark Terminal OS UI:** High-contrast obsidian slate surfaces (`#080c14` / `#131b2e`), monospace accents, and clean card hierarchy.
* **17 Dedicated Chapter Pages + Dashboard:** Every chapter has its own standalone HTML page controlled via top pill navigation and mobile bottom bar.
* **Detailed Indian Household Recipes:** Gram-for-gram recipes with macro breakdowns (Calories, P, C, F, Fiber, Leucine) for cooking on tawa/kadhai in an Indian kitchen.
* **Mobile-First & Responsive:** Touch-friendly top navigation pills, mobile bottom bar, and overflow-scrolling data tables.
* **Dynamic 100-Point Audit Scorecard:** Live-tallying weekly audit in Chapter 17 grading adherence in real time.

---

## 🚀 Instant Local Preview

Since this is a clean HTML + CSS + JS application, you can view it immediately without installing any build tools:

```bash
# Option 1: Simply open index.html in your browser
open index.html

# Option 2: Run a lightweight local HTTP server
python3 -m http.server 8000
# Then open http://127.0.0.1:8000
```

---

## 🌐 Automatic GitHub Pages Deployment

This repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that deploys directly to **GitHub Pages** on every push:

```bash
git remote add origin https://github.com/YOUR-USERNAME/body-recomposition-blueprint.git
git branch -M main
git push -u origin main
```

1. On GitHub, navigate to **Settings** $\rightarrow$ **Pages**.
2. Under **Build and deployment** $\rightarrow$ **Source**, choose **GitHub Actions**.
3. Your site will automatically go live at:
   `https://YOUR-USERNAME.github.io/body-recomposition-blueprint/`
