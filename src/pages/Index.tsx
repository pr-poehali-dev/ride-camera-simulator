import { useState } from "react";
import Icon from "@/components/ui/icon";

type AttractionStatus = "working" | "maintenance" | "closed";
type TicketType = "premium" | "standard";
type ActiveTab = "home" | "attractions" | "map" | "tickets" | "profile";

interface Attraction {
  id: number;
  name: string;
  image: string;
  status: AttractionStatus;
  maintenanceUntil?: string;
  minHeight: number;
  maxWeight: number;
  waitTime: number;
  category: string;
}

const ROLLER_COASTER_IMG =
  "https://cdn.poehali.dev/projects/f535532b-0e2a-4845-bf6e-1faa4975db0e/files/f974878b-7fe3-411b-9fe7-b491d87fbd82.jpg";

const attractions: Attraction[] = [
  {
    id: 1,
    name: "Американские горки",
    image: ROLLER_COASTER_IMG,
    status: "working",
    minHeight: 120,
    maxWeight: 120,
    waitTime: 15,
    category: "Экстрим",
  },
  {
    id: 2,
    name: "Вихрь",
    image: ROLLER_COASTER_IMG,
    status: "maintenance",
    maintenanceUntil: "14:00",
    minHeight: 110,
    maxWeight: 100,
    waitTime: 0,
    category: "Средний",
  },
  {
    id: 3,
    name: "Свободное падение",
    image: ROLLER_COASTER_IMG,
    status: "closed",
    minHeight: 130,
    maxWeight: 110,
    waitTime: 0,
    category: "Экстрим",
  },
];

const statusConfig = {
  working: {
    label: "Работает",
    color: "text-green-400",
    bg: "bg-green-400/15",
    dot: "bg-green-400",
    border: "border-green-400/30",
  },
  maintenance: {
    label: "На техобслуживании",
    color: "text-yellow-400",
    bg: "bg-yellow-400/15",
    dot: "bg-yellow-400",
    border: "border-yellow-400/30",
  },
  closed: {
    label: "Закрыт",
    color: "text-red-400",
    bg: "bg-red-400/15",
    dot: "bg-red-400",
    border: "border-red-400/30",
  },
};

const navTabs: { id: ActiveTab; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "attractions", label: "Аттракционы", icon: "Zap" },
  { id: "map", label: "Карта", icon: "Map" },
  { id: "tickets", label: "Билеты", icon: "Ticket" },
  { id: "profile", label: "Профиль", icon: "User" },
];

function AttractionDetail({
  attraction,
  ticketType,
  onBack,
}: {
  attraction: Attraction;
  ticketType: TicketType;
  onBack: () => void;
}) {
  const status = statusConfig[attraction.status];
  const isPremium = ticketType === "premium";
  const isWorking = attraction.status === "working";
  const canBook = isWorking && isPremium;

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Hero Image */}
      <div className="relative h-64 flex-shrink-0 overflow-hidden">
        <img
          src={attraction.image}
          alt={attraction.name}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/30 to-transparent" />

        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 glass rounded-full flex items-center justify-center active:scale-95 transition-transform"
        >
          <Icon name="ArrowLeft" size={20} className="text-white" />
        </button>

        {/* Category badge */}
        <div className="absolute top-4 right-4 px-3 py-1.5 glass rounded-full">
          <span className="text-xs font-semibold text-white/90">
            {attraction.category}
          </span>
        </div>

        {/* Title over image bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h1 className="font-display text-2xl font-bold text-white leading-tight">
            {attraction.name}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-32 space-y-3">

        {/* Status */}
        <div
          className={`flex items-center gap-3 p-4 rounded-2xl ${status.bg} border ${status.border} animate-scale-in`}
        >
          <div className="relative flex items-center justify-center w-8 h-8">
            <div
              className={`w-3 h-3 rounded-full ${status.dot} status-dot`}
            />
          </div>
          <div>
            <p className="text-xs text-white/50 mb-0.5">Статус</p>
            <p className={`font-semibold text-sm ${status.color}`}>
              {status.label}
              {attraction.status === "maintenance" &&
                attraction.maintenanceUntil && (
                  <span className="text-white/60 font-normal">
                    {" "}до {attraction.maintenanceUntil}
                  </span>
                )}
            </p>
          </div>
        </div>

        {/* Wait time — only when working */}
        {isWorking && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 animate-scale-in delay-100">
            <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center">
              <Icon name="Clock" size={16} className="text-[#8B5CF6]" />
            </div>
            <div>
              <p className="text-xs text-white/50 mb-0.5">Время ожидания</p>
              <p className="font-semibold text-sm text-white">
                около {attraction.waitTime} мин
              </p>
            </div>
          </div>
        )}

        {/* Restrictions */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/8 animate-scale-in delay-200">
          <p className="text-xs text-white/50 mb-3 font-medium uppercase tracking-wider">
            Ограничения
          </p>
          <div className="flex gap-3">
            <div className="flex-1 flex items-center gap-2.5 p-3 bg-white/5 rounded-xl">
              <span className="text-xl">📏</span>
              <div>
                <p className="text-[11px] text-white/50">Рост</p>
                <p className="text-sm font-semibold text-white">
                  от {attraction.minHeight} см
                </p>
              </div>
            </div>
            <div className="flex-1 flex items-center gap-2.5 p-3 bg-white/5 rounded-xl">
              <span className="text-xl">⚖️</span>
              <div>
                <p className="text-[11px] text-white/50">Вес</p>
                <p className="text-sm font-semibold text-white">
                  до {attraction.maxWeight} кг
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket access */}
        <div
          className={`p-4 rounded-2xl border animate-scale-in delay-300 ${
            isPremium
              ? "bg-gradient-to-r from-[#8B5CF6]/15 to-[#EC4899]/15 border-[#8B5CF6]/30"
              : "bg-white/5 border-white/10"
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                isPremium ? "bg-[#8B5CF6]/25" : "bg-white/10"
              }`}
            >
              <Icon
                name={isPremium ? "Crown" : "Ticket"}
                size={16}
                className={isPremium ? "text-[#8B5CF6]" : "text-white/50"}
              />
            </div>
            <div className="flex-1">
              <p className="text-xs text-white/50 mb-0.5">Доступность</p>
              {isPremium ? (
                <p className="text-sm font-semibold text-[#8B5CF6]">
                  Входит в ваш Premium-билет
                </p>
              ) : (
                <div>
                  <p className="text-sm font-semibold text-white/70">
                    Не входит в ваш билет
                  </p>
                  <button className="mt-2 text-xs font-semibold text-[#F97316] flex items-center gap-1 active:opacity-70 transition-opacity">
                    Доплатить?
                    <Icon name="ChevronRight" size={13} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom action buttons */}
      <div className="fixed bottom-[72px] left-0 right-0 px-4 pb-3 pt-4 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/95 to-transparent">
        <div className="flex gap-3 max-w-md mx-auto">
          {/* Map button */}
          <button className="flex-none flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-white/8 border border-white/10 text-white text-sm font-semibold active:scale-95 transition-transform">
            <Icon name="MapPin" size={16} className="text-[#06B6D4]" />
            На карте
          </button>

          {/* Book button */}
          <button
            disabled={!canBook}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold transition-all active:scale-95 ${
              canBook
                ? "gradient-primary text-white shadow-lg shadow-purple-500/30"
                : "bg-white/8 text-white/30 cursor-not-allowed border border-white/10"
            }`}
          >
            <Icon name="CalendarCheck" size={16} />
            Забронировать время
          </button>
        </div>
      </div>
    </div>
  );
}

function AttractionsListScreen({
  onSelect,
}: {
  onSelect: (a: Attraction) => void;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-6 pb-3">
        <h2 className="font-display text-xl font-bold text-white">
          Аттракционы
        </h2>
        <p className="text-sm text-white/50 mt-1">Сегодня открыто 12 из 15</p>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-28 space-y-3">
        {attractions.map((a, i) => {
          const status = statusConfig[a.status];
          return (
            <button
              key={a.id}
              onClick={() => onSelect(a)}
              className={`w-full text-left rounded-2xl overflow-hidden bg-[#111118] border border-white/8 active:scale-98 transition-transform animate-fade-in`}
              style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={a.image}
                  alt={a.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-transparent" />
                <div
                  className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full ${status.bg} border ${status.border}`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                  <span className={`text-[11px] font-semibold ${status.color}`}>
                    {status.label}
                  </span>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white text-sm">{a.name}</p>
                  <p className="text-xs text-white/40 mt-0.5">
                    {a.category} · рост от {a.minHeight} см
                  </p>
                </div>
                {a.status === "working" && (
                  <div className="text-right">
                    <p className="text-xs text-white/40">Ожидание</p>
                    <p className="text-sm font-bold text-[#8B5CF6]">
                      ~{a.waitTime} мин
                    </p>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function HomeScreen({ onNavigate }: { onNavigate: (tab: ActiveTab) => void }) {
  return (
    <div className="flex flex-col h-full overflow-y-auto pb-28">
      {/* Hero */}
      <div className="relative overflow-hidden px-4 pt-12 pb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/20 via-transparent to-[#EC4899]/10" />
        <div className="relative">
          <p className="text-[#8B5CF6] text-sm font-semibold mb-1">
            Добро пожаловать!
          </p>
          <h1 className="font-display text-3xl font-bold text-white leading-tight">
            Фан Парк
          </h1>
          <p className="text-white/50 mt-2 text-sm">
            Парк развлечений · Сегодня работает до 22:00
          </p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="px-4 grid grid-cols-3 gap-2.5 mb-4">
        {[
          { label: "Аттракционов", value: "15", icon: "Zap", color: "#8B5CF6" },
          { label: "Работает", value: "12", icon: "CheckCircle", color: "#22C55E" },
          { label: "На ТО", value: "3", icon: "Wrench", color: "#EAB308" },
        ].map((s, i) => (
          <div
            key={s.label}
            className="p-3 rounded-2xl bg-white/5 border border-white/8 animate-scale-in"
            style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
          >
            <Icon name={s.icon} size={18} style={{ color: s.color }} />
            <p className="font-bold text-white text-lg mt-1">{s.value}</p>
            <p className="text-[11px] text-white/40">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Popular attraction */}
      <div className="px-4 mb-3">
        <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-2.5">
          Популярное
        </p>
        <button
          onClick={() => onNavigate("attractions")}
          className="w-full relative rounded-2xl overflow-hidden h-44 active:scale-98 transition-transform"
        >
          <img
            src={ROLLER_COASTER_IMG}
            alt="Американские горки"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 status-dot" />
              <span className="text-xs text-green-400 font-semibold">
                Работает
              </span>
            </div>
            <p className="font-display font-bold text-white text-lg">
              Американские горки
            </p>
            <p className="text-white/60 text-xs mt-0.5">~15 мин · Экстрим</p>
          </div>
        </button>
      </div>

      {/* Ticket info */}
      <div className="px-4">
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#8B5CF6]/15 to-[#EC4899]/15 border border-[#8B5CF6]/25">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                <Icon name="Crown" size={18} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Premium-билет</p>
                <p className="text-xs text-white/50">Доступны все аттракционы</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate("tickets")}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
            >
              <Icon name="ChevronRight" size={16} className="text-white/60" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaceholderScreen({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 animate-fade-in">
      <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center animate-float">
        <Icon name={icon} size={36} className="text-white/30" />
      </div>
      <div className="text-center">
        <p className="font-display font-bold text-white text-xl">{title}</p>
        <p className="text-white/40 text-sm mt-1">Раздел в разработке</p>
      </div>
    </div>
  );
}

const Index = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  const [selectedAttraction, setSelectedAttraction] =
    useState<Attraction | null>(null);
  const [ticketType] = useState<TicketType>("premium");

  const handleSelectAttraction = (a: Attraction) => {
    setSelectedAttraction(a);
    setActiveTab("attractions");
  };

  const handleBack = () => {
    setSelectedAttraction(null);
  };

  const showAttractionDetail =
    activeTab === "attractions" && selectedAttraction;

  return (
    <div className="min-h-screen bg-[#0a0a12] flex justify-center">
      <div className="w-full max-w-md relative flex flex-col h-screen overflow-hidden">
        {/* Main content */}
        <div className="flex-1 overflow-hidden relative">
          {activeTab === "home" && !showAttractionDetail && (
            <HomeScreen onNavigate={(tab) => setActiveTab(tab)} />
          )}
          {activeTab === "attractions" && !showAttractionDetail && (
            <AttractionsListScreen onSelect={handleSelectAttraction} />
          )}
          {showAttractionDetail && (
            <AttractionDetail
              attraction={selectedAttraction}
              ticketType={ticketType}
              onBack={handleBack}
            />
          )}
          {activeTab === "map" && (
            <PlaceholderScreen title="Карта парка" icon="Map" />
          )}
          {activeTab === "tickets" && (
            <PlaceholderScreen title="Мои билеты" icon="Ticket" />
          )}
          {activeTab === "profile" && (
            <PlaceholderScreen title="Профиль" icon="User" />
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 h-[72px] glass-dark border-t border-white/8 flex items-center px-1">
          {navTabs.map((tab) => {
            const isActive =
              activeTab === tab.id && !showAttractionDetail;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedAttraction(null);
                  setActiveTab(tab.id);
                }}
                className={`flex-1 flex flex-col items-center gap-1 py-2 transition-all active:scale-90 ${
                  isActive ? "text-[#8B5CF6]" : "text-white/35"
                }`}
              >
                <div
                  className={`relative flex items-center justify-center w-8 h-8 rounded-xl transition-all ${
                    isActive ? "bg-[#8B5CF6]/15" : ""
                  }`}
                >
                  <Icon name={tab.icon} size={18} />
                  {isActive && (
                    <div className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-[#8B5CF6]" />
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium transition-all ${
                    isActive ? "text-[#8B5CF6]" : "text-white/35"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;