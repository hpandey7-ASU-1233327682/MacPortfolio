import { useEffect, useMemo, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Window from '../components/Window';
import { useDesktop } from '../store/useDesktop';
import { photos, photoAlbums } from '../data/profile';

export default function PhotosApp() {
  const payload = useDesktop((s) => s.windows.photos.payload);
  const isOpen = useDesktop((s) => s.windows.photos.open);
  const [album, setAlbum] = useState('All');
  const [viewId, setViewId] = useState(null);

  // "View in Gallery" from the Hackathons folder opens a specific photo.
  useEffect(() => {
    if (payload?.photoId) {
      setAlbum('All');
      setViewId(payload.photoId);
    }
  }, [payload]);

  const list = useMemo(() => photos.filter((p) => album === 'All' || p.album === album), [album]);
  const index = list.findIndex((p) => p.id === viewId);
  const shown = index >= 0 ? list[index] : null;

  const step = (d) => setViewId(list[(index + d + list.length) % list.length].id);

  useEffect(() => {
    if (!shown || !isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setViewId(null);
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <Window id="photos" width={840} height={540}>
      <div className="photos">
        <div className="toolbar">
          <div className="seg">
            {photoAlbums.map((a) => (
              <button
                key={a}
                className={album === a ? 'on' : ''}
                onClick={() => {
                  setAlbum(a);
                  setViewId(null);
                }}
              >
                {a}
              </button>
            ))}
          </div>
          <span className="t-dim">{list.length} photos</span>
        </div>

        <div className="photo-grid">
          {list.map((p) => (
            <button key={p.id} className="photo" onClick={() => setViewId(p.id)} aria-label={`${p.caption}: ${p.detail}`}>
              <img src={p.thumb} alt={p.alt} loading="lazy" style={{ objectPosition: p.pos }} />
              <span className="cap">
                <b>{p.caption}</b>
                <small>{p.detail}</small>
              </span>
            </button>
          ))}
        </div>

        {shown && (
          <div className="lightbox" onClick={() => setViewId(null)}>
            <button className="lb-close" aria-label="Close photo" onClick={() => setViewId(null)}>
              <X size={18} />
            </button>
            {list.length > 1 && (
              <>
                <button
                  className="lb-nav prev"
                  aria-label="Previous photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  className="lb-nav next"
                  aria-label="Next photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
            <img src={shown.src} alt={shown.alt} onClick={(e) => e.stopPropagation()} />
            <p>
              <b>{shown.caption}</b> · {shown.detail}
            </p>
          </div>
        )}
      </div>
    </Window>
  );
}
