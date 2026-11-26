import {useEffect, useRef, useState} from 'react';
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
  Globe,
  Square,
  Circle,
  Minus,
  Undo2,
  Trash2,
  Award,
  BookCheck,
  X,
} from 'lucide-react';
import {LessonProgress} from '../types/book';
import {StudentSubmitCard} from '../components/StudentSubmitCard';

type WorkbookTab =
  | 'task1'
  | 'task2'
  | 'task3'
  | 'task4'
  | 'task5'
  | 'task6'
  | 'task7';

const KZ_T1_TOOLS = [
  {id: 'brush', label: 'Қылқалам', Icon: Paintbrush, color: 'text-sky-700'},
  {id: 'fill', label: 'Құю', Icon: PaintBucket, color: 'text-emerald-700'},
  {id: 'eraser', label: 'Өшіргіш', Icon: Eraser, color: 'text-rose-700'},
  {
    id: 'select',
    label: 'Таңдау / Ерекшелеу',
    Icon: MousePointer2,
    color: 'text-amber-700',
  },
  {
    id: 'flipH',
    label: 'Көлденең бейнелеу',
    Icon: FlipHorizontal2,
    color: 'text-indigo-700',
  },
];

const KZ_T1_ACTIONS = [
  {
    id: 'a-flip',
    correctToolId: 'flipH',
    text: 'Спрайтты оңға немесе солға бұрады',
  },
  {
    id: 'a-brush',
    correctToolId: 'brush',
    text: 'Таңдалған түс пен қалыңдықтағы сызықтарды салады',
  },
  {
    id: 'a-select',
    correctToolId: 'select',
    text: 'Көшіру (Ctrl + C) немесе өшіру үшін сурет бөлігін ерекшелейді',
  },
  {
    id: 'a-fill',
    correctToolId: 'fill',
    text: 'Тұйықталған аймақты бір түспен бояйды',
  },
  {
    id: 'a-eraser',
    correctToolId: 'eraser',
    text: 'Суреттегі қателерді өшіреді',
  },
];

const KZ_T2_BLOCKS = [
  {
    id: 'else',
    label: 'әйтпесе',
    bg: 'bg-orange-500',
    shadow: 'shadow-[0_3px_0_#c2410c]',
  },
  {
    id: 'move',
    label: '10 қадам жүру',
    bg: 'bg-sky-600',
    shadow: 'shadow-[0_3px_0_#0369a1]',
  },
  {
    id: 'event',
    label: 'спрайтты басқанда',
    bg: 'bg-amber-500',
    shadow: 'shadow-[0_3px_0_#b45309]',
  },
  {
    id: 'stop',
    label: 'осы скриптті тоқтату',
    bg: 'bg-amber-600',
    shadow: 'shadow-[0_3px_0_#92400e]',
  },
  {
    id: 'if',
    label: 'егер <[жасыл] түске тисе?>, онда',
    bg: 'bg-orange-500',
    shadow: 'shadow-[0_3px_0_#c2410c]',
  },
];

const KZ_OBJECTS = [
  {
    id: 'cube',
    title: 'Жасыл текше',
    subtitle: 'Көлемді геометриялық фигура',
    checklist: [
      {
        id: 'c1',
        tool: 'Фигуралар: Тіктөртбұрыш',
        hint: 'Шаршы сал — текшенің алдыңғы жағы.',
      },
      {
        id: 'c2',
        tool: 'Фигуралар: Сызық',
        hint: 'Бұрыштардан қиғаш сызықтар жүргізіп, үстіңгі және бүйір қырларын қос.',
      },
      {
        id: 'c3',
        tool: 'Құю',
        hint: 'Қырларын ашық жасыл, жасыл және қою жасыл түспен боя.',
      },
    ],
  },
  {
    id: 'glass',
    title: 'Көгілдір стақан',
    subtitle: 'Суы бар мөлдір ыдыс',
    checklist: [
      {
        id: 'g1',
        tool: 'Фигуралар: Шеңбер / Сопақша',
        hint: 'Стақанның үстіңгі жиегін және түбін сопақша пішінмен сал.',
      },
      {
        id: 'g2',
        tool: 'Фигуралар: Сызық',
        hint: 'Үстіңгі және астыңғы бөлікті түзу бүйір сызықтармен қос.',
      },
      {
        id: 'g3',
        tool: 'Құю және Қылқалам',
        hint: 'Стақанды көгілдір түспен бояп, ақ қылқаламмен жылтыр сызық қос.',
      },
    ],
  },
  {
    id: 'house',
    title: 'Үйшік',
    subtitle: 'Шатыры мен терезесі бар жайлы үй',
    checklist: [
      {
        id: 'h1',
        tool: 'Фигуралар: Тіктөртбұрыш',
        hint: 'Үйдің қабырғаларын, есік пен терезені сал.',
      },
      {
        id: 'h2',
        tool: 'Фигуралар: Сызық',
        hint: 'Үшбұрышты шатыр және терезе жақтауларын сал.',
      },
      {
        id: 'h3',
        tool: 'Құю және Қылқалам',
        hint: 'Шатыр мен қабырғаны бояп, қылқаламмен мұржадан шыққан түтінді сал.',
      },
    ],
  },
];

const KZ_REFLECTION_TOOLS = [
  'Қылқалам',
  'Құю',
  'Фигуралар',
  'Өшіргіш',
  'Таңдау / Ерекшелеу',
  'Спрайтты бейнелеу',
];

const KZ_INTEREST_OPTIONS = [
  'Өз кейіпкерімнің суретін салу',
  'Scratch блоктарынан скрипт құрастыру',
  '3D-жұмыс дәптерінде тапсырма орындау',
  'Үш тілде жаңа сөздер үйрену',
];

const KZ_TF_STATEMENTS = [
  {
    id: 'tf1',
    text: '«Құю» құралы тұйықталған аймақты таңдалған түспен бояйды.',
    isTrue: true,
    exp: 'Дұрыс! Бояу сыртына ағып кетпеуі үшін пішін тұйық болуы керек.',
  },
  {
    id: 'tf2',
    text: 'Сахна фонын тек кітапханадан таңдауға болады, қолмен салуға болмайды.',
    isTrue: false,
    exp: 'Бұл аңыз! «Жаңа фон» бөлімінде фонды қолмен салуға арналған қылқалам белгішесі бар.',
  },
  {
    id: 'tf3',
    text: 'Ctrl + C пернелер тіркесімі ерекшеленген сурет бөлігін көшіреді.',
    isTrue: true,
    exp: 'Дұрыс! Алдымен нысанды «Таңдау» құралымен ерекшелеп, Ctrl + C пернесін басу керек.',
  },
  {
    id: 'tf4',
    text: '«Мектептен үйге қайту» жобасында бала қызыл түске тигенде тоқтайды.',
    isTrue: false,
    exp: 'Бұл аңыз! Бала үйдің алдындағы жасыл түске тигенде тоқтайды.',
  },
];

const KZ_WORD_ROWS = [
  {
    id: 'w1',
    kz: 'кейіпкер құру',
    ruCorrect: 'создание персонажа',
    enCorrect: 'character creation',
    ruOptions: ['создание персонажа', 'рисование фона', 'удаление спрайта'],
    enOptions: ['stage backdrop', 'character creation', 'erase line'],
  },
  {
    id: 'w2',
    kz: 'қылқалам',
    ruCorrect: 'кисть',
    enCorrect: 'brush',
    ruOptions: ['ластик', 'кисть', 'заливка'],
    enOptions: ['brush', 'eraser', 'circle'],
  },
  {
    id: 'w3',
    kz: 'өшіргіш',
    ruCorrect: 'ластик',
    enCorrect: 'eraser',
    ruOptions: ['заливка', 'линия', 'ластик'],
    enOptions: ['fill', 'eraser', 'copy'],
  },
  {
    id: 'w4',
    kz: 'сахна фоны',
    ruCorrect: 'фон сцены',
    enCorrect: 'backdrop',
    ruOptions: ['фон сцены', 'выбор', 'кисть'],
    enOptions: ['sprite', 'backdrop', 'pencil'],
  },
];

/* ---------------- Жұмыс дәптері (7 тапсырма) ---------------- */
export function KzWorkbook({
  progress,
  onTask1Pass,
  onTask2Pass,
  onTask3Select,
  onTask4Save,
  onTask5Pass,
  onTask6Pass,
  onTask7Complete,
  onCelebrate,
}: {
  progress: LessonProgress;
  onTask1Pass: () => void;
  onTask2Pass: () => void;
  onTask3Select: (objectId: string) => void;
  onTask4Save: () => void;
  onTask5Pass: () => void;
  onTask6Pass: () => void;
  onTask7Complete: () => void;
  onCelebrate: () => void;
}) {
  const [activeTab, setActiveTab] = useState<WorkbookTab>('task1');

  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [t1Checked, setT1Checked] = useState(false);

  const [scriptOrder, setScriptOrder] = useState<string[]>([]);
  const [algoType, setAlgoType] = useState<'linear' | 'branching' | null>(null);
  const [t2Checked, setT2Checked] = useState(false);

  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});

  const [favTools, setFavTools] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [note, setNote] = useState('');

  const [tfAnswers, setTfAnswers] = useState<Record<string, boolean>>({});
  const [tfChecked, setTfChecked] = useState(false);

  const [ruPicked, setRuPicked] = useState<Record<string, string>>({});
  const [enPicked, setEnPicked] = useState<Record<string, string>>({});
  const [wChecked, setWChecked] = useState(false);

  /* Canvas State for Task 7 */
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cTool, setCTool] = useState<
    'brush' | 'eraser' | 'line' | 'rect' | 'circle' | 'fill'
  >('brush');
  const [cColor, setCColor] = useState('#0284c7');
  const [cWidth, setCWidth] = useState(5);
  const drawingRef = useRef(false);
  const startRef = useRef({x: 0, y: 0});
  const snapRef = useRef<ImageData | null>(null);
  const histRef = useRef<ImageData[]>([]);

  useEffect(() => {
    if (activeTab !== 'task7') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (histRef.current.length === 0) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      histRef.current = [ctx.getImageData(0, 0, canvas.width, canvas.height)];
    } else {
      ctx.putImageData(histRef.current[histRef.current.length - 1], 0, 0);
    }
  }, [activeTab]);

  const getPt = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) / r.width) * c.width,
      y: ((e.clientY - r.top) / r.height) * c.height,
    };
  };

  const pushHist = () => {
    const c = canvasRef.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    histRef.current = [
      ...histRef.current.slice(-14),
      ctx.getImageData(0, 0, c.width, c.height),
    ];
  };

  const floodFill = (sx0: number, sy0: number, hex: string) => {
    const c = canvasRef.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    const w = c.width;
    const h = c.height;
    const sx = Math.floor(sx0);
    const sy = Math.floor(sy0);
    if (sx < 0 || sx >= w || sy < 0 || sy >= h) return;
    const img = ctx.getImageData(0, 0, w, h);
    const d = img.data;
    const i0 = (sy * w + sx) * 4;
    const tr = d[i0],
      tg = d[i0 + 1],
      tb = d[i0 + 2];
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    if (Math.abs(tr - r) < 8 && Math.abs(tg - g) < 8 && Math.abs(tb - b) < 8)
      return;
    const vis = new Uint8Array(w * h);
    const st = [sx, sy];
    while (st.length) {
      const y = st.pop()!,
        x = st.pop()!;
      const cell = y * w + x;
      if (vis[cell]) continue;
      const p = cell * 4;
      if (
        Math.abs(d[p] - tr) > 28 ||
        Math.abs(d[p + 1] - tg) > 28 ||
        Math.abs(d[p + 2] - tb) > 28
      )
        continue;
      vis[cell] = 1;
      d[p] = r;
      d[p + 1] = g;
      d[p + 2] = b;
      d[p + 3] = 255;
      if (x > 0) st.push(x - 1, y);
      if (x < w - 1) st.push(x + 1, y);
      if (y > 0) st.push(x, y - 1);
      if (y < h - 1) st.push(x, y + 1);
    }
    ctx.putImageData(img, 0, 0);
  };

  const t1Correct = KZ_T1_ACTIONS.filter(
    (a) => matches[a.id] === a.correctToolId
  ).length;
  const isScriptCorrect = () => {
    const k = scriptOrder.join(',');
    return (
      k === 'event,if,move,else,stop' || k === 'event,if,stop,else,move'
    );
  };
  const t2Passed = isScriptCorrect() && algoType === 'branching';
  const selectedObj =
    KZ_OBJECTS.find((o) => o.id === progress.task3SelectedObject) || null;
  const tfCorrect = KZ_TF_STATEMENTS.filter(
    (s) => tfAnswers[s.id] === s.isTrue
  ).length;
  const wCorrect = KZ_WORD_ROWS.filter(
    (r) => ruPicked[r.id] === r.ruCorrect && enPicked[r.id] === r.enCorrect
  ).length;

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
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:px-6">
        <div>
          <p className="text-xs font-semibold text-slate-500">
            3-бет · Жұмыс дәптері · 30–33-беттер
          </p>
          <h2 className="font-display text-lg font-bold text-slate-900 sm:text-xl">
            Оқулықтағы интерактивті тапсырмалар
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-xs">
          {(
            [
              {id: 'task1', label: '1. Құралдар', done: progress.task1Passed},
              {id: 'task2', label: '2. Скрипт', done: progress.task2Passed},
              {
                id: 'task3',
                label: '3. Орында',
                done: Boolean(progress.task3SelectedObject),
              },
              {id: 'task4', label: '4. Ойлан', done: progress.task4Saved},
              {id: 'task5', label: '5. Шындық / аңыз', done: progress.task5Passed},
              {id: 'task6', label: '6. Сөздік', done: progress.task6Passed},
              {id: 'task7', label: '7. Кенеп', done: progress.task7Completed},
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 font-display text-xs font-bold transition-colors ${
                activeTab === t.id
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{t.label}</span>
              {t.done && (
                <CheckCircle2
                  className={`h-3.5 w-3.5 ${activeTab === t.id ? 'text-white' : 'text-emerald-600'}`}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* TASK 1 */}
      {activeTab === 'task1' && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_8px_0_#e2e8f0] sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900">
                1-тапсырма. Scratch құралын оның әрекетімен сәйкестендір
              </h3>
              <p className="text-sm text-slate-600">
                Алдымен сол жақтағы құралды, содан кейін оң жақтағы сәйкес
                әрекетті бас.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500 tabular-nums">
              Сәйкестендірілді: {Object.keys(matches).length} / 5
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-2.5 lg:col-span-5">
              {KZ_T1_TOOLS.map((tool, index) => {
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
                    className={`flex w-full items-center justify-between gap-3 rounded-xl border p-3.5 text-left transition-all ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50 shadow-[0_4px_0_#0284c7]'
                        : isUsed
                          ? 'border-slate-300 bg-slate-50'
                          : 'border-slate-200 bg-white shadow-[0_4px_0_#e2e8f0]'
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
                      {isSelected ? 'Таңдалды' : isUsed ? 'Қойылды' : 'Таңдау'}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="space-y-2.5 lg:col-span-7">
              {KZ_T1_ACTIONS.map((action) => {
                const assignedId = matches[action.id];
                const assignedTool = KZ_T1_TOOLS.find(
                  (t) => t.id === assignedId
                );
                const num = assignedId
                  ? KZ_T1_TOOLS.findIndex((t) => t.id === assignedId) + 1
                  : null;
                const isRight =
                  t1Checked && assignedId === action.correctToolId;
                const isWrong =
                  t1Checked && assignedId !== action.correctToolId;

                return (
                  <button
                    key={action.id}
                    type="button"
                    onClick={() => {
                      if (!selectedToolId) return;
                      setMatches((prev) => {
                        const next = {...prev};
                        for (const k of Object.keys(next)) {
                          if (next[k] === selectedToolId) delete next[k];
                        }
                        next[action.id] = selectedToolId;
                        return next;
                      });
                      setSelectedToolId(null);
                      setT1Checked(false);
                    }}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl border p-3.5 text-left transition-all ${
                      isRight
                        ? 'border-emerald-400 bg-emerald-50'
                        : isWrong
                          ? 'border-rose-400 bg-rose-50'
                          : selectedToolId
                            ? 'border-dashed border-sky-400 bg-sky-50/40'
                            : 'border-slate-200 bg-slate-50/60'
                    }`}
                  >
                    <span className="text-sm font-medium text-slate-800">
                      {action.text}
                    </span>
                    <div className="flex shrink-0 items-center gap-2">
                      {assignedTool ? (
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-800">
                          #{num} {assignedTool.label}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">
                          {selectedToolId ? 'Осында бас' : 'Таңдалмаған'}
                        </span>
                      )}
                      {isRight && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                          <CheckCircle2 className="h-4 w-4" />
                          Дұрыс
                        </span>
                      )}
                      {isWrong && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700">
                          <XCircle className="h-4 w-4" />
                          Қате
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
                disabled={Object.keys(matches).length < 5}
                onClick={() => {
                  setT1Checked(true);
                  if (t1Correct === 5) {
                    onTask1Pass();
                    onCelebrate();
                  }
                }}
                className="btn-3d inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 font-display text-sm font-bold text-white shadow-[0_5px_0_#047857] disabled:bg-slate-300 disabled:shadow-none"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Тексеру</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMatches({});
                  setSelectedToolId(null);
                  setT1Checked(false);
                }}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-display text-sm font-bold text-slate-700"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Тазалау</span>
              </button>
            </div>
            {t1Checked && (
              <span
                className={`text-sm font-bold ${
                  t1Correct === 5 ? 'text-emerald-700' : 'text-rose-700'
                }`}
              >
                {t1Correct === 5
                  ? 'Керемет! Барлық 5 құрал дұрыс табылды!'
                  : `Дұрысы: ${t1Correct} / 5. Қызыл жолдарды түзетіп көр!`}
              </span>
            )}
          </div>
        </div>
      )}

      {/* TASK 2 */}
      {activeTab === 'task2' && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_8px_0_#e2e8f0] sm:p-6">
          <div className="mb-4 border-b border-slate-100 pb-3">
            <h3 className="font-display text-lg font-bold text-slate-900">
              2-тапсырма. «Мектептен үйге қайту» скрипт тренажері
            </h3>
            <p className="text-sm text-slate-600">
              Scratch 3D-блоктарынан дұрыс алгоритмді құрастыр және алгоритм
              түрін таңда.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-3 lg:col-span-5">
              <div className="space-y-2.5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                {KZ_T2_BLOCKS.filter((b) => !scriptOrder.includes(b.id)).map(
                  (b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => {
                        setScriptOrder((p) => [...p, b.id]);
                        setT2Checked(false);
                      }}
                      className={`btn-3d block w-full rounded-lg px-3.5 py-2.5 text-left font-display text-xs font-bold text-white ${b.bg} ${b.shadow}`}
                    >
                      + {b.label}
                    </button>
                  )
                )}
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-display text-sm font-bold text-slate-900">
                  Бұл алгоритмнің қай түріне жатады?
                </p>
                <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAlgoType('linear');
                      setT2Checked(false);
                    }}
                    className={`rounded-lg border px-3 py-2.5 text-xs font-bold ${
                      algoType === 'linear'
                        ? 'border-sky-500 bg-sky-50 text-sky-900'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    Сызықтық
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAlgoType('branching');
                      setT2Checked(false);
                    }}
                    className={`rounded-lg border px-3 py-2.5 text-xs font-bold ${
                      algoType === 'branching'
                        ? 'border-sky-500 bg-sky-50 text-sky-900'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    Тармақталған алгоритм
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="min-h-[250px] space-y-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-4">
                {scriptOrder.length === 0 ? (
                  <div className="flex h-44 items-center justify-center text-center text-sm text-slate-400">
                    Сол жақтан 3D-блоктарды ретімен таңда («спрайтты басқанда»
                    блогынан баста).
                  </div>
                ) : (
                  scriptOrder.map((id, idx) => {
                    const b = KZ_T2_BLOCKS.find((x) => x.id === id);
                    if (!b) return null;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          setScriptOrder((p) => p.filter((x) => x !== id));
                          setT2Checked(false);
                        }}
                        className={`btn-3d flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left font-display text-xs font-bold text-white ${b.bg} ${b.shadow} ${
                          id === 'move' || id === 'stop'
                            ? 'ml-4 w-[calc(100%-1rem)]'
                            : ''
                        }`}
                      >
                        <span>
                          {idx + 1}. {b.label}
                        </span>
                        <span className="text-[11px] font-normal text-white/85">
                          Алып тастау
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
                disabled={scriptOrder.length < 5 || !algoType}
                onClick={() => {
                  setT2Checked(true);
                  if (t2Passed) {
                    onTask2Pass();
                    onCelebrate();
                  }
                }}
                className="btn-3d inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 font-display text-sm font-bold text-white shadow-[0_5px_0_#047857] disabled:bg-slate-300 disabled:shadow-none"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Тексеру</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setScriptOrder([]);
                  setAlgoType(null);
                  setT2Checked(false);
                }}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-display text-sm font-bold text-slate-700"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Тазалау</span>
              </button>
            </div>
            {t2Checked && (
              <div
                className={`flex items-center gap-2 text-sm font-bold ${
                  t2Passed ? 'text-emerald-700' : 'text-rose-700'
                }`}
              >
                {t2Passed ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>
                      Дұрыс! Бұл — тармақталған алгоритм («егер — әйтпесе»).
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4" />
                    <span>
                      Блоктар ретін және алгоритм түрін (Тармақталған) тексер!
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TASK 3 */}
      {activeTab === 'task3' && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_8px_0_#e2e8f0] sm:p-6">
          <div className="mb-4 border-b border-slate-100 pb-3">
            <h3 className="font-display text-lg font-bold text-slate-900">
              3-тапсырма. «Орында» айдары (33-бет)
            </h3>
            <p className="text-sm text-slate-600">
              Оқулықтағы үш заттың бірін таңдап, оны салуға арналған Scratch
              құралдарының шағын чек-листін аш.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {KZ_OBJECTS.map((obj) => {
              const isSelected = progress.task3SelectedObject === obj.id;
              return (
                <button
                  key={obj.id}
                  type="button"
                  onClick={() => onTask3Select(obj.id)}
                  className={`btn-3d flex flex-col items-center rounded-xl border p-5 text-center ${
                    isSelected
                      ? 'border-sky-500 bg-sky-50/70 shadow-[0_6px_0_#0284c7]'
                      : 'border-slate-200 bg-white shadow-[0_6px_0_#e2e8f0]'
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
                    {isSelected ? 'Таңдалды ✓' : 'Кеңестерді ашу'}
                  </span>
                </button>
              );
            })}
          </div>

          {selectedObj && (
            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
              <div className="flex items-center gap-2 font-display text-base font-bold text-emerald-950">
                <Shapes className="h-5 w-5 text-emerald-700" />
                <span>Сурет салу чек-листі: {selectedObj.title}</span>
              </div>
              <div className="mt-3 space-y-2.5">
                {selectedObj.checklist.map((item) => {
                  const done = !!checkedSteps[item.id];
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setCheckedSteps((p) => ({...p, [item.id]: !p[item.id]}))
                      }
                      className="flex w-full items-start gap-3 rounded-lg border border-emerald-200 bg-white p-3 text-left"
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

      {/* TASK 4 */}
      {activeTab === 'task4' && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_8px_0_#e2e8f0] sm:p-6">
          <div className="mb-4 border-b border-slate-100 pb-3">
            <h3 className="font-display text-lg font-bold text-slate-900">
              4-тапсырма. «Ойлан» айдары (33-бет)
            </h3>
            <p className="text-sm text-slate-600">
              Өзіңе ең қатты ұнаған 3 құралды таңда және сабақта не қызықты
              болғанын белгіле.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <div className="mb-2.5 flex items-center justify-between">
                <span className="font-display text-sm font-bold text-slate-900">
                  1. Сүйікті 3 құралың
                </span>
                <span className="text-xs font-bold text-sky-700 tabular-nums">
                  Таңдалды: {favTools.length} / 3
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {KZ_REFLECTION_TOOLS.map((tool) => {
                  const picked = favTools.includes(tool);
                  const disabled = !picked && favTools.length >= 3;
                  return (
                    <button
                      key={tool}
                      type="button"
                      disabled={disabled}
                      onClick={() =>
                        setFavTools((p) =>
                          p.includes(tool)
                            ? p.filter((x) => x !== tool)
                            : [...p, tool]
                        )
                      }
                      className={`flex items-center justify-between rounded-xl border px-3.5 py-3 text-left text-xs font-bold ${
                        picked
                          ? 'border-sky-500 bg-sky-50 text-sky-900 shadow-[0_3px_0_#0284c7]'
                          : 'border-slate-200 bg-slate-50 text-slate-700 disabled:opacity-50'
                      }`}
                    >
                      <span>{tool}</span>
                      {picked && <CheckCircle2 className="h-4 w-4 text-sky-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="mb-2.5 font-display text-sm font-bold text-slate-900">
                  2. Сабақта ең қызықтысы не болды?
                </p>
                <div className="space-y-2">
                  {KZ_INTEREST_OPTIONS.map((opt) => {
                    const picked = interests.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() =>
                          setInterests((p) =>
                            p.includes(opt)
                              ? p.filter((x) => x !== opt)
                              : [...p, opt]
                          )
                        }
                        className={`flex w-full items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-left text-xs font-semibold ${
                          picked
                            ? 'border-amber-400 bg-amber-50 text-amber-950'
                            : 'border-slate-200 bg-slate-50/70 text-slate-700'
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

              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Өз пікірің (қалауыңша)..."
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              disabled={favTools.length < 3 || interests.length === 0}
              onClick={() => {
                onTask4Save();
                onCelebrate();
              }}
              className="btn-3d inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-sky-600 px-6 py-2.5 font-display text-sm font-bold text-white shadow-[0_5px_0_#0369a1] disabled:bg-slate-300 disabled:shadow-none"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Жауапты сақтау</span>
            </button>
            {progress.task4Saved && (
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                Жауап сақталды!
              </span>
            )}
          </div>
        </div>
      )}

      {/* TASK 5 */}
      {activeTab === 'task5' && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_8px_0_#e2e8f0] sm:p-6">
          <div className="mb-4 border-b border-slate-100 pb-3">
            <h3 className="font-display text-lg font-bold text-slate-900">
              5-тапсырма. Шындық па, әлде аңыз ба?
            </h3>
            <p className="text-sm text-slate-600">
              Тұжырымдарды оқып, дұрыс немесе бұрыс екенін белгіле.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {KZ_TF_STATEMENTS.map((item) => {
              const picked = tfAnswers[item.id];
              const isRight = tfChecked && picked === item.isTrue;
              const isWrong = tfChecked && picked !== item.isTrue;
              return (
                <div
                  key={item.id}
                  className={`flex flex-col justify-between rounded-xl border p-4 ${
                    isRight
                      ? 'border-emerald-300 bg-emerald-50/50'
                      : isWrong
                        ? 'border-rose-300 bg-rose-50/50'
                        : 'border-slate-200 bg-slate-50/50'
                  }`}
                >
                  <p className="font-display text-sm font-bold text-slate-900">
                    {item.text}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setTfAnswers((p) => ({...p, [item.id]: true}));
                        setTfChecked(false);
                      }}
                      className={`flex-1 rounded-lg border px-3 py-2 font-display text-xs font-bold ${
                        picked === true
                          ? 'border-sky-600 bg-sky-600 text-white'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      Шындық
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTfAnswers((p) => ({...p, [item.id]: false}));
                        setTfChecked(false);
                      }}
                      className={`flex-1 rounded-lg border px-3 py-2 font-display text-xs font-bold ${
                        picked === false
                          ? 'border-amber-600 bg-amber-500 text-slate-950'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      Аңыз
                    </button>
                  </div>
                  {tfChecked && (
                    <p
                      className={`mt-3 text-xs font-medium ${
                        isRight ? 'text-emerald-800' : 'text-rose-800'
                      }`}
                    >
                      {item.exp}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              disabled={Object.keys(tfAnswers).length < 4}
              onClick={() => {
                setTfChecked(true);
                if (tfCorrect === 4) {
                  onTask5Pass();
                  onCelebrate();
                }
              }}
              className="btn-3d inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 font-display text-sm font-bold text-white shadow-[0_5px_0_#047857] disabled:bg-slate-300 disabled:shadow-none"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Тексеру</span>
            </button>
            {tfChecked && (
              <span
                className={`text-sm font-bold ${
                  tfCorrect === 4 ? 'text-emerald-700' : 'text-rose-700'
                }`}
              >
                Дұрысы: {tfCorrect} / 4
              </span>
            )}
          </div>
        </div>
      )}

      {/* TASK 6 */}
      {activeTab === 'task6' && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_8px_0_#e2e8f0] sm:p-6">
          <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Globe className="h-5 w-5 text-sky-600" />
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900">
                6-тапсырма. Үштілді лото (Қазақша · Русский · English)
              </h3>
              <p className="text-sm text-slate-600">
                Әр сөздің орысша және ағылшынша аудармасын таңда.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {KZ_WORD_ROWS.map((row) => {
              const ok =
                ruPicked[row.id] === row.ruCorrect &&
                enPicked[row.id] === row.enCorrect;
              return (
                <div
                  key={row.id}
                  className={`grid grid-cols-1 items-center gap-3 rounded-xl border p-4 lg:grid-cols-12 ${
                    wChecked
                      ? ok
                        ? 'border-emerald-300 bg-emerald-50/40'
                        : 'border-rose-300 bg-rose-50/40'
                      : 'border-slate-200 bg-slate-50/50'
                  }`}
                >
                  <div className="lg:col-span-3">
                    <span className="block text-[11px] font-semibold text-amber-700">
                      Қазақша
                    </span>
                    <span className="font-display text-sm font-bold text-slate-900">
                      {row.kz}
                    </span>
                  </div>
                  <div className="lg:col-span-4">
                    <span className="mb-1 block text-[11px] font-semibold text-sky-700">
                      Русский
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {row.ruOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setRuPicked((p) => ({...p, [row.id]: opt}));
                            setWChecked(false);
                          }}
                          className={`rounded-lg border px-2.5 py-1.5 text-xs font-bold ${
                            ruPicked[row.id] === opt
                              ? 'border-sky-500 bg-sky-100 text-sky-950'
                              : 'border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-4">
                    <span className="mb-1 block text-[11px] font-semibold text-emerald-700">
                      English
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {row.enOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setEnPicked((p) => ({...p, [row.id]: opt}));
                            setWChecked(false);
                          }}
                          className={`rounded-lg border px-2.5 py-1.5 text-xs font-bold ${
                            enPicked[row.id] === opt
                              ? 'border-emerald-500 bg-emerald-100 text-emerald-950'
                              : 'border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end lg:col-span-1">
                    {wChecked &&
                      (ok ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-rose-600" />
                      ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              disabled={
                Object.keys(ruPicked).length < 4 ||
                Object.keys(enPicked).length < 4
              }
              onClick={() => {
                setWChecked(true);
                if (wCorrect === 4) {
                  onTask6Pass();
                  onCelebrate();
                }
              }}
              className="btn-3d inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 font-display text-sm font-bold text-white shadow-[0_5px_0_#047857] disabled:bg-slate-300 disabled:shadow-none"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Тексеру</span>
            </button>
            {wChecked && (
              <span
                className={`text-sm font-bold ${
                  wCorrect === 4 ? 'text-emerald-700' : 'text-rose-700'
                }`}
              >
                Дұрысы: {wCorrect} / 4
              </span>
            )}
          </div>
        </div>
      )}

      {/* TASK 7 */}
      {activeTab === 'task7' && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_8px_0_#e2e8f0] sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900">
                7-тапсырма. Scratch шағын редакторында жаттық
              </h3>
              <p className="text-sm text-slate-600">
                Қылқалам, Фигуралар, Құю, Өшіргіш және Көлденең бейнелеу
                құралдарын пайдаланып өз кейіпкеріңді сал!
              </p>
            </div>
            {progress.task7Completed && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                Сақталды!
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-4">
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    {id: 'brush', label: 'Қылқалам', Icon: Paintbrush},
                    {id: 'fill', label: 'Құю', Icon: PaintBucket},
                    {id: 'line', label: 'Сызық', Icon: Minus},
                    {id: 'rect', label: 'Тіктөртб.', Icon: Square},
                    {id: 'circle', label: 'Шеңбер', Icon: Circle},
                    {id: 'eraser', label: 'Өшіргіш', Icon: Eraser},
                  ] as const
                ).map(({id, label, Icon}) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setCTool(id)}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold ${
                      cTool === id
                        ? 'border-sky-600 bg-sky-600 text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  '#0f172a',
                  '#0284c7',
                  '#10b981',
                  '#f59e0b',
                  '#ea580c',
                  '#ec4899',
                ].map((col) => (
                  <button
                    key={col}
                    type="button"
                    onClick={() => setCColor(col)}
                    style={{backgroundColor: col}}
                    className={`h-8 w-8 rounded-lg border-2 ${
                      cColor === col
                        ? 'scale-110 border-slate-900'
                        : 'border-white shadow-sm'
                    }`}
                  />
                ))}
              </div>

              <input
                type="range"
                min={2}
                max={16}
                value={cWidth}
                onChange={(e) => setCWidth(Number(e.target.value))}
                className="w-full accent-sky-600"
              />

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const c = canvasRef.current;
                    const ctx = c?.getContext('2d');
                    if (!c || !ctx) return;
                    const tmp = document.createElement('canvas');
                    tmp.width = c.width;
                    tmp.height = c.height;
                    tmp.getContext('2d')?.drawImage(c, 0, 0);
                    ctx.save();
                    ctx.translate(c.width, 0);
                    ctx.scale(-1, 1);
                    ctx.drawImage(tmp, 0, 0);
                    ctx.restore();
                    pushHist();
                  }}
                  className="flex flex-col items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 py-2 text-[11px] font-bold text-slate-700"
                >
                  <FlipHorizontal2 className="h-4 w-4 text-indigo-600" />
                  <span>Бейнелеу</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const c = canvasRef.current;
                    const ctx = c?.getContext('2d');
                    if (!c || !ctx || histRef.current.length <= 1) return;
                    histRef.current = histRef.current.slice(0, -1);
                    ctx.putImageData(
                      histRef.current[histRef.current.length - 1],
                      0,
                      0
                    );
                  }}
                  className="flex flex-col items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 py-2 text-[11px] font-bold text-slate-700"
                >
                  <Undo2 className="h-4 w-4" />
                  <span>Болдырмау</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const c = canvasRef.current;
                    const ctx = c?.getContext('2d');
                    if (!c || !ctx) return;
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, 0, c.width, c.height);
                    pushHist();
                  }}
                  className="flex flex-col items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 py-2 text-[11px] font-bold text-rose-700"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Тазалау</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-3 lg:col-span-8">
              <div className="overflow-hidden rounded-xl border-2 border-slate-300 bg-white">
                <canvas
                  ref={canvasRef}
                  width={640}
                  height={360}
                  onPointerDown={(e) => {
                    const c = canvasRef.current;
                    const ctx = c?.getContext('2d');
                    if (!c || !ctx) return;
                    const pt = getPt(e);
                    if (cTool === 'fill') {
                      floodFill(pt.x, pt.y, cColor);
                      pushHist();
                      return;
                    }
                    e.currentTarget.setPointerCapture(e.pointerId);
                    drawingRef.current = true;
                    startRef.current = pt;
                    snapRef.current = ctx.getImageData(0, 0, c.width, c.height);
                    if (cTool === 'brush' || cTool === 'eraser') {
                      ctx.beginPath();
                      ctx.moveTo(pt.x, pt.y);
                      ctx.lineCap = 'round';
                      ctx.strokeStyle = cTool === 'eraser' ? '#fff' : cColor;
                      ctx.lineWidth = cTool === 'eraser' ? cWidth * 2.5 : cWidth;
                      ctx.lineTo(pt.x + 0.01, pt.y + 0.01);
                      ctx.stroke();
                    }
                  }}
                  onPointerMove={(e) => {
                    if (!drawingRef.current) return;
                    const c = canvasRef.current;
                    const ctx = c?.getContext('2d');
                    if (!c || !ctx) return;
                    const pt = getPt(e);
                    if (cTool === 'brush' || cTool === 'eraser') {
                      ctx.lineTo(pt.x, pt.y);
                      ctx.stroke();
                      return;
                    }
                    if (snapRef.current) ctx.putImageData(snapRef.current, 0, 0);
                    ctx.beginPath();
                    ctx.strokeStyle = cColor;
                    ctx.lineWidth = cWidth;
                    const sx = startRef.current.x,
                      sy = startRef.current.y;
                    if (cTool === 'line') {
                      ctx.moveTo(sx, sy);
                      ctx.lineTo(pt.x, pt.y);
                      ctx.stroke();
                    } else if (cTool === 'rect') {
                      ctx.strokeRect(sx, sy, pt.x - sx, pt.y - sy);
                    } else if (cTool === 'circle') {
                      ctx.ellipse(
                        (sx + pt.x) / 2,
                        (sy + pt.y) / 2,
                        Math.abs(pt.x - sx) / 2,
                        Math.abs(pt.y - sy) / 2,
                        0,
                        0,
                        Math.PI * 2
                      );
                      ctx.stroke();
                    }
                  }}
                  onPointerUp={() => {
                    if (!drawingRef.current) return;
                    drawingRef.current = false;
                    snapRef.current = null;
                    pushHist();
                  }}
                  className="block aspect-[16/9] w-full touch-none cursor-crosshair bg-white"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    onTask7Complete();
                    onCelebrate();
                  }}
                  className="btn-3d inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 font-display text-sm font-bold text-white shadow-[0_5px_0_#0369a1]"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Дайын! Суретті сақтау</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- 4-бет: Викторина (5 сұрақ) ---------------- */
const KZ_QUIZ = [
  {
    id: 'q1',
    q: '1. «Құю» (Заливка) құралы не үшін қажет?',
    options: [
      'Суреттегі артық сызықтарды өшіру үшін',
      'Тұйықталған аймақты таңдалған түспен бояу үшін',
      'Спрайтты көлденең бейнелеу үшін',
    ],
    correct: 1,
  },
  {
    id: 'q2',
    q: '2. Ерекшеленген сурет бөлігін қандай пернелер тіркесімі көшіреді?',
    options: ['Ctrl + V', 'Alt + F4', 'Ctrl + C'],
    correct: 2,
  },
  {
    id: 'q3',
    q: '3. Жобада баланың қозғалысын «Оқиғалар» бөліміндегі қай блок іске қосады?',
    options: [
      'спрайтты басқанда',
      '10 қадам жүру',
      'осы скриптті тоқтату',
    ],
    correct: 0,
  },
  {
    id: 'q4',
    q: '4. «Мектептен үйге қайту» жобасында бала қандай жағдайда тоқтайды?',
    options: [
      'Экранның шетіне жеткенде',
      'Жасыл түске тигенде',
      'Бос орын пернесін басқанда',
    ],
    correct: 1,
  },
  {
    id: 'q5',
    q: '5. Солға-оңға қараған қос жебесі бар суретті басқару батырмасы не істейді?',
    options: [
      'Суретті ерекшелеу бойынша қияды',
      'Спрайтты тігінен бейнелейді',
      'Спрайтты көлденеңінен бейнелейді',
    ],
    correct: 2,
  },
];

export function KzQuiz({
  savedScore,
  onQuizComplete,
  onCelebrate,
}: {
  savedScore: number | null;
  onQuizComplete: (score: number) => void;
  onCelebrate: () => void;
}) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [checked, setChecked] = useState(false);

  const score = KZ_QUIZ.reduce(
    (acc, item) => (answers[item.id] === item.correct ? acc + 1 : acc),
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 sm:flex-row sm:items-center sm:px-6">
        <div>
          <p className="text-xs font-semibold text-emerald-800">
            4-бет · Мәтін бойынша сұрақтар · § 8
          </p>
          <h2 className="font-display text-lg font-bold text-slate-900 sm:text-xl">
            Білімді тексеру: дұрыс жауапты таңда
          </h2>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold text-slate-800 tabular-nums">
          <Award className="h-4 w-4 text-amber-600" />
          <span>
            {checked
              ? `Нәтиже: ${score} / 5`
              : savedScore !== null
                ? `Үздік нәтиже: ${savedScore} / 5`
                : '5 сұрақ'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {KZ_QUIZ.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_6px_0_#e2e8f0]"
          >
            <h3 className="font-display text-base font-bold text-slate-900">
              {item.q}
            </h3>
            <div className="mt-3 space-y-2">
              {item.options.map((opt, idx) => {
                const picked = answers[item.id] === idx;
                const right = checked && idx === item.correct;
                const wrong = checked && picked && idx !== item.correct;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setAnswers((p) => ({...p, [item.id]: idx}));
                      setChecked(false);
                    }}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg border px-3.5 py-2.5 text-left text-sm font-medium ${
                      right
                        ? 'border-emerald-400 bg-emerald-50 text-emerald-950'
                        : wrong
                          ? 'border-rose-400 bg-rose-50 text-rose-950'
                          : picked
                            ? 'border-sky-500 bg-sky-50 text-sky-950'
                            : 'border-slate-200 bg-slate-50/50 text-slate-700'
                    }`}
                  >
                    <span>{opt}</span>
                    {right && (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    )}
                    {wrong && (
                      <XCircle className="h-4 w-4 shrink-0 text-rose-700" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-[0_6px_0_#e2e8f0]">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Жауаптарды тексеруге дайынсың ба?
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Барлық 5 сұраққа жауап беріп, «Тексеру» батырмасын бас!
            </p>
            {checked && (
              <p className="mt-4 rounded-lg border border-emerald-200 bg-white p-3 text-sm font-bold text-slate-900">
                Дұрыс жауаптар саны: {score} / 5
              </p>
            )}
          </div>
          <div className="mt-5 flex gap-3">
            <button
              type="button"
              disabled={Object.keys(answers).length < 5}
              onClick={() => {
                setChecked(true);
                onQuizComplete(score);
                if (score >= 4) onCelebrate();
              }}
              className="btn-3d inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 font-display text-sm font-bold text-white shadow-[0_5px_0_#047857] disabled:bg-slate-300 disabled:shadow-none"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Тексеру</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAnswers({});
                setChecked(false);
              }}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-display text-sm font-bold text-slate-700"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Тазалау</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Соңғы бет: Үй тапсырмасы + 3D медаль ---------------- */
const KZ_HOMEWORK = [
  {
    id: 'hw-words',
    title: 'Жаңа сөздерді үш тілде жаттау',
    detail: 'кейіпкер құру – создание персонажа – character creation',
  },
  {
    id: 'hw-tools',
    title: 'Scratch графикалық редакторы құралдарының қызметін қайталау',
    detail: 'Қылқалам, Құю, Өшіргіш, Таңдау / Ерекшелеу',
  },
  {
    id: 'hw-draw',
    title: 'Scratch-та өз кейіпкеріңді немесе 33-беттегі заттардың бірін салу',
    detail: 'Жасыл текше, көгілдір стақан немесе үйшік',
  },
  {
    id: 'hw-video',
    title: 'Мұғалімнің бейне-тәжірибесін қарап шығу',
    detail: '«Мектептен үйге қайту» жобасының қадамдарын бекіту',
  },
];

export function KzHomework({
  progress,
  onToggleHomework,
  onFinishLesson,
}: {
  progress: LessonProgress;
  onToggleHomework: (id: string) => void;
  onFinishLesson: () => void;
}) {
  const [showModal, setShowModal] = useState(false);

  const doneCount =
    (progress.task1Passed ? 1 : 0) +
    (progress.task2Passed ? 1 : 0) +
    (progress.task3SelectedObject ? 1 : 0) +
    (progress.task4Saved ? 1 : 0) +
    (progress.task5Passed ? 1 : 0) +
    (progress.task6Passed ? 1 : 0) +
    (progress.task7Completed ? 1 : 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 rounded-xl border border-indigo-200 bg-indigo-50/70 p-4 sm:flex-row sm:items-center sm:px-6">
        <div>
          <p className="text-xs font-semibold text-indigo-800">
            Соңғы бет · Үй тапсырмасы
          </p>
          <h2 className="font-display text-lg font-bold text-slate-900 sm:text-xl">
            Үй тапсырмасы және сабақты қорытындылау
          </h2>
        </div>
        <span className="text-xs font-semibold text-slate-600 tabular-nums">
          Белгіленгені: {progress.homeworkChecked.length} / 4
        </span>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_8px_0_#e2e8f0] lg:col-span-7">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <BookCheck className="h-5 w-5 text-sky-600" />
            <h3 className="font-display text-lg font-bold text-slate-900">
              Үй тапсырмасының чек-листі
            </h3>
          </div>
          <div className="mt-4 space-y-3">
            {KZ_HOMEWORK.map((item) => {
              const checked = progress.homeworkChecked.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onToggleHomework(item.id)}
                  className={`flex w-full items-start gap-3.5 rounded-xl border p-4 text-left ${
                    checked
                      ? 'border-emerald-300 bg-emerald-50/60'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-white'
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${
                      checked
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {checked && <Check className="h-4 w-4" />}
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-slate-900 sm:text-base">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-600 sm:text-sm">
                      {item.detail}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-amber-200 bg-gradient-to-b from-amber-50/70 to-white p-6 shadow-[0_8px_0_#fde68a] lg:col-span-5">
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-bold text-slate-900">
              <Award className="h-6 w-6 text-amber-600" />
              <span>Сабақтағы жетістіктерің</span>
            </div>
            <div className="mt-4 space-y-2.5 text-sm">
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3.5 py-2.5">
                <span className="text-slate-700">Оқулық карталары</span>
                <span className="font-display font-bold tabular-nums">
                  {progress.flippedCardIds.length} / 4
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3.5 py-2.5">
                <span className="text-slate-700">Жұмыс дәптері</span>
                <span className="font-display font-bold tabular-nums">
                  {doneCount} / 7
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3.5 py-2.5">
                <span className="text-slate-700">Викторина</span>
                <span className="font-display font-bold tabular-nums">
                  {progress.quizScore !== null
                    ? `${progress.quizScore} / 5`
                    : 'Орындалмады'}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onFinishLesson();
              setShowModal(true);
            }}
            className="btn-3d mt-6 flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-xl bg-amber-500 px-6 py-3.5 font-display text-base font-extrabold text-slate-950 shadow-[0_6px_0_#b45309] hover:bg-amber-400"
          >
            <Sparkles className="h-5 w-5 shrink-0" />
            <span>Сабақты аяқтап, марапат алу</span>
          </button>
        </div>
      </div>

      <StudentSubmitCard lang="kz" progress={progress} />

      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs"
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border-2 border-amber-300 bg-white p-6 text-center shadow-[0_24px_48px_rgba(15,23,42,0.3),0_10px_0_#f59e0b] sm:p-8"
          >
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>

            <p className="text-xs font-bold text-amber-700">
              § 8-параграфты сәтті аяқтауыңмен құттықтаймыз!
            </p>
            <h3 className="mt-1 font-display text-2xl font-extrabold text-slate-900">
              Scratch жас суретшісі
            </h3>

            <div className="mx-auto my-5 flex h-52 w-52 items-center justify-center overflow-hidden rounded-full border-4 border-amber-300 bg-amber-50 p-2 shadow-[0_14px_28px_rgba(245,158,11,0.35)]">
              <img
                src="/src/assets/images/medal_young_artist_1795725590542.jpg"
                alt="Scratch жас суретшісі 3D-медалі"
                referrerPolicy="no-referrer"
                className="h-full w-full rounded-full object-cover"
              />
            </div>

            <p className="text-sm text-slate-600">
              Сен Scratch графикалық редакторын меңгеріп, құралдарды үйрендің
              және тармақталған алгоритм құрастырдың!
            </p>

            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="btn-3d mt-5 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-sky-600 px-7 py-2.5 font-display text-sm font-bold text-white shadow-[0_5px_0_#0369a1]"
            >
              Алақай! Рақмет!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
