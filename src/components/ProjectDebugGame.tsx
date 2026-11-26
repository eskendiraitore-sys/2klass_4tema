import {useState} from 'react';
import {Bug, CheckCircle2, XCircle, RotateCcw, ArrowRight} from 'lucide-react';

interface DebugBlock {
  id: string;
  label: string;
  bg: string;
  shadow: string;
  indent?: boolean;
  swatchColor?: string;
}

interface DebugRound {
  id: string;
  title: string;
  prompt: string;
  blocks: DebugBlock[];
  bugBlockId: string;
  successHint: string;
  wrongHint: string;
}

const DEBUG_ROUNDS: DebugRound[] = [
  {
    id: 'r1',
    title: 'Задача 1 из 3: Запуск движения',
    prompt: 'Мальчик не начинает идти, когда мы нажимаем на него мышкой. Какой блок в скрипте лишний или неправильный?',
    blocks: [
      {
        id: 'b1',
        label: 'когда нажата клавиша [пробел]',
        bg: 'bg-amber-500',
        shadow: 'shadow-[0_3px_0_#b45309]',
      },
      {
        id: 'b2',
        label: 'если <касается цвета [зеленый]?>, то',
        bg: 'bg-orange-500',
        shadow: 'shadow-[0_3px_0_#c2410c]',
        swatchColor: '#10b981',
      },
      {
        id: 'b3',
        label: 'идти 10 шагов',
        bg: 'bg-sky-600',
        shadow: 'shadow-[0_3px_0_#0369a1]',
        indent: true,
      },
      {
        id: 'b4',
        label: 'стоп этот скрипт',
        bg: 'bg-amber-600',
        shadow: 'shadow-[0_3px_0_#92400e]',
        indent: true,
      },
    ],
    bugBlockId: 'b1',
    successHint:
      'Верно! Для запуска по клику на персонажа нужен блок «когда спрайт нажат», а не клавиша пробел.',
    wrongHint:
      'Этот блок на месте! Посмотри на самый первый блок запуска в разделе События.',
  },
  {
    id: 'r2',
    title: 'Задача 2 из 3: Условие остановки',
    prompt: 'Мальчик дошел до зеленой лужайки у дома, но почему-то не остановился. Найди ошибку в блоке!',
    blocks: [
      {
        id: 'b1',
        label: 'когда спрайт нажат',
        bg: 'bg-amber-500',
        shadow: 'shadow-[0_3px_0_#b45309]',
      },
      {
        id: 'b2',
        label: 'если <касается цвета [фиолетовый]?>, то',
        bg: 'bg-orange-500',
        shadow: 'shadow-[0_3px_0_#c2410c]',
        swatchColor: '#9333ea',
      },
      {
        id: 'b3',
        label: 'идти 10 шагов',
        bg: 'bg-sky-600',
        shadow: 'shadow-[0_3px_0_#0369a1]',
        indent: true,
      },
      {
        id: 'b4',
        label: 'стоп этот скрипт',
        bg: 'bg-amber-600',
        shadow: 'shadow-[0_3px_0_#92400e]',
        indent: true,
      },
    ],
    bugBlockId: 'b2',
    successHint:
      'Точно! По заданию мальчик должен касаться зеленого цвета, а здесь выбран фиолетовый.',
    wrongHint:
      'Этот блок верный. Проверь, какой цвет указан внутри условия «если касается цвета...»!',
  },
  {
    id: 'r3',
    title: 'Задача 3 из 3: Команда шага',
    prompt: 'Вместо того чтобы идти прямо по дорожке домой, мальчик просто кружится на месте. Какой блок виноват?',
    blocks: [
      {
        id: 'b1',
        label: 'когда спрайт нажат',
        bg: 'bg-amber-500',
        shadow: 'shadow-[0_3px_0_#b45309]',
      },
      {
        id: 'b2',
        label: 'если <касается цвета [зеленый]?>, то',
        bg: 'bg-orange-500',
        shadow: 'shadow-[0_3px_0_#c2410c]',
        swatchColor: '#10b981',
      },
      {
        id: 'b3',
        label: 'повернуть на 15 градусов',
        bg: 'bg-sky-600',
        shadow: 'shadow-[0_3px_0_#0369a1]',
        indent: true,
      },
      {
        id: 'b4',
        label: 'стоп этот скрипт',
        bg: 'bg-amber-600',
        shadow: 'shadow-[0_3px_0_#92400e]',
        indent: true,
      },
    ],
    bugBlockId: 'b3',
    successHint:
      'Молодец! Для движения вперед должен быть блок «идти 10 шагов», а не поворот.',
    wrongHint:
      'Здесь ошибки нет. Поищи синий блок Движения, который заставляет героя кружиться!',
  },
];

export function ProjectDebugGame({onCelebrate}: {onCelebrate: () => void}) {
  const [roundIdx, setRoundIdx] = useState(0);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [solvedRounds, setSolvedRounds] = useState<Record<string, boolean>>({});

  const round = DEBUG_ROUNDS[roundIdx];
  const isCorrect = checked && selectedBlockId === round.bugBlockId;
  const isWrong = checked && selectedBlockId !== round.bugBlockId;
  const solvedCount = Object.values(solvedRounds).filter(Boolean).length;

  const handleCheck = () => {
    if (!selectedBlockId) return;
    setChecked(true);
    if (selectedBlockId === round.bugBlockId) {
      setSolvedRounds((prev) => ({...prev, [round.id]: true}));
      onCelebrate();
    }
  };

  const handleNextRound = () => {
    if (roundIdx < DEBUG_ROUNDS.length - 1) {
      setRoundIdx((prev) => prev + 1);
      setSelectedBlockId(null);
      setChecked(false);
    }
  };

  const handleRestart = () => {
    setRoundIdx(0);
    setSelectedBlockId(null);
    setChecked(false);
    setSolvedRounds({});
  };

  return (
    <div className="rounded-xl border border-rose-200 bg-white p-5 shadow-[0_8px_0_#fecdd3] sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-600 text-white shadow-xs">
            <Bug className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-slate-900 sm:text-lg">
              Мини-игра «Найди ошибки в коде»
            </h3>
            <p className="text-xs text-slate-600 sm:text-sm">
              Нажми на неправильный блок Scratch в скрипте движения персонажа и
              проверь ответ.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {DEBUG_ROUNDS.map((r, idx) => (
            <button
              key={r.id}
              type="button"
              onClick={() => {
                setRoundIdx(idx);
                setSelectedBlockId(null);
                setChecked(false);
              }}
              className={`rounded-lg border px-2.5 py-1 font-display text-xs font-bold transition-colors ${
                idx === roundIdx
                  ? 'border-rose-600 bg-rose-600 text-white'
                  : solvedRounds[r.id]
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              #{idx + 1}
              {solvedRounds[r.id] ? ' ✓' : ''}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* Left: Prompt & Status */}
        <div className="space-y-3 lg:col-span-5">
          <p className="font-display text-sm font-bold text-rose-800">
            {round.title}
          </p>
          <p className="text-sm leading-relaxed text-slate-700">
            {round.prompt}
          </p>

          <div className="text-xs font-semibold text-slate-500 tabular-nums">
            Найдено ошибок: {solvedCount} из {DEBUG_ROUNDS.length}
          </div>

          {checked && (
            <div
              className={`flex items-start gap-2.5 rounded-xl border p-3.5 text-xs font-semibold leading-relaxed sm:text-sm ${
                isCorrect
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                  : 'border-rose-300 bg-rose-50 text-rose-950'
              }`}
            >
              {isCorrect ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              ) : (
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
              )}
              <span>{isCorrect ? round.successHint : round.wrongHint}</span>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={handleCheck}
              disabled={!selectedBlockId}
              className="btn-3d inline-flex min-h-[42px] items-center gap-2 whitespace-nowrap rounded-xl bg-emerald-600 px-5 py-2 font-display text-sm font-bold text-white shadow-[0_4px_0_#047857] hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Проверить</span>
            </button>

            {isCorrect && roundIdx < DEBUG_ROUNDS.length - 1 && (
              <button
                type="button"
                onClick={handleNextRound}
                className="btn-3d inline-flex min-h-[42px] items-center gap-1.5 whitespace-nowrap rounded-xl bg-sky-600 px-4 py-2 font-display text-sm font-bold text-white shadow-[0_4px_0_#0369a1] hover:bg-sky-500"
              >
                <span>Следующая</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}

            {solvedCount === DEBUG_ROUNDS.length && (
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex min-h-[42px] items-center gap-1.5 whitespace-nowrap rounded-xl border border-slate-300 bg-white px-4 py-2 font-display text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Заново</span>
              </button>
            )}
          </div>
        </div>

        {/* Right: Clickable 3D Scratch Blocks Stack */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 lg:col-span-7">
          <p className="mb-2.5 text-xs font-bold text-slate-500">
            Выбери неправильный блок (нажми на него):
          </p>
          <div className="space-y-2">
            {round.blocks.map((block) => {
              const isPicked = selectedBlockId === block.id;
              const showOk = checked && isPicked && block.id === round.bugBlockId;
              const showErr = checked && isPicked && block.id !== round.bugBlockId;

              return (
                <button
                  key={block.id}
                  type="button"
                  onClick={() => {
                    setSelectedBlockId(block.id);
                    setChecked(false);
                  }}
                  className={`btn-3d flex items-center justify-between gap-3 rounded-lg px-4 py-2.5 text-left font-display text-xs font-bold text-white transition-all sm:text-sm ${block.bg} ${block.shadow} ${
                    block.indent ? 'ml-5 w-[calc(100%-1.25rem)]' : 'w-full'
                  } ${
                    isPicked
                      ? 'ring-3 ring-slate-900 ring-offset-2'
                      : 'opacity-95 hover:opacity-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{block.label}</span>
                    {block.swatchColor && (
                      <span
                        aria-hidden="true"
                        style={{backgroundColor: block.swatchColor}}
                        className="inline-block h-3.5 w-5 rounded border border-white"
                      />
                    )}
                  </span>

                  <span className="shrink-0 rounded bg-black/20 px-2 py-0.5 text-[11px]">
                    {showOk
                      ? 'Ошибка найдена!'
                      : showErr
                        ? 'Здесь верно'
                        : isPicked
                          ? 'Выбран'
                          : 'Выбрать'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
