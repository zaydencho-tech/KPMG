import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "900", suffix: "건+", label: "총 자문 건수 (2020~2025)" },
  { value: "150", suffix: "조원+", label: "총 자문 실적 (2020~2025)" },
  { value: "600", suffix: "개+", label: "총 자문 산업 (2020~2025)" },
];

const AnimatedNumber = ({ target, suffix }: { target: string; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const num = parseInt(target);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * num));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [num]);

  return (
    <div ref={ref} className="font-serif text-3xl md:text-5xl text-primary-foreground flex items-baseline tracking-tight font-light">
      {count}
      <span className="text-primary-foreground">{suffix}</span>
    </div>
  );
};

const HeroStats = () => {
  return (
    <section
      className="py-[60px]"
      style={{
        backgroundColor: '#00338D',
        backgroundImage:
          'linear-gradient(to right, hsl(0 0% 100% / 0.04) 1px, transparent 1px), linear-gradient(to bottom, hsl(0 0% 100% / 0.04) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }}
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-y-3 md:gap-y-0">
          {stats.map((stat, index) => (
            <div key={stat.label} className={`flex flex-col py-2 pl-5 md:pl-0 ${index > 0 ? 'md:pl-8 md:border-l md:border-gold/40' : ''}`}>
              <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              <p className="text-primary-foreground/50 text-sm mt-2 font-sans">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroStats;
