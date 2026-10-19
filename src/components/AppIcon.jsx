import { Folder, NotebookPen, SquareTerminal, Image, Mail, FileText, Settings } from 'lucide-react';

const ICONS = {
  finder: { Icon: Folder, bg: 'linear-gradient(160deg,#5ac8fa,#0a84ff)' },
  notes: { Icon: NotebookPen, bg: 'linear-gradient(160deg,#ffe066,#ffb400)' },
  terminal: { Icon: SquareTerminal, bg: 'linear-gradient(160deg,#3d3d44,#0e0e10)' },
  photos: { Icon: Image, bg: 'conic-gradient(from 200deg,#ff6b6b,#ffd93d,#6bcb77,#4d96ff,#c77dff,#ff6b6b)' },
  mail: { Icon: Mail, bg: 'linear-gradient(160deg,#6ec6ff,#1e6bff)' },
  resume: { Icon: FileText, bg: 'linear-gradient(160deg,#ff9f6b,#ff453a)' },
  settings: { Icon: Settings, bg: 'linear-gradient(160deg,#c7c7cc,#8e8e93)' },
};

export default function AppIcon({ id, size }) {
  const { Icon, bg } = ICONS[id];
  const style = { background: bg };
  if (size) {
    style.width = size;
    style.height = size;
  }
  return (
    <span className="app-icon" style={style}>
      <Icon className="app-glyph" strokeWidth={1.8} color="#fff" />
    </span>
  );
}
