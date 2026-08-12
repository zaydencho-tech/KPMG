import { useEffect, useRef, useState } from "react";
import statsBg from "@/assets/stats-bg.jpg";

const stats = [
  { value: "300", suffix: "건+", label: "총 거래 건수" },
  { value: "485", suffix: "억원", label: "총 자문 실적" },
  { value: "448", suffix: "+", label: "산업 커버리지" },
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
    <div ref={ref} className="text-primary-foreground font-serif text-4xl md:text-5xl font-bold">
      {count}
      <span className="text-gold">{suffix}</span>
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="relative py-[64px] md:py-[120px] overflow-hidden">
      <img
        src={statsBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        width={1920}
        height={512}
      />
      <div className="absolute inset-0 bg-primary/85" />
      <div className="relative z-10 container">
        <p className="text-primary-foreground/60 text-sm text-center mb-4 tracking-widest uppercase">
          누적 150조의 자문실적이 증명하는
        </p>
        <h2 className="font-serif text-2xl md:text-3xl text-primary-foreground text-center mb-12">
          삼정KPMG의 전문성과 역량
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              <p className="text-primary-foreground/60 text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="text-gold text-xs text-center mt-8">
          산업 커버리지 → 문의 해야 함.
        </p>
      </div>
    </section>
  );
};

export default StatsSection;
