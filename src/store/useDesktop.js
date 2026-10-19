import { create } from 'zustand';

export const APP_IDS = ['finder', 'notes', 'terminal', 'photos', 'mail', 'resume', 'settings'];

export const APPS = {
  finder: { label: 'Projects' },
  notes: { label: 'About Me' },
  terminal: { label: 'Skills' },
  photos: { label: 'Gallery' },
  mail: { label: 'Contact' },
  resume: { label: 'Resume' },
  settings: { label: 'Settings' },
};

export const WALLPAPERS = [
  { id: 'aurora', label: 'Aurora' },
  { id: 'dusk', label: 'Dusk' },
  { id: 'sage', label: 'Sage' },
  { id: 'graphite', label: 'Graphite' },
];

const read = (key, fallback) => {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};
const write = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable: preference just won't persist */
  }
};

const blank = () => ({ open: false, minimized: false, maximized: false, z: 0, payload: null });

export const useDesktop = create((set, get) => ({
  windows: Object.fromEntries(APP_IDS.map((id) => [id, blank()])),
  top: 10,
  wallpaper: read('hp-wallpaper', 'aurora'),
  theme: read('hp-theme', 'light'),

  open: (id, payload) =>
    set((s) => {
      const z = s.top + 1;
      const w = s.windows[id];
      return {
        top: z,
        windows: {
          ...s.windows,
          [id]: { ...w, open: true, minimized: false, z, payload: payload === undefined ? w.payload : payload },
        },
      };
    }),

  focus: (id) =>
    set((s) => {
      const z = s.top + 1;
      return { top: z, windows: { ...s.windows, [id]: { ...s.windows[id], z } } };
    }),

  close: (id) => set((s) => ({ windows: { ...s.windows, [id]: blank() } })),

  minimize: (id) => set((s) => ({ windows: { ...s.windows, [id]: { ...s.windows[id], minimized: true } } })),

  toggleMax: (id) =>
    set((s) => ({ windows: { ...s.windows, [id]: { ...s.windows[id], maximized: !s.windows[id].maximized } } })),

  closeAll: () => set({ windows: Object.fromEntries(APP_IDS.map((id) => [id, blank()])) }),

  setWallpaper: (wallpaper) => {
    write('hp-wallpaper', wallpaper);
    set({ wallpaper });
  },

  toggleTheme: () => {
    const theme = get().theme === 'light' ? 'dark' : 'light';
    write('hp-theme', theme);
    set({ theme });
  },
}));

// id of the frontmost visible window (or null)
export const selectActiveId = (s) => {
  let best = null;
  let z = -1;
  for (const [id, w] of Object.entries(s.windows)) {
    if (w.open && !w.minimized && w.z > z) {
      best = id;
      z = w.z;
    }
  }
  return best;
};
