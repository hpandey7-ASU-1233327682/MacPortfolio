import { ChevronLeft, Trophy, ExternalLink } from 'lucide-react';
import KindIcon from './KindIcon';
import { useDesktop } from '../store/useDesktop';
import { photos } from '../data/profile';

export default function ItemDetail({ item, onBack }) {
  const open = useDesktop((s) => s.open);
  const photo = item.photo ? photos.find((p) => p.id === item.photo) : null;
  return (
    <article className="detail">
      {onBack && (
        <button className="back-btn" onClick={onBack}>
          <ChevronLeft size={16} /> Back
        </button>
      )}
      {photo ? (
        <button
          className="detail-photo"
          onClick={() => open('photos', { photoId: photo.id })}
          aria-label={`Open ${photo.caption} in Gallery`}
        >
          <img src={photo.src} alt={photo.alt} style={{ objectPosition: photo.pos }} />
          <span>View in Gallery</span>
        </button>
      ) : item.logo ? (
        <span className="detail-logo" style={{ background: item.logoBg }}>
          <img src={item.logo} alt={`${item.subtitle} logo`} />
        </span>
      ) : (
        <span className={`kind-tile kind-${item.kind} big`}>
          <KindIcon kind={item.kind} size={34} />
        </span>
      )}
      <h2>{item.title}</h2>
      <p className="sub">{item.subtitle}</p>
      <p className="meta">{item.meta}</p>
      {item.award && (
        <span className="award">
          <Trophy size={12} /> {item.award}
        </span>
      )}
      <p className="summary">{item.summary}</p>
      {item.bullets?.length > 0 && (
        <ul className="bullets">
          {item.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
      {item.tags?.length > 0 && (
        <div className="chips">
          {item.tags.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      )}
      {item.links?.length > 0 && (
        <div className="link-row">
          {item.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="btn">
              {l.label} <ExternalLink size={13} />
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
