import { useEffect } from 'react';
import { useDesktop } from './store/useDesktop';
import MenuBar from './components/MenuBar';
import Desktop from './components/Desktop';
import Dock from './components/Dock';
import FinderApp from './apps/FinderApp';
import NotesApp from './apps/NotesApp';
import TerminalApp from './apps/TerminalApp';
import PhotosApp from './apps/PhotosApp';
import MailApp from './apps/MailApp';
import ResumeApp from './apps/ResumeApp';
import SettingsApp from './apps/SettingsApp';

export default function App() {
  const wallpaper = useDesktop((s) => s.wallpaper);
  const theme = useDesktop((s) => s.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.wallpaper = wallpaper;
  }, [theme, wallpaper]);

  return (
    <>
      <MenuBar />
      <Desktop />
      <FinderApp />
      <NotesApp />
      <TerminalApp />
      <PhotosApp />
      <MailApp />
      <ResumeApp />
      <SettingsApp />
      <Dock />
    </>
  );
}
