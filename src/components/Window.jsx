import { useRef, useState } from 'react';
import { useDesktop, selectActiveId, APPS } from '../store/useDesktop';
import { useCompact } from '../hooks/useCompact';

const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
const ORDER = ['finder', 'notes', 'terminal', 'photos', 'mail', 'resume', 'settings'];

export default function Window({ id, width = 760, height = 500, children }) {
  const w = useDesktop((s) => s.windows[id]);
  const active = useDesktop((s) => selectActiveId(s) === id);
  const focus = useDesktop((s) => s.focus);
  const close = useDesktop((s) => s.close);
  const minimize = useDesktop((s) => s.minimize);
  const toggleMax = useDesktop((s) => s.toggleMax);
  const compact = useCompact();

  // Remembered between open/close because the component stays mounted.
  const [pos, setPos] = useState(() => {
    const i = Math.max(0, ORDER.indexOf(id));
    return {
      x: Math.max(12, (window.innerWidth - width) / 2 + (i - 2) * 34),
      y: clamp(52 + i * 24, 40, 190),
    };
  });
  const drag = useRef(null);

  if (!w.open) return null;

  const onDown = (e) => {
    if (compact || w.maximized || e.button !== 0 || e.target.closest('button')) return;
    drag.current = { sx: e.clientX, sy: e.clientY, x: pos.x, y: pos.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e) => {
    const d = drag.current;
    if (!d) return;
    setPos({
      x: clamp(d.x + e.clientX - d.sx, 90 - width, window.innerWidth - 90),
      y: clamp(d.y + e.clientY - d.sy, 28, window.innerHeight - 64),
    });
  };
  const onUp = () => {
    drag.current = null;
  };

  const cls = ['win', active && 'active', w.maximized && 'max', w.minimized && 'minimized']
    .filter(Boolean)
    .join(' ');

  return (
    <section
      className={cls}
      style={{ left: pos.x, top: pos.y, width, height, zIndex: w.z }}
      onPointerDownCapture={() => focus(id)}
      aria-label={APPS[id].label}
    >
      <header
        className="titlebar"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onDoubleClick={() => !compact && toggleMax(id)}
      >
        <div className="lights">
          <button className="light close" onClick={() => close(id)} aria-label="Close" />
          <button className="light min" onClick={() => minimize(id)} aria-label="Minimize" />
          <button className="light max" onClick={() => toggleMax(id)} aria-label="Zoom" />
        </div>
        <span className="win-title">{APPS[id].label}</span>
      </header>
      <div className="win-body">{children}</div>
    </section>
  );
}
