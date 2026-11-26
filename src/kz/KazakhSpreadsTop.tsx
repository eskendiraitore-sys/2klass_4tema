import {useEffect, useRef, useState} from 'react';
import {
  BookOpen,
  Globe,
  Sparkles,
  ArrowRight,
  Paintbrush,
  PaintBucket,
  Shapes,
  Eraser,
  MousePointer2,
  Crop,
  FlipHorizontal2,
  FlipVertical2,
  Crosshair,
  ImagePlus,
  RotateCcw,
  Maximize2,
  X,
  Target,
  CheckCircle2,
  Play,
  Video,
  MousePointerClick,
  Bug,
  XCircle,
} from 'lucide-react';

// БЕЙНЕ СІЛТЕМЕСІН ОСЫ ЖЕРГЕ ҚОЮ
const VIDEO_PRACTICE_URL_KZ: string =
  'https://www.youtube.com/watch?v=XS5g9cgUL1w';

/* ---------------- Мұқаба (Cover KZ) ---------------- */
const TRILINGUAL_KZ = [
  {lang: 'Қазақша', short: 'KZ', word: 'кейіпкер құру', accent: 'text-amber-700'},
  {
    lang: 'Русский',
    short: 'RU',
    word: 'создание персонажа',
    accent: 'text-sky-700',
  },
  {
    lang: 'English',
    short: 'EN',
    word: 'character creation',
    accent: 'text-emerald-700',
  },
];

export function KzCover({onOpenBook}: {onOpenBook: () => void}) {
  const [imgError, setImgError] = useState(false);
  const [activeLang, setActiveLang] = useState('KZ');

  return (
    <div className="mx-auto max-w-5xl">
      <div className="relative flex overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-[0_24px_48px_-12px_rgba(15,23,42,0.18),0_8px_0_#cbd5e1]">
        <div
          aria-hidden="true"
          className="hidden w-10 shrink-0 flex-col items-center justify-between bg-gradient-to-r from-sky-800 via-sky-700 to-sky-600 py-8 text-sky-100 shadow-inner sm:flex"
        >
          <span className="h-2 w-2 rounded-full bg-sky-300/60" />
          <span className="-rotate-90 whitespace-nowrap font-display text-xs font-semibold tracking-wider text-sky-100/90">
            2-СЫНЫП · II БӨЛІМ
          </span>
          <span className="h-2 w-2 rounded-full bg-sky-300/60" />
        </div>

        <div className="paper-texture grid flex-1 grid-cols-1 items-stretch gap-8 p-6 sm:p-10 lg:grid-cols-12">
          <div className="flex flex-col justify-between gap-6 lg:col-span-6">
            <div>
              <p className="text-xs font-semibold tracking-wide text-slate-500">
                Цифрлық сауаттылық · II бөлім · 30–33-беттер
              </p>

              <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                Цифрлық сауаттылық. 2-сынып.
                <span className="mt-1 block text-sky-700">
                  § 8: Өз кейіпкеріңді жасау
                </span>
              </h1>

              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Интерактивті 3D-оқулық және электрондық жұмыс дәптері. Scratch
                графикалық редакторын меңгер, өз кейіпкеріңді сал және алғашқы
                бағдарламаңды құрастыр!
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_6px_0_#e2e8f0]">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                  <Globe className="h-4 w-4 text-sky-600" />
                  <span>Үштілді сөздік</span>
                </div>
                <span className="text-xs font-medium text-slate-500">
                  Сөзді бас
                </span>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {TRILINGUAL_KZ.map((item) => {
                  const isActive = activeLang === item.short;
                  return (
                    <button
                      key={item.short}
                      type="button"
                      onClick={() => setActiveLang(item.short)}
                      className={`rounded-lg border p-2.5 text-left transition-all ${
                        isActive
                          ? 'border-sky-300 bg-sky-50/70 shadow-sm'
                          : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                      }`}
                    >
                      <span className="block text-[11px] font-semibold text-slate-500">
                        {item.lang}
                      </span>
                      <span
                        className={`mt-0.5 block font-display text-sm font-bold leading-snug ${item.accent}`}
                      >
                        {item.word}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="mt-3 border-t border-slate-100 pt-2.5 text-xs text-slate-600">
                кейіпкер құру – создание персонажа – character creation
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenBook}
                className="btn-3d inline-flex min-h-[48px] items-center gap-3 whitespace-nowrap rounded-xl bg-sky-600 px-7 py-3.5 font-display text-base font-bold text-white shadow-[0_6px_0_#0369a1] hover:bg-sky-500"
              >
                <BookOpen className="h-5 w-5 shrink-0" />
                <span>Оқулықты ашу</span>
                <ArrowRight className="h-5 w-5 shrink-0" />
              </button>
              <a
                href="/"
                className="inline-flex min-h-[44px] items-center gap-1.5 whitespace-nowrap rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-display text-sm font-bold text-slate-700 shadow-xs transition-colors hover:border-sky-300 hover:text-sky-700"
              >
                <Globe className="h-4 w-4 text-sky-600" />
                <span>Русская версия</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-center lg:col-span-6">
            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-amber-50/50 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.12)]">
              {!imgError ? (
                <img
                  src="/src/assets/images/book_cover_hero_1795725589282.jpg"
                  alt="Оқушы графикалық планшетте өз кейіпкерін салып жатыр"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="aspect-[4/3] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[4/3] w-full flex-col items-center justify-center bg-gradient-to-br from-sky-100 via-amber-50 to-emerald-100 p-8 text-center">
                  <Sparkles className="h-12 w-12 text-sky-600" />
                  <p className="mt-3 font-display text-lg font-bold text-slate-800">
                    Scratch-та өз кейіпкеріңді жасау
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-3 text-xs text-slate-600">
                <span className="font-semibold text-slate-800">
                  Scratch графикалық редакторы
                </span>
                <span>Интерактивті 3D-кітап</span>
              </div>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="hidden w-3 shrink-0 border-l border-slate-200 bg-gradient-to-r from-slate-100 via-white to-slate-200 sm:block"
        />
      </div>
    </div>
  );
}

/* ---------------- 1-бет: Оқулық теориясы ---------------- */
const THEORY_CARDS_KZ = [
  {
    id: 'editor-window',
    number: '01',
    title: 'Scratch графикалық редакторының терезесі',
    subtitle: 'Жұмыс терезесінің құрылымы',
    accentBg: 'bg-sky-50',
    accentBorder: 'border-sky-200',
    accentText: 'text-sky-700',
    summary:
      'Мұнда спрайттардың костюмдері мен сахна фондары салынады. Терезе бөліктерін көру үшін бас!',
  },
  {
    id: 'image-controls',
    number: '02',
    title: 'Суретті басқару',
    subtitle: 'Редактордың 4 маңызды батырмасы',
    accentBg: 'bg-amber-50',
    accentBorder: 'border-amber-200',
    accentText: 'text-amber-700',
    summary:
      'Суретті қиюға, айнадағыдай бейнелеуге және кейіпкердің орталық нүктесін орнатуға көмектеседі.',
  },
  {
    id: 'drawing-tools',
    number: '03',
    title: 'Сурет салу құралдары',
    subtitle: 'Қылқалам, Құю, Фигуралар, Өшіргіш, Таңдау',
    accentBg: 'bg-emerald-50',
    accentBorder: 'border-emerald-200',
    accentText: 'text-emerald-700',
    summary:
      'Сызықтар мен пішіндер салуға, бояуға арналған Scratch суретшісінің негізгі құралдары.',
  },
  {
    id: 'stage-backdrop',
    number: '04',
    title: 'Сахна фоны',
    subtitle: 'Өз суретің немесе кітапхана',
    accentBg: 'bg-orange-50',
    accentBorder: 'border-orange-200',
    accentText: 'text-orange-700',
    summary:
      'Фонды қолмен салуға немесе Scratch кітапханасынан дайын фон таңдауға болады.',
  },
];

export function KzEditorTheory({
  flippedIds,
  onCardFlip,
}: {
  flippedIds: string[];
  onCardFlip: (cardId: string) => void;
}) {
  const [localFlipped, setLocalFlipped] = useState<Record<string, boolean>>({});
  const [zoomedCardId, setZoomedCardId] = useState<string | null>(null);

  const toggleFlip = (id: string) => {
    setLocalFlipped((prev) => ({...prev, [id]: !prev[id]}));
    onCardFlip(id);
  };

  const renderBack = (id: string) => {
    switch (id) {
      case 'editor-window':
        return (
          <div className="space-y-3 text-sm text-slate-700">
            <div className="rounded-lg border border-sky-200 bg-sky-50/70 p-3">
              <div className="mb-2 flex items-center justify-between text-xs font-bold text-sky-900">
                <span>Scratch терезесінің сызбасы</span>
                <span>30-бет</span>
              </div>
              <div className="grid grid-cols-12 gap-2 text-xs">
                <div className="col-span-3 space-y-1 rounded border border-sky-200 bg-white p-1.5 text-center font-medium text-slate-700">
                  <div className="rounded bg-sky-100 py-1">Қылқалам</div>
                  <div className="rounded bg-slate-100 py-1">Фигуралар</div>
                  <div className="rounded bg-slate-100 py-1">Құю</div>
                  <div className="rounded bg-slate-100 py-1">Өшіргіш</div>
                </div>
                <div className="col-span-9 flex flex-col justify-between rounded border border-dashed border-sky-300 bg-white p-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Болдырмау / Қайталау</span>
                    <span>Тазалау · Қосу · Импорт</span>
                  </div>
                  <div className="my-2 flex items-center justify-center rounded bg-slate-50 py-3 font-semibold text-sky-800">
                    Жұмыс аймағы (кенеп)
                  </div>
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="font-medium text-slate-600">
                      Сызық ені: ▬▬▬
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="h-3 w-3 rounded-sm bg-rose-500" />
                      <span className="h-3 w-3 rounded-sm bg-amber-400" />
                      <span className="h-3 w-3 rounded-sm bg-emerald-500" />
                      <span className="h-3 w-3 rounded-sm bg-sky-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ul className="space-y-1.5 text-xs leading-relaxed text-slate-700 sm:text-sm">
              <li>
                <strong>Жұмыс аймағы</strong> — кейіпкер салынатын орын.
              </li>
              <li>
                <strong>Құралдар тақтасы</strong> және <strong>түстер палитрасы</strong> — қылқаламды, түсті және сызық енін таңдау.
              </li>
              <li>
                <strong>Басқару батырмалары</strong> — әрекетті болдырмау, кенепті тазалау, сурет қосу немесе импорттау.
              </li>
            </ul>
          </div>
        );
      case 'image-controls':
        return (
          <div className="grid grid-cols-1 gap-2.5 text-xs sm:grid-cols-2 sm:text-sm">
            <div className="flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50/50 p-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-amber-700 shadow-sm">
                <Crop className="h-4 w-4" />
              </div>
              <div>
                <p className="font-bold text-slate-900">1. Ерекшелеу бойынша қию</p>
                <p className="text-xs text-slate-600">
                  Ерекшеленген суреттің айналасындағы артық шеттерді қиып тастайды.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50/50 p-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-amber-700 shadow-sm">
                <FlipHorizontal2 className="h-4 w-4" />
              </div>
              <div>
                <p className="font-bold text-slate-900">2. Спрайтты көлденең бейнелеу</p>
                <p className="text-xs text-slate-600">
                  Кейіпкерді оңға немесе солға бұрады (солға-оңға қараған қос жебе).
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50/50 p-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-amber-700 shadow-sm">
                <FlipVertical2 className="h-4 w-4" />
              </div>
              <div>
                <p className="font-bold text-slate-900">3. Спрайтты тік бейнелеу</p>
                <p className="text-xs text-slate-600">
                  Суретті жоғарыдан төменге қарай аударады.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50/50 p-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-amber-700 shadow-sm">
                <Crosshair className="h-4 w-4" />
              </div>
              <div>
                <p className="font-bold text-slate-900">4. Спрайт ортасын өзгерту</p>
                <p className="text-xs text-slate-600">
                  Спрайт айналатын орталық нүктені белгілейді.
                </p>
              </div>
            </div>
          </div>
        );
      case 'drawing-tools':
        return (
          <ul className="space-y-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
            <li className="flex items-start gap-2">
              <Paintbrush className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
              <span>
                <strong>Қылқалам</strong> — сурет салу құралы (түсі мен сызық қалыңдығы параметрлер тақтасынан таңдалады).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <PaintBucket className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
              <span>
                <strong>Құю</strong> — тұйықталған аймақты таңдалған түспен бояйды.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Shapes className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
              <span>
                <strong>Фигуралар (а)</strong> — түзу сызық, тіктөртбұрыш және шеңбер салу.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Eraser className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
              <span>
                <strong>Өшіргіш (в)</strong> — қате жерлерді өшіреді.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <MousePointer2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
              <span>
                <strong>Таңдау / Ерекшелеу (г)</strong> — нысанды үлкейту, кішірейту, өшіру немесе көшіру (
                <kbd className="rounded border border-slate-300 bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-900">
                  Ctrl + C
                </kbd>
                ).
              </span>
            </li>
          </ul>
        );
      case 'stage-backdrop':
        return (
          <div className="space-y-3 text-xs leading-relaxed text-slate-700 sm:text-sm">
            <div className="rounded-lg border border-orange-200 bg-orange-50/70 p-3">
              <div className="flex items-center gap-2 font-bold text-orange-900">
                <ImagePlus className="h-4 w-4 text-orange-600" />
                <span>Сахна астындағы «Жаңа фон» бөлімі</span>
              </div>
              <p className="mt-1.5 text-xs text-slate-700">
                1. Фонды графикалық редакторда қолмен салу үшін <strong>қылқалам белгішесін</strong> бас.
              </p>
              <p className="mt-1 text-xs text-slate-700">
                2. Немесе Scratch кітапханасынан дайын фон таңдау үшін <strong>пейзаж белгішесін</strong> бас.
              </p>
            </div>
            <p className="text-xs text-slate-600">
              Кеңес: кейіпкер жақсы көрінуі үшін фонды ірі пішіндермен сал — аспан, күн, соқпақ, мектеп және үй!
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const zoomedCard = THEORY_CARDS_KZ.find((c) => c.id === zoomedCardId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-sky-200 bg-sky-50/70 p-4 sm:flex-row sm:items-center sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-600 text-white shadow-sm">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-sky-800">
              Оқулық · 1-бет · 30–31-беттер
            </p>
            <h2 className="font-display text-lg font-bold text-slate-900 sm:text-xl">
              Scratch графикалық редакторымен танысу
            </h2>
            <p className="mt-0.5 text-sm text-slate-700">
              <strong>Сабақтың мақсаты:</strong> Scratch графикалық редакторында
              өз кейіпкеріңді жасап үйрену.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-sm font-semibold text-slate-700">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span className="tabular-nums">
            Ашылған карталар: {flippedIds.length} / 4
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {THEORY_CARDS_KZ.map((card) => {
          const isFlipped = !!localFlipped[card.id];
          const isSeen = flippedIds.includes(card.id);

          return (
            <div
              key={card.id}
              className="perspective-1000 relative min-h-[300px] w-full"
            >
              <div
                className={`preserve-3d relative h-full min-h-[300px] w-full transition-transform duration-500 ease-out ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                <div
                  onClick={() => toggleFlip(card.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleFlip(card.id);
                    }
                  }}
                  className={`backface-hidden absolute inset-0 flex cursor-pointer flex-col justify-between rounded-xl border bg-white p-6 shadow-[0_8px_0_#e2e8f0] transition-shadow hover:shadow-[0_10px_20px_-5px_rgba(15,23,42,0.12),0_8px_0_#cbd5e1] ${card.accentBorder}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`font-display text-sm font-bold ${card.accentText}`}
                      >
                        Карта {card.number} · {card.subtitle}
                      </span>
                      {isSeen && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Оқылды
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 font-display text-xl font-bold text-slate-900">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {card.summary}
                    </p>
                  </div>

                  <div
                    className={`mt-4 flex items-center justify-between rounded-lg border px-4 py-3 ${card.accentBg} ${card.accentBorder}`}
                  >
                    <span className={`text-sm font-bold ${card.accentText}`}>
                      Аудару үшін бас
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCardFlip(card.id);
                        setZoomedCardId(card.id);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                      <span>Үлкейту</span>
                    </button>
                  </div>
                </div>

                <div
                  className={`backface-hidden rotate-y-180 absolute inset-0 flex flex-col justify-between rounded-xl border bg-white p-5 shadow-[0_8px_0_#e2e8f0] ${card.accentBorder}`}
                >
                  <div className="overflow-y-auto pr-1">
                    <div className="mb-3 flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                      <h3 className="font-display text-base font-bold text-slate-900">
                        {card.number}. {card.title}
                      </h3>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setZoomedCardId(card.id)}
                          className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                        >
                          <Maximize2 className="h-3.5 w-3.5" />
                          <span>Ірілеу</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleFlip(card.id)}
                          className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          <span>Кері</span>
                        </button>
                      </div>
                    </div>
                    {renderBack(card.id)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {zoomedCard && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs"
          onClick={() => setZoomedCardId(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <p className={`text-xs font-bold ${zoomedCard.accentText}`}>
                  Карта {zoomedCard.number} · {zoomedCard.subtitle}
                </p>
                <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
                  {zoomedCard.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setZoomedCardId(null)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-5">{renderBack(zoomedCard.id)}</div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setZoomedCardId(null)}
                className="btn-3d rounded-xl bg-sky-600 px-5 py-2.5 font-display text-sm font-bold text-white shadow-[0_4px_0_#0369a1] hover:bg-sky-500"
              >
                Түсінікті!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- 2-бет: Жоба + Бейне + «Кодтағы қатені тап» ---------------- */
const KZ_DEBUG_ROUNDS = [
  {
    id: 'r1',
    title: '1-тапсырма (3-тен): Қозғалысты іске қосу',
    prompt:
      'Баланы тінтуірмен басқанда, ол орнынан қозғалмай тұр. Скрипттегі қай блок қате?',
    blocks: [
      {
        id: 'b1',
        label: '[бос орын] пернесі басылғанда',
        bg: 'bg-amber-500',
        shadow: 'shadow-[0_3px_0_#b45309]',
      },
      {
        id: 'b2',
        label: 'егер <[жасыл] түске тисе?>, онда',
        bg: 'bg-orange-500',
        shadow: 'shadow-[0_3px_0_#c2410c]',
        swatch: '#10b981',
      },
      {
        id: 'b3',
        label: '10 қадам жүру',
        bg: 'bg-sky-600',
        shadow: 'shadow-[0_3px_0_#0369a1]',
        indent: true,
      },
      {
        id: 'b4',
        label: 'осы скриптті тоқтату',
        bg: 'bg-amber-600',
        shadow: 'shadow-[0_3px_0_#92400e]',
        indent: true,
      },
    ],
    bugId: 'b1',
    okHint:
      'Дұрыс! Кейіпкерді басқанда жүруі үшін «спрайтты басқанда» блогы қажет.',
    errHint:
      'Бұл блок дұрыс. Оқиғалар бөліміндегі ең бірінші іске қосу блогына қара!',
  },
  {
    id: 'r2',
    title: '2-тапсырма (3-тен): Тоқтау шарты',
    prompt:
      'Бала үйдің жанындағы жасыл шөпке жетті, бірақ тоқтамады. Қате блокты тап!',
    blocks: [
      {
        id: 'b1',
        label: 'спрайтты басқанда',
        bg: 'bg-amber-500',
        shadow: 'shadow-[0_3px_0_#b45309]',
      },
      {
        id: 'b2',
        label: 'егер <[күлгін] түске тисе?>, онда',
        bg: 'bg-orange-500',
        shadow: 'shadow-[0_3px_0_#c2410c]',
        swatch: '#9333ea',
      },
      {
        id: 'b3',
        label: '10 қадам жүру',
        bg: 'bg-sky-600',
        shadow: 'shadow-[0_3px_0_#0369a1]',
        indent: true,
      },
      {
        id: 'b4',
        label: 'осы скриптті тоқтату',
        bg: 'bg-amber-600',
        shadow: 'shadow-[0_3px_0_#92400e]',
        indent: true,
      },
    ],
    bugId: 'b2',
    okHint:
      'Жарайсың! Жобада бала жасыл түске тигенде тоқтауы керек, ал мұнда күлгін таңдалған.',
    errHint:
      'Мұнда қате жоқ. Шарт ішіндегі түске назар аудар!',
  },
  {
    id: 'r3',
    title: '3-тапсырма (3-тен): Жүру командасы',
    prompt:
      'Бала жолмен үйге қарай түзу жүрмей, бір орында айналып тұр. Қай блок кінәлі?',
    blocks: [
      {
        id: 'b1',
        label: 'спрайтты басқанда',
        bg: 'bg-amber-500',
        shadow: 'shadow-[0_3px_0_#b45309]',
      },
      {
        id: 'b2',
        label: 'егер <[жасыл] түске тисе?>, онда',
        bg: 'bg-orange-500',
        shadow: 'shadow-[0_3px_0_#c2410c]',
        swatch: '#10b981',
      },
      {
        id: 'b3',
        label: '15 градусқа бұрылу',
        bg: 'bg-sky-600',
        shadow: 'shadow-[0_3px_0_#0369a1]',
        indent: true,
      },
      {
        id: 'b4',
        label: 'осы скриптті тоқтату',
        bg: 'bg-amber-600',
        shadow: 'shadow-[0_3px_0_#92400e]',
        indent: true,
      },
    ],
    bugId: 'b3',
    okHint:
      'Тамаша! Алға жүру үшін бұрылу емес, «10 қадам жүру» блогы қолданылады.',
    errHint:
      'Бұл блок дұрыс. Кейіпкерді айналдырып тұрған көк блокты тап!',
  },
];

export function KzProjectVideo({
  videoWatched,
  onVideoWatch,
  onCelebrate,
}: {
  videoWatched: boolean;
  onVideoWatch: () => void;
  onCelebrate: () => void;
}) {
  const [boyProgress, setBoyProgress] = useState(12);
  const [isWalking, setIsWalking] = useState(false);
  const [stoppedOnGreen, setStoppedOnGreen] = useState(false);
  const [isPlayerActive, setIsPlayerActive] = useState(false);

  const [roundIdx, setRoundIdx] = useState(0);
  const [selectedBugId, setSelectedBugId] = useState<string | null>(null);
  const [bugChecked, setBugChecked] = useState(false);
  const [solved, setSolved] = useState<Record<string, boolean>>({});

  const walkRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isWalking) return;
    walkRef.current = window.setInterval(() => {
      setBoyProgress((prev) => {
        if (prev >= 76) {
          setIsWalking(false);
          setStoppedOnGreen(true);
          return 78;
        }
        return prev + 6;
      });
    }, 220);
    return () => {
      if (walkRef.current !== null) clearInterval(walkRef.current);
    };
  }, [isWalking]);

  const ytMatch = VIDEO_PRACTICE_URL_KZ.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]+)/
  );

  const round = KZ_DEBUG_ROUNDS[roundIdx];
  const bugRight = bugChecked && selectedBugId === round.bugId;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-4 sm:flex-row sm:items-center sm:px-6">
        <div>
          <p className="text-xs font-semibold text-amber-800">
            Оқулық · 2-бет · 32–33-беттер
          </p>
          <h2 className="font-display text-lg font-bold text-slate-900 sm:text-xl">
            «Мектептен үйге қайту» жобасы және Бейне-тәжірибе
          </h2>
        </div>
        <span className="text-xs font-semibold text-slate-600">
          Қадамдық нұсқаулық + бейне-сабақ
        </span>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-6">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_6px_0_#e2e8f0]">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-600 font-display text-sm font-bold text-white">
                1
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-slate-900">
                  Сахна фонын салу
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Фон редакторында <strong>үй</strong>, <strong>мектеп</strong>,{' '}
                  <strong>соқпақ жол</strong>, <strong>күн</strong> және үй
                  алдындағы <strong>жасыл аймақты</strong> сал.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_6px_0_#e2e8f0]">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600 font-display text-sm font-bold text-white">
                2
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-slate-900">
                  Жаңа спрайт салу
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  «Жаңа спрайт» жанындағы{' '}
                  <span className="inline-flex items-center gap-1 rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-xs font-bold text-slate-800">
                    <Paintbrush className="h-3 w-3 text-emerald-700" />
                    Жаңа спрайт салу
                  </span>{' '}
                  батырмасын басып, оқушы баланың суретін сал.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_6px_0_#e2e8f0]">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-600 font-display text-sm font-bold text-white">
                3
              </span>
              <div className="w-full">
                <h3 className="font-display text-base font-bold text-slate-900">
                  Кейіпкер қозғалысының скриптін құрастыру
                </h3>
                <p className="mt-1 text-xs text-slate-600">
                  Бала жасыл түске тигенде тоқтайды:
                </p>
                <div className="mt-3 space-y-1.5 rounded-lg border border-slate-200 bg-slate-50 p-3 font-display text-xs font-bold text-white">
                  <div className="inline-block rounded-t-xl rounded-br-lg bg-amber-500 px-3.5 py-2 shadow-[0_3px_0_#b45309]">
                    спрайтты басқанда{' '}
                    <span className="font-sans font-normal text-amber-100">
                      (Оқиғалар)
                    </span>
                  </div>
                  <div className="rounded-lg bg-orange-500 p-2 shadow-[0_3px_0_#c2410c]">
                    <div className="flex flex-wrap items-center gap-1.5 pb-1.5">
                      <span>егер</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500 px-2.5 py-0.5 text-[11px]">
                        түске тисе
                        <span className="inline-block h-3.5 w-5 rounded border border-white bg-emerald-500" />
                        ?
                      </span>
                      <span>, онда</span>
                    </div>
                    <div className="ml-4 rounded-md bg-orange-400/30 p-1.5">
                      <div className="inline-block rounded-md bg-sky-600 px-3 py-1.5 shadow-[0_2px_0_#0369a1]">
                        10 қадам жүру
                      </div>
                    </div>
                    <div className="py-1 text-xs">әйтпесе</div>
                    <div className="ml-4 rounded-md bg-orange-400/30 p-1.5">
                      <div className="inline-block rounded-md bg-amber-600 px-3 py-1.5 shadow-[0_2px_0_#92400e]">
                        осы скриптті тоқтату
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-5 lg:col-span-6">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_6px_0_#e2e8f0]">
            <div className="mb-2.5 flex items-center justify-between gap-2">
              <span className="font-display text-sm font-bold text-slate-900">
                Осы жерде тексеріп көр: баланы бас!
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsWalking(false);
                  setStoppedOnGreen(false);
                  setBoyProgress(12);
                }}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Басынан</span>
              </button>
            </div>

            <div className="relative h-36 overflow-hidden rounded-lg border border-sky-200 bg-gradient-to-b from-sky-200 via-sky-100 to-amber-100">
              <div className="absolute right-10 top-3 h-8 w-8 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.8)]" />
              <div className="absolute bottom-7 left-3 flex flex-col items-center">
                <div className="h-0 w-0 border-x-[22px] border-b-[16px] border-x-transparent border-b-rose-500" />
                <div className="flex h-12 w-11 items-end justify-center rounded-b border border-amber-400 bg-amber-200 pb-1 text-[9px] font-bold text-amber-900">
                  Мектеп
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-7 border-t border-amber-300 bg-amber-200/90" />
              <div className="absolute bottom-0 right-14 flex h-7 w-12 items-center justify-center border-t-2 border-emerald-600 bg-emerald-500/90 text-[9px] font-bold text-white">
                Шөп
              </div>
              <div className="absolute bottom-7 right-3 flex flex-col items-center">
                <div className="h-0 w-0 border-x-[24px] border-b-[18px] border-x-transparent border-b-orange-600" />
                <div className="flex h-12 w-11 items-end justify-center rounded-b border border-orange-300 bg-orange-100 pb-1 text-[9px] font-bold text-orange-900">
                  Үй
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (stoppedOnGreen) {
                    setBoyProgress(12);
                    setStoppedOnGreen(false);
                  }
                  setIsWalking(true);
                }}
                style={{left: `${boyProgress}%`}}
                className="btn-3d absolute bottom-5 -translate-x-1/2 cursor-pointer rounded-lg bg-white/85 px-2 py-1 text-center shadow-md ring-2 ring-sky-500 transition-[left] duration-200"
              >
                <span className="block text-xl leading-none">🧒</span>
                <span className="mt-0.5 block text-[10px] font-bold text-sky-900">
                  {stoppedOnGreen ? 'Тоқтады!' : isWalking ? 'Жүрді...' : 'Бас'}
                </span>
              </button>
            </div>

            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-slate-600">
                <MousePointerClick className="h-3.5 w-3.5 text-sky-600" />
                {stoppedOnGreen
                  ? 'Бала жасыл түске тиіп, үйдің алдында тоқтады!'
                  : isWalking
                    ? '«әйтпесе → 10 қадам жүру» орындалуда...'
                    : 'Скриптті қосу үшін спрайтты бас.'}
              </span>
              {stoppedOnGreen && (
                <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Дайын!
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-[0_8px_0_#cbd5e1]">
            <div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-sky-600" />
                  <h3 className="font-display text-base font-bold text-slate-900">
                    Бейне-тәжірибе
                  </h3>
                </div>
                {videoWatched && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Қаралды
                  </span>
                )}
              </div>

              <div className="relative mt-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-inner">
                {ytMatch ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${ytMatch[1]}${isPlayerActive ? '?autoplay=1' : ''}`}
                    title="Scratch жобасы бойынша бейне-нұсқаулық"
                    className="aspect-video w-full"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={VIDEO_PRACTICE_URL_KZ}
                    controls
                    onPlay={onVideoWatch}
                    className="aspect-video w-full bg-black"
                  />
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsPlayerActive(true);
                  onVideoWatch();
                }}
                className="btn-3d inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-xl bg-sky-600 px-5 py-2.5 font-display text-sm font-bold text-white shadow-[0_5px_0_#0369a1] hover:bg-sky-500"
              >
                <Play className="h-4 w-4 fill-current" />
                <span>Бейне-нұсқаулықты көру</span>
              </button>
              <span className="text-xs text-slate-500">
                Scratch-та орындау алдында қара
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Мини-ойын: Кодтағы қатені тап */}
      <div className="rounded-xl border border-rose-200 bg-white p-5 shadow-[0_8px_0_#fecdd3] sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-600 text-white">
              <Bug className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-slate-900 sm:text-lg">
                Шағын ойын «Кодтағы қатені тап»
              </h3>
              <p className="text-xs text-slate-600 sm:text-sm">
                Кейіпкер қозғалысының скриптіндегі қате Scratch блогын таңдап,
                тексер.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {KZ_DEBUG_ROUNDS.map((r, idx) => (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  setRoundIdx(idx);
                  setSelectedBugId(null);
                  setBugChecked(false);
                }}
                className={`rounded-lg border px-2.5 py-1 font-display text-xs font-bold ${
                  idx === roundIdx
                    ? 'border-rose-600 bg-rose-600 text-white'
                    : solved[r.id]
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                }`}
              >
                #{idx + 1}
                {solved[r.id] ? ' ✓' : ''}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-5">
            <p className="font-display text-sm font-bold text-rose-800">
              {round.title}
            </p>
            <p className="text-sm leading-relaxed text-slate-700">
              {round.prompt}
            </p>
            <div className="text-xs font-semibold text-slate-500 tabular-nums">
              Табылған қателер: {Object.values(solved).filter(Boolean).length} / 3
            </div>

            {bugChecked && (
              <div
                className={`flex items-start gap-2.5 rounded-xl border p-3.5 text-xs font-semibold sm:text-sm ${
                  bugRight
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                    : 'border-rose-300 bg-rose-50 text-rose-950'
                }`}
              >
                {bugRight ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                ) : (
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                )}
                <span>{bugRight ? round.okHint : round.errHint}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                disabled={!selectedBugId}
                onClick={() => {
                  setBugChecked(true);
                  if (selectedBugId === round.bugId) {
                    setSolved((prev) => ({...prev, [round.id]: true}));
                    onCelebrate();
                  }
                }}
                className="btn-3d inline-flex min-h-[42px] items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 font-display text-sm font-bold text-white shadow-[0_4px_0_#047857] hover:bg-emerald-500 disabled:bg-slate-300 disabled:shadow-none"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Тексеру</span>
              </button>

              {bugRight && roundIdx < KZ_DEBUG_ROUNDS.length - 1 && (
                <button
                  type="button"
                  onClick={() => {
                    setRoundIdx((p) => p + 1);
                    setSelectedBugId(null);
                    setBugChecked(false);
                  }}
                  className="btn-3d inline-flex min-h-[42px] items-center gap-1.5 rounded-xl bg-sky-600 px-4 py-2 font-display text-sm font-bold text-white shadow-[0_4px_0_#0369a1]"
                >
                  <span>Келесі</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 lg:col-span-7">
            <p className="mb-2.5 text-xs font-bold text-slate-500">
              Қате блокты таңда (үстінен бас):
            </p>
            <div className="space-y-2">
              {round.blocks.map((b) => {
                const picked = selectedBugId === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => {
                      setSelectedBugId(b.id);
                      setBugChecked(false);
                    }}
                    className={`btn-3d flex items-center justify-between gap-3 rounded-lg px-4 py-2.5 text-left font-display text-xs font-bold text-white sm:text-sm ${b.bg} ${b.shadow} ${
                      b.indent ? 'ml-5 w-[calc(100%-1.25rem)]' : 'w-full'
                    } ${picked ? 'ring-3 ring-slate-900 ring-offset-2' : ''}`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{b.label}</span>
                      {b.swatch && (
                        <span
                          style={{backgroundColor: b.swatch}}
                          className="inline-block h-3.5 w-5 rounded border border-white"
                        />
                      )}
                    </span>
                    <span className="rounded bg-black/20 px-2 py-0.5 text-[11px]">
                      {picked ? 'Таңдалды' : 'Таңдау'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
