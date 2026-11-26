import {useState} from 'react';
import {
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
} from 'lucide-react';

interface SpreadEditorTheoryProps {
  flippedIds: string[];
  onCardFlip: (cardId: string) => void;
}

interface TheoryCardData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  accentBg: string;
  accentBorder: string;
  accentText: string;
  summary: string;
}

const THEORY_CARDS: TheoryCardData[] = [
  {
    id: 'editor-window',
    number: '01',
    title: 'Окно графического редактора Scratch',
    subtitle: 'Как устроено рабочее окно',
    accentBg: 'bg-sky-50',
    accentBorder: 'border-sky-200',
    accentText: 'text-sky-700',
    summary:
      'Здесь мы рисуем и меняем костюмы спрайтов и фоны. Нажми, чтобы рассмотреть все части окна!',
  },
  {
    id: 'image-controls',
    number: '02',
    title: 'Управление рисунком',
    subtitle: '4 важные кнопки редактора',
    accentBg: 'bg-amber-50',
    accentBorder: 'border-amber-200',
    accentText: 'text-amber-700',
    summary:
      'Помогают обрезать рисунок, отразить его как в зеркале и установить центр персонажа.',
  },
  {
    id: 'drawing-tools',
    number: '03',
    title: 'Инструменты рисования',
    subtitle: 'Кисть, Заливка, Фигуры, Ластик, Выбор',
    accentBg: 'bg-emerald-50',
    accentBorder: 'border-emerald-200',
    accentText: 'text-emerald-700',
    summary:
      'Главные инструменты художника в Scratch для создания линий, фигур и закрашивания.',
  },
  {
    id: 'stage-backdrop',
    number: '04',
    title: 'Фон сцены',
    subtitle: 'Свой рисунок или библиотека',
    accentBg: 'bg-orange-50',
    accentBorder: 'border-orange-200',
    accentText: 'text-orange-700',
    summary:
      'Фон можно нарисовать самому или выбрать из готовой библиотеки фонов Scratch.',
  },
];

export function SpreadEditorTheory({
  flippedIds,
  onCardFlip,
}: SpreadEditorTheoryProps) {
  const [localFlipped, setLocalFlipped] = useState<Record<string, boolean>>({});
  const [zoomedCardId, setZoomedCardId] = useState<string | null>(null);

  const toggleFlip = (id: string) => {
    setLocalFlipped((prev) => ({...prev, [id]: !prev[id]}));
    onCardFlip(id);
  };

  const renderCardBackDetails = (id: string) => {
    switch (id) {
      case 'editor-window':
        return (
          <div className="space-y-3 text-sm text-slate-700">
            <div className="rounded-lg border border-sky-200 bg-sky-50/70 p-3">
              <div className="mb-2 flex items-center justify-between text-xs font-bold text-sky-900">
                <span>Мини-схема окна Scratch</span>
                <span>Стр. 30</span>
              </div>
              <div className="grid grid-cols-12 gap-2 text-xs">
                <div className="col-span-3 space-y-1 rounded border border-sky-200 bg-white p-1.5 text-center font-medium text-slate-700">
                  <div className="rounded bg-sky-100 py-1">Кисть</div>
                  <div className="rounded bg-slate-100 py-1">Фигуры</div>
                  <div className="rounded bg-slate-100 py-1">Заливка</div>
                  <div className="rounded bg-slate-100 py-1">Ластик</div>
                </div>
                <div className="col-span-9 flex flex-col justify-between rounded border border-dashed border-sky-300 bg-white p-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Отменить / Повторить</span>
                    <span>Очистить · Добавить · Импорт</span>
                  </div>
                  <div className="my-2 flex items-center justify-center rounded bg-slate-50 py-3 font-semibold text-sky-800">
                    Рабочая область (холст)
                  </div>
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="font-medium text-slate-600">
                      Ширина линии: ▬▬▬
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
                <strong>Рабочая область</strong> — место, где рисуется персонаж.
              </li>
              <li>
                <strong>Панель инструментов</strong> и <strong>цветовая палитра</strong> — выбор кисти, цвета и ширины линии.
              </li>
              <li>
                <strong>Кнопки действий</strong> — отмена действия, очистить холст, добавить или импортировать изображение.
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
                <p className="font-bold text-slate-900">1. Обрезать по выделению</p>
                <p className="text-xs text-slate-600">
                  Удаляет лишние края вокруг выделенного рисунка.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50/50 p-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-amber-700 shadow-sm">
                <FlipHorizontal2 className="h-4 w-4" />
              </div>
              <div>
                <p className="font-bold text-slate-900">
                  2. Отразить спрайт горизонтально
                </p>
                <p className="text-xs text-slate-600">
                  Разворачивает героя влево или вправо (две стрелки влево-вправо).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50/50 p-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-amber-700 shadow-sm">
                <FlipVertical2 className="h-4 w-4" />
              </div>
              <div>
                <p className="font-bold text-slate-900">
                  3. Отразить спрайт вертикально
                </p>
                <p className="text-xs text-slate-600">
                  Переворачивает рисунок сверху вниз.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50/50 p-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-amber-700 shadow-sm">
                <Crosshair className="h-4 w-4" />
              </div>
              <div>
                <p className="font-bold text-slate-900">
                  4. Изменить центр спрайта
                </p>
                <p className="text-xs text-slate-600">
                  Задает точку, вокруг которой спрайт будет поворачиваться.
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
                <strong>Кисть</strong> — инструмент для рисования (цвет и
                толщина линии выбираются на панели параметров).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <PaintBucket className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
              <span>
                <strong>Заливка</strong> — закрашивает замкнутую область
                выбранным цветом.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Shapes className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
              <span>
                <strong>Фигуры (а)</strong> — изображение линий, прямоугольника
                и круга.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Eraser className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
              <span>
                <strong>Ластик (в)</strong> — аккуратно стирает ошибки.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <MousePointer2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
              <span>
                <strong>Выбор / Выделение (г)</strong> — выделить объект, чтобы
                увеличить, уменьшить, удалить или скопировать (клавиши{' '}
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
                <span>Раздел «Новый фон» под сценой</span>
              </div>
              <p className="mt-1.5 text-xs text-slate-700">
                1. Нажми на <strong>иконку с кисточкой</strong>, чтобы
                нарисовать фон вручную в графическом редакторе.
              </p>
              <p className="mt-1 text-xs text-slate-700">
                2. Или нажми на <strong>иконку пейзажа</strong>, чтобы выбрать
                готовый фон из библиотеки Scratch.
              </p>
            </div>
            <p className="text-xs text-slate-600">
              Совет: рисуй фон крупными формами — небо, солнце, дорожка, школа и
              дом — чтобы персонаж хорошо выделялся на сцене!
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const zoomedCard = THEORY_CARDS.find((c) => c.id === zoomedCardId);

  return (
    <div className="space-y-6">
      {/* Lesson Goal Banner (clean all-around border, no thick left bar) */}
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-sky-200 bg-sky-50/70 p-4 sm:flex-row sm:items-center sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-600 text-white shadow-sm">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-sky-800">
              Учебник · Разворот 1 · Стр. 30–31
            </p>
            <h2 className="font-display text-lg font-bold text-slate-900 sm:text-xl">
              Знакомство с графическим редактором Scratch
            </h2>
            <p className="mt-0.5 text-sm text-slate-700">
              <strong>Цель урока:</strong> научиться создавать персонаж в
              графическом редакторе Scratch.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-sm font-semibold text-slate-700">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span className="tabular-nums">
            Открыто карточек: {flippedIds.length} из 4
          </span>
        </div>
      </div>

      {/* 2-Page Spread Grid of 4 Interactive 3D Flip Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {THEORY_CARDS.map((card) => {
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
                {/* Front Face */}
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
                  aria-label={`Перевернуть карточку: ${card.title}`}
                  className={`backface-hidden absolute inset-0 flex cursor-pointer flex-col justify-between rounded-xl border bg-white p-6 shadow-[0_8px_0_#e2e8f0] transition-shadow hover:shadow-[0_10px_20px_-5px_rgba(15,23,42,0.12),0_8px_0_#cbd5e1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${card.accentBorder}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`font-display text-sm font-bold ${card.accentText}`}
                      >
                        Карточка {card.number} · {card.subtitle}
                      </span>
                      {isSeen && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Изучено
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

                  {/* Quick preview icons strip on front */}
                  <div
                    className={`mt-4 flex items-center justify-between rounded-lg border px-4 py-3 ${card.accentBg} ${card.accentBorder}`}
                  >
                    <span className={`text-sm font-bold ${card.accentText}`}>
                      Нажми, чтобы перевернуть
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCardFlip(card.id);
                        setZoomedCardId(card.id);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-sky-600"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                      <span>Увеличить</span>
                    </button>
                  </div>
                </div>

                {/* Back Face */}
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
                          title="Увеличить карточку"
                          className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                        >
                          <Maximize2 className="h-3.5 w-3.5" />
                          <span>Крупнее</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleFlip(card.id)}
                          title="Повернуть обратно"
                          className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          <span>Назад</span>
                        </button>
                      </div>
                    </div>

                    {renderCardBackDetails(card.id)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Zoom Modal for Detailed Reading */}
      {zoomedCard && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoomedCard.title}
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
                  Карточка {zoomedCard.number} · {zoomedCard.subtitle}
                </p>
                <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
                  {zoomedCard.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setZoomedCardId(null)}
                aria-label="Закрыть окно"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5">{renderCardBackDetails(zoomedCard.id)}</div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setZoomedCardId(null)}
                className="btn-3d rounded-xl bg-sky-600 px-5 py-2.5 font-display text-sm font-bold text-white shadow-[0_4px_0_#0369a1] hover:bg-sky-500"
              >
                Понятно!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
