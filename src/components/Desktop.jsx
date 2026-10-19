import { useRef, useState } from 'react';
import { Code, Trophy, Briefcase } from 'lucide-react';
import { useDesktop } from '../store/useDesktop';
import { useCompact } from '../hooks/useCompact';
import { profile } from '../data/profile';
import HoverText from './HoverText';
import PhotoFlip from './PhotoFlip';

const FOLDERS = [
  { id: 'projects', label: 'Projects', Icon: Code },
  { id: 'hackathons', label: 'Hackathons', Icon: Trophy },
  { id: 'experience', label: 'Experience', Icon: Briefcase },
];

function DesktopFolder({ folder, index }) {
  const open = useDesktop((s) => s.open);
  const compact = useCompact();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [selected, setSelected] = useState(false);
  const drag = useRef(null);
  const { Icon } = folder;

  const go = () => open('finder', { folder: folder.id });

  return (
    <button
      className={`desk-folder ${selected ? 'selected' : ''}`}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)`, '--i': index }}
      onPointerDown={(e) => {
        if (compact) return;
        setSelected(true);
        drag.current = { sx: e.clientX, sy: e.clientY, x: offset.x, y: offset.y };
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        const d = drag.current;
        if (d) setOffset({ x: d.x + e.clientX - d.sx, y: d.y + e.clientY - d.sy });
      }}
      onPointerUp={() => (drag.current = null)}
      onBlur={() => setSelected(false)}
      onClick={compact ? go : undefined}
      onDoubleClick={go}
    >
      <span className="folder-tile">
        <Icon size={30} strokeWidth={1.7} />
      </span>
      <span className="folder-label">{folder.label}</span>
    </button>
  );
}

export default function Desktop() {
  return (
    <main id="desktop">
      <div className="desk-photo">
        <PhotoFlip variant="card" />
        <p className="desk-photo-hint">hover to meet little me</p>
      </div>
      <section className="welcome">
        <p className="welcome-sub">
          <HoverText text={`Hey, I'm ${profile.firstName}. Welcome to my`} min={150} max={500} base={250} />
        </p>
        <h1 className="welcome-title">
          <HoverText text="portfolio" min={300} max={900} base={400} />
        </h1>
        <p className="welcome-tag">{profile.tagline}</p>
        {profile.achievement && (
          <p className="welcome-badge">
            <Trophy size={14} /> {profile.achievement}
          </p>
        )}
        <p className="welcome-hint">Open an app from the dock, or open a folder.</p>
      </section>
      <div className="desk-folders">
        {FOLDERS.map((f, i) => (
          <DesktopFolder key={f.id} folder={f} index={i} />
        ))}
      </div>
    </main>
  );
}
