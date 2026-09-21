/* ==========================================================================
   RECOMP TERMINAL OS - JAVASCRIPT CONTROLLER
   High-Tech Terminal Interactions, Real-Time Sliders, Chapter Routing
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigationTabs();
  initParameterSliders();
  initModeToggle();
  initScorecardCalculator();
  initFloatingRestTimer();
});

// --- 1. Navigation Tabs Routing ---
function initNavigationTabs() {
  const navBtns = document.querySelectorAll('.nav-pill-btn, .mobile-nav-btn');
  const panels = document.querySelectorAll('.content-reader-panel');

  function switchTab(targetId) {
    navBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === targetId);
    });

    panels.forEach(panel => {
      panel.classList.toggle('active', panel.id === `view-${targetId}`);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      if (tab) switchTab(tab);
    });
  });
}

// --- 2. Interactive Parameter Tuning Sliders (Screenshot Style) ---
function initParameterSliders() {
  const deficitSlider = document.getElementById('deficitSlider');
  const deficitVal = document.getElementById('deficitVal');
  const deficitChips = document.querySelectorAll('.preset-deficit');

  const proteinSlider = document.getElementById('proteinSlider');
  const proteinVal = document.getElementById('proteinVal');
  const proteinChips = document.querySelectorAll('.preset-protein');

  const stepsSlider = document.getElementById('stepsSlider');
  const stepsVal = document.getElementById('stepsVal');
  const stepsChips = document.querySelectorAll('.preset-steps');

  const weightInput = document.getElementById('inputWeight');
  const heightInput = document.getElementById('inputHeight');
  const saveBtn = document.getElementById('saveParamsBtn');

  // Deficit Slider
  if (deficitSlider && deficitVal) {
    deficitSlider.addEventListener('input', () => {
      deficitVal.textContent = `${deficitSlider.value}%`;
      updateChips(deficitChips, deficitSlider.value);
      recalculateParameters();
    });
  }

  deficitChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const val = chip.getAttribute('data-val');
      if (deficitSlider) {
        deficitSlider.value = val;
        deficitVal.textContent = `${val}%`;
        updateChips(deficitChips, val);
        recalculateParameters();
      }
    });
  });

  // Protein Slider
  if (proteinSlider && proteinVal) {
    proteinSlider.addEventListener('input', () => {
      proteinVal.textContent = `${(proteinSlider.value / 10).toFixed(1)} g/kg`;
      updateChips(proteinChips, proteinSlider.value);
      recalculateParameters();
    });
  }

  proteinChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const val = chip.getAttribute('data-val');
      if (proteinSlider) {
        proteinSlider.value = val;
        proteinVal.textContent = `${(val / 10).toFixed(1)} g/kg`;
        updateChips(proteinChips, val);
        recalculateParameters();
      }
    });
  });

  // Steps Slider
  if (stepsSlider && stepsVal) {
    stepsSlider.addEventListener('input', () => {
      stepsVal.textContent = `${parseInt(stepsSlider.value).toLocaleString()}`;
      updateChips(stepsChips, stepsSlider.value);
    });
  }

  stepsChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const val = chip.getAttribute('data-val');
      if (stepsSlider) {
        stepsSlider.value = val;
        stepsVal.textContent = `${parseInt(val).toLocaleString()}`;
        updateChips(stepsChips, val);
      }
    });
  });

  if (weightInput) weightInput.addEventListener('input', recalculateParameters);
  if (heightInput) heightInput.addEventListener('input', recalculateParameters);

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      saveBtn.textContent = '✓ Parameters Applied!';
      saveBtn.style.background = '#10b981';
      setTimeout(() => {
        saveBtn.textContent = 'Save & Apply Recomp Parameters';
        saveBtn.style.background = '';
      }, 2000);
    });
  }
}

function updateChips(chips, activeVal) {
  chips.forEach(c => {
    c.classList.toggle('active', c.getAttribute('data-val') === String(activeVal));
  });
}

function recalculateParameters() {
  const weight = parseFloat(document.getElementById('inputWeight')?.value) || 85;
  const height = parseFloat(document.getElementById('inputHeight')?.value) || 184;
  const deficitPct = parseFloat(document.getElementById('deficitSlider')?.value) || 13;
  const proteinPerKg = (parseFloat(document.getElementById('proteinSlider')?.value) || 21) / 10;

  // BMR & TDEE
  const bmr = (10 * weight) + (6.25 * height) - (5 * 30) + 5;
  const tdee = Math.round(bmr * 1.375);

  const deficitCalories = Math.round(tdee * (deficitPct / 100));
  const targetCalories = tdee - deficitCalories;

  const targetProteinGrams = Math.round(weight * proteinPerKg);
  const targetFatGrams = Math.round(weight * 0.8);
  const carbCalories = targetCalories - (targetProteinGrams * 4) - (targetFatGrams * 9);
  const targetCarbGrams = Math.max(Math.round(carbCalories / 4), 100);

  // Update displays if elements exist
  const liveCal = document.getElementById('liveTargetCal');
  const liveProt = document.getElementById('liveTargetProt');
  const liveCarbs = document.getElementById('liveTargetCarbs');
  const liveFats = document.getElementById('liveTargetFats');

  if (liveCal) liveCal.textContent = `${targetCalories} kcal`;
  if (liveProt) liveProt.textContent = `${targetProteinGrams}g`;
  if (liveCarbs) liveCarbs.textContent = `${targetCarbGrams}g`;
  if (liveFats) liveFats.textContent = `${targetFatGrams}g`;
}

// --- 3. Mode Toggle (TRAIN vs REST) ---
function initModeToggle() {
  const modeBtns = document.querySelectorAll('.mode-option-btn');
  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.getAttribute('data-mode');
      
      const calDisplay = document.getElementById('liveTargetCal');
      const carbDisplay = document.getElementById('liveTargetCarbs');
      
      if (mode === 'REST') {
        if (calDisplay) calDisplay.textContent = '1,950 kcal';
        if (carbDisplay) carbDisplay.textContent = '150g';
      } else {
        if (calDisplay) calDisplay.textContent = '2,250 kcal';
        if (carbDisplay) carbDisplay.textContent = '220g';
      }
    });
  });
}

// --- 4. Interactive 100-Point Scorecard ---
function initScorecardCalculator() {
  const checkboxes = document.querySelectorAll('.scorecard-cb');
  const scoreTotalEl = document.getElementById('scorecardTotal');
  const gradeBadgeEl = document.getElementById('scorecardGradeBadge');

  function updateScore() {
    let total = 0;
    checkboxes.forEach(cb => {
      if (cb.checked) {
        total += parseInt(cb.getAttribute('data-pts'), 10) || 0;
      }
    });

    if (scoreTotalEl) scoreTotalEl.textContent = total;

    if (gradeBadgeEl) {
      if (total >= 90) {
        gradeBadgeEl.textContent = '🏆 ELITE EXECUTION (Recomp Guaranteed)';
        gradeBadgeEl.style.color = '#10b981';
      } else if (total >= 80) {
        gradeBadgeEl.textContent = '💪 SOLID PROGRESS (Hypertrophy Active)';
        gradeBadgeEl.style.color = '#3b82f6';
      } else if (total >= 70) {
        gradeBadgeEl.textContent = '⚠️ MARGINAL (Audit Weekend Leaks)';
        gradeBadgeEl.style.color = '#f59e0b';
      } else {
        gradeBadgeEl.textContent = '🔄 RESET SYSTEM (Focus on 180g Protein)';
        gradeBadgeEl.style.color = '#f43f5e';
      }
    }
  }

  checkboxes.forEach(cb => cb.addEventListener('change', updateScore));
  updateScore();
}

// --- 5. Floating Rest Timer ---
let timerCount = 90;
let timerRunning = false;
let timerId = null;

function initFloatingRestTimer() {
  const display = document.getElementById('restTimerDisplay');
  const playBtn = document.getElementById('restTimerPlayBtn');
  const presetChips = document.querySelectorAll('.timer-chip');

  function renderTimer() {
    if (!display) return;
    const m = Math.floor(timerCount / 60);
    const s = timerCount % 60;
    display.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (timerRunning) {
        clearInterval(timerId);
        timerRunning = false;
        playBtn.textContent = '▶';
      } else {
        timerRunning = true;
        playBtn.textContent = '⏸';
        timerId = setInterval(() => {
          if (timerCount > 0) {
            timerCount--;
            renderTimer();
          } else {
            clearInterval(timerId);
            timerRunning = false;
            playBtn.textContent = '▶';
            if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
            alert('⏰ Rest complete! Next set ready.');
          }
        }, 1000);
      }
    });
  }

  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      clearInterval(timerId);
      timerRunning = false;
      if (playBtn) playBtn.textContent = '▶';
      timerCount = parseInt(chip.getAttribute('data-sec'), 10) || 90;
      presetChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderTimer();
    });
  });

  renderTimer();
}
