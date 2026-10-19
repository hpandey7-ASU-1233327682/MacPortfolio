import { useEffect, useState } from 'react';
import { Wifi, BatteryFull, Search, Sun, Moon } from 'lucide-react';
import { useDesktop, selectActiveId, APPS } from '../store/useDesktop';
import { useClock } from '../hooks/useClock';
import { profile } from '../data/profile';

export default function MenuBar() {
  const activeId = useDesktop((s) => selectActiveId(s));
  const open = useDesktop((s) => s.open);
  const closeAll = useDesktop((s) => s.closeAll);
  const theme = useDesktop((s) => s.theme);
  const toggleTheme = useDesktop((s) => s.toggleTheme);
  const [menu, setMenu] = useState(false);
  const clock = useClock();

  useEffect(() => {
    if (!menu) return;
    const off = () => setMenu(false);
    window.addEventListener('pointerdown', off);
    return () => window.removeEventListener('pointerdown', off);
  }, [menu]);

  const run = (fn) => () => {
    setMenu(false);
    fn();
  };

  return (
    <nav id="menubar">
      <div className="mb-left">
        <button
          className="mb-logo"
          aria-label="Portfolio menu"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => setMenu((m) => !m)}
        >
          {profile.firstName[0]}
        </button>
        {menu && (
          <div className="menu-pop" onPointerDown={(e) => e.stopPropagation()}>
            <button onClick={run(() => open('notes'))}>About this portfolio</button>
            <button onClick={run(() => open('settings'))}>Settings…</button>
            <button onClick={run(() => open('resume'))}>Resume</button>
            <hr />
            <button onClick={run(closeAll)}>Close all windows</button>
          </div>
        )}
        <strong className="mb-app">{activeId ? APPS[activeId].label : profile.name}</strong>
        <ul className="mb-links">
          <li onClick={() => open('finder', { folder: 'projects' })}>Projects</li>
          <li onClick={() => open('notes')}>About</li>
          <li onClick={() => open('mail')}>Contact</li>
          <li onClick={() => open('resume')}>Resume</li>
        </ul>
      </div>
      <div className="mb-right">
        <BatteryFull size={17} aria-hidden />
        <Wifi size={16} aria-hidden />
        <Search size={15} aria-hidden />
        <button className="mb-btn" onClick={toggleTheme} aria-label="Toggle light / dark mode">
          {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
        </button>
        <time>{clock}</time>
      </div>
    </nav>
  );
}
