import { ArrowRight } from "lucide-react";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative py-[64px] md:py-[120px] overflow-hidden"
      style={{
        backgroundColor: '#A8B2BE',
        backgroundImage:
          'linear-gradient(to right, hsl(var(--foreground) / 0.04) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground) / 0.04) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }}
    >
      <div className="container">
        <h2 className="font-serif text-2xl md:text-4xl text-foreground mb-4">
          M&A, 지금 시작하세요
        </h2>
        <p className="text-foreground/70 text-sm md:text-base mb-8 leading-relaxed max-w-2xl md:whitespace-nowrap">
          매각·투자유치·기업인수 등 M&A 전 과정에 대해 삼정KPMG 전문가와 무료로 상담하세요.
        </p>
        <button
          className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-[#00338D] text-cta-foreground font-medium text-[13px] md:text-sm tracking-wide hover:bg-cta-hover transition-all duration-300"
        >
          상담 요청하러 가기
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
};

export default ContactSection;
