export function Barcode({ className = "" }: { className?: string }) {
  const bars = [2, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 3, 1, 2];
  let x = 0;
  const rects = bars.map((w, i) => {
    const r = { x, w: w * 2, key: i };
    x += w * 2 + 3;
    return r;
  });

  return (
    <svg width="90" height="24" viewBox="0 0 90 24" aria-hidden className={className}>
      {rects.map((r) => (
        <rect key={r.key} x={r.x} y="0" width={r.w} height="24" fill="currentColor" />
      ))}
    </svg>
  );
}
