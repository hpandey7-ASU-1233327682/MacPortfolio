import { useState } from 'react';
import Window from '../components/Window';
import PhotoFlip from '../components/PhotoFlip';
import { notes, profile } from '../data/profile';

export default function NotesApp() {
  const [id, setId] = useState(notes[0].id);
  const note = notes.find((n) => n.id === id);

  return (
    <Window id="notes" width={700} height={460}>
      <div className="notes">
        <aside className="side">
          {notes.map((n) => (
            <button key={n.id} className={`note-row ${id === n.id ? 'on' : ''}`} onClick={() => setId(n.id)}>
              <strong>{n.title}</strong>
              <span>{n.body[0].slice(0, 46)}…</span>
            </button>
          ))}
        </aside>
        <article className="note-body">
          {note.id === 'about' && (
            <div className="about-head">
              <PhotoFlip variant="circle" />
              <div>
                <strong>{profile.name}</strong>
                <span>{profile.title} · {profile.location}</span>
              </div>
            </div>
          )}
          <h2>{note.title}</h2>
          {note.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </article>
      </div>
    </Window>
  );
}
