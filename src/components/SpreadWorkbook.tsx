import {useState} from 'react';
import {
  Paintbrush,
  PaintBucket,
  Eraser,
  MousePointer2,
  FlipHorizontal2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Shapes,
  Sparkles,
  Check,
  AlertCircle,
} from 'lucide-react';
import {LessonProgress} from '../types/book';
import {
  Task5TrueFalse,
  Task6Trilingual,
  Task7MiniEditor,
} from './WorkbookExtraTasks';

interface SpreadWorkbookProps {
  progress: LessonProgress;
  onTask1Pass: () => void;
  onTask2Pass: () => void;
  onTask3Select: (objectId: string) => void;
  onTask4Save: () => void;
  onTask5Pass: () => void;
  onTask6Pass: () => void;
  onTask7Complete: () => void;
  onCelebrate: () => void;
}

type WorkbookTab =
  | 'task1'
  | 'task2'
  | 'task3'
  | 'task4'
  | 'task5'
  | 'task6'
  | 'task7';

/* ---------------- Task 1 Data ---------------- */
const TASK1_TOOLS = [
  {id: 'brush', label: 'Кисть', Icon: Paintbrush, color: 'text-sky-700'},
  {id: 'fill', label: 'Заливка', Icon: PaintBucket, color: 'text-emerald-700'},
  {id: 'eraser', label: 'Ластик', Icon: Eraser, color: 'text-rose-700'},
  {
    id: 'select',
    label: 'Выбор / Выделение',
    Icon: MousePointer2,
    color: 'text-amber-700',
  },
  {
    id: 'flipH',
    label: 'Отразить горизонтально',
    Icon: FlipHorizontal2,
    color: 'text-indigo-700',
  },
];

const TASK1_ACTIONS = [
  {
    id: 'act-flip',
    correctToolId: 'flipH',
    text: 'Разворачивает спрайт влево или вправо',
  },
  {
    id: 'act-brush',
    correctToolId: 'brush',
    text: 'Рисует линии выбранного цвета и толщины',
  },
  {
    id: 'act-select',
    correctToolId: 'select',
    text: 'Выделяет часть рисунка для копирования (Ctrl + C) или удаления',
  },
  {
    id: 'act-fill',
    correctToolId: 'fill',
    text: 'Закрашивает замкнутую область одним цветом',
  },
  {
    id: 'act-eraser',
    correctToolId: 'eraser',
    text: 'Стирает ошибки на рисунке',
  },
];

/* ---------------- Task 2 Data ---------------- */
interface ScratchBlockItem {
  id: string;
  label: string;
  bg: string;
  shadow: string;
}

const TASK2_BLOCKS: ScratchBlockItem[] = [
  {
    id: 'else',
    label: 'иначе',
    bg: 'bg-orange-500',
    shadow: 'shadow-[0_3px_0_#c2410c]',
  },
  {
    id: 'move',
    label: 'идти 10 шагов',
    bg: 'bg-sky-600',
    shadow: 'shadow-[0_3px_0_#0369a1]',
  },
  {
    id: 'event',
    label: 'когда спрайт нажат',
    bg: 'bg-amber-500',
    shadow: 'shadow-[0_3px_0_#b45309]',
  },
  {
    id: 'stop',
    label: 'стоп этот скрипт',
    bg: 'bg-amber-600',
    shadow: 'shadow-[0_3px_0_#92400e]',
  },
  {
    id: 'if',
    label: 'если <касается цвета [зеленый]?>, то',
    bg: 'bg-orange-500',
    shadow: 'shadow-[0_3px_0_#c2410c]',
  },
];

/* ---------------- Task 3 Data ---------------- */
interface CreativeObject {
  id: string;
  title: string;
  subtitle: string;
  checklist: {id: string; tool: string; hint: string}[];
}

const CREATIVE_OBJECTS: CreativeObject[] = [
  {
    id: 'cube',
    title: 'Зеленый куб',
    subtitle: 'Объемная геометрическая фигура',
    checklist: [
      {
        id: 'c1',
        tool: 'Фигуры: Прямоугольник',
        hint: 'Нарисуй квадрат — переднюю сторону куба.',
      },
      {
        id: 'c2',
        tool: 'Фигуры: Линия',
        hint: 'Проведи наклонные линии от углов и соедини верхнюю и боковую грани.',
      },
      {
        id: 'c3',
        tool: 'Заливка',
        hint: 'Закрась грани светло-зеленым, зеленым и темно-зеленым цветом.',
      },
    ],
  },
  {
    id: 'glass',
    title: 'Голубой стакан',
    subtitle: 'Прозрачный предмет с водой',
    checklist: [
      {
        id: 'g1',
        tool: 'Фигуры: Круг / Овал',
        hint: 'Нарисуй верхний край стакана и овал дна.',
      },
      {
        id: 'g2',
        tool: 'Фигуры: Линия',
        hint: 'Соедини верх и низ ровными боковыми стенками.',
      },
      {
        id: 'g3',
        tool: 'Заливка и Кисть',
        hint: 'Закрась стакан голубым цветом и добавь блик белой кистью.',
      },
    ],
  },
  {
    id: 'house',
    title: 'Домик',
    subtitle: 'Уютный дом с крышей и окном',
    checklist: [
      {
        id: 'h1',
        tool: 'Фигуры: Прямоугольник',
        hint: 'Нарисуй стены дома, дверь и окно.',
      },
      {
        id: 'h2',
        tool: 'Фигуры: Линия',
        hint: 'Сделай треугольную крышу и переплет окна.',
      },
      {
        id: 'h3',
        tool: 'Заливка и Кисть',
        hint: 'Раскрась крышу, стены и добавь дымок из трубы кистью.',
      },
    ],
  },
];

/* ---------------- Task 4 Data ---------------- */
const REFLECTION_TOOLS = [
  'Кисть',
  'Заливка',
  'Фигуры',
  'Ластик',
  'Выбор / Выделение',
  'Отразить спрайт',
];

const INTEREST_OPTIONS = [
  'Рисовать своего персонажа',
  'Собирать скрипт из блоков Scratch',
  'Выполнять задания в 3D-тетради',
  'Узнать новые слова на 3 языках',
];

export function SpreadWorkbook({
  progress,
  onTask1Pass,
  onTask2Pass,
  onTask3Select,
  onTask4Save,
  onTask5Pass,
  onTask6Pass,
  onTask7Complete,
  onCelebrate,
}: SpreadWorkbookProps) {
  const [activeTab, setActiveTab] = useState<WorkbookTab>('task1');

  /* Task 1 state */
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({}); // actionId -> toolId
  const [task1Checked, setTask1Checked] = useState(false);

  /* Task 2 state */
  const [scriptOrder, setScriptOrder] = useState<string[]>([]);
  const [algoType, setAlgoType] = useState<'linear' | 'branching' | null>(null);
  const [task2Checked, setTask2Checked] = useState(false);

  /* Task 3 state */
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});

  /* Task 4 state */
  const [favoriteTools, setFavoriteTools] = useState<string[]>([]);
  const [interestingParts, setInterestingParts] = useState<string[]>([]);
  const [reflectionNote, setReflectionNote] = useState('');

  /* Task 1 Handlers */
  const handleActionClick = (actionId: string) => {
    if (!selectedToolId) return;
    setMatches((prev) => {
      const next = {...prev};
      // Remove selectedToolId if it was already assigned to another action
      for (const key of Object.keys(next)) {
        if (next[key] === selectedToolId) {
          delete next[key];
        }
      }
      next[actionId] = selectedToolId;
      return next;
    });
    setSelectedToolId(null);
    setTask1Checked(false);
  };

  const task1CorrectCount = TASK1_ACTIONS.filter(
    (act) => matches[act.id] === act.correctToolId
  ).length;
  const task1AllMatched = Object.keys(matches).length === TASK1_ACTIONS.length;

  const checkTask1 = () => {
    setTask1Checked(true);
    if (task1CorrectCount === TASK1_ACTIONS.length) {
      onTask1Pass();
      onCelebrate();
    }
  };

  /* Task 2 Handlers */
  const availableBlocks = TASK2_BLOCKS.filter(
    (b) => !scriptOrder.includes(b.id)
  );

  const addBlockToScript = (blockId: string) => {
    setScriptOrder((prev) => [...prev, blockId]);
    setTask2Checked(false);
  };

  const removeBlockFromScript = (blockId: string) => {
    setScriptOrder((prev) => prev.filter((id) => id !== blockId));
    setTask2Checked(false);
  };

  const isScriptOrderCorrect = () => {
    const orderKey = scriptOrder.join(',');
    // Accept both exact textbook order (event,if,move,else,stop) and physical execution order (event,if,stop,else,move)
    return (
      orderKey === 'event,if,move,else,stop' ||
      orderKey === 'event,if,stop,else,move'
    );
  };

  const task2PassedNow = isScriptOrderCorrect() && algoType === 'branching';

  const checkTask2 = () => {
    setTask2Checked(true);
    if (task2PassedNow) {
      onTask2Pass();
      onCelebrate();
    }
  };

  /* Task 3 Handlers */
  const selectedObject =
    CREATIVE_OBJECTS.find((o) => o.id === progress.task3SelectedObject) || null;

  const toggleChecklistStep = (stepId: string) => {
    setCheckedSteps((prev) => ({...prev, [stepId]: !prev[stepId]}));
  };

  /* Task 4 Handlers */
  const toggleFavoriteTool = (tool: string) => {
    setFavoriteTools((prev) => {
      if (prev.includes(tool)) return prev.filter((t) => t !== tool);
      if (prev.length >= 3) return prev;
      return [...prev, tool];
    });
  };

  const toggleInteresting = (item: string) => {
    setInterestingParts((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const saveTask4 = () => {
    onTask4Save();
    onCelebrate();
  };

  const renderObjectSvg = (id: string) => {
    if (id === 'cube') {
      return (
        <svg viewBox="0 0 120 100" className="h-24 w-28 drop-shadow-sm">
          <polygon points="60,12 100,32 60,52 20,32" fill="#86efac" stroke="#15803d" strokeWidth="2.5" />
          <polygon points="20,32 60,52 60,92 20,72" fill="#22c55e" stroke="#15803d" strokeWidth="2.5" />
          <polygon points="60,52 100,32 100,72 60,92" fill="#16a34a" stroke="#15803d" strokeWidth="2.5" />
        </svg>
      );
    }
    if (id === 'glass') {
      return (
        <svg viewBox="0 0 120 100" className="h-24 w-28 drop-shadow-sm">
          <path d="M34 22 L42 86 C42 90 78 90 78 86 L86 22 Z" fill="#bae6fd" stroke="#0284c7" strokeWidth="2.5" />
          <ellipse cx="60" cy="22" rx="26" ry="7" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" />
          <path d="M39 46 Q60 52 81 46 L78 84 C78 87 42 87 42 84 Z" fill="#38bdf8" opacity="0.7" />
          <line x1="45" y1="34" x2="48" y2="74" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 120 100" className="h-24 w-28 drop-shadow-sm">
        <polygon points="60,14 18,46 102,46" fill="#f97316" stroke="#9a3412" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="28" y="46" width="64" height="42" fill="#fef3c7" stroke="#9a3412" strokeWidth="2.5" />
        <rect x="38" y="56" width="18" height="18" fill="#7dd3fc" stroke="#0369a1" strokeWidth="2" />
        <rect x="66" y="58" width="16" height="30" fill="#d97706" stroke="#78350f" strokeWidth="2" />
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Workbook Header & Task Switcher */}
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:px-6">
        <div>
          <p className="text-xs font-semibold text-slate-500">
            Разворот 3 · Рабочая тетрадь · Стр. 30–33
          </p>
          <h2 className="font-display text-lg font-bold text-slate-900 sm:text-xl">
            Интерактивные задания из учебника
          </h2>
        </div>

        {/* Segmented Control Tabs */}
        <div
          role="tablist"
          aria-label="Задания рабочей тетради"
          className="flex flex-wrap items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-xs"
        >
          {(
            [
              {id: 'task1', label: '1. Инструменты', done: progress.task1Passed},
              {id: 'task2', label: '2. Скрипт', done: progress.task2Passed},
              {
                id: 'task3',
                label: '3. Выполни',
                done: Boolean(progress.task3SelectedObject),
              },
              {id: 'task4', label: '4. Подумай', done: progress.task4Saved},
              {id: 'task5', label: '5. Правда / миф', done: progress.task5Passed},
              {id: 'task6', label: '6. Словарик', done: progress.task6Passed},
              {id: 'task7', label: '7. Холст', done: progress.task7Completed},
            ] as const
          ).map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 font-display text-xs font-bold transition-colors ${
                  active
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{tab.label}</span>
                {tab.done && (
                  <CheckCircle2
                    className={`h-3.5 w-3.5 ${active ? 'text-white' : 'text-emerald-600'}`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* TASK 1: Tool Matching */}
      {activeTab === 'task1' && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_8px_0_#e2e8f0] sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900">
                Задание 1. Сопоставь инструмент Scratch с его действием
              </h3>
              <p className="text-sm text-slate-600">
                Сначала нажми на инструмент слева, а затем — на подходящее
                действие справа.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500 tabular-nums">
              Соединено: {Object.keys(matches).length} из 5
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Tools Column */}
            <div className="space-y-2.5 lg:col-span-5">
              <p className="text-xs font-bold text-slate-500">
                Инструменты редактора
              </p>
              {TASK1_TOOLS.map((tool, index) => {
                const Icon = tool.Icon;
                const isSelected = selectedToolId === tool.id;
                const isUsed = Object.values(matches).includes(tool.id);

                return (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() =>
                      setSelectedToolId(isSelected ? null : tool.id)
                    }
                    className={`flex w-full items-center justify-between gap-3 rounded-xl border p-3.5 text-left transition-all focus-visible:outline-2 focus-visible:outline-sky-600 ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50 shadow-[0_4px_0_#0284c7]'
                        : isUsed
                          ? 'border-slate-300 bg-slate-50 text-slate-700'
                          : 'border-slate-200 bg-white hover:border-sky-300 shadow-[0_4px_0_#e2e8f0]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 font-display text-xs font-bold text-slate-700">
                        {index + 1}
                      </span>
                      <Icon className={`h-5 w-5 shrink-0 ${tool.color}`} />
                      <span className="font-display text-sm font-bold text-slate-900">
                        {tool.label}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">
                      {isSelected ? 'Выбран' : isUsed ? 'Назначен' : 'Выбрать'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Actions Column */}
            <div className="space-y-2.5 lg:col-span-7">
              <p className="text-xs font-bold text-slate-500">
                Действие в редакторе
              </p>
              {TASK1_ACTIONS.map((action) => {
                const assignedToolId = matches[action.id];
                const assignedTool = TASK1_TOOLS.find(
                  (t) => t.id === assignedToolId
                );
                const assignedNum = assignedToolId
                  ? TASK1_TOOLS.findIndex((t) => t.id === assignedToolId) + 1
                  : null;
                const isRight =
                  task1Checked && assignedToolId === action.correctToolId;
                const isWrong =
                  task1Checked && assignedToolId !== action.correctToolId;

                return (
                  <button
                    key={action.id}
                    type="button"
                    onClick={() => handleActionClick(action.id)}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl border p-3.5 text-left transition-all focus-visible:outline-2 focus-visible:outline-sky-600 ${
                      isRight
                        ? 'border-emerald-400 bg-emerald-50'
                        : isWrong
                          ? 'border-rose-400 bg-rose-50'
                          : selectedToolId
                            ? 'border-dashed border-sky-400 bg-sky-50/40 hover:bg-sky-50'
                            : 'border-slate-200 bg-slate-50/60 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-sm font-medium text-slate-800">
                      {action.text}
                    </span>

                    <div className="flex shrink-0 items-center gap-2">
                      {assignedTool ? (
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-800 shadow-xs">
                          <span>#{assignedNum}</span>
                          <span>{assignedTool.label}</span>
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">
                          {selectedToolId ? 'Нажми сюда' : 'Не выбрано'}
                        </span>
                      )}

                      {isRight && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                          <CheckCircle2 className="h-4 w-4" />
                          Верно
                        </span>
                      )}
                      {isWrong && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700">
                          <XCircle className="h-4 w-4" />
                          Ошибка
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={checkTask1}
                disabled={!task1AllMatched}
                className="btn-3d inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-xl bg-emerald-600 px-5 py-2.5 font-display text-sm font-bold text-white shadow-[0_5px_0_#047857] hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Проверить</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMatches({});
                  setSelectedToolId(null);
                  setTask1Checked(false);
                }}
                className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-display text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Сбросить</span>
              </button>
            </div>

            {task1Checked && (
              <span
                className={`text-sm font-bold ${
                  task1CorrectCount === 5 ? 'text-emerald-700' : 'text-rose-700'
                }`}
              >
                {task1CorrectCount === 5
                  ? 'Отлично! Все 5 инструментов сопоставлены верно!'
                  : `Верно ${task1CorrectCount} из 5. Исправь красные строки и проверь снова.`}
              </span>
            )}
          </div>
        </div>
      )}

      {/* TASK 2: Script Builder & Algorithm Type */}
      {activeTab === 'task2' && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_8px_0_#e2e8f0] sm:p-6">
          <div className="mb-4 border-b border-slate-100 pb-3">
            <h3 className="font-display text-lg font-bold text-slate-900">
              Задание 2. Тренажер скрипта «Возвращение из школы домой»
            </h3>
            <p className="text-sm text-slate-600">
              Собери правильный алгоритм в 3D-блоках Scratch (нажимай на блоки
              слева) и выбери вид алгоритма.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Block Bank */}
            <div className="space-y-3 lg:col-span-5">
              <p className="text-xs font-bold text-slate-500">
                Доступные 3D-блоки Scratch
              </p>
              <div className="space-y-2.5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                {availableBlocks.length === 0 ? (
                  <p className="text-xs font-medium text-slate-500">
                    Все блоки перенесены в скрипт! Нажми на любой блок справа,
                    если хочешь убрать его обратно.
                  </p>
                ) : (
                  availableBlocks.map((block) => (
                    <button
                      key={block.id}
                      type="button"
                      onClick={() => addBlockToScript(block.id)}
                      className={`btn-3d block w-full rounded-lg px-3.5 py-2.5 text-left font-display text-xs font-bold text-white ${block.bg} ${block.shadow}`}
                    >
                      + {block.label}
                    </button>
                  ))
                )}
              </div>

              {/* Algorithm Type Choice */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-display text-sm font-bold text-slate-900">
                  К какому виду алгоритма относится этот скрипт?
                </p>
                <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAlgoType('linear');
                      setTask2Checked(false);
                    }}
                    className={`rounded-lg border px-3 py-2.5 text-xs font-bold transition-all ${
                      algoType === 'linear'
                        ? 'border-sky-500 bg-sky-50 text-sky-900 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    Линейный
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAlgoType('branching');
                      setTask2Checked(false);
                    }}
                    className={`rounded-lg border px-3 py-2.5 text-xs font-bold transition-all ${
                      algoType === 'branching'
                        ? 'border-sky-500 bg-sky-50 text-sky-900 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    Алгоритм ветвления
                  </button>
                </div>
              </div>
            </div>

            {/* Target Script Stack */}
            <div className="lg:col-span-7">
              <p className="mb-3 text-xs font-bold text-slate-500">
                Собранный алгоритм (нажми на блок, чтобы убрать)
              </p>
              <div className="min-h-[250px] space-y-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-4">
                {scriptOrder.length === 0 ? (
                  <div className="flex h-44 items-center justify-center text-center text-sm text-slate-400">
                    Выбирай 3D-блоки слева по порядку, начиная с блока События
                    «когда спрайт нажат».
                  </div>
                ) : (
                  scriptOrder.map((id, idx) => {
                    const block = TASK2_BLOCKS.find((b) => b.id === id);
                    if (!block) return null;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => removeBlockFromScript(id)}
                        className={`btn-3d flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left font-display text-xs font-bold text-white ${block.bg} ${block.shadow} ${
                          id === 'move' || id === 'stop' ? 'ml-4 w-[calc(100%-1rem)]' : ''
                        }`}
                      >
                        <span>
                          {idx + 1}. {block.label}
                        </span>
                        <span className="text-[11px] font-normal text-white/85">
                          Убрать
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={checkTask2}
                disabled={scriptOrder.length < 5 || !algoType}
                className="btn-3d inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-xl bg-emerald-600 px-5 py-2.5 font-display text-sm font-bold text-white shadow-[0_5px_0_#047857] hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Проверить</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setScriptOrder([]);
                  setAlgoType(null);
                  setTask2Checked(false);
                }}
                className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-display text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Очистить</span>
              </button>
            </div>

            {task2Checked && (
              <div
                className={`flex items-center gap-2 text-sm font-bold ${
                  task2PassedNow ? 'text-emerald-700' : 'text-rose-700'
                }`}
              >
                {task2PassedNow ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>
                      Верно! Это алгоритм ветвления (есть условие «если —
                      иначе»).
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>
                      {!isScriptOrderCorrect()
                        ? 'Проверь порядок блоков: Событие → Если → Действие → Иначе → Действие.'
                        : 'Подсказка: когда в скрипте есть выбор «если — иначе», это алгоритм ветвления!'}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TASK 3: Creative Choice (Рубрика «Выполни», стр. 33) */}
      {activeTab === 'task3' && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_8px_0_#e2e8f0] sm:p-6">
          <div className="mb-4 border-b border-slate-100 pb-3">
            <h3 className="font-display text-lg font-bold text-slate-900">
              Задание 3. Рубрика «Выполни» (стр. 33)
            </h3>
            <p className="text-sm text-slate-600">
              Выбери один из трёх предметов из учебника, чтобы открыть
              мини-чек-лист с инструментами Scratch для его рисования.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {CREATIVE_OBJECTS.map((obj) => {
              const isSelected = progress.task3SelectedObject === obj.id;
              return (
                <button
                  key={obj.id}
                  type="button"
                  onClick={() => onTask3Select(obj.id)}
                  className={`btn-3d flex flex-col items-center rounded-xl border p-5 text-center transition-all focus-visible:outline-2 focus-visible:outline-sky-600 ${
                    isSelected
                      ? 'border-sky-500 bg-sky-50/70 shadow-[0_6px_0_#0284c7]'
                      : 'border-slate-200 bg-white shadow-[0_6px_0_#e2e8f0] hover:border-sky-300'
                  }`}
                >
                  {renderObjectSvg(obj.id)}
                  <h4 className="mt-3 font-display text-base font-bold text-slate-900">
                    {obj.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-500">{obj.subtitle}</p>
                  <span
                    className={`mt-3 text-xs font-bold ${
                      isSelected ? 'text-sky-700' : 'text-slate-600'
                    }`}
                  >
                    {isSelected ? 'Выбрано ✓' : 'Открыть подсказки'}
                  </span>
                </button>
              );
            })}
          </div>

          {selectedObject && (
            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
              <div className="flex items-center gap-2 font-display text-base font-bold text-emerald-950">
                <Shapes className="h-5 w-5 text-emerald-700" />
                <span>
                  Мини-чек-лист для рисования: {selectedObject.title}
                </span>
              </div>
              <div className="mt-3 space-y-2.5">
                {selectedObject.checklist.map((item) => {
                  const done = !!checkedSteps[item.id];
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleChecklistStep(item.id)}
                      className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
                        done
                          ? 'border-emerald-400 bg-white'
                          : 'border-emerald-200 bg-white/80 hover:bg-white'
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                          done
                            ? 'border-emerald-600 bg-emerald-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {done && <Check className="h-3.5 w-3.5" />}
                      </span>
                      <div>
                        <p className="font-display text-sm font-bold text-slate-900">
                          {item.tool}
                        </p>
                        <p className="text-xs text-slate-600">{item.hint}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TASK 4: Reflection (Рубрика «Подумай», стр. 33) */}
      {activeTab === 'task4' && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_8px_0_#e2e8f0] sm:p-6">
          <div className="mb-4 border-b border-slate-100 pb-3">
            <h3 className="font-display text-lg font-bold text-slate-900">
              Задание 4. Рубрика «Подумай» (стр. 33)
            </h3>
            <p className="text-sm text-slate-600">
              Выбери 3 инструмента графического редактора, которые тебе
              понравились больше всего, и отметь, что было самым интересным.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Pick 3 Tools */}
            <div>
              <div className="mb-2.5 flex items-center justify-between">
                <span className="font-display text-sm font-bold text-slate-900">
                  1. Твои 3 любимых инструмента
                </span>
                <span className="text-xs font-bold text-sky-700 tabular-nums">
                  Выбрано: {favoriteTools.length} из 3
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {REFLECTION_TOOLS.map((tool) => {
                  const picked = favoriteTools.includes(tool);
                  const disabled = !picked && favoriteTools.length >= 3;
                  return (
                    <button
                      key={tool}
                      type="button"
                      disabled={disabled}
                      onClick={() => toggleFavoriteTool(tool)}
                      className={`flex items-center justify-between rounded-xl border px-3.5 py-3 text-left text-xs font-bold transition-all ${
                        picked
                          ? 'border-sky-500 bg-sky-50 text-sky-900 shadow-[0_3px_0_#0284c7]'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 disabled:opacity-50'
                      }`}
                    >
                      <span>{tool}</span>
                      {picked && <CheckCircle2 className="h-4 w-4 text-sky-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* What was most interesting */}
            <div className="space-y-4">
              <div>
                <p className="mb-2.5 font-display text-sm font-bold text-slate-900">
                  2. Что было самым интересным на уроке?
                </p>
                <div className="space-y-2">
                  {INTEREST_OPTIONS.map((opt) => {
                    const picked = interestingParts.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleInteresting(opt)}
                        className={`flex w-full items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-left text-xs font-semibold transition-colors ${
                          picked
                            ? 'border-amber-400 bg-amber-50 text-amber-950'
                            : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <Sparkles
                          className={`h-4 w-4 shrink-0 ${
                            picked ? 'text-amber-600' : 'text-slate-400'
                          }`}
                        />
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label
                  htmlFor="reflection-note"
                  className="mb-1.5 block font-display text-xs font-bold text-slate-700"
                >
                  Твоя заметка (по желанию)
                </label>
                <input
                  id="reflection-note"
                  type="text"
                  value={reflectionNote}
                  onChange={(e) => setReflectionNote(e.target.value)}
                  placeholder="Например: мне понравилось раскрашивать куб заливкой!"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={saveTask4}
              disabled={
                favoriteTools.length < 3 || interestingParts.length === 0
              }
              className="btn-3d inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-xl bg-sky-600 px-6 py-2.5 font-display text-sm font-bold text-white shadow-[0_5px_0_#0369a1] hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Сохранить ответ</span>
            </button>

            {progress.task4Saved && (
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                Ответ сохранён! Спасибо за твоё мнение!
              </span>
            )}
          </div>
        </div>
      )}

      {/* TASK 5: True or False */}
      {activeTab === 'task5' && (
        <Task5TrueFalse onPass={onTask5Pass} onCelebrate={onCelebrate} />
      )}

      {/* TASK 6: Trilingual Lotto */}
      {activeTab === 'task6' && (
        <Task6Trilingual onPass={onTask6Pass} onCelebrate={onCelebrate} />
      )}

      {/* TASK 7: Mini Scratch Editor */}
      {activeTab === 'task7' && (
        <Task7MiniEditor
          completed={progress.task7Completed}
          onComplete={onTask7Complete}
          onCelebrate={onCelebrate}
        />
      )}
    </div>
  );
}
