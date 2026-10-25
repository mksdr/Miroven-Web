import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const source = readFileSync(new URL('../public/theme-init.js', import.meta.url), 'utf8');
const key = 'miroven-website-theme';

// The script runs in <head>, before the control exists. Exercise that lifecycle
// and unavailable storage without a browser or a second DOM implementation.
function setup({ stored = null, dark = false, storageFails = false } = {}) {
  const root = { dataset: {} };
  const label = { hidden: true };
  const documentListeners = {};
  const windowListeners = {};
  const controlListeners = {};
  const colors = [{}, {}];
  let ready = false;
  let mediaListener;
  const control = { value: '', closest: () => label, addEventListener: (name, fn) => { controlListeners[name] = fn; } };
  const media = { matches: dark, addEventListener: (name, fn) => { assert.equal(name, 'change'); mediaListener = fn; } };
  const document = {
    documentElement: root, readyState: 'loading',
    querySelectorAll: () => colors.map(meta => ({ setAttribute: (name, value) => { meta[name] = value; } })),
    getElementById: id => { assert.equal(id, 'site-theme'); return ready ? control : null; },
    addEventListener: (name, fn) => { documentListeners[name] = fn; },
  };
  const window = {
    matchMedia: query => { assert.equal(query, '(prefers-color-scheme: dark)'); return media; },
    addEventListener: (name, fn) => { windowListeners[name] = fn; },
    get localStorage() {
      if (storageFails) throw new Error('Storage unavailable');
      return {
        getItem: name => { assert.equal(name, key); return stored; },
        setItem: (name, value) => { assert.equal(name, key); stored = value; },
      };
    },
  };
  runInNewContext(source, { document, window });
  return {
    root, label, control, colors,
    initialize() { ready = true; documentListeners.DOMContentLoaded(); },
    choose(value) { control.value = value; controlListeners.change(); },
    system(value) { media.matches = value; mediaListener(); },
    storage(value, eventKey = key) { stored = value; windowListeners.storage({ key: eventKey }); },
    restore(value) { stored = value; windowListeners.pageshow({ persisted: true }); },
    stored: () => stored,
  };
}

test('system theme applies before the control mounts and follows OS changes', () => {
  const s = setup({ dark: true });
  assert.equal(s.root.dataset.theme, 'dark');
  assert(s.colors.every(meta => meta.content === '#000000'));
  s.initialize();
  assert.equal(s.label.hidden, false);
  assert.equal(s.control.value, 'system');
  s.system(false);
  assert.equal(s.root.dataset.theme, 'light');
  assert(s.colors.every(meta => meta.content === '#ffffff'));
});

test('saved explicit preference overrides the OS, including later OS changes', () => {
  const s = setup({ stored: 'light', dark: true });
  s.initialize();
  assert.equal(s.root.dataset.theme, 'light');
  assert.equal(s.control.value, 'light');
  s.choose('dark');
  assert.equal(s.stored(), 'dark');
  s.system(false);
  assert.equal(s.root.dataset.theme, 'dark');
  s.choose('system');
  assert.equal(s.root.dataset.theme, 'light');
  s.system(true);
  assert.equal(s.root.dataset.theme, 'dark');
});

test('unavailable storage still allows theme selection and system following', () => {
  const s = setup({ storageFails: true });
  s.initialize();
  s.choose('dark');
  assert.equal(s.root.dataset.theme, 'dark');
  s.choose('system');
  s.system(true);
  assert.equal(s.root.dataset.theme, 'dark');
  assert.equal(s.control.value, 'system');
});

test('invalid stored values safely fall back to the system theme', () => {
  const s = setup({ stored: 'invalid', dark: true });
  s.initialize();
  assert.equal(s.root.dataset.theme, 'dark');
  assert.equal(s.control.value, 'system');
});

test('website preference changes and clearing storage synchronize across tabs', () => {
  const s = setup();
  s.initialize();
  s.storage('dark');
  assert.equal(s.root.dataset.theme, 'dark');
  assert.equal(s.control.value, 'dark');
  s.storage('light', 'unrelated-preference');
  assert.equal(s.root.dataset.theme, 'dark');
  s.storage(null, null);
  assert.equal(s.root.dataset.theme, 'light');
  assert.equal(s.control.value, 'system');
});

test('back/forward cache restoration applies preferences changed on another page', () => {
  const s = setup({ stored: 'light' });
  s.initialize();
  s.restore('dark');
  assert.equal(s.root.dataset.theme, 'dark');
  assert.equal(s.control.value, 'dark');
  assert(s.colors.every(meta => meta.content === '#000000'));
});
