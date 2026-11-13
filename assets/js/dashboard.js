/* ==========================================================================
   EDUPULSE - SCHOOL ADMIN DASHBOARD JAVASCRIPT
   Single Page Application Controller for dashboard.html
   Managing Attendance, Fees, Timetables, and Parent Communication
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. THEME & RTL SYNC WITH LOCALSTORAGE ---
  const savedTheme = localStorage.getItem('edupulse_theme') || 'light';
  const savedRTL = localStorage.getItem('edupulse_rtl') || 'ltr';

  document.documentElement.setAttribute('data-theme', savedTheme);
  document.documentElement.setAttribute('dir', savedRTL);

  const dashThemeBtn = document.getElementById('dashThemeBtn');
  const dashRTLBtn = document.getElementById('dashRTLBtn');

  const SVG_MOON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  const SVG_SUN = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  const SVG_RTL = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>';

  function updateToggleButtons() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    if (dashThemeBtn) dashThemeBtn.innerHTML = currentTheme === 'dark' ? SVG_SUN : SVG_MOON;
    if (dashRTLBtn) dashRTLBtn.innerHTML = SVG_RTL;
  }
  updateToggleButtons();

  if (dashThemeBtn) {
    dashThemeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('edupulse_theme', next);
      updateToggleButtons();
    });
  }

  if (dashRTLBtn) {
    dashRTLBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('dir') || 'ltr';
      const next = current === 'rtl' ? 'ltr' : 'rtl';
      document.documentElement.setAttribute('dir', next);
      localStorage.setItem('edupulse_rtl', next);
      updateToggleButtons();
    });
  }

  // --- 2. SINGLE PAGE DASHBOARD HASH ROUTER ---
  const viewPanels = document.querySelectorAll('.view-panel');
  const navBtns = document.querySelectorAll('.js-dash-nav');
  const pageTitle = document.getElementById('dashPageTitle');

  const viewTitles = {
    overview: "Overview",
    inventory: "Daily Attendance & Roll Call",
    "purchase-orders": "Fees & Tuition Invoicing",
    alerts: "Timetables & Substitution",
    "sales-reports": "Parent Communication & SMS",
    "inventory-reports": "Academic Gradebooks & Reports",
    locations: "Campus Classrooms & Facilities",
    suppliers: "Teachers & Faculty Directory",
    billing: "School Cloud Subscription",
    settings: "Academic Year & School Settings",
    help: "Help & School Support"
  };

  function switchDashboardView(hashName) {
    const cleanHash = (hashName || 'overview').replace('#', '');
    const targetHash = viewTitles[cleanHash] ? cleanHash : 'overview';

    // Hide all views & remove active class
    viewPanels.forEach(panel => panel.classList.remove('active'));
    navBtns.forEach(btn => btn.classList.remove('active'));

    // Show target view
    const targetPanel = document.getElementById(`view-${targetHash}`);
    if (targetPanel) targetPanel.classList.add('active');

    // Highlight active nav item
    const activeNavBtn = document.querySelector(`.js-dash-nav[data-target="${targetHash}"]`);
    if (activeNavBtn) activeNavBtn.classList.add('active');

    // Update Topbar Title
    if (pageTitle) pageTitle.textContent = viewTitles[targetHash];

    // Close mobile sidebar if open
    const sidebar = document.getElementById('dashSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
  }

  // Handle click on sidebar menu items
  navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = btn.dataset.target;
      window.location.hash = `#${targetView}`;
      switchDashboardView(targetView);
    });
  });

  // Handle hash changes or page initial load
  window.addEventListener('hashchange', () => {
    switchDashboardView(window.location.hash);
  });

  // Initial render on page refresh
  switchDashboardView(window.location.hash);

  // --- 3. MOBILE SIDEBAR DRAWER TOGGLE ---
  const dashSidebar = document.getElementById('dashSidebar');
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  if (sidebarToggleBtn && dashSidebar) {
    sidebarToggleBtn.addEventListener('click', () => {
      const isActive = dashSidebar.classList.toggle('active');
      if (sidebarOverlay) {
        if (isActive) sidebarOverlay.classList.add('active');
        else sidebarOverlay.classList.remove('active');
      }
    });
  }

  if (sidebarOverlay && dashSidebar) {
    sidebarOverlay.addEventListener('click', () => {
      dashSidebar.classList.remove('active');
      sidebarOverlay.classList.remove('active');
    });
  }

  // --- 4. TOPBAR SEARCH & DROPDOWN ---
  const topbarSearchInput = document.getElementById('topbarSearchInput');
  const searchResultsDropdown = document.getElementById('searchResultsDropdown');

  const searchableData = [
    { title: "Grade 10-A Attendance Register", category: "Attendance", hash: "inventory" },
    { title: "Grade 9-B Roll Call Sheet", category: "Attendance", hash: "inventory" },
    { title: "Invoice #SCH-9042 - Sophia Zhang", category: "Fee Invoicing", hash: "purchase-orders" },
    { title: "Term 2 Tuition Collection", category: "Fee Invoicing", hash: "purchase-orders" },
    { title: "Grade 10-A Master Timetable", category: "Timetable", hash: "alerts" },
    { title: "Physics Lab Period 3 Schedule", category: "Timetable", hash: "alerts" },
    { title: "Parent-Teacher Conference Notice", category: "Parent Communication", hash: "sales-reports" },
    { title: "Dr. Marcus Vance (Head of Math)", category: "Faculty", hash: "suppliers" },
    { title: "North Campus STEM Lab 204", category: "Classrooms", hash: "locations" }
  ];

  if (topbarSearchInput && searchResultsDropdown) {
    topbarSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (!query) {
        searchResultsDropdown.classList.remove('active');
        searchResultsDropdown.innerHTML = '';
        return;
      }

      const matches = searchableData.filter(item => 
        item.title.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)
      );

      if (matches.length > 0) {
        searchResultsDropdown.innerHTML = matches.map(m => `
          <div class="search-item-result" data-hash="${m.hash}">
            <strong>${m.title}</strong>
            <span style="font-size: 0.75rem; color: var(--dash-text-muted); display: block;">Category: ${m.category}</span>
          </div>
        `).join('');
        searchResultsDropdown.classList.add('active');
      } else {
        searchResultsDropdown.innerHTML = `<div class="search-item-result" style="cursor: default;">No matching school records found.</div>`;
        searchResultsDropdown.classList.add('active');
      }
    });

    searchResultsDropdown.addEventListener('click', (e) => {
      const item = e.target.closest('.search-item-result');
      if (item && item.dataset.hash) {
        window.location.hash = `#${item.dataset.hash}`;
        switchDashboardView(item.dataset.hash);
        searchResultsDropdown.classList.remove('active');
        topbarSearchInput.value = '';
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.topbar-search-wrapper')) {
        searchResultsDropdown.classList.remove('active');
      }
    });
  }

  // --- 5. NOTIFICATION DRAWER TOGGLE ---
  const notifBtn = document.getElementById('notifBtn');
  const notificationDrawer = document.getElementById('notificationDrawer');
  const closeNotifBtn = document.getElementById('closeNotifBtn');
  const notifBadge = document.querySelector('.notification-badge');
  const markReadBtn = document.getElementById('markReadBtn');

  if (notifBtn && notificationDrawer) {
    notifBtn.addEventListener('click', () => {
      notificationDrawer.classList.add('active');
    });

    if (closeNotifBtn) {
      closeNotifBtn.addEventListener('click', () => {
        notificationDrawer.classList.remove('active');
      });
    }

    if (markReadBtn && notifBadge) {
      markReadBtn.addEventListener('click', () => {
        notifBadge.style.display = 'none';
        showToast("All school notifications marked as read.");
      });
    }
  }

  // --- 6. TOAST NOTIFICATION UTILITY ---
  const toastContainer = document.getElementById('toastNotification');
  const toastText = document.getElementById('toastText');

  function showToast(message) {
    if (toastContainer && toastText) {
      toastText.textContent = message;
      toastContainer.classList.add('active');
      setTimeout(() => {
        toastContainer.classList.remove('active');
      }, 3500);
    }
  }

  // Trigger toasts on specific dashboard actions
  document.body.addEventListener('click', (e) => {
    if (e.target.closest('.js-create-po-btn')) {
      showToast("Fee invoice generated and dispatched to parents successfully!");
    }
    if (e.target.closest('.js-save-settings-btn')) {
      showToast("School academic settings saved successfully!");
    }
  });

  // --- 7. ATTENDANCE / RECORD ADJUSTMENT MODAL INTERACTION ---
  const adjustStockModal = document.getElementById('adjustStockModal');
  const closeStockModalBtn = document.getElementById('closeStockModalBtn');
  const adjustStockForm = document.getElementById('adjustStockForm');

  document.body.addEventListener('click', (e) => {
    if (e.target.closest('.js-open-adjust-modal')) {
      const row = e.target.closest('tr');
      const prodName = row ? row.cells[0]?.textContent : "Selected Student";
      const itemTitleEl = document.getElementById('modalItemTitle');
      if (itemTitleEl) itemTitleEl.textContent = prodName;

      if (adjustStockModal) adjustStockModal.classList.add('active');
    }
  });

  if (closeStockModalBtn && adjustStockModal) {
    closeStockModalBtn.addEventListener('click', () => {
      adjustStockModal.classList.remove('active');
    });
  }

  if (adjustStockForm) {
    adjustStockForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (adjustStockModal) adjustStockModal.classList.remove('active');
      showToast("Student attendance & roll call updated successfully.");
    });
  }

  // --- 8. FEE INVOICE STATUS FILTER TABS ---
  const poFilterBtns = document.querySelectorAll('.js-po-filter');
  const poRows = document.querySelectorAll('.js-po-row');

  poFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      poFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.status;
      poRows.forEach(row => {
        if (filter === 'all' || row.dataset.status === filter) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  // --- 9. HELP FAQ ACCORDION TOGGLE ---
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      if (item) item.classList.toggle('active');
    });
  });
});
