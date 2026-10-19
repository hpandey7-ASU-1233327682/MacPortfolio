import { useRef } from 'react';
import { useDesktop, selectActiveId, APPS } from '../store/useDesktop';
import AppIcon from './AppIcon';

const DOCK_APPS = ['finder', 'notes', 'terminal', 'photos', 'mail', 'resume'];
const REACH = 58; // px: how far the magnify effect spreads
const BOOST = 0.55; // extra scale at the hovered icon

export default function Dock() {
  const windows = useDesktop((s) => s.windows);
  const activeId = useDesktop((s) => selectActiveId(s));
  const open = useDesktop((s) => s.open);
  const focus = useDesktop((s) => s.focus);
  const minimize = useDesktop((s) => s.minimize);

  const dockRef = useRef(null);
  const items = useRef([]);

  const magnify = (e) => {
    const dock = dockRef.current;
    if (!dock) return;
    const x = e.clientX - dock.getBoundingClientRect().left;
    const els = items.current.filter(Boolean);
    const scales = els.map((el) => {
      const d = x - (el.offsetLeft + el.offsetWidth / 2);
      return 1 + BOOST * Math.exp(-(d * d) / (2 * REACH * REACH));
    });
    const extra = scales.map((s, i) => (s - 1) * els[i].offsetWidth);
    const total = extra.reduce((a, b) => a + b, 0);
    let acc = 0;
    els.forEach((el, i) => {
      const shift = acc + extra[i] / 2 - total / 2; // spread neighbours, keep dock centred
      acc += extra[i];
      el.firstChild.style.transform = `translateX(${shift}px) scale(${scales[i]})`;
    });
  };

  const reset = () => {
    items.current.forEach((el) => {
      if (el) el.firstChild.style.transform = '';
    });
  };

  const click = (id) => {
    const w = windows[id];
    if (!w.open || w.minimized) open(id);
    else if (activeId === id) minimize(id);
    else focus(id);
  };

  return (
    <footer id="dock">
      <div className="dock-bar" ref={dockRef} onMouseMove={magnify} onMouseLeave={reset}>
        {DOCK_APPS.map((id, i) => (
          <div className="dock-item" key={id} ref={(el) => (items.current[i] = el)}>
            <button className="dock-icon" onClick={() => click(id)} aria-label={APPS[id].label}>
              <AppIcon id={id} />
            </button>
            <span className="tip">{APPS[id].label}</span>
            {windows[id].open && <span className="run-dot" />}
          </div>
        ))}
      </div>
    </footer>
  );
}
