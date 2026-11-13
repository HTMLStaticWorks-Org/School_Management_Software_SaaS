/* ==========================================================================
   EDUPULSE - PUBLIC WEBSITE JAVASCRIPT
   School Management Software (SaaS)
   Theme, RTL, Mobile Menu, Interactive Demos & Login Controller
   ========================================================================== */

// --- 1 & 2. GLOBAL THEME & RTL MANAGEMENT SYSTEM ---
const ICON_MOON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
const ICON_SUN = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
const ICON_RTL = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3 4 7l4 4"></path><path d="M4 7h16"></path><path d="m16 21 4-4-4-4"></path><path d="M20 17H4"></path></svg>';

window.applyTheme = function(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('edupulse_theme', theme); } catch(e){}
  document.querySelectorAll('.js-theme-toggle').forEach(btn => {
    const textSpan = btn.querySelector('.theme-text');
    if (textSpan) {
      textSpan.textContent = theme === 'dark' ? 'Light' : 'Dark';
    } else {
      btn.innerHTML = theme === 'dark' ? ICON_SUN : ICON_MOON;
    }
  });
};

window.toggleTheme = function() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  window.applyTheme(newTheme);
};

window.applyRTL = function(direction) {
  document.documentElement.setAttribute('dir', direction);
  try { localStorage.setItem('edupulse_rtl', direction); } catch(e){}
  document.querySelectorAll('.js-rtl-toggle').forEach(btn => {
    const textSpan = btn.querySelector('.rtl-text');
    if (textSpan) {
      textSpan.textContent = direction === 'rtl' ? 'LTR' : 'RTL';
    } else {
      btn.innerHTML = ICON_RTL;
    }
  });
};

window.toggleRTL = function() {
  const currentRTL = document.documentElement.getAttribute('dir') || 'ltr';
  const newRTL = currentRTL === 'rtl' ? 'ltr' : 'rtl';
  window.applyRTL(newRTL);
};

window.openMobileMenu = function() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeMobileMenu = function() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.toggleMobileMenu = function() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    if (mobileMenu.classList.contains('active')) {
      window.closeMobileMenu();
    } else {
      window.openMobileMenu();
    }
  }
};

// Initialize Theme & RTL immediately
(function initThemeRTL() {
  let savedTheme = 'light';
  let savedRTL = 'ltr';
  try {
    savedTheme = localStorage.getItem('edupulse_theme') || 'light';
    savedRTL = localStorage.getItem('edupulse_rtl') || 'ltr';
  } catch(e){}
  window.applyTheme(savedTheme);
  window.applyRTL(savedRTL);
})();

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    const toggleThemeBtn = e.target.closest('.js-theme-toggle');
    if (toggleThemeBtn && !toggleThemeBtn.hasAttribute('onclick')) {
      window.toggleTheme();
    }
    const toggleRTLBtn = e.target.closest('.js-rtl-toggle');
    if (toggleRTLBtn && !toggleRTLBtn.hasAttribute('onclick')) {
      window.toggleRTL();
    }
  });

  // --- 3. MOBILE NAVBAR DRAWER ---
  const mobileMenu = document.getElementById('mobileMenu');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.openMobileMenu();
    });

    if (closeMenuBtn) {
      closeMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.closeMobileMenu();
      });
    }

    if (mobileOverlay) {
      mobileOverlay.addEventListener('click', (e) => {
        e.stopPropagation();
        window.closeMobileMenu();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        window.closeMobileMenu();
      }
    });

    const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        window.closeMobileMenu();
      });
    });
  }

  // --- 4. HOME SECTION 03: INTERACTIVE AUTOMATION WORKFLOW ---
  const workflowData = [
    {
      title: "1. Morning Roll Call Recorded",
      desc: "Teachers mark daily attendance on classroom tablets, web portals, or via biometric student RFID check-in gates in under 30 seconds.",
      badge: "Real-time Roll Call",
      img: "assets/images/a1.png",
      fallbackImg: "assets/images/a1.png",
      features: [
        "1-Tap Biometric RFID Gate & Tablet check-in in under 30s",
        "Instant morning roll-call with automated absent student flags",
        "Eliminates paper registers & morning classroom disruption"
      ]
    },
    {
      title: "2. Cloud Attendance Register Synced",
      desc: "Instant synchronization logs attendance across the school administration dashboard, calculating real-time daily presence percentages by grade.",
      badge: "Live Cloud Synchronization",
      img: "assets/images/a2.png",
      fallbackImg: "assets/images/a2.png",
      features: [
        "Real-time multi-campus attendance sync to district cloud",
        "Live period-by-period attendance percentages by grade level",
        "Zero manual spreadsheets, double-entry, or data leakage"
      ]
    },
    {
      title: "3. Automated Parent SMS & WhatsApp Alerts",
      desc: "If a student is marked absent or tardy, EduPulse automatically dispatches an immediate notification to the registered guardian's phone.",
      badge: "Automated Parent Dispatch",
      img: "assets/images/a3.png",
      fallbackImg: "assets/images/a3.png",
      features: [
        "Immediate WhatsApp & SMS notifications sent to guardians",
        "Includes secure 1-tap mobile portal acknowledgment link",
        "Cuts school front-office inquiry phone calls by up to 78%"
      ]
    },
    {
      title: "4. Dynamic Timetable Substitution",
      desc: "When faculty members submit leave requests, the smart scheduling engine immediately suggests unallocated qualified teachers to prevent empty classes.",
      badge: "Clash-Free Timetable Allocation",
      img: "assets/images/a4.png",
      fallbackImg: "assets/images/a4.png",
      features: [
        "Intelligent clash-detection prevents overlapping classroom bookings",
        "1-click substitute teacher re-routing when faculty is on leave",
        "Syncs updated room schedule directly to student & staff portals"
      ]
    },
    {
      title: "5. Fee Reconciliation & Term Gradebooks",
      desc: "Attendance metrics, academic grades, and automated term tuition fee invoices are compiled into clear report cards and digital parent receipts.",
      badge: "Unified Student Academic Record",
      img: "assets/images/a5.png",
      fallbackImg: "assets/images/a5.png",
      features: [
        "Automated tuition invoicing with online debit/credit card links",
        "Itemized receipt tracking & real-time fee collection ledgers",
        "Printable official PDF gradebooks & student report transcripts"
      ]
    }
  ];

  window.switchWorkflowStep = function(stepIdx) {
    const data = workflowData[stepIdx];
    if (!data) return;

    const steps = document.querySelectorAll('.workflow-step-btn');
    steps.forEach((btn, i) => {
      const bStep = parseInt(btn.getAttribute('data-step') || i, 10);
      if (bStep === stepIdx) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const titleEl = document.getElementById('workflowTitle');
    const descEl = document.getElementById('workflowDesc');
    const badgeEl = document.getElementById('workflowBadge');
    const badgePillEl = document.getElementById('workflowBadgePill');
    const imgEl = document.getElementById('workflowImg');
    const featuresEl = document.getElementById('workflowFeatures');
    const detailBox = document.querySelector('.workflow-detail-box');

    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;
    if (badgeEl) badgeEl.textContent = data.badge;
    if (badgePillEl) badgePillEl.textContent = `Step ${stepIdx + 1} of 5`;

    if (featuresEl && data.features) {
      featuresEl.innerHTML = data.features.map(feat => `
        <div class="workflow-feature-item">
          <span class="workflow-feature-icon">✓</span>
          <span>${feat}</span>
        </div>
      `).join('');
    }

    if (imgEl) {
      imgEl.style.opacity = '0.35';
      imgEl.style.transform = 'scale(0.98)';
      setTimeout(() => {
        imgEl.src = data.img;
        imgEl.onerror = function() {
          this.onerror = null;
          this.src = data.fallbackImg;
        };
        imgEl.alt = data.title;
        imgEl.style.opacity = '1';
        imgEl.style.transform = 'scale(1)';
      }, 120);
    }

    if (detailBox) {
      detailBox.classList.remove('workflow-pulse');
      void detailBox.offsetWidth;
      detailBox.classList.add('workflow-pulse');
    }
  };

  const workflowSteps = document.querySelectorAll('.workflow-step-btn');
  if (workflowSteps.length > 0) {
    workflowSteps.forEach((stepBtn, idx) => {
      stepBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const stepNum = parseInt(stepBtn.getAttribute('data-step') || idx, 10);
        window.switchWorkflowStep(stepNum);
      });
    });
  }

  // --- 5. HOME 2 SECTION 02: BEFORE/AFTER DRAGGABLE SLIDER ---
  const sliderWrapper = document.getElementById('beforeAfterSlider');
  const sliderHandle = document.getElementById('sliderHandle');
  const sliderAfter = document.getElementById('sliderAfter');

  if (sliderWrapper && sliderHandle && sliderAfter) {
    let isDragging = false;

    const setSliderPos = (x) => {
      const rect = sliderWrapper.getBoundingClientRect();
      let pos = (x - rect.left) / rect.width;
      if (pos < 0.05) pos = 0.05;
      if (pos > 0.95) pos = 0.95;

      const percentage = pos * 100;
      sliderHandle.style.left = `${percentage}%`;

      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
      if (isRTL) {
        sliderAfter.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
      } else {
        sliderAfter.style.clipPath = `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`;
      }
    };

    sliderHandle.addEventListener('mousedown', () => isDragging = true);
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('mousemove', (e) => {
      if (isDragging) setSliderPos(e.clientX);
    });

    sliderHandle.addEventListener('touchstart', () => isDragging = true);
    window.addEventListener('touchend', () => isDragging = false);
    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches[0]) setSliderPos(e.touches[0].clientX);
    });
  }

  // --- 6. FEATURES EXPLORER TAB SWITCHER ---
  const featureTabs = document.querySelectorAll('.feature-tab-btn');
  const featureDetailTitle = document.getElementById('featureDetailTitle');
  const featureDetailDesc = document.getElementById('featureDetailDesc');
  const featureDetailBadge = document.getElementById('featureDetailBadge');
  const featureDetailImpact = document.getElementById('featureDetailImpact');
  const featureVisualContent = document.getElementById('featureVisualContent');

  const featureContentData = {
    tracking: {
      title: "Real-time Attendance & RFID Gate Tracking",
      desc: "Gain complete visibility over student and staff attendance with biometric check-in, classroom roll-call, and auto-computed term attendance ratios.",
      badge: "Attendance Engine",
      impact: [
        "1-click teacher mobile roll-call with automated absentee flagging",
        "Biometric & RFID card integration for turnstiles and school buses",
        "Automated parent SMS & WhatsApp alerts sent within 5 minutes of roll call"
      ],
      visualHtml: `
        <div class="mock-widget">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <div>
              <span style="font-size:0.75rem; color:#98A2B3; text-transform:uppercase; letter-spacing:0.05em; font-weight:700;">Live Morning Attendance Roll Call</span>
              <div style="font-size:1.0625rem; font-weight:800; color:#FFF; margin-top:2px;">Grade 10-A • Room 302 (Homeroom)</div>
            </div>
            <span style="background:rgba(37, 99, 235,0.18); border:1px solid rgba(37, 99, 235,0.4); color:#38BDF8; padding:4px 10px; border-radius:12px; font-size:0.75rem; font-weight:700;">97.4% Present</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px;">
            <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); padding:12px 14px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
              <div style="display:flex; align-items:center; gap:10px;">
                <span style="background:rgba(37, 99, 235,0.2); color:#38BDF8; width:30px; height:30px; border-radius:6px; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.75rem;">RFID</span>
                <div>
                  <div style="font-size:0.875rem; font-weight:700; color:#FFF;">Main Gate Turnstile Scanner #2</div>
                  <div style="font-size:0.75rem; color:#98A2B3;">38 Students Scanned In • 08:14 AM</div>
                </div>
              </div>
              <span style="color:#38BDF8; font-size:0.75rem; font-weight:700; display:flex; align-items:center; gap:4px;"><span style="width:6px; height:6px; background:#38BDF8; border-radius:50%;"></span> Verified</span>
            </div>

            <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); padding:12px 14px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
              <div style="display:flex; align-items:center; gap:10px;">
                <span style="background:rgba(239,68,68,0.2); color:#FCA5A5; width:30px; height:30px; border-radius:6px; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.75rem;">ABS</span>
                <div>
                  <div style="font-size:0.875rem; font-weight:700; color:#FFF;">Ethan Brooks (Roll #14) - Absent</div>
                  <div style="font-size:0.75rem; color:#98A2B3;">SMS Alert sent to Parent (+1 555-0192)</div>
                </div>
              </div>
              <span style="color:#38BDF8; font-size:0.75rem; font-weight:700; display:flex; align-items:center; gap:4px;"><span style="width:6px; height:6px; background:#38BDF8; border-radius:50%;"></span> SMS Delivered</span>
            </div>

            <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); padding:12px 14px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
              <div style="display:flex; align-items:center; gap:10px;">
                <span style="background:rgba(99,102,241,0.2); color:#A5B4FC; width:30px; height:30px; border-radius:6px; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.75rem;">APP</span>
                <div>
                  <div style="font-size:0.875rem; font-weight:700; color:#FFF;">Teacher Portal: Mrs. Henderson</div>
                  <div style="font-size:0.75rem; color:#98A2B3;">Daily Register Signed & Submitted</div>
                </div>
              </div>
              <span style="color:#38BDF8; font-size:0.75rem; font-weight:700; display:flex; align-items:center; gap:4px;"><span style="width:6px; height:6px; background:#38BDF8; border-radius:50%;"></span> Synced</span>
            </div>
          </div>

          <div style="margin-top:16px; background:rgba(37, 99, 235,0.08); border:1px dashed rgba(37, 99, 235,0.3); border-radius:8px; padding:10px 14px; display:flex; justify-content:space-between; align-items:center; font-size:0.8125rem;">
            <span style="color:#98A2B3;">Campus Gate Status: <strong style="color:#FFF;">All 4 Gates Online</strong></span>
            <span style="color:#38BDF8; font-weight:700;">Sync Latency: 0.02s</span>
          </div>
        </div>
      `
    },
    alerts: {
      title: "Direct Parent Communication & Emergency Broadcasts",
      desc: "Connect teachers, school administrators, and parents instantly through two-way messaging, push notifications, and fee circulars.",
      badge: "Parent Portal",
      impact: [
        "Automated WhatsApp & SMS reminders for exam dates, holidays & fees",
        "Direct parent-teacher messaging with built-in office hour limits",
        "Emergency broadcast alerts sent to 1,000+ parents in under 3 seconds"
      ],
      visualHtml: `
        <div class="mock-widget">
          <div style="background:rgba(37, 99, 235,0.12); border:1px solid rgba(37, 99, 235,0.35); border-radius:10px; padding:16px; margin-bottom:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="color:#38BDF8; font-size:0.75rem; font-weight:800; letter-spacing:0.06em; text-transform:uppercase; display:flex; align-items:center; gap:6px;">
                <span style="width:8px; height:8px; background:#38BDF8; border-radius:50%; box-shadow:0 0 8px #38BDF8;"></span> SCHOOL BROADCAST DISPATCHED
              </span>
              <span style="font-size:0.75rem; color:#98A2B3;">Just now</span>
            </div>
            <div style="font-size:1.0625rem; font-weight:800; color:#FFF;">Parent-Teacher Conference (Term 2 Schedule)</div>
            <div style="display:flex; align-items:center; justify-content:space-between; margin-block:10px 8px; font-size:0.875rem;">
              <span style="color:#98A2B3;">Recipients: <strong style="color:#38BDF8; font-size:1rem;">1,248 Guardians</strong></span>
              <span style="color:#98A2B3;">Delivery Rate: <strong style="color:#FFF;">99.4% (SMS + App)</strong></span>
            </div>
            <div style="width:100%; height:8px; background:rgba(255,255,255,0.1); border-radius:4px; overflow:hidden;">
              <div style="width:99%; height:100%; background:linear-gradient(90deg, #38BDF8, #2563EB); border-radius:4px;"></div>
            </div>
          </div>

          <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-size:0.875rem; font-weight:700; color:#FFF;">Direct Parent Inquiries</div>
                <div style="font-size:0.78125rem; color:#98A2B3; margin-top:2px;">3 Unread Messages from Grade 9 Parents</div>
              </div>
              <button style="background:#2563EB; color:#FFF; border:none; padding:8px 14px; border-radius:6px; font-size:0.8125rem; font-weight:700; cursor:pointer;">Open Message Center</button>
            </div>
          </div>
        </div>
      `
    },
    orders: {
      title: "Automated Tuition Fees & Digital Payment Gateway",
      desc: "Eliminate manual fee collection receipts and awkward reminder calls with automated recurring invoicing and instant online payment reconciliation.",
      badge: "Fee Management",
      impact: [
        "Automated tuition, transport, lab & hostel fee invoice generation",
        "Online payments via Credit Card, Net Banking, UPI, Stripe & PayPal",
        "Instant digital receipts and automatic reconciliation with zero errors"
      ],
      visualHtml: `
        <div class="mock-widget">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.1);">
            <div>
              <span style="font-size:0.75rem; color:#98A2B3; text-transform:uppercase; font-weight:700;">Invoice #SCH-2026-9042</span>
              <div style="font-size:1.0625rem; font-weight:800; color:#FFF; margin-top:2px;">Student: Sophia Zhang (Grade 11 Science)</div>
            </div>
            <span style="background:rgba(37, 99, 235,0.18); border:1px solid rgba(37, 99, 235,0.4); color:#38BDF8; padding:4px 10px; border-radius:12px; font-size:0.75rem; font-weight:700;">Paid Online</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:8px; font-size:0.8125rem;">
            <div style="display:grid; grid-template-columns:2fr 1fr 1fr; color:#98A2B3; font-weight:700; padding-bottom:4px; text-transform:uppercase; font-size:0.7rem;">
              <span>Fee Description</span>
              <span style="text-align:center;">Term</span>
              <span style="text-align:right;">Amount</span>
            </div>
            <div style="display:grid; grid-template-columns:2fr 1fr 1fr; color:#FFF; padding:8px 0; border-top:1px solid rgba(255,255,255,0.05);">
              <span>Tuition & Laboratory Fee</span>
              <span style="text-align:center;">Term 2</span>
              <span style="text-align:right; font-weight:700; color:#38BDF8;">$1,250.00</span>
            </div>
            <div style="display:grid; grid-template-columns:2fr 1fr 1fr; color:#FFF; padding:8px 0; border-top:1px solid rgba(255,255,255,0.05);">
              <span>School Bus Transport Route #3</span>
              <span style="text-align:center;">Term 2</span>
              <span style="text-align:right; font-weight:700; color:#38BDF8;">$220.00</span>
            </div>
          </div>

          <div style="margin-top:16px; background:rgba(255,255,255,0.05); border-radius:8px; padding:12px 16px; display:flex; justify-content:space-between; align-items:center;">
            <span style="color:#98A2B3; font-size:0.875rem;">Total Collected:</span>
            <span style="font-size:1.25rem; font-weight:800; color:#FFF;">$1,470.00 USD</span>
          </div>
        </div>
      `
    },
    location: {
      title: "Clash-Free AI Timetable & Room Scheduling",
      desc: "Automatically schedule classes, faculty workloads, and specialized lab spaces with zero teacher clashes or room double-bookings.",
      badge: "Timetable Engine",
      impact: [
        "AI timetable generation honoring subject hours & teacher availability",
        "1-click substitute teacher allocation when faculty members take sick leave",
        "Real-time master schedule published to teacher & student portals"
      ],
      visualHtml: `
        <div class="mock-widget">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <div>
              <span style="font-size:0.75rem; color:#98A2B3; text-transform:uppercase; font-weight:700;">Live Timetable Schedule</span>
              <div style="font-size:1.0625rem; font-weight:800; color:#FFF;">Today: Wednesday • Period 3 (10:15 AM)</div>
            </div>
            <button style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); color:#FFF; padding:6px 12px; border-radius:6px; font-size:0.75rem; font-weight:700; cursor:pointer;">+ Manage Substitutions</button>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px;">
            <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:12px 14px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-size:0.875rem; font-weight:700; color:#FFF;">Grade 10-A • Advanced Mathematics</div>
                <div style="font-size:0.75rem; color:#98A2B3;">Room 204 • Teacher: Dr. Marcus Vance</div>
              </div>
              <span style="color:#38BDF8; font-weight:800; font-size:0.875rem;">In Session</span>
            </div>

            <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:12px 14px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-size:0.875rem; font-weight:700; color:#FFF;">Grade 9-B • Physics Lab Practical</div>
                <div style="font-size:0.75rem; color:#98A2B3;">Lab Block 3 • Teacher: Ms. Elena Rostova</div>
              </div>
              <span style="color:#38BDF8; font-weight:800; font-size:0.875rem;">In Session</span>
            </div>

            <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:12px 14px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-size:0.875rem; font-weight:700; color:#FFF;">Grade 8-C • English Literature</div>
                <div style="font-size:0.75rem; color:#98A2B3;">Substitute Assigned: Mr. Devon Mills</div>
              </div>
              <span style="color:#60A5FA; font-weight:800; font-size:0.875rem;">Covered</span>
            </div>
          </div>
        </div>
      `
    },
    sales: {
      title: "Academic Gradebook & Student Progress Analytics",
      desc: "Gain deep insights into class grade distributions, subject learning outcomes, and at-risk student academic performance.",
      badge: "Academic Analytics",
      impact: [
        "Dynamic gradebook supporting GPA, letter grades, and custom rubric scales",
        "Early warning detection for students falling below academic thresholds",
        "Instant term-end report card generation with teacher remarks"
      ],
      visualHtml: `
        <div class="mock-widget">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <div>
              <span style="font-size:0.75rem; color:#98A2B3; text-transform:uppercase; font-weight:700;">Term 2 Academic Performance</span>
              <div style="font-size:1.25rem; font-weight:800; color:#38BDF8;">3.64 School Average GPA</div>
            </div>
            <span style="color:#38BDF8; background:rgba(56, 189, 248,0.15); padding:4px 8px; border-radius:6px; font-size:0.75rem; font-weight:800;">▲ +0.18 vs Term 1</span>
          </div>

          <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:16px; margin-bottom:12px;">
            <div style="font-size:0.75rem; color:#98A2B3; font-weight:700; margin-bottom:12px;">Grade Distribution (Class of 2026)</div>
            <div style="display:flex; align-items:flex-end; gap:12px; height:110px; padding-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.1);">
              <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:6px;">
                <div style="width:100%; background:#2563EB; height:35%; border-radius:4px 4px 0 0;"></div>
                <span style="font-size:0.7rem; color:#98A2B3;">C</span>
              </div>
              <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:6px;">
                <div style="width:100%; background:#2563EB; height:65%; border-radius:4px 4px 0 0;"></div>
                <span style="font-size:0.7rem; color:#98A2B3;">B</span>
              </div>
              <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:6px;">
                <div style="width:100%; background:#2563EB; height:85%; border-radius:4px 4px 0 0;"></div>
                <span style="font-size:0.7rem; color:#98A2B3;">A</span>
              </div>
              <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:6px;">
                <div style="width:100%; background:linear-gradient(180deg, #38BDF8, #2563EB); height:95%; border-radius:4px 4px 0 0; box-shadow:0 0 10px rgba(56, 189, 248,0.5);"></div>
                <span style="font-size:0.7rem; color:#38BDF8; font-weight:800;">A+</span>
              </div>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; font-size:0.78125rem; color:#98A2B3;">
            <span>Top Subject: <strong style="color:#FFF;">Computer Science (94.2%)</strong></span>
            <span>Honor Roll Students: <strong style="color:#38BDF8;">348 Enrolled</strong></span>
          </div>
        </div>
      `
    },
    reports: {
      title: "Accredited Report Cards & Official Transcripts",
      desc: "Produce standardized, multi-curriculum report cards, graduation diplomas, and transfer certificates with digital signatures.",
      badge: "Official Records",
      impact: [
        "Compatible with US K-12, British IB, CBSE, ICSE, and state frameworks",
        "1-click batch generation and PDF emailing directly to registered parents",
        "Integrated attendance percentage and teacher conduct remarks"
      ],
      visualHtml: `
        <div class="mock-widget">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <div>
              <span style="font-size:0.75rem; color:#98A2B3; text-transform:uppercase; font-weight:700;">Term Report Card Generator</span>
              <div style="font-size:1.25rem; font-weight:800; color:#FFF;">1,248 Records Ready for Dispatch</div>
            </div>
            <span style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); color:#38BDF8; padding:4px 10px; border-radius:6px; font-size:0.75rem; font-weight:700;">Signed & Verified</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:16px;">
            <div style="background:rgba(255,255,255,0.04); border-radius:6px; padding:10px 14px; display:flex; justify-content:space-between; font-size:0.8125rem;">
              <span style="color:#FFF;">High School (Grades 9 - 12)</span>
              <span style="font-weight:700; color:#38BDF8;">480 Generated (100%)</span>
            </div>
            <div style="background:rgba(255,255,255,0.04); border-radius:6px; padding:10px 14px; display:flex; justify-content:space-between; font-size:0.8125rem;">
              <span style="color:#FFF;">Middle School (Grades 6 - 8)</span>
              <span style="font-weight:700; color:#38BDF8;">420 Generated (100%)</span>
            </div>
            <div style="background:rgba(255,255,255,0.04); border-radius:6px; padding:10px 14px; display:flex; justify-content:space-between; font-size:0.8125rem;">
              <span style="color:#FFF;">Elementary (Grades 1 - 5)</span>
              <span style="font-weight:700; color:#38BDF8;">348 Generated (100%)</span>
            </div>
          </div>

          <div style="display:flex; gap:10px;">
            <button style="flex:1; background:rgba(37, 99, 235,0.2); border:1px solid rgba(37, 99, 235,0.4); color:#38BDF8; padding:8px; border-radius:6px; font-size:0.78125rem; font-weight:700; cursor:pointer;">Email to Parents</button>
            <button style="flex:1; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); color:#FFF; padding:8px; border-radius:6px; font-size:0.78125rem; font-weight:700; cursor:pointer;">Download All PDFs</button>
          </div>
        </div>
      `
    },
    suppliers: {
      title: "Faculty & Staff Directory with Workload Limits",
      desc: "Manage educator profiles, teaching subject certifications, period allocations, and leave balances in one centralized campus directory.",
      badge: "Faculty Management",
      impact: [
        "Balanced teaching period limits to prevent teacher burnout",
        "Automated payroll calculation integrating daily faculty attendance",
        "Integrated substitute teacher availability roster"
      ],
      visualHtml: `
        <div class="mock-widget">
          <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:16px; margin-bottom:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-size:0.75rem; color:#38BDF8; font-weight:800; letter-spacing:0.05em; text-transform:uppercase;">Department Head</span>
              <span style="color:#FBBF24; font-size:0.875rem;">★★★★★ 4.9 Rating</span>
            </div>
            <div style="font-size:1.125rem; font-weight:800; color:#FFF;">Dr. Marcus Vance (Head of Mathematics)</div>
            <div style="font-size:0.78125rem; color:#98A2B3; margin-top:2px;">marcus.vance@oakridge.edu • Workload: 22 / 24 Periods Week</div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:14px;">
            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); padding:12px; border-radius:8px; text-align:center;">
              <div style="font-size:1.25rem; font-weight:800; color:#FFF;">84 Faculty</div>
              <div style="font-size:0.7rem; color:#98A2B3; text-transform:uppercase; font-weight:700; margin-top:2px;">Full-time Teachers</div>
            </div>
            <div style="background:rgba(255,255,253,0.03); border:1px solid rgba(255,255,255,0.08); padding:12px; border-radius:8px; text-align:center;">
              <div style="font-size:1.25rem; font-weight:800; color:#38BDF8;">98.2%</div>
              <div style="font-size:0.7rem; color:#98A2B3; text-transform:uppercase; font-weight:700; margin-top:2px;">Faculty Attendance</div>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8125rem; color:#98A2B3;">
            <span>Substitute Pool: <strong style="color:#FFF;">12 Available Today</strong></span>
            <span style="color:#38BDF8; cursor:pointer; font-weight:700;">Open Faculty Directory →</span>
          </div>
        </div>
      `
    },
    adjustments: {
      title: "Student Health, Disciplinary & Behavior Logs",
      desc: "Record positive commendations, behavioral incidents, medical dispensary visits, and counselor notes with role-based privacy.",
      badge: "Student Wellbeing",
      impact: [
        "Private counselor and school nurse health record tracking",
        "Merit and positive behavioral points system for gamified student growth",
        "Role-restricted incident logs accessible only to principals and guardians"
      ],
      visualHtml: `
        <div class="mock-widget">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <div>
              <span style="font-size:0.75rem; color:#98A2B3; text-transform:uppercase; font-weight:700;">Student Wellbeing Log</span>
              <div style="font-size:1.0625rem; font-weight:800; color:#FFF;">Confidential Campus Feed</div>
            </div>
            <span style="background:rgba(37, 99, 235,0.15); border:1px solid rgba(37, 99, 235,0.3); color:#38BDF8; padding:4px 8px; border-radius:6px; font-size:0.75rem; font-weight:700; display:inline-flex; align-items:center; gap:5px;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> HIPAA / FERPA Secured</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px;">
            <div style="background:rgba(255,255,255,0.04); border-left:3px solid #38BDF8; padding:10px 14px; border-radius:0 6px 6px 0;">
              <div style="display:flex; justify-content:space-between; font-size:0.8125rem; margin-bottom:2px;">
                <span style="color:#FFF; font-weight:700;">STEM Fair 1st Prize Award (+50 Merits)</span>
                <span style="color:#38BDF8; font-weight:800;">11:30 AM</span>
              </div>
              <div style="font-size:0.75rem; color:#98A2B3;">Awarded to Maya Patel • Recorded by Science Dept.</div>
            </div>

            <div style="background:rgba(255,255,255,0.04); border-left:3px solid #60A5FA; padding:10px 14px; border-radius:0 6px 6px 0;">
              <div style="display:flex; justify-content:space-between; font-size:0.8125rem; margin-bottom:2px;">
                <span style="color:#FFF; font-weight:700;">Clinic Visit (Mild Headache)</span>
                <span style="color:#98A2B3;">09:45 AM</span>
              </div>
              <div style="font-size:0.75rem; color:#98A2B3;">Logged by Nurse Sarah Miller • Parent notified via portal</div>
            </div>
          </div>
        </div>
      `
    }
  };

  window.renderFeatureTab = function(key) {
    const data = featureContentData[key];
    if (!data) return;

    const titleEl = document.getElementById('featureDetailTitle');
    const descEl = document.getElementById('featureDetailDesc');
    const badgeEl = document.getElementById('featureDetailBadge');
    const impactEl = document.getElementById('featureDetailImpact');
    const contentEl = document.getElementById('featureVisualContent');

    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;
    if (badgeEl) {
      badgeEl.innerHTML = `<span class="badge-dot"></span> ${data.badge}`;
    }

    if (impactEl && data.impact) {
      impactEl.innerHTML = data.impact.map(item => `
        <li><span class="impact-icon">✓</span> <span class="impact-text">${item}</span></li>
      `).join('');
    }

    if (contentEl && data.visualHtml) {
      contentEl.innerHTML = data.visualHtml;
    }

    const tabs = document.querySelectorAll('.feature-tab-btn');
    tabs.forEach(t => {
      if (t.getAttribute('data-feature') === key) {
        t.classList.add('active');
        t.setAttribute('aria-selected', 'true');
      } else {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      }
    });
  };

  if (featureTabs.length > 0) {
    featureTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const key = tab.dataset.feature;
        window.renderFeatureTab(key);
      });
    });

    const activeTab = document.querySelector('.feature-tab-btn.active');
    const initialKey = activeTab ? activeTab.dataset.feature : 'tracking';
    window.renderFeatureTab(initialKey);
  }

  // --- 7. LOGIN FORM AUTHENTICATION DEMO ---
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');
  const forgotPasswordLink = document.getElementById('forgotPasswordLink');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail')?.value.trim();
      const password = document.getElementById('loginPassword')?.value.trim();

      // Accept admin, teacher, school, or demo credentials
      if (
        (email === 'admin@school.edu' || email === 'principal@school.edu' || email === 'teacher@school.edu') && 
        password === 'demo123'
      ) {
        if (loginError) loginError.style.display = 'none';
        window.location.href = 'dashboard.html#overview';
      } else {
        // Allow any valid email format with demo123 for seamless testing
        if (email.includes('@') && password === 'demo123') {
          if (loginError) loginError.style.display = 'none';
          window.location.href = 'dashboard.html#overview';
        } else if (loginError) {
          loginError.textContent = 'Invalid credentials. Please use school email: admin@school.edu and password: demo123';
          loginError.style.display = 'block';
        }
      }
    });
  }

  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Password reset instructions have been simulated. For demo access, use email: admin@school.edu and password: demo123');
    });
  }

  // --- 8. NEWSLETTER FORM SUBMIT ---
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for subscribing to EduPulse School Management Insights!');
      form.reset();
    });
  });

  // --- 9. SCROLL REVEAL & COUNT-UP ANIMATIONS ENGINE ---
  const revealElements = document.querySelectorAll('.reveal, .css-bar-chart');

  const activateReveal = (el) => {
    if (!el) return;
    el.classList.add('active');
    const counters = el.querySelectorAll('[data-counter]');
    counters.forEach(counter => animateCounter(counter));
  };

  revealElements.forEach(el => activateReveal(el));

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activateReveal(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.01,
      rootMargin: '200px 0px 200px 0px'
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });

    window.addEventListener('load', () => {
      revealElements.forEach(el => activateReveal(el));
    });
  } else {
    revealElements.forEach(el => activateReveal(el));
  }

  const standaloneCounters = document.querySelectorAll('[data-counter]');
  if ('IntersectionObserver' in window && standaloneCounters.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    standaloneCounters.forEach(c => counterObserver.observe(c));
  }

  function animateCounter(el) {
    if (el.dataset.animated === 'true') return;
    el.dataset.animated = 'true';

    const targetVal = parseFloat(el.dataset.counter);
    if (isNaN(targetVal)) return;

    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const duration = 1800;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = targetVal * easeProgress;

      let formattedVal = currentVal.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });

      el.textContent = `${prefix}${formattedVal}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${prefix}${targetVal.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        })}${suffix}`;
      }
    }

    requestAnimationFrame(step);
  }

  // --- 10. HERO SCHOOL ATTENDANCE & CAMPUS ANIMATED CANVAS ---
  const canvas = document.getElementById('heroBgCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let particles = [];
    let mouse = { x: -1000, y: -1000 };

    const educationTags = [
      'ATTENDANCE 98%', 'FEES SYNCED', 'TIMETABLE OK', 'GRADE 10-A', 
      'PARENT SMS', 'PERIOD 3', 'RFID CHECK', 'TUITION PAID', 
      '1,248 STUDENTS', 'FACULTY OK', 'SMART CLASS', 'BUS TRACKING'
    ];

    function resizeCanvas() {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = canvas.width = parent.clientWidth || window.innerWidth;
      height = canvas.height = parent.clientHeight || 600;
    }

    class EduNode {
      constructor(init = false) {
        this.reset(init);
      }

      reset(init = false) {
        const isLeft = Math.random() < 0.5;
        if (isLeft) {
          this.x = Math.random() * ((width || 1200) * 0.26);
        } else {
          this.x = ((width || 1200) * 0.74) + (Math.random() * ((width || 1200) * 0.26));
        }

        this.y = init ? Math.random() * (height || 600) : (height || 600) + 20;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = -(0.2 + Math.random() * 0.4);
        this.size = 2.5 + Math.random() * 2.5;
        this.alpha = 0.35 + Math.random() * 0.45;
        this.hasTag = (width >= 768) ? (Math.random() > 0.5) : false;
        this.tag = educationTags[Math.floor(Math.random() * educationTags.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        const centerMin = (width || 1200) * 0.28;
        const centerMax = (width || 1200) * 0.72;
        const centerX = (width || 1200) * 0.5;

        if (this.x > centerMin && this.x < centerMax) {
          if (this.x < centerX) {
            this.vx -= 0.04;
          } else {
            this.vx += 0.04;
          }
        }

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * 1.1;
          this.y -= Math.sin(angle) * 1.1;
        }

        if (this.y < -30 || this.x < -30 || this.x > width + 30) {
          this.reset(false);
        }
      }

      draw() {
        ctx.fillStyle = `rgba(56, 189, 248, ${this.alpha})`;
        ctx.shadowColor = '#38BDF8';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        if (this.hasTag) {
          ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
          ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha * 0.75})`;
          ctx.fillText(this.tag, this.x + 8, this.y + 3);
        }
      }
    }

    function initNetwork() {
      resizeCanvas();
      particles = [];
      const count = Math.min(Math.floor((width || 800) / 45), 28);
      for (let i = 0; i < count; i++) {
        particles.push(new EduNode(true));
      }
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const lineAlpha = (1 - dist / 140) * 0.18;
            ctx.strokeStyle = `rgba(37, 99, 235, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function renderLoop() {
      ctx.clearRect(0, 0, width, height);

      drawConnections();
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(renderLoop);
    }

    window.addEventListener('resize', () => {
      resizeCanvas();
    });

    const heroSectionEl = canvas.closest('.hero-section');
    if (heroSectionEl) {
      heroSectionEl.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      });

      heroSectionEl.addEventListener('mouseleave', () => {
        mouse.x = -1000;
        mouse.y = -1000;
      });
    }

    initNetwork();
    renderLoop();
  }

  // --- 11. PRICING BILLING CYCLE TOGGLE ---
  const billingMonthlyBtn = document.getElementById('billingMonthlyBtn');
  const billingAnnualBtn = document.getElementById('billingAnnualBtn');
  const pricingCards = document.querySelectorAll('.pricing-card');

  if (billingMonthlyBtn && billingAnnualBtn) {
    billingMonthlyBtn.addEventListener('click', () => setBillingCycle('monthly'));
    billingAnnualBtn.addEventListener('click', () => setBillingCycle('annual'));
  }

  function setBillingCycle(type) {
    if (!billingMonthlyBtn || !billingAnnualBtn) return;

    if (type === 'monthly') {
      billingMonthlyBtn.classList.add('active');
      billingAnnualBtn.classList.remove('active');
    } else {
      billingAnnualBtn.classList.add('active');
      billingMonthlyBtn.classList.remove('active');
    }

    pricingCards.forEach(card => {
      const amountEl = card.querySelector('.pricing-amount');
      const periodEl = card.querySelector('.pricing-period');

      if (amountEl && card.dataset.monthly && card.dataset.annual) {
        amountEl.classList.add('price-pop');
        setTimeout(() => amountEl.classList.remove('price-pop'), 280);

        if (type === 'annual') {
          amountEl.textContent = card.dataset.annual;
          if (periodEl) periodEl.textContent = '/ month (billed annually)';
        } else {
          amountEl.textContent = card.dataset.monthly;
          if (periodEl) periodEl.textContent = '/ month';
        }
      }
    });
  }

  // --- 12. PRICING INTERACTIVE SCHOOL ROI & SAVINGS CALCULATOR ---
  const sliderStores = document.getElementById('sliderStores');
  const sliderRevenue = document.getElementById('sliderRevenue');
  const valStores = document.getElementById('valStores');
  const valRevenue = document.getElementById('valRevenue');
  const metricHours = document.getElementById('metricHours');
  const metricLoss = document.getElementById('metricLoss');
  const metricSavings = document.getElementById('metricSavings');

  if (sliderStores && sliderRevenue) {
    const updateROI = () => {
      const branches = parseInt(sliderStores.value, 10) || 1;
      const students = parseInt(sliderRevenue.value, 10) || 1000;

      if (valStores) valStores.textContent = `${branches} ${branches === 1 ? 'Campus' : 'Campuses'}`;
      if (valRevenue) valRevenue.textContent = `${students.toLocaleString()} Students`;

      // School administrative model: 38 hrs per campus + fee collection recovery
      const hoursSaved = branches * 54;
      const uncollectedFeesRecovered = Math.round((students * 18) * (branches * 0.95));
      const annualSavings = Math.round((hoursSaved * 28 * 12) + (uncollectedFeesRecovered * 12));

      if (metricHours) metricHours.textContent = `${hoursSaved} Hours / mo`;
      if (metricLoss) metricLoss.textContent = `$${uncollectedFeesRecovered.toLocaleString()} / mo`;
      if (metricSavings) metricSavings.textContent = `$${annualSavings.toLocaleString()} / Year`;
    };

    sliderStores.addEventListener('input', updateROI);
    sliderRevenue.addEventListener('input', updateROI);
    updateROI();
  }

  // --- 13. FAQ ACCORDION DROPDOWN SYSTEM ---
  const faqItems = document.querySelectorAll('.faq-item');

  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const header = item.querySelector('.faq-header');
      const body = item.querySelector('.faq-body');

      if (header && body) {
        header.addEventListener('click', () => {
          const isOpen = item.classList.contains('active');

          faqItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
              const otherHeader = otherItem.querySelector('.faq-header');
              if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
              const otherBody = otherItem.querySelector('.faq-body');
              if (otherBody) otherBody.style.maxHeight = null;
            }
          });

          if (isOpen) {
            item.classList.remove('active');
            header.setAttribute('aria-expanded', 'false');
            body.style.maxHeight = null;
          } else {
            item.classList.add('active');
            header.setAttribute('aria-expanded', 'true');
            body.style.maxHeight = body.scrollHeight + 'px';
          }
        });
      }
    });
  }

  // --- 14. CONTACT PAGE CAMPUS LOCATION SWITCHER ---
  const mapBtns = document.querySelectorAll('.map-location-btn');
  const googleMapFrame = document.getElementById('googleMapFrame');
  const mapLocationTitle = document.getElementById('mapLocationTitle');
  const mapLocationAddress = document.getElementById('mapLocationAddress');
  const mapLocationPhone = document.getElementById('mapLocationPhone');
  const mapLocationHours = document.getElementById('mapLocationHours');
  const mapDirLink = document.getElementById('mapDirLink');

  const locationData = {
    sf: {
      title: "San Francisco EdTech Campus & Headquarters",
      address: "100 Academy Plaza, Suite 400<br>San Francisco, CA 94105, United States",
      phone: "+1 (800) 555-EDUPULSE",
      hours: "Mon - Fri: 8:00 AM - 6:00 PM PST",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d-122.40139882357672!3d37.79155987198275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085806305a415a7%3A0xa59f714757c9172!2sMarket%20St%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
      dirUrl: "https://maps.google.com/?q=Market+St,+San+Francisco,+CA"
    },
    ny: {
      title: "New York Regional School Relations Office",
      address: "350 Fifth Avenue, Floor 18<br>New York, NY 10118, United States",
      phone: "+1 (212) 555-SCHOLAR",
      hours: "Mon - Fri: 9:00 AM - 6:00 PM EST",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.18394872074!2d-73.98565568459374!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sFifth%20Ave%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
      dirUrl: "https://maps.google.com/?q=Fifth+Ave,+New+York,+NY"
    },
    london: {
      title: "London European Academic Support Office",
      address: "45 Covent Garden, Suite 12<br>London, WC2E 8RF, United Kingdom",
      phone: "+44 (020) 7946 0912",
      hours: "Mon - Fri: 9:00 AM - 5:30 PM GMT",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.053787723702!2d-0.124625484229806!3d51.51221197963625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x887604ccab37652b%3A0x2607707328903c74!2sCovent%20Garden%2C%20London%2C%20UK!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
      dirUrl: "https://maps.google.com/?q=Covent+Garden,+London,+UK"
    }
  };

  if (mapBtns.length > 0) {
    mapBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        mapBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const key = btn.dataset.location;
        const data = locationData[key];

        if (data) {
          if (googleMapFrame) googleMapFrame.src = data.mapUrl;
          if (mapLocationTitle) mapLocationTitle.textContent = data.title;
          if (mapLocationAddress) mapLocationAddress.innerHTML = data.address;
          if (mapLocationPhone) mapLocationPhone.textContent = data.phone;
          if (mapLocationHours) mapLocationHours.textContent = data.hours;
          if (mapDirLink) mapDirLink.href = data.dirUrl;
        }
      });
    });
  }

  // --- 15. BACK TO TOP BUTTON SYSTEM ---
  const currentPath = window.location.pathname.toLowerCase();
  const isExcludedPage = currentPath.endsWith('login.html') ||
                         currentPath.endsWith('signup.html') ||
                         currentPath.endsWith('register.html') ||
                         currentPath.endsWith('dashboard.html');

  if (!isExcludedPage) {
    let backToTopBtn = document.getElementById('backToTopBtn');

    if (!backToTopBtn) {
      backToTopBtn = document.createElement('button');
      backToTopBtn.id = 'backToTopBtn';
      backToTopBtn.className = 'back-to-top';
      backToTopBtn.setAttribute('aria-label', 'Back to top');
      backToTopBtn.setAttribute('title', 'Back to top');
      backToTopBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      `;
      document.body.appendChild(backToTopBtn);
    }

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

/* ==========================================================================
   INTERACTIVE SCHOOL ROI CALCULATOR (Features Page)
   ========================================================================== */
function updateRoiCalc() {
  const revInput = document.getElementById('inputRevenue');
  const skuInput = document.getElementById('inputSKUs');
  const rateInput = document.getElementById('inputRate');

  if (!revInput || !skuInput || !rateInput) return;

  const rev = parseFloat(revInput.value) || 85000;
  const students = parseFloat(skuInput.value) || 1200;
  const overdueRate = parseFloat(rateInput.value) || 5.0;

  // Update slider badge labels
  const valRev = document.getElementById('valRevenue');
  const valSKUs = document.getElementById('valSKUs');
  const valRate = document.getElementById('valRate');

  if (valRev) valRev.textContent = '$' + rev.toLocaleString();
  if (valSKUs) valSKUs.textContent = students.toLocaleString() + ' Students';
  if (valRate) valRate.textContent = overdueRate.toFixed(1) + '%';

  // Calculations
  // Uncollected fees recovered per year via auto-SMS and WhatsApp chasers (assume 78% recovered of total overdue pool)
  const annualOverduePool = rev * 10 * (overdueRate / 100);
  const recoveredSavings = Math.round(annualOverduePool * 0.78);

  // Staff administrative hours reclaimed per month (approx 3.5 hrs per 100 students)
  const monthlyStaffHours = Math.max(12, Math.round((students / 100) * 3.5));

  // Software ROI multiple: Recovered savings vs EduPulse subscription (approx $99/mo or $1,188/yr)
  const annualSubCost = students > 1500 ? 199 * 12 : (students > 500 ? 99 * 12 : 49 * 12);
  const roiMultiplier = Math.max(2.5, (recoveredSavings / annualSubCost)).toFixed(1);

  // Engagement boost (benchmark calculation)
  const engagementBoost = Math.min(65.0, (38.0 + (students / 350))).toFixed(1);

  // Update DOM Output Cards
  const outSavings = document.getElementById('outputSavings');
  const outHours = document.getElementById('outputHours');
  const outROI = document.getElementById('outputROI');
  const outEngagement = document.getElementById('outputEngagement');

  if (outSavings) outSavings.textContent = '$' + recoveredSavings.toLocaleString();
  if (outHours) outHours.textContent = monthlyStaffHours + ' hrs';
  if (outROI) outROI.textContent = roiMultiplier + 'x';
  if (outEngagement) outEngagement.textContent = '+' + engagementBoost + '%';
}

// Auto-run if calculator exists on page
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateRoiCalc);
} else {
  updateRoiCalc();
}

/* ==========================================================================
   CAMPUS GALLERY FILTER & LIGHTBOX CONTROLLER
   ========================================================================== */
function initCampusGallery() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const cards = document.querySelectorAll('.gallery-card');
  const modal = document.getElementById('galleryModal');
  const modalImg = document.getElementById('galleryModalImg');
  const modalTitle = document.getElementById('galleryModalTitle');
  const modalBadge = document.getElementById('galleryModalBadge');
  const modalDesc = document.getElementById('galleryModalDesc');
  const modalClose = document.getElementById('galleryModalClose');

  if (!cards.length) return;

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';

      cards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal Open on Card Click
  cards.forEach(card => {
    card.addEventListener('click', () => {
      if (!modal) return;
      const img = card.querySelector('.gallery-img');
      const title = card.querySelector('.gallery-card-title');
      const badge = card.querySelector('.gallery-card-badge');
      const desc = card.querySelector('.gallery-card-desc');

      if (modalImg && img) modalImg.src = img.src.replace('w=800', 'w=1600');
      if (modalTitle && title) modalTitle.textContent = title.textContent;
      if (modalBadge && badge) modalBadge.textContent = badge.textContent;
      if (modalDesc && desc) modalDesc.textContent = desc.textContent;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Modal Close
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCampusGallery);
} else {
  initCampusGallery();
}

/* ==========================================================================
   INTERACTIVE 3D PERSPECTIVE CARD TILT ON HOVER
   ========================================================================== */
function initInteractiveTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const tiltElements = document.querySelectorAll(
    '.location-card, .testimonial-card, .gallery-card, .showcase-card-frame, .roi-metric-card, .final-cta-box'
  );

  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4.5;
      const rotateY = ((x - centerX) / centerX) * 4.5;

      el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale3d(1.015, 1.015, 1.015)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    el.addEventListener('mouseenter', () => {
      el.style.transition = 'transform 0.15s ease-out';
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initInteractiveTilt);
} else {
  initInteractiveTilt();
}

/* ==========================================================================
   EXCLUSIVE CTA SPOTLIGHT & RIPPLE CONTROLLER (ROCK-SOLID, NO SHAKE)
   ========================================================================== */
function initCtaSpotlight() {
  const ctaElements = document.querySelectorAll('.btn-primary, .btn-navy-secondary, .final-cta-box');

  ctaElements.forEach(cta => {
    // Only track position for ambient background lighting on the large final CTA card
    if (cta.classList.contains('final-cta-box')) {
      cta.addEventListener('mousemove', (e) => {
        const rect = cta.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cta.style.setProperty('--x', `${x}px`);
        cta.style.setProperty('--y', `${y}px`);
      });

      cta.addEventListener('mouseleave', () => {
        cta.style.removeProperty('--x');
        cta.style.removeProperty('--y');
      });
    }

    // Ripple click burst on button click (smooth expansion, no button movement)
    cta.addEventListener('click', (e) => {
      const rect = cta.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.classList.add('cta-ripple');
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

      cta.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCtaSpotlight);
} else {
  initCtaSpotlight();
}
