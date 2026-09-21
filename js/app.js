/* ==========================================================================
   RECOMP TERMINAL OS - JAVASCRIPT CONTROLLER
   High-Tech Terminal Interactions, Mode Switching, Chapter Routing & Timer
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigationTabs();
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
      if (tab && panels.length > 0) switchTab(tab);
    });
  });
}

// --- 2. Mode Toggle (TRAIN vs REST) ---
function initModeToggle() {
  const modeBtns = document.querySelectorAll('.mode-option-btn');
  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// --- 3. Interactive 100-Point Scorecard ---
function initScorecardCalculator() {
  const checkboxes = document.querySelectorAll('.scorecard-cb');
  const scoreTotalEl = document.getElementById('scorecardTotal');
  const gradeBadgeEl = document.getElementById('scorecardGradeBadge');

  if (!checkboxes.length) return;

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

// --- 4. Floating Rest Timer ---
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
