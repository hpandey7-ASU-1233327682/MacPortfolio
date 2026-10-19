import Window from '../components/Window';
import { useDesktop, WALLPAPERS } from '../store/useDesktop';

export default function SettingsApp() {
  const wallpaper = useDesktop((s) => s.wallpaper);
  const setWallpaper = useDesktop((s) => s.setWallpaper);
  const theme = useDesktop((s) => s.theme);
  const toggleTheme = useDesktop((s) => s.toggleTheme);

  return (
    <Window id="settings" width={560} height={420}>
      <div className="settings">
        <h3>Wallpaper</h3>
        <div className="wp-grid">
          {WALLPAPERS.map((w) => (
            <button
              key={w.id}
              className={`wp wp-${w.id} ${wallpaper === w.id ? 'on' : ''}`}
              onClick={() => setWallpaper(w.id)}
              aria-label={`${w.label} wallpaper`}
            >
              <span>{w.label}</span>
            </button>
          ))}
        </div>
        <h3>Appearance</h3>
        <div className="seg">
          {['light', 'dark'].map((t) => (
            <button key={t} className={theme === t ? 'on' : ''} onClick={() => theme !== t && toggleTheme()}>
              {t[0].toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </Window>
  );
}
