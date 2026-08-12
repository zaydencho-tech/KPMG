interface SectionIconProps {
  activeIndex: number; // 0-based section order; wraps after the fourth rectangle
  size?: number;
  className?: string;
}

const SectionIcon = ({ activeIndex, size = 16, className = "" }: SectionIconProps) => {
  const normalizedActiveIndex = ((activeIndex % 4) + 4) % 4;
  const strokeWidth = 0.8;
  const innerRectW = 2;
  const rectW = innerRectW + strokeWidth;
  const gap = 2;
  const rectH = size * 0.75;
  const totalW = rectW * 4 + gap * 3 + strokeWidth;
  const inset = strokeWidth / 2;

  return (
    <svg
      width={totalW}
      height={rectH}
      viewBox={`0 0 ${totalW} ${rectH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      style={{ verticalAlign: 'middle', display: 'inline-block', marginTop: '-1px' }}
    >
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={inset + i * (rectW + gap)}
          y={inset}
          width={rectW}
          height={rectH - strokeWidth}
          fill={i === normalizedActiveIndex ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />
      ))}
    </svg>
  );
};

export default SectionIcon;
