import { useSyncExternalStore } from 'react';

// "Compact" = phone-sized or touch-first: windows go full screen, no dragging.
const QUERY = '(max-width: 820px), (pointer: coarse)';

const subscribe = (cb) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};

export function useCompact() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
