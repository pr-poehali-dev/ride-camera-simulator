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
    color: "text-white",
    bg: "bg-gradient-to-r from-emerald-400 to-green-500",
    dot: "bg-white",
    icon: "CheckCircle",
  },
  maintenance: {
    label: "На техобслуживании",
    color: "text-white",
    bg: "bg-gradient-to-r from-amber-400 to-orange-400",
    dot: "bg-white",
    icon: "Wrench",
  },
  closed: {
    label: "Закрыт",
    color: "text-white",
    bg: "bg-gradient-to-r from-red-400 to-rose-500",
    dot: "bg-white",
    icon: "XCircle",
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
    <div className="flex flex-col h-full animate-fade-in bg-[#f4f4f8]">
      {/* Hero Image */}
      <div className="relative h-72 flex-shrink-0 overflow-hidden rounded-b-[2rem]">
        <img
          src={attraction.image}
          alt={attraction.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-5 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center active:scale-95 transition-transform border border-white/30"
        >
          <Icon name="ArrowLeft" size={20} className="text-white" />
        </button>

        {/* Category badge */}
        <div className="absolute top-5 right-4 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
          <span className="text-xs font-bold text-white tracking-wide">
            {attraction.category.toUpperCase()}
          </span>
        </div>

        {/* Title + status pill over image */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-2 ${status.bg}`}
          >
            <Icon name={status.icon} size={13} className="text-white" />
            <span className="text-xs font-bold text-white">
              {status.label}
              {attraction.status === "maintenance" && attraction.maintenanceUntil
                ? ` до ${attraction.maintenanceUntil}`
                : ""}
            </span>
          </div>
          <h1 className="font-display text-2xl font-bold text-white leading-tight drop-shadow-lg">
            {attraction.name}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-36 space-y-3">

        {/* Wait time + Restrictions row */}
        <div className="grid grid-cols-3 gap-2.5 animate-scale-in">
          {/* Wait time */}
          <div className="col-span-1 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-3.5 flex flex-col gap-1">
            <Icon name="Clock" size={18} className="text-white/80" />
            <p className="text-[10px] text-white/70 font-medium mt-0.5">Ожидание</p>
            <p className="text-sm font-bold text-white leading-tight">
              {isWorking ? `~${attraction.waitTime} мин` : "—"}
            </p>
          </div>
          {/* Height */}
          <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl p-3.5 flex flex-col gap-1">
            <span className="text-lg leading-none">📏</span>
            <p className="text-[10px] text-white/70 font-medium mt-0.5">Рост</p>
            <p className="text-sm font-bold text-white leading-tight">
              от {attraction.minHeight} см
            </p>
          </div>
          {/* Weight */}
          <div className="bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl p-3.5 flex flex-col gap-1">
            <span className="text-lg leading-none">⚖️</span>
            <p className="text-[10px] text-white/70 font-medium mt-0.5">Вес</p>
            <p className="text-sm font-bold text-white leading-tight">
              до {attraction.maxWeight} кг
            </p>
          </div>
        </div>

        {/* Ticket access */}
        <div
          className={`rounded-2xl overflow-hidden animate-scale-in delay-100`}
        >
          {isPremium ? (
            <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Crown" size={20} className="text-yellow-300" />
                </div>
                <div>
                  <p className="text-[11px] text-white/70 mb-0.5 font-medium">Доступность</p>
                  <p className="text-sm font-bold text-white">
                    Входит в ваш Premium-билет ✓
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-100 shadow-sm p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <Icon name="Ticket" size={20} className="text-orange-400" />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 mb-0.5 font-medium">Доступность</p>
                    <p className="text-sm font-semibold text-gray-700">
                      Не входит в ваш билет
                    </p>
                  </div>
                </div>
                <button className="flex-shrink-0 bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs font-bold px-3 py-2 rounded-xl active:scale-95 transition-transform">
                  Доплатить
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Status detail card (if not working) */}
        {!isWorking && (
          <div
            className={`p-4 rounded-2xl animate-scale-in delay-200 ${
              attraction.status === "maintenance"
                ? "bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200"
                : "bg-gradient-to-r from-red-50 to-rose-50 border border-red-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  attraction.status === "maintenance"
                    ? "bg-amber-100"
                    : "bg-red-100"
                }`}
              >
                <Icon
                  name={attraction.status === "maintenance" ? "Wrench" : "Ban"}
                  size={18}
                  className={
                    attraction.status === "maintenance"
                      ? "text-amber-500"
                      : "text-red-500"
                  }
                />
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Информация</p>
                <p
                  className={`text-sm font-semibold ${
                    attraction.status === "maintenance"
                      ? "text-amber-700"
                      : "text-red-600"
                  }`}
                >
                  {attraction.status === "maintenance"
                    ? `Откроется в ${attraction.maintenanceUntil}`
                    : "Аттракцион не работает сегодня"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom action buttons */}
      <div className="fixed bottom-[72px] left-0 right-0 px-4 pb-3 pt-5 bg-gradient-to-t from-[#f4f4f8] via-[#f4f4f8]/95 to-transparent">
        <div className="flex gap-3 max-w-md mx-auto">
          {/* Map button */}
          <button className="flex-none flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-white border border-gray-200 shadow-sm text-gray-700 text-sm font-semibold active:scale-95 transition-transform">
            <Icon name="MapPin" size={16} className="text-cyan-500" />
            На карте
          </button>

          {/* Book button */}
          <button
            disabled={!canBook}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold transition-all active:scale-95 ${
              canBook
                ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-lg shadow-violet-200"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
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
        <h2 className="font-display text-xl font-bold text-gray-900">
          Аттракционы
        </h2>
        <p className="text-sm text-gray-400 mt-1">Сегодня открыто 12 из 15</p>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-28 space-y-3">
        {attractions.map((a, i) => {
          const status = statusConfig[a.status];
          return (
            <button
              key={a.id}
              onClick={() => onSelect(a)}
              className={`w-full text-left rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm active:scale-98 transition-transform animate-fade-in`}
              style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={a.image}
                  alt={a.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div
                  className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full ${status.bg}`}
                >
                  <Icon name={status.icon} size={11} className="text-white" />
                  <span className="text-[11px] font-bold text-white">
                    {status.label}
                  </span>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{a.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {a.category} · рост от {a.minHeight} см
                  </p>
                </div>
                {a.status === "working" && (
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Ожидание</p>
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
          <h1 className="font-display text-3xl font-bold text-gray-900 leading-tight">
            Фан Парк
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
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
            className="p-3 rounded-2xl bg-white border border-gray-100 shadow-sm animate-scale-in"
            style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
          >
            <Icon name={s.icon} size={18} style={{ color: s.color }} />
            <p className="font-bold text-gray-900 text-lg mt-1">{s.value}</p>
            <p className="text-[11px] text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Popular attraction */}
      <div className="px-4 mb-3">
        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2.5">
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
        <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-50 to-pink-50 border border-violet-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                <Icon name="Crown" size={18} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Premium-билет</p>
                <p className="text-xs text-gray-400">Доступны все аттракционы</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate("tickets")}
              className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center"
            >
              <Icon name="ChevronRight" size={16} className="text-gray-400" />
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
      <div className="w-20 h-20 rounded-3xl bg-white border border-gray-100 shadow-sm flex items-center justify-center animate-float">
        <Icon name={icon} size={36} className="text-gray-300" />
      </div>
      <div className="text-center">
        <p className="font-display font-bold text-gray-900 text-xl">{title}</p>
        <p className="text-gray-400 text-sm mt-1">Раздел в разработке</p>
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
    <div className="min-h-screen bg-[#f4f4f8] flex justify-center">
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
        <div className="absolute bottom-0 left-0 right-0 h-[72px] bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] flex items-center px-1">
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
                  isActive ? "text-[#8B5CF6]" : "text-gray-400"
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
                    isActive ? "text-[#8B5CF6]" : "text-gray-400"
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