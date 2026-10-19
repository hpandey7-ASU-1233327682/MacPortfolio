import { useEffect, useMemo, useState } from 'react';
import { Code, Trophy, Briefcase, GraduationCap, Search } from 'lucide-react';
import Window from '../components/Window';
import KindIcon from '../components/KindIcon';
import ItemDetail from '../components/ItemDetail';
import { useDesktop } from '../store/useDesktop';
import { collections, folderMeta, photos } from '../data/profile';

const ICONS = { Code, Trophy, Briefcase, GraduationCap };

export default function FinderApp() {
  const payload = useDesktop((s) => s.windows.finder.payload);
  const [folder, setFolder] = useState('projects');
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState('');

  // Desktop folders / menu links open the window with a target folder.
  useEffect(() => {
    if (payload?.folder) {
      setFolder(payload.folder);
      setSelectedId(null);
      setQuery('');
    }
  }, [payload]);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return collections[folder].filter(
      (it) =>
        !q ||
        [it.title, it.subtitle, it.summary, ...(it.tags || [])].join(' ').toLowerCase().includes(q),
    );
  }, [folder, query]);

  const selected = collections[folder].find((it) => it.id === selectedId) || null;
  const current = folderMeta.find((f) => f.id === folder);

  return (
    <Window id="finder" width={880} height={540}>
      <div className={`finder ${selected ? 'has-selection' : ''}`}>
        <aside className="side">
          <p className="side-head">Favorites</p>
          {folderMeta.map((f) => {
            const Icon = ICONS[f.icon];
            return (
              <button
                key={f.id}
                className={`side-item ${folder === f.id ? 'on' : ''}`}
                onClick={() => {
                  setFolder(f.id);
                  setSelectedId(null);
                  setQuery('');
                }}
              >
                <Icon size={16} /> <span>{f.label}</span>
                <em>{collections[f.id].length}</em>
              </button>
            );
          })}
        </aside>

        <section className="main">
          <div className="toolbar">
            <strong>{current.label}</strong>
            <label className="search">
              <Search size={13} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                aria-label="Search this folder"
              />
            </label>
          </div>
          <div className="grid">
            {items.map((it) => (
              <button
                key={it.id}
                className={`file ${selectedId === it.id ? 'on' : ''}`}
                onClick={() => setSelectedId(it.id)}
              >
                {(() => {
                  const ph = it.photo && photos.find((x) => x.id === it.photo);
                  if (it.logo)
                    return (
                      <span className="kind-tile logo" style={{ background: it.logoBg }}>
                        <img src={it.logo} alt="" loading="lazy" />
                      </span>
                    );
                  return ph ? (
                    <span className="kind-tile thumb">
                      <img src={ph.thumb} alt="" loading="lazy" style={{ objectPosition: ph.pos }} />
                    </span>
                  ) : (
                    <span className={`kind-tile kind-${it.kind}`}>
                      <KindIcon kind={it.kind} />
                    </span>
                  );
                })()}
                <span className="file-name">{it.title}</span>
                <span className="file-sub">{it.meta.split(' · ')[0]}</span>
              </button>
            ))}
            {items.length === 0 && <p className="empty">Nothing matches “{query}”.</p>}
          </div>
        </section>

        <aside className="preview">
          {selected ? (
            <ItemDetail item={selected} onBack={() => setSelectedId(null)} />
          ) : (
            <p className="empty pad">Select an item to see details.</p>
          )}
        </aside>
      </div>
    </Window>
  );
}
