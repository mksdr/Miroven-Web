// Website appearance only. App settings and vault storage are never accessed.
(() => {
  const key = 'miroven-website-theme';
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const valid = value => ['system', 'light', 'dark'].includes(value) ? value : 'system';
  let preference = 'system';
  try { preference = valid(window.localStorage.getItem(key)); } catch { /* Storage can be unavailable. */ }

  function apply() {
    const theme = preference === 'system' ? (media.matches ? 'dark' : 'light') : preference;
    document.documentElement.dataset.theme = theme;
    document.querySelectorAll('meta[name="theme-color"]').forEach(meta => meta.setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff'));
    const select = document.getElementById('site-theme');
    if (select) select.value = preference;
  }
  apply();
  media.addEventListener('change', () => { if (preference === 'system') apply(); });
  window.addEventListener('storage', event => {
    if (event.key === key || event.key === null) {
      try { preference = valid(window.localStorage.getItem(key)); apply(); } catch { /* Keep the current appearance. */ }
    }
  });
  window.addEventListener('pageshow', event => {
    if (event.persisted) {
      try { preference = valid(window.localStorage.getItem(key)); } catch { /* Keep the in-memory selection. */ }
      apply();
    }
  });
  function initializeControl() {
    const select = document.getElementById('site-theme');
    if (!select) return;
    select.value = preference;
    select.closest('label').hidden = false;
    select.addEventListener('change', () => {
      preference = valid(select.value);
      try { window.localStorage.setItem(key, preference); } catch { /* In-memory selection still works. */ }
      apply();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeControl, { once: true });
  else initializeControl();
})();
