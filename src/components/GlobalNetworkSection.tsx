import globalBg from "@/assets/global-network-bg.jpg";

const regions = [
  {
    label: "EMA",
    sub: "Europe, Middle East, Africa",
    value: "40+",
    desc: "영국, 독일, 프랑스 등 유럽 전역과 중동·아프리카 주요 거점",
  },
  {
    label: "Americas",
    sub: "북미 & 남미",
    value: "20+",
    desc: "미국, 캐나다 중심으로 브라질, 멕시코 등 남미 주요 국가 협력",
  },
  {
    label: "ASPAC",
    sub: "Asia Pacific",
    value: "20+",
    desc: "한국, 중국, 일본, 호주, 인도, 베트남, 싱가포르 등 아시아 주요 경제권",
  },
];

const GlobalNetworkSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[hsl(220,20%,8%)] pt-[60px] pb-[60px] md:pt-[120px] md:pb-[120px]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={globalBg}
          alt="Global network"
          className="w-full h-full object-cover object-bottom opacity-90 scale-110"
          loading="lazy"
          width={1920}
          height={800}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,20%,8%)]/60 via-[hsl(220,20%,8%)]/20 to-[hsl(220,20%,8%)]/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container pt-[54px] pb-[29px] md:pt-[108px] md:pb-[58px]">
        {/* Headline + Stats (mobile: same row) */}
        <div className="flex items-center justify-between gap-4 mb-10 md:block md:mb-0">
          <h2 className="font-serif font-bold text-[30px] md:text-5xl text-white text-left md:text-center md:mb-10 leading-tight -translate-y-3 md:translate-y-0">
            <span className="md:hidden">Global Reach,<br />Global Impact</span>
            <span className="hidden md:inline">Global Reach, Global Impact</span>
          </h2>
          <div className="md:hidden text-right shrink-0 -translate-y-3">
            <p className="font-serif text-4xl text-gold leading-none">80+</p>
            <p className="text-white font-semibold text-[12px] mt-1">글로벌 네트워크</p>
          </div>
        </div>

        {/* Description + Global stats (desktop only stats) */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-8 md:gap-16 mb-10 max-w-5xl mx-auto">
          <p className="text-white/70 text-sm leading-relaxed max-w-lg">
            KPMG Deal Advisory는 전 세계 80개국 이상의 네트워크를 보유하고 있으며, 약 2,500명 이상의 M&A 투자 전문가들이 크로스보더 거래 자문, 글로벌 실사 및 밸류에이션 서비스를 위해 긴밀히 협력하고 있습니다.
          </p>
          <div className="hidden md:flex items-center gap-6">
            <div>
              <p className="font-serif text-5xl text-gold">80+</p>
              <p className="text-white font-semibold text-[12px] mt-1">글로벌 네트워크</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom region stats boxes */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-[27px] md:pb-[55px] -mt-[15px] md:-mt-[30px]">
        <div className="grid grid-cols-3 gap-2 md:gap-6">
          {regions.map((region) => (
            <div
              key={region.label}
              className="backdrop-blur-md bg-white/10 rounded-lg px-3 py-3 md:px-6 md:py-5 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-0"
            >
              <div className="flex-1 min-w-0">
                <span className="text-white font-semibold text-sm md:text-base">{region.label}</span>
                <p className="text-white/50 text-[10px] md:text-xs mt-1">{region.sub}</p>
              </div>
              <span className="font-serif text-xl md:text-3xl text-gold">{region.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalNetworkSection;
