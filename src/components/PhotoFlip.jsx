import { useRef, useState } from 'react';
import { portrait } from '../data/profile';

// Shows the adult portrait; hover (mouse) swaps to the younger one.
// Touch and keyboard: tap / Enter toggles.
// variant="card"   -> portrait rectangle, whole picture
// variant="circle" -> round avatar cropped to the face
export default function PhotoFlip({ variant = 'card', className = '' }) {
  const [alt, setAlt] = useState(false);
  const lastPointer = useRef(null);
  const photos = [portrait.adult, portrait.child];
  const current = alt ? portrait.child : portrait.adult;

  const handlers = {
    onPointerDown: (e) => {
      lastPointer.current = e.pointerType;
    },
    onPointerEnter: (e) => e.pointerType === 'mouse' && setAlt(true),
    onPointerLeave: (e) => e.pointerType === 'mouse' && setAlt(false),
    onClick: () => {
      if (lastPointer.current === 'mouse') return; // hover already handled it
      setAlt((a) => !a);
      lastPointer.current = null;
    },
  };

  return (
    <button
      type="button"
      className={`photo-flip ${variant} ${alt ? 'is-alt' : ''} ${className}`}
      aria-label={`${current.caption}. Hover, tap or press Enter to switch photo.`}
      {...handlers}
    >
      {photos.map((p, i) => {
        const shown = (i === 1) === alt;
        return variant === 'circle' ? (
          <span
            key={p.src}
            role="img"
            aria-label={p.alt}
            className={`pf-layer ${shown ? 'on' : ''}`}
            style={{
              backgroundImage: `url(${p.src})`,
              backgroundSize: p.circle.size,
              backgroundPosition: p.circle.pos,
            }}
          />
        ) : (
          <img
            key={p.src}
            src={p.src}
            alt={p.alt}
            draggable="false"
            className={`pf-layer ${shown ? 'on' : ''}`}
            style={{ objectPosition: p.card }}
          />
        );
      })}
      {variant === 'card' && <span className="pf-cap">{current.caption}</span>}
    </button>
  );
}
