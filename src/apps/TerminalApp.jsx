import { useEffect, useRef, useState } from 'react';
import Window from '../components/Window';
import { useDesktop, APPS } from '../store/useDesktop';
import { profile, skills, collections, folderMeta } from '../data/profile';

const PROMPT = `${profile.handle}@portfolio ~ %`;

const section = (items, key = 'title') =>
  items.map((it) => (
    <div key={it.id} className="t-row">
      <span className="t-key">{it[key]}</span>
      <span className="t-dim">
        {(key === 'title' ? it.subtitle : it.title)} · {it.meta}
      </span>
    </div>
  ));

const COMMANDS = {
  help: () => (
    <div>
      {[
        ['about', 'who I am'],
        ['skills', 'my tech stack'],
        ['projects', 'things I have built'],
        ['hackathons', 'weekend builds'],
        ['experience', 'where I have worked'],
        ['education', 'degrees'],
        ['contact', 'how to reach me'],
        ['open <app>', `open a window (${Object.keys(APPS).join(', ')})`],
        ['theme', 'switch light / dark'],
        ['clear', 'clear the screen'],
      ].map(([c, d]) => (
        <div key={c} className="t-row">
          <span className="t-key">{c}</span>
          <span className="t-dim">{d}</span>
        </div>
      ))}
    </div>
  ),
  about: () => (
    <div>
      <div>{profile.name} · {profile.title} · {profile.location}</div>
      <div className="t-dim">{profile.summary}</div>
    </div>
  ),
  whoami: () => profile.name,
  skills: () => (
    <div>
      {skills.map((g) => (
        <div key={g.group} className="t-row">
          <span className="t-key">{g.group}</span>
          <span>{g.items.join(', ')}</span>
        </div>
      ))}
    </div>
  ),
  projects: () => section(collections.projects),
  hackathons: () => section(collections.hackathons),
  experience: () => section(collections.experience, 'subtitle'),
  education: () => section(collections.education),
  contact: () => (
    <div>
      <div>email  <span className="t-key">{profile.email}</span></div>
      {profile.links.github && <div>github <span className="t-key">{profile.links.github}</span></div>}
      {profile.links.linkedin && <div>linkedin <span className="t-key">{profile.links.linkedin}</span></div>}
    </div>
  ),
  date: () => new Date().toString(),
  echo: (args) => args.join(' '),
  ls: () => folderMeta.map((f) => f.id + '/').join('   '),
  sudo: () => 'Nice try. But I would be happy to talk: type `contact`.',
};

export default function TerminalApp() {
  const open = useDesktop((s) => s.open);
  const toggleTheme = useDesktop((s) => s.toggleTheme);
  const [lines, setLines] = useState([
    { id: 0, cmd: null, out: <span className="t-dim">Welcome to {profile.firstName}'s terminal. Type <b>help</b> to get started.</span> },
  ]);
  const [value, setValue] = useState('');
  const history = useRef([]);
  const cursor = useRef(-1);
  const inputRef = useRef(null);
  const endRef = useRef(null);
  const nextId = useRef(1);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [lines]);

  const run = (raw) => {
    const text = raw.trim();
    if (!text) return;
    history.current.push(text);
    cursor.current = history.current.length;
    const [name, ...args] = text.split(/\s+/);

    if (name === 'clear') {
      setLines([]);
      return;
    }
    let out;
    if (name === 'open') {
      const target = args[0];
      if (target && APPS[target]) {
        open(target);
        out = `Opening ${APPS[target].label}…`;
      } else {
        out = `Usage: open <${Object.keys(APPS).join('|')}>`;
      }
    } else if (name === 'theme') {
      toggleTheme();
      out = 'Theme switched.';
    } else if (COMMANDS[name]) {
      out = COMMANDS[name](args);
    } else {
      out = <span className="t-err">zsh: command not found: {name}. Try <b>help</b>.</span>;
    }
    setLines((l) => [...l, { id: nextId.current++, cmd: text, out }]);
  };

  const onKey = (e) => {
    if (e.key === 'Enter') {
      run(value);
      setValue('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      cursor.current = Math.max(0, cursor.current - 1);
      setValue(history.current[cursor.current] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      cursor.current = Math.min(history.current.length, cursor.current + 1);
      setValue(history.current[cursor.current] ?? '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const hits = [...Object.keys(COMMANDS), 'open', 'theme', 'clear'].filter((c) => c.startsWith(value) && value);
      if (hits.length === 1) setValue(hits[0]);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <Window id="terminal" width={720} height={440}>
      <div className="terminal" onClick={() => inputRef.current?.focus()}>
        {lines.map((l) => (
          <div key={l.id} className="t-block">
            {l.cmd !== null && (
              <div>
                <span className="t-prompt">{PROMPT}</span> {l.cmd}
              </div>
            )}
            <div className="t-out">{l.out}</div>
          </div>
        ))}
        <label className="t-input">
          <span className="t-prompt">{PROMPT}</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            aria-label="Terminal input"
          />
        </label>
        <div ref={endRef} />
      </div>
    </Window>
  );
}
