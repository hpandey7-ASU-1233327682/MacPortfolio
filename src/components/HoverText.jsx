import { useRef } from 'react';

// Letters get heavier as the pointer gets closer (Inter is a variable font).
export default function HoverText({ text, className = '', min = 200, max = 800, base = 300 }) {
  const ref = useRef(null);

  const onMove = (e) => {
    for (const el of ref.current.children) {
      const r = el.getBoundingClientRect();
      const d = e.clientX - (r.left + r.width / 2);
      const k = Math.exp(-(d * d) / (2 * 80 * 80));
      el.style.fontVariationSettings = `'wght' ${Math.round(min + (max - min) * k)}`;
    }
  };
  const onLeave = () => {
    for (const el of ref.current.children) el.style.fontVariationSettings = `'wght' ${base}`;
  };

  return (
    <span ref={ref} className={`hover-text ${className}`} onMouseMove={onMove} onMouseLeave={onLeave} aria-label={text}>
      {[...text].map((ch, i) => (
        <span key={i} aria-hidden="true" style={{ fontVariationSettings: `'wght' ${base}` }}>
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  );
}
