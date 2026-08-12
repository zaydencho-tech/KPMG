import { useEffect, useState } from "react";
import { Check, ChevronDown, Filter, Search, X } from "lucide-react";

export type FilterField = {
  id: string;
  label: string; // group label & button placeholder
  value: string[];
  onChange: (v: string[]) => void;
  options: string[];
};

type Props = {
  query?: string;
  onQuery?: (v: string) => void;
  searchPlaceholder?: string;
  filters: FilterField[];
  onReset?: () => void;
};

const useLockBody = (open: boolean, close: () => void) => {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open, close]);
};

const toggleItem = (list: string[], item: string) =>
  list.includes(item) ? list.filter((v) => v !== item) : [...list, item];

const SingleFilterModal = ({ field, onClose }: { field: FilterField; onClose: () => void }) => {
  useLockBody(true, onClose);
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 p-0 md:items-center md:p-4" onClick={onClose}>
      <div className="flex max-h-[70vh] w-full max-w-[480px] flex-col bg-background shadow-xl md:max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <p className="text-[14px] font-semibold text-foreground">{field.label}</p>
          <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {field.options.map((o) => {
            const selected = field.value.includes(o);
            return (
              <button
                key={o}
                type="button"
                onClick={() => field.onChange(toggleItem(field.value, o))}
                className="flex w-full items-center gap-3 px-5 py-3 text-left text-[14px] hover:bg-section-alt"
              >
                <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border ${selected ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>
                  {selected && <Check size={12} />}
                </span>
                <span className={selected ? "font-semibold text-foreground" : "text-foreground"}>{o}</span>
              </button>
            );
          })}
        </div>
        <div className="flex items-center justify-between border-t border-border px-5 py-3">
          <button type="button" onClick={() => field.onChange([])} className="text-[13px] text-muted-foreground hover:text-foreground">초기화</button>
          <button type="button" onClick={onClose} className="bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground hover:bg-primary/90">적용</button>
        </div>
      </div>
    </div>
  );
};

const FilterButton = ({ field }: { field: FilterField }) => {
  const [open, setOpen] = useState(false);
  const display = field.value.length > 0 ? `${field.label} (${field.value.length})` : field.label;
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative flex h-12 w-full items-center justify-between border border-border bg-background pl-4 pr-9 text-left text-[14px] font-medium text-foreground"
      >
        <span className={field.value.length > 0 ? "text-foreground" : "text-muted-foreground"}>{display}</span>
        <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
      </button>
      {open && <SingleFilterModal field={field} onClose={() => setOpen(false)} />}
    </>
  );
};

const UnifiedModal = ({ filters, onReset, onClose }: { filters: FilterField[]; onReset?: () => void; onClose: () => void }) => {
  useLockBody(true, onClose);
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 p-0 md:items-center md:p-4" onClick={onClose}>
      <div className="flex max-h-[85vh] w-full max-w-[520px] flex-col bg-background shadow-xl md:max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <p className="text-[14px] font-semibold text-foreground">필터</p>
          <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {filters.map((f, idx) => (
            <div key={f.id} className={idx < filters.length - 1 ? "mb-6" : ""}>
              <p className="mb-2 text-[12px] font-bold uppercase tracking-wider text-muted-foreground">{f.label}</p>
              <div className="flex flex-wrap gap-2">
                {f.options.map((o) => {
                  const selected = f.value.includes(o);
                  return (
                    <button
                      key={o}
                      type="button"
                      onClick={() => f.onChange(toggleItem(f.value, o))}
                      className={`px-3 py-1.5 text-[13px] border ${selected ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:bg-section-alt"}`}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-border px-5 py-4">
          <button
            type="button"
            onClick={() => { if (onReset) onReset(); else filters.forEach((f) => f.onChange([])); onClose(); }}
            className="text-[13px] text-muted-foreground hover:text-foreground"
          >
            초기화
          </button>
          <button type="button" onClick={onClose} className="bg-primary px-6 py-2.5 text-[13px] font-medium text-primary-foreground hover:bg-primary/90">적용</button>
        </div>
      </div>
    </div>
  );
};

const UnifiedButton = ({ filters, onReset }: { filters: FilterField[]; onReset?: () => void }) => {
  const [open, setOpen] = useState(false);
  const total = filters.reduce((sum, f) => sum + f.value.length, 0);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative flex h-[42px] shrink-0 items-center gap-2 border border-border bg-background px-4 text-[14px] font-medium text-foreground lg:h-12"
      >
        <Filter size={16} />
        <span>필터</span>
        {total > 0 && (
          <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">{total}</span>
        )}
      </button>
      {open && <UnifiedModal filters={filters} onReset={onReset} onClose={() => setOpen(false)} />}
    </>
  );
};

const ResponsiveFilters = ({ query, onQuery, searchPlaceholder = "키워드 검색", filters, onReset }: Props) => {
  const hasSearch = onQuery !== undefined;
  // Desktop grid template: [Filter label] [search?] [filter buttons...]
  const desktopCols = hasSearch
    ? `48px minmax(220px, 1fr) ${filters.map(() => "180px").join(" ")}`
    : `48px ${filters.map(() => "minmax(180px, 1fr)").join(" ")}`;

  return (
    <div className="mt-6 bg-background px-3 py-3 md:mt-8 md:px-5 md:py-4">
      {/* Desktop (lg+) */}
      <div className="hidden lg:grid lg:items-center lg:gap-4" style={{ gridTemplateColumns: desktopCols }}>
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Filter</span>
        {hasSearch && (
          <label className="flex h-12 items-center gap-2 border border-border bg-background px-4 text-[14px] text-muted-foreground">
            <Search size={16} />
            <input
              value={query ?? ""}
              onChange={(e) => onQuery!(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full bg-transparent text-[14px] outline-none placeholder:text-muted-foreground"
            />
          </label>
        )}
        {filters.map((f) => <FilterButton key={f.id} field={f} />)}
      </div>

      {/* Mobile/Tablet (< lg) */}
      <div className="flex items-center gap-2 lg:hidden">
        {hasSearch ? (
          <label className="flex h-[42px] flex-1 items-center gap-2 border border-border bg-background px-3 text-[14px] text-muted-foreground">
            <Search size={16} />
            <input
              value={query ?? ""}
              onChange={(e) => onQuery!(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full bg-transparent text-[14px] outline-none placeholder:text-muted-foreground"
            />
          </label>
        ) : (
          <div className="flex-1" />
        )}
        <UnifiedButton filters={filters} onReset={onReset} />
      </div>
    </div>
  );
};

export default ResponsiveFilters;
