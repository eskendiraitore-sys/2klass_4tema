import {useEffect, useRef, useState} from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Paintbrush,
  PaintBucket,
  Eraser,
  Square,
  Circle,
  Minus,
  FlipHorizontal2,
  Undo2,
  Trash2,
  Sparkles,
  Globe,
} from 'lucide-react';

/* ---------------- Task 5: Правда или миф ---------------- */
interface TrueFalseStatement {
  id: string;
  text: string;
  isTrue: boolean;
  explanation: string;
}

const TF_STATEMENTS: TrueFalseStatement[] = [
  {
    id: 'tf1',
    text: 'Инструмент «Заливка» закрашивает замкнутую область выбранным цветом.',
    isTrue: true,
    explanation: 'Да! Контур фигуры должен быть замкнутым, чтобы краска не вытекла.',
  },
  {
    id: 'tf2',
    text: 'Фон сцены можно только выбрать из библиотеки, а самому нарисовать нельзя.',
    isTrue: false,
    explanation: 'Это миф! В разделе «Новый фон» есть иконка кисточки, чтобы нарисовать фон вручную.',
  },
  {
    id: 'tf3',
    text: 'Комбинация клавиш Ctrl + C помогает скопировать выделенный фрагмент рисунка.',
    isTrue: true,
    explanation: 'Верно! Сначала нужно выделить объект инструментом «Выбор», а затем нажать Ctrl + C.',
  },
  {
    id: 'tf4',
    text: 'В проекте «Возвращение из школы домой» мальчик останавливается, когда касается красного цвета.',
    isTrue: false,
    explanation: 'Это миф! Мальчик останавливается, когда касается зелёного цвета у дома.',
  },
];

export function Task5TrueFalse({
  onPass,
  onCelebrate,
}: {
  onPass: () => void;
  onCelebrate: () => void;
}) {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [checked, setChecked] = useState(false);

  const allAnswered = TF_STATEMENTS.every((s) => answers[s.id] !== undefined);
  const correctCount = TF_STATEMENTS.filter(
    (s) => answers[s.id] === s.isTrue
  ).length;

  const handleCheck = () => {
    setChecked(true);
    if (correctCount === TF_STATEMENTS.length) {
      onPass();
      onCelebrate();
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_8px_0_#e2e8f0] sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-display text-lg font-bold text-slate-900">
            Задание 5. Правда или миф?
          </h3>
          <p className="text-sm text-slate-600">
            Прочитай утверждения о редакторе Scratch и выбери, какие из них
            верные, а какие — нет.
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-500 tabular-nums">
          Ответов: {Object.keys(answers).length} из 4
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {TF_STATEMENTS.map((item) => {
          const picked = answers[item.id];
          const isRight = checked && picked === item.isTrue;
          const isWrong = checked && picked !== item.isTrue;

          return (
            <div
              key={item.id}
              className={`flex flex-col justify-between rounded-xl border p-4 transition-colors ${
                isRight
                  ? 'border-emerald-300 bg-emerald-50/50'
                  : isWrong
                    ? 'border-rose-300 bg-rose-50/50'
                    : 'border-slate-200 bg-slate-50/50'
              }`}
            >
              <p className="font-display text-sm font-bold leading-snug text-slate-900">
                {item.text}
              </p>

              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setAnswers((prev) => ({...prev, [item.id]: true}));
                    setChecked(false);
                  }}
                  className={`flex-1 rounded-lg border px-3 py-2 font-display text-xs font-bold transition-all ${
                    picked === true
                      ? 'border-sky-600 bg-sky-600 text-white shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300'
                  }`}
                >
                  Правда
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAnswers((prev) => ({...prev, [item.id]: false}));
                    setChecked(false);
                  }}
                  className={`flex-1 rounded-lg border px-3 py-2 font-display text-xs font-bold transition-all ${
                    picked === false
                      ? 'border-amber-600 bg-amber-500 text-slate-950 shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-amber-300'
                  }`}
                >
                  Миф
                </button>
              </div>

              {checked && (
                <div
                  className={`mt-3 flex items-start gap-2 text-xs font-medium ${
                    isRight ? 'text-emerald-800' : 'text-rose-800'
                  }`}
                >
                  {isRight ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  ) : (
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                  )}
                  <span>{item.explanation}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCheck}
            disabled={!allAnswered}
            className="btn-3d inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-xl bg-emerald-600 px-5 py-2.5 font-display text-sm font-bold text-white shadow-[0_5px_0_#047857] hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Проверить</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setAnswers({});
              setChecked(false);
            }}
            className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-display text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Сбросить</span>
          </button>
        </div>

        {checked && (
          <span
            className={`text-sm font-bold ${
              correctCount === 4 ? 'text-emerald-700' : 'text-rose-700'
            }`}
          >
            {correctCount === 4
              ? 'Молодец! Все 4 ответа верны!'
              : `Верно ${correctCount} из 4. Попробуй исправить ошибки!`}
          </span>
        )}
      </div>
    </div>
  );
}

/* ---------------- Task 6: Трёхъязычное лото ---------------- */
interface WordRow {
  id: string;
  ru: string;
  kzCorrect: string;
  enCorrect: string;
  kzOptions: string[];
  enOptions: string[];
}

const WORD_ROWS: WordRow[] = [
  {
    id: 'w1',
    ru: 'создание персонажа',
    kzCorrect: 'кейіпкер құру',
    enCorrect: 'character creation',
    kzOptions: ['кейіпкер құру', 'сурет салу', 'мәтін теру'],
    enOptions: ['stage backdrop', 'character creation', 'erase line'],
  },
  {
    id: 'w2',
    ru: 'кисть',
    kzCorrect: 'қылқалам',
    enCorrect: 'brush',
    kzOptions: ['өшіргіш', 'қылқалам', 'бояу'],
    enOptions: ['brush', 'eraser', 'circle'],
  },
  {
    id: 'w3',
    ru: 'ластик',
    kzCorrect: 'өшіргіш',
    enCorrect: 'eraser',
    kzOptions: ['құю', 'сызық', 'өшіргіш'],
    enOptions: ['fill', 'eraser', 'copy'],
  },
  {
    id: 'w4',
    ru: 'фон сцены',
    kzCorrect: 'сахна фоны',
    enCorrect: 'backdrop',
    kzOptions: ['сахна фоны', 'таңдау', 'қылқалам'],
    enOptions: ['sprite', 'backdrop', 'pencil'],
  },
];

export function Task6Trilingual({
  onPass,
  onCelebrate,
}: {
  onPass: () => void;
  onCelebrate: () => void;
}) {
  const [kzPicked, setKzPicked] = useState<Record<string, string>>({});
  const [enPicked, setEnPicked] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const allPicked = WORD_ROWS.every(
    (r) => Boolean(kzPicked[r.id]) && Boolean(enPicked[r.id])
  );

  const correctRows = WORD_ROWS.filter(
    (r) => kzPicked[r.id] === r.kzCorrect && enPicked[r.id] === r.enCorrect
  ).length;

  const handleCheck = () => {
    setChecked(true);
    if (correctRows === WORD_ROWS.length) {
      onPass();
      onCelebrate();
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_8px_0_#e2e8f0] sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-sky-600" />
            <h3 className="font-display text-lg font-bold text-slate-900">
              Задание 6. Трёхъязычное лото (Русский · Қазақша · English)
            </h3>
          </div>
          <p className="mt-0.5 text-sm text-slate-600">
            Выбери правильный перевод каждого слова на казахский и английский
            языки.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {WORD_ROWS.map((row) => {
          const kzOk = kzPicked[row.id] === row.kzCorrect;
          const enOk = enPicked[row.id] === row.enCorrect;
          const rowOk = checked && kzOk && enOk;
          const rowErr = checked && (!kzOk || !enOk);

          return (
            <div
              key={row.id}
              className={`grid grid-cols-1 items-center gap-3 rounded-xl border p-4 lg:grid-cols-12 ${
                rowOk
                  ? 'border-emerald-300 bg-emerald-50/40'
                  : rowErr
                    ? 'border-rose-300 bg-rose-50/40'
                    : 'border-slate-200 bg-slate-50/50'
              }`}
            >
              <div className="lg:col-span-3">
                <span className="block text-[11px] font-semibold text-slate-500">
                  Русский
                </span>
                <span className="font-display text-sm font-bold text-slate-900">
                  {row.ru}
                </span>
              </div>

              <div className="lg:col-span-4">
                <span className="mb-1 block text-[11px] font-semibold text-amber-700">
                  Қазақша
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {row.kzOptions.map((opt) => {
                    const active = kzPicked[row.id] === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setKzPicked((prev) => ({...prev, [row.id]: opt}));
                          setChecked(false);
                        }}
                        className={`rounded-lg border px-2.5 py-1.5 text-xs font-bold transition-colors ${
                          active
                            ? 'border-amber-500 bg-amber-100 text-amber-950'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-amber-300'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-4">
                <span className="mb-1 block text-[11px] font-semibold text-emerald-700">
                  English
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {row.enOptions.map((opt) => {
                    const active = enPicked[row.id] === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setEnPicked((prev) => ({...prev, [row.id]: opt}));
                          setChecked(false);
                        }}
                        className={`rounded-lg border px-2.5 py-1.5 text-xs font-bold transition-colors ${
                          active
                            ? 'border-emerald-500 bg-emerald-100 text-emerald-950'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end lg:col-span-1">
                {rowOk && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" />
                    Верно
                  </span>
                )}
                {rowErr && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700">
                    <XCircle className="h-4 w-4" />
                    Ошибка
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCheck}
            disabled={!allPicked}
            className="btn-3d inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-xl bg-emerald-600 px-5 py-2.5 font-display text-sm font-bold text-white shadow-[0_5px_0_#047857] hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Проверить</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setKzPicked({});
              setEnPicked({});
              setChecked(false);
            }}
            className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-display text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Сбросить</span>
          </button>
        </div>

        {checked && (
          <span
            className={`text-sm font-bold ${
              correctRows === 4 ? 'text-emerald-700' : 'text-rose-700'
            }`}
          >
            {correctRows === 4
              ? 'Отлично! Ты знаешь все слова на трёх языках!'
              : `Верно ${correctRows} из 4 строк. Поправь выделенные слова!`}
          </span>
        )}
      </div>
    </div>
  );
}

/* ---------------- Task 7: Мини-редактор Scratch ---------------- */
type CanvasTool = 'brush' | 'eraser' | 'line' | 'rect' | 'circle' | 'fill';

const CANVAS_COLORS = [
  '#0f172a',
  '#0284c7',
  '#10b981',
  '#f59e0b',
  '#ea580c',
  '#ec4899',
];

export function Task7MiniEditor({
  completed,
  onComplete,
  onCelebrate,
}: {
  completed: boolean;
  onComplete: () => void;
  onCelebrate: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tool, setTool] = useState<CanvasTool>('brush');
  const [color, setColor] = useState<string>('#0284c7');
  const [lineWidth, setLineWidth] = useState<number>(5);

  const isDrawingRef = useRef(false);
  const startPointRef = useRef<{x: number; y: number}>({x: 0, y: 0});
  const snapshotRef = useRef<ImageData | null>(null);
  const historyRef = useRef<ImageData[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    historyRef.current = [ctx.getImageData(0, 0, canvas.width, canvas.height)];
  }, []);

  const getCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const pushHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const snap = ctx.getImageData(0, 0, canvas.width, canvas.height);
    historyRef.current = [...historyRef.current.slice(-14), snap];
  };

  const floodFill = (startX: number, startY: number, fillHex: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const sx = Math.floor(startX);
    const sy = Math.floor(startY);
    if (sx < 0 || sx >= w || sy < 0 || sy >= h) return;

    const img = ctx.getImageData(0, 0, w, h);
    const data = img.data;
    const idx0 = (sy * w + sx) * 4;
    const targetR = data[idx0];
    const targetG = data[idx0 + 1];
    const targetB = data[idx0 + 2];

    const r = parseInt(fillHex.slice(1, 3), 16);
    const g = parseInt(fillHex.slice(3, 5), 16);
    const b = parseInt(fillHex.slice(5, 7), 16);

    if (
      Math.abs(targetR - r) < 8 &&
      Math.abs(targetG - g) < 8 &&
      Math.abs(targetB - b) < 8
    ) {
      return;
    }

    const matchColor = (pos: number) =>
      Math.abs(data[pos] - targetR) <= 28 &&
      Math.abs(data[pos + 1] - targetG) <= 28 &&
      Math.abs(data[pos + 2] - targetB) <= 28;

    const visited = new Uint8Array(w * h);
    const stack = [sx, sy];

    while (stack.length > 0) {
      const y = stack.pop()!;
      const x = stack.pop()!;
      const cell = y * w + x;
      if (visited[cell]) continue;
      const pos = cell * 4;
      if (!matchColor(pos)) continue;

      visited[cell] = 1;
      data[pos] = r;
      data[pos + 1] = g;
      data[pos + 2] = b;
      data[pos + 3] = 255;

      if (x > 0) stack.push(x - 1, y);
      if (x < w - 1) stack.push(x + 1, y);
      if (y > 0) stack.push(x, y - 1);
      if (y < h - 1) stack.push(x, y + 1);
    }

    ctx.putImageData(img, 0, 0);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pt = getCoords(e);

    if (tool === 'fill') {
      floodFill(pt.x, pt.y, color);
      pushHistory();
      return;
    }

    e.currentTarget.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    startPointRef.current = pt;
    snapshotRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);

    if (tool === 'brush' || tool === 'eraser') {
      ctx.beginPath();
      ctx.moveTo(pt.x, pt.y);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
      ctx.lineWidth = tool === 'eraser' ? lineWidth * 2.5 : lineWidth;
      ctx.lineTo(pt.x + 0.01, pt.y + 0.01);
      ctx.stroke();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const pt = getCoords(e);

    if (tool === 'brush' || tool === 'eraser') {
      ctx.lineTo(pt.x, pt.y);
      ctx.stroke();
      return;
    }

    if (snapshotRef.current) {
      ctx.putImageData(snapshotRef.current, 0, 0);
    }

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    const sx = startPointRef.current.x;
    const sy = startPointRef.current.y;

    if (tool === 'line') {
      ctx.moveTo(sx, sy);
      ctx.lineTo(pt.x, pt.y);
      ctx.stroke();
    } else if (tool === 'rect') {
      ctx.strokeRect(sx, sy, pt.x - sx, pt.y - sy);
    } else if (tool === 'circle') {
      const rx = Math.abs(pt.x - sx) / 2;
      const ry = Math.abs(pt.y - sy) / 2;
      const cx = (sx + pt.x) / 2;
      const cy = (sy + pt.y) / 2;
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  };

  const handlePointerUp = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    snapshotRef.current = null;
    pushHistory();
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas || historyRef.current.length <= 1) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const nextHistory = historyRef.current.slice(0, -1);
    historyRef.current = nextHistory;
    ctx.putImageData(nextHistory[nextHistory.length - 1], 0, 0);
  };

  const handleFlipHorizontal = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const temp = document.createElement('canvas');
    temp.width = canvas.width;
    temp.height = canvas.height;
    const tctx = temp.getContext('2d');
    if (!tctx) return;
    tctx.drawImage(canvas, 0, 0);

    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(temp, 0, 0);
    ctx.restore();
    pushHistory();
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    pushHistory();
  };

  const handleSaveDrawing = () => {
    onComplete();
    onCelebrate();
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_8px_0_#e2e8f0] sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-display text-lg font-bold text-slate-900">
            Задание 7. Потренируйся в мини-редакторе Scratch
          </h3>
          <p className="text-sm text-slate-600">
            Нарисуй своего персонажа или фигуру со стр. 33 (куб, стакан, домик),
            используя Кисть, Фигуры, Заливку, Ластик и Отражение!
          </p>
        </div>
        {completed && (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            Рисунок засчитан!
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Toolbar */}
        <div className="space-y-4 lg:col-span-4">
          <div>
            <p className="mb-2 text-xs font-bold text-slate-500">Инструменты</p>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  {id: 'brush', label: 'Кисть', Icon: Paintbrush},
                  {id: 'fill', label: 'Заливка', Icon: PaintBucket},
                  {id: 'line', label: 'Линия', Icon: Minus},
                  {id: 'rect', label: 'Прямоуг.', Icon: Square},
                  {id: 'circle', label: 'Круг', Icon: Circle},
                  {id: 'eraser', label: 'Ластик', Icon: Eraser},
                ] as const
              ).map(({id, label, Icon}) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTool(id)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold transition-colors ${
                    tool === id
                      ? 'border-sky-600 bg-sky-600 text-white shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-bold text-slate-500">
              Цветовая палитра
            </p>
            <div className="flex flex-wrap gap-2">
              {CANVAS_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-label={`Выбрать цвет ${c}`}
                  onClick={() => setColor(c)}
                  style={{backgroundColor: c}}
                  className={`h-8 w-8 rounded-lg border-2 transition-transform ${
                    color === c
                      ? 'scale-110 border-slate-900 ring-2 ring-sky-400'
                      : 'border-white shadow-sm'
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between text-xs font-bold text-slate-600">
              <span>Ширина линии</span>
              <span className="tabular-nums">{lineWidth} px</span>
            </div>
            <input
              type="range"
              min={2}
              max={16}
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
              className="w-full accent-sky-600"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={handleFlipHorizontal}
              title="Отразить горизонтально"
              className="flex flex-col items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-[11px] font-bold text-slate-700 hover:bg-slate-100"
            >
              <FlipHorizontal2 className="h-4 w-4 text-indigo-600" />
              <span>Отразить</span>
            </button>
            <button
              type="button"
              onClick={handleUndo}
              title="Отменить"
              className="flex flex-col items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-[11px] font-bold text-slate-700 hover:bg-slate-100"
            >
              <Undo2 className="h-4 w-4 text-slate-700" />
              <span>Отмена</span>
            </button>
            <button
              type="button"
              onClick={handleClear}
              title="Очистить холст"
              className="flex flex-col items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-[11px] font-bold text-rose-700 hover:bg-rose-50"
            >
              <Trash2 className="h-4 w-4" />
              <span>Очистить</span>
            </button>
          </div>
        </div>

        {/* Drawing Canvas */}
        <div className="flex flex-col justify-between gap-3 lg:col-span-8">
          <div className="overflow-hidden rounded-xl border-2 border-slate-300 bg-white shadow-inner">
            <canvas
              ref={canvasRef}
              width={640}
              height={360}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="block aspect-[16/9] w-full touch-none cursor-crosshair bg-white"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              Подсказка: чтобы сработала «Заливка», нарисуй замкнутый круг или
              прямоугольник.
            </span>

            <button
              type="button"
              onClick={handleSaveDrawing}
              className="btn-3d inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-xl bg-sky-600 px-5 py-2.5 font-display text-sm font-bold text-white shadow-[0_5px_0_#0369a1] hover:bg-sky-500"
            >
              <Sparkles className="h-4 w-4" />
              <span>Готово! Сохранить рисунок</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
