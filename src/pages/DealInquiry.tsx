import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionIcon from "@/components/SectionIcon";
import heroImage from "@/assets/hero-opportunities.jpg";
import { toast } from "@/hooks/use-toast";

type FormState = {
  investmentSize: string;
  desiredIndustry: string;
  preferredRevenue: string;
  preferredOperatingProfit: string;
  notes: string;
  contact: string;
  email: string;
};

const initial: FormState = {
  investmentSize: "",
  desiredIndustry: "",
  preferredRevenue: "",
  preferredOperatingProfit: "",
  notes: "",
  contact: "",
  email: "",
};

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="mb-2 flex items-center gap-[6px] text-[13px] font-bold text-foreground">
    {children}
    <span className="inline-block w-[3px] h-[3px] rounded-full bg-[#D72660]" aria-label="필수" />
  </label>
);


const MoneyInput = ({
  value,
  onChange,
  placeholder = "입력",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) => (
  <div className="flex items-center gap-2 bg-section-alt px-4 py-3.5">
    <span className="text-muted-foreground">₩</span>
    <input
      type="text"
      inputMode="numeric"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex-1 bg-transparent text-right text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none"
      placeholder={placeholder}
    />
    <span className="text-[12px] font-semibold text-cta">백만원</span>
  </div>
);

const TextInput = ({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) => (
  <input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full bg-section-alt px-4 py-3.5 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-cta"
    placeholder={placeholder}
  />
);

const DealInquiry = () => {
  const [form, setForm] = useState<FormState>(initial);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const update = (k: keyof FormState) => (v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const required = Object.values(form).every((v) => v.trim() !== "");
    if (!required) {
      toast({ title: "필수 항목을 모두 입력해 주세요.", variant: "destructive" });
      return;
    }
    if (!privacyAgreed) {
      toast({ title: "개인정보 수집·이용 동의가 필요합니다.", variant: "destructive" });
      return;
    }
    toast({ title: "문의가 정상적으로 접수되었습니다.", description: "담당자가 빠른 시일 내 연락드리겠습니다." });
    setForm(initial);
    setPrivacyAgreed(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative min-h-[260px] bg-primary pt-16 text-primary-foreground md:min-h-[420px] md:pt-28">
          <img src={heroImage} alt="매물 등록·문의" className="absolute inset-0 h-full w-full object-cover opacity-50" width={1920} height={1080} />
          <div className="absolute inset-0 bg-primary/45" />
          <div className="container relative z-10 py-[64px] md:py-[120px]">
            <p className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-widest text-gold md:text-xs">
              <SectionIcon activeIndex={1} size={14} className="text-gold" />
              Deal Inquiry
            </p>
            <h1 className="font-serif text-[26px] font-bold leading-[1.3] md:text-5xl md:leading-[1.3]">매물 등록·문의</h1>
            <p className="mt-4 max-w-3xl text-[13px] leading-relaxed text-primary-foreground/80 md:mt-6 md:text-[16px]">
              인수 희망 조건을 알려주시면, 삼정KPMG M&A Center의 전문가가 비공개 거래를 포함한 폭넓은 딜 파이프라인에서 최적의 기회를 찾아드립니다.
            </p>
          </div>
        </section>

        <section className="bg-section-alt pb-[64px] pt-12 md:pb-[120px] md:pt-20">
          <div className="container max-w-5xl">
            <form onSubmit={handleSubmit} className="bg-background p-6 md:p-12">
              <div className="grid gap-x-8 gap-y-7 md:grid-cols-2">
                <div>
                  <Label>투자규모 (백만원)</Label>
                  <MoneyInput value={form.investmentSize} onChange={update("investmentSize")} />
                </div>
                <div>
                  <Label>인수 희망 산업</Label>
                  <TextInput value={form.desiredIndustry} onChange={update("desiredIndustry")} placeholder="입력" />
                </div>
                <div>
                  <Label>선호 매출 (백만원)</Label>
                  <MoneyInput value={form.preferredRevenue} onChange={update("preferredRevenue")} />
                </div>
                <div>
                  <Label>선호 영업 이익 수준 (백만원)</Label>
                  <MoneyInput value={form.preferredOperatingProfit} onChange={update("preferredOperatingProfit")} />
                </div>
                <div className="md:col-span-2">
                  <Label>기타 사항</Label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => update("notes")(e.target.value)}
                    rows={6}
                    className="w-full resize-none bg-section-alt px-4 py-3.5 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-cta"
                    placeholder="입력"
                  />
                </div>
                <div>
                  <Label>연락처</Label>
                  <TextInput value={form.contact} onChange={update("contact")} placeholder="입력" />
                </div>
                <div>
                  <Label>이메일</Label>
                  <TextInput type="email" value={form.email} onChange={update("email")} placeholder="입력" />

                </div>
              </div>

              <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <label className="inline-flex w-fit cursor-pointer items-center gap-2 text-[13px] text-foreground">
                  <input
                    type="checkbox"
                    checked={privacyAgreed}
                    onChange={(event) => setPrivacyAgreed(event.target.checked)}
                    className="peer sr-only"
                  />
                  <span className="grid h-4 w-4 place-items-center rounded-none border border-muted-foreground bg-background peer-checked:border-cta peer-checked:bg-cta">
                    <svg viewBox="0 0 12 12" className={`h-3 w-3 text-cta-foreground ${privacyAgreed ? "block" : "hidden"}`} aria-hidden="true">
                      <path d="M2 6.2 4.7 9 10 3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter" />
                    </svg>
                  </span>
                  <span>개인정보 수집·이용에 동의합니다.</span>
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-3 bg-cta px-10 py-5 text-[14px] font-semibold text-cta-foreground transition-colors hover:bg-cta-hover"
                >
                  제출하기 <ArrowRight size={16} />
                </button>
              </div>
            </form>
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 border border-foreground bg-background px-5 py-3 md:px-7 md:py-3.5 text-[12px] md:text-[13px] font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                뒤로가기
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DealInquiry;
