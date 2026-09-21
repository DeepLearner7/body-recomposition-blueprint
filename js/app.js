/* ==========================================================================
   BODY RECOMPOSITION BLUEPRINT - INTERACTIVE CONTROLLER
   Pure Vanilla JS, 60fps Animations, State Management
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initModeSwitcher();
  initNavigation();
  initWorkoutSelector();
  initRestTimer();
  initScorecard();
});

// --- 1. Theme Toggle (Dark / Light Mode) ---
function initTheme() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('recomp_theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  applyTheme(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('recomp_theme', newTheme);
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (toggleBtn) {
    toggleBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }
}

// --- 2. Day Switcher (Training Day vs Rest Day) ---
const targetsData = {
  training: {
    calories: 2250,
    protein: 180,
    carbs: 220,
    fats: 70,
    badgeText: 'HYPERTROPHY FUEL',
    carbDesc: 'High carb peri-workout timing',
    fatDesc: 'Hormonal support floor',
    calorieDesc: 'Mild -300 kcal deficit',
    carbPct: '40%',
    fatPct: '28%',
    calPct: '88%'
  },
  rest: {
    calories: 1950,
    protein: 180,
    carbs: 150,
    fats: 65,
    badgeText: 'FAT OXIDATION',
    carbDesc: 'Lower carbs for insulin sensitivity',
    fatDesc: 'Healthy lipids focus',
    calorieDesc: 'Deep -600 kcal rest-day deficit',
    carbPct: '30%',
    fatPct: '30%',
    calPct: '76%'
  }
};

function initModeSwitcher() {
  const trainBtn = document.getElementById('modeTrainBtn');
  const restBtn = document.getElementById('modeRestBtn');

  if (!trainBtn || !restBtn) return;

  trainBtn.addEventListener('click', () => {
    trainBtn.classList.add('active');
    restBtn.classList.remove('active', 'rest-mode');
    updateNutritionDashboard('training');
  });

  restBtn.addEventListener('click', () => {
    restBtn.classList.add('active', 'rest-mode');
    trainBtn.classList.remove('active');
    updateNutritionDashboard('rest');
  });
}

function updateNutritionDashboard(mode) {
  const data = targetsData[mode];
  animateNumber('valCalories', data.calories);
  animateNumber('valProtein', data.protein);
  animateNumber('valCarbs', data.carbs);
  animateNumber('valFats', data.fats);

  // Update badges & progress bars
  const calBadge = document.getElementById('badgeCalories');
  if (calBadge) calBadge.textContent = data.badgeText;

  const barCarbs = document.getElementById('barCarbs');
  if (barCarbs) barCarbs.style.width = data.carbPct;

  const barFats = document.getElementById('barFats');
  if (barFats) barFats.style.width = data.fatPct;

  const barCal = document.getElementById('barCalories');
  if (barCal) barCal.style.width = data.calPct;

  // Meal plan adjustments message
  const restNotice = document.getElementById('restPlanNotice');
  if (restNotice) {
    restNotice.style.display = mode === 'rest' ? 'block' : 'none';
  }
}

function animateNumber(elementId, targetValue) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const startValue = parseInt(el.textContent.replace(/[^0-9]/g, ''), 10) || 0;
  const duration = 400;
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(startValue + (targetValue - startValue) * easeOut);
    el.textContent = elementId === 'valCalories' ? `${current}` : `${current}g`;
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}

// --- 3. Navigation System (Tabs & Mobile Bottom Bar) ---
function initNavigation() {
  const topTabs = document.querySelectorAll('.tab-bubble-btn');
  const bottomItems = document.querySelectorAll('.nav-bottom-item');
  const panels = document.querySelectorAll('.tab-content-panel');

  function switchTab(tabId) {
    // Sync Top Tabs
    topTabs.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });

    // Sync Bottom Bar
    bottomItems.forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-tab') === tabId);
    });

    // Show Panel
    panels.forEach(panel => {
      panel.classList.toggle('active', panel.id === `tab-${tabId}`);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  topTabs.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.getAttribute('data-tab')));
  });

  bottomItems.forEach(item => {
    item.addEventListener('click', () => switchTab(item.getAttribute('data-tab')));
  });
}

// --- 4. Workout Day Selector ---
const workoutData = {
  upperA: [
    { num: 1, name: "Flat Dumbbell Bench Press", sets: "3 Sets × 8–10", rest: "120s", cues: "Pinch shoulder blades into bench; 45° elbow tuck." },
    { num: 2, name: "Chest-Supported Dumbbell Row", sets: "3 Sets × 8–10", rest: "120s", cues: "Drive elbows to ceiling; hold 1s squeeze at top." },
    { num: 3, name: "Incline DB Press (30°)", sets: "3 Sets × 10–12", rest: "90s", cues: "Upper chest focus; stop 2 inches before touching." },
    { num: 4, name: "Neutral-Grip Lat Pulldown", sets: "3 Sets × 10–12", rest: "90s", cues: "Pull to collarbone; 2s controlled stretch on ascent." },
    { num: 5, name: "Cable Lateral Raises", sets: "3 Sets × 12–15", rest: "60s", cues: "Lead with elbows; keep hands below shoulder plane." },
    { num: 6, name: "Tricep Rope Pushdowns", sets: "3 Sets × 12–15", rest: "60s", cues: "Spread rope apart at bottom; squeeze triceps." }
  ],
  lowerA: [
    { num: 1, name: "Barbell Back Squat / Hack Squat", sets: "3 Sets × 6–8", rest: "150s", cues: "Tripod foot; brace core tight; break parallel depth." },
    { num: 2, name: "Romanian Deadlift (RDL)", sets: "3 Sets × 8–10", rest: "120s", cues: "Push hips back like shutting a door; soft knee bend." },
    { num: 3, name: "Leg Press (Shoulder Width)", sets: "3 Sets × 10–12", rest: "90s", cues: "Deep knee flexion; do not lock knees at top." },
    { num: 4, name: "Lying / Seated Leg Curls", sets: "3 Sets × 10–12", rest: "90s", cues: "Keep hips glued to pad; 2s eccentric lowering." },
    { num: 5, name: "Standing Calf Raises", sets: "3 Sets × 12–15", rest: "60s", cues: "2-second dead pause at bottom stretch." },
    { num: 6, name: "Hanging Knee / Leg Raises", sets: "3 Sets × 12–15", rest: "60s", cues: "Tuck pelvis toward ribs; avoid swinging momentum." }
  ],
  upperB: [
    { num: 1, name: "Standing Overhead DB/Barbell Press", sets: "3 Sets × 6–8", rest: "120s", cues: "Squeeze glutes; push head through window at lockout." },
    { num: 2, name: "Wide-Grip Lat Pulldown", sets: "3 Sets × 8–10", rest: "120s", cues: "Drive elbows into back pockets; full stretch at top." },
    { num: 3, name: "Flat Barbell / Machine Press", sets: "3 Sets × 10–12", rest: "90s", cues: "Consistent bar path across mid sternum." },
    { num: 4, name: "Seated Cable Row", sets: "3 Sets × 10–12", rest: "90s", cues: "Protracted stretch forward, retracted scapular squeeze." },
    { num: 5, name: "Incline DB Lateral Raises", sets: "3 Sets × 12–15", rest: "60s", cues: "Chest on 60° incline; isolate side deltoid." },
    { num: 6, name: "Incline DB Bicep Curls", sets: "3 Sets × 10–12", rest: "60s", cues: "Arm behind torso for full bicep long-head stretch." }
  ],
  lowerB: [
    { num: 1, name: "Trap Bar / Barbell Deadlift", sets: "3 Sets × 5–6", rest: "180s", cues: "Push the floor away; chest proud; reset each rep." },
    { num: 2, name: "Bulgarian Split Squats", sets: "3 Sets × 8–10/leg", rest: "90s", cues: "Slight forward torso lean for glute/quad balance." },
    { num: 3, name: "Seated Leg Extensions", sets: "3 Sets × 12–15", rest: "60s", cues: "Pure quad isolation; 1-second squeeze at top." },
    { num: 4, name: "Seated Hamstring Curls", sets: "3 Sets × 10–12", rest: "60s", cues: "Lengthened position hypertrophy; slow lowering." },
    { num: 5, name: "Seated Calf Machine", sets: "3 Sets × 12–15", rest: "60s", cues: "Soleus muscle focus; slow controlled cadence." },
    { num: 6, name: "Cable Woodchoppers", sets: "3 Sets × 12/side", rest: "60s", cues: "Rotational core power; pivot back foot." }
  ]
};

function initWorkoutSelector() {
  const chips = document.querySelectorAll('.day-chip');
  const container = document.getElementById('exerciseListContainer');

  function renderExercises(dayKey) {
    const list = workoutData[dayKey] || [];
    if (!container) return;

    container.innerHTML = list.map(ex => `
      <div class="exercise-bubble-card">
        <div class="ex-left">
          <div class="ex-number-bubble">${ex.num}</div>
          <div class="ex-info">
            <h4>${ex.name}</h4>
            <div class="ex-cues">${ex.cues}</div>
          </div>
        </div>
        <div class="ex-right-metrics">
          <div class="ex-sets-pill">${ex.sets}</div>
          <div class="ex-rest">Rest: ${ex.rest}</div>
        </div>
      </div>
    `).join('');
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderExercises(chip.getAttribute('data-day'));
    });
  });

  // Initial render
  renderExercises('upperA');
}

// --- 5. Floating Rest Timer ---
let timerInterval = null;
let timerSeconds = 90;
let isRunning = false;

function initRestTimer() {
  const display = document.getElementById('timerDisplay');
  const toggleBtn = document.getElementById('timerToggleBtn');
  const setBtns = document.querySelectorAll('.timer-preset-btn');

  function updateDisplay() {
    if (!display) return;
    const mins = Math.floor(timerSeconds / 60);
    const secs = timerSeconds % 60;
    display.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        toggleBtn.textContent = '▶';
      } else {
        isRunning = true;
        toggleBtn.textContent = '⏸';
        timerInterval = setInterval(() => {
          if (timerSeconds > 0) {
            timerSeconds--;
            updateDisplay();
          } else {
            clearInterval(timerInterval);
            isRunning = false;
            toggleBtn.textContent = '▶';
            // Play gentle tone or alert
            if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
            alert('⏰ Rest period complete! Time for the next set.');
          }
        }, 1000);
      }
    });
  }

  setBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      clearInterval(timerInterval);
      isRunning = false;
      if (toggleBtn) toggleBtn.textContent = '▶';
      timerSeconds = parseInt(btn.getAttribute('data-sec'), 10) || 90;
      updateDisplay();
    });
  });

  updateDisplay();
}

// --- 6. Interactive 100-Point Scorecard ---
function initScorecard() {
  const checkboxes = document.querySelectorAll('.score-checkbox');
  const scoreDisplay = document.getElementById('scoreTally');
  const gradeDisplay = document.getElementById('scoreGrade');

  function calculateScore() {
    let total = 0;
    checkboxes.forEach(box => {
      if (box.checked) {
        total += parseInt(box.getAttribute('data-points'), 10) || 0;
      }
    });

    if (scoreDisplay) scoreDisplay.textContent = total;

    if (gradeDisplay) {
      if (total >= 90) {
        gradeDisplay.textContent = "🏆 Elite Execution (Recomp Guaranteed)";
        gradeDisplay.style.background = "rgba(16, 185, 129, 0.25)";
        gradeDisplay.style.color = "#10b981";
      } else if (total >= 80) {
        gradeDisplay.textContent = "💪 Solid Progress (Consistent Muscle Growth)";
        gradeDisplay.style.background = "rgba(99, 102, 241, 0.25)";
        gradeDisplay.style.color = "#6366f1";
      } else if (total >= 70) {
        gradeDisplay.textContent = "⚠️ Marginal Execution (Audit Weekly Leaks)";
        gradeDisplay.style.background = "rgba(245, 158, 11, 0.25)";
        gradeDisplay.style.color = "#f59e0b";
      } else {
        gradeDisplay.textContent = "🔄 Reset Required (Focus on 180g Protein + 4 Days)";
        gradeDisplay.style.background = "rgba(239, 68, 68, 0.25)";
        gradeDisplay.style.color = "#ef4444";
      }
    }
  }

  checkboxes.forEach(box => {
    box.addEventListener('change', calculateScore);
  });

  calculateScore();
}
