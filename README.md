# Body Recomposition Blueprint 🏋️‍♂️

> A personalized, evidence-based web app and handbook designed for simultaneous fat loss and muscle hypertrophy.
> Built with a modern, mobile-friendly **HTML5 + CSS3 + Vanilla JavaScript** stack with vibrant bubble/Materialize UI components.

---

## 🎯 Personal Profile Baseline

* **Height:** 184 cm (~6'0.5")
* **Current Weight:** 85 kg (~187 lbs)
* **Training Status:** Novice / Just starting out (High sensitivity to hypertrophic stimuli)
* **Dietary Protocol:** Omnivore (Chicken, fish, eggs, dairy, whey, legumes, whole grains)
* **Training Split:** 4-Day Upper/Lower Split (Commercial Gym equipment: barbells, dumbbells, cables, machines)
* **Primary Target:** Simultaneous fat loss and lean muscle accrual (Body Recomposition)

---

## 🎨 Web App Features

* **Vibrant Bubble & Material Design System:** Soft rounded cards, luminous gradients, and interactive ripple micro-interactions.
* **Mobile-First & App-Like:** Bottom navigation bar on smartphones, responsive tap targets, and touch-optimized layout.
* **Interactive Day Switcher:** Toggle between **Training Day (2,250 kcal)** and **Rest Day (1,950 kcal)** to see macros, badges, and meals adjust in real time.
* **4-Meal Rich Cards with High-Res Photography:** Gram-for-gram meal recipes (scramble, chicken/rice prep, anabolic shake, salmon dinner).
* **Interactive 4-Day Workout Split:** Upper A, Lower A, Upper B, and Lower B with sets, reps, and cues.
* **Built-in Gym Rest Timer:** Floating timer with 60s, 90s, and 120s presets and vibration alerts.
* **Dynamic 100-Point Audit Scorecard:** Live-tallying weekly scorecard that grades adherence in real time.
* **Dark / Light Mode:** Obsidian dark theme or clean vibrant light theme with localStorage persistence.

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
