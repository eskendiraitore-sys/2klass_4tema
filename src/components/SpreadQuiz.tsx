import {useState} from 'react';
import {CheckCircle2, XCircle, RotateCcw, Award} from 'lucide-react';

interface SpreadQuizProps {
  savedScore: number | null;
  onQuizComplete: (score: number) => void;
  onCelebrate: () => void;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: '1. Для чего нужен инструмент «Заливка»?',
    options: [
      'Стирать лишние линии на рисунке',
      'Закрашивать замкнутую область выбранным цветом',
      'Отражать спрайт по горизонтали',
    ],
    correctIndex: 1,
  },
  {
    id: 'q2',
    question: '2. Какая комбинация клавиш копирует выделенный фрагмент рисунка?',
    options: ['Ctrl + V', 'Alt + F4', 'Ctrl + C'],
    correctIndex: 2,
  },
  {
    id: 'q3',
    question:
      '3. Какой блок из раздела «События» запускает движение мальчика в проекте?',
    options: ['когда спрайт нажат', 'идти 10 шагов', 'стоп этот скрипт'],
    correctIndex: 0,
  },
  {
    id: 'q4',
    question:
      '4. При каком условии мальчик остановится в проекте «Возвращение из школы домой»?',
    options: [
      'Когда дойдет до края экрана',
      'Когда коснется зеленого цвета',
      'Когда нажмут клавишу Пробел',
    ],
    correctIndex: 1,
  },
  {
    id: 'q5',
    question:
      '5. Что делает кнопка управления рисунком с двумя стрелками влево-вправо?',
    options: [
      'Обрезает рисунок по выделению',
      'Отражает спрайт вертикально',
      'Отражает спрайт горизонтально',
    ],
    correctIndex: 2,
  },
];

export function SpreadQuiz({
  savedScore,
  onQuizComplete,
  onCelebrate,
}: SpreadQuizProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [checked, setChecked] = useState(false);

  const handleSelect = (qId: string, optionIdx: number) => {
    setAnswers((prev) => ({...prev, [qId]: optionIdx}));
    if (checked) {
      setChecked(false);
    }
  };

  const allAnswered = QUIZ_QUESTIONS.every((q) => answers[q.id] !== undefined);

  const computedScore = QUIZ_QUESTIONS.reduce(
    (acc, q) => (answers[q.id] === q.correctIndex ? acc + 1 : acc),
    0
  );

  const handleCheck = () => {
    setChecked(true);
    onQuizComplete(computedScore);
    if (computedScore >= 4) {
      onCelebrate();
    }
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 sm:flex-row sm:items-center sm:px-6">
        <div>
          <p className="text-xs font-semibold text-emerald-800">
            Разворот 4 · Вопросы к тексту · § 8
          </p>
          <h2 className="font-display text-lg font-bold text-slate-900 sm:text-xl">
            Проверка знаний: выбери правильный ответ
          </h2>
        </div>

        <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
          <Award className="h-4 w-4 text-amber-600" />
          <span className="tabular-nums">
            {checked
              ? `Результат: ${computedScore} из 5`
              : savedScore !== null
                ? `Лучший результат: ${savedScore} из 5`
                : '5 вопросов'}
          </span>
        </div>
      </div>

      {/* 2-Column Quiz Cards */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {QUIZ_QUESTIONS.map((q) => {
          const selected = answers[q.id];
          const isCorrect = selected === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`rounded-xl border bg-white p-5 shadow-[0_6px_0_#e2e8f0] transition-colors ${
                checked
                  ? isCorrect
                    ? 'border-emerald-300'
                    : 'border-rose-300'
                  : 'border-slate-200'
              }`}
            >
              <h3 className="font-display text-base font-bold text-slate-900">
                {q.question}
              </h3>

              <div className="mt-3 space-y-2">
                {q.options.map((opt, idx) => {
                  const isPicked = selected === idx;
                  const showRight = checked && idx === q.correctIndex;
                  const showWrong = checked && isPicked && idx !== q.correctIndex;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelect(q.id, idx)}
                      className={`flex w-full items-center justify-between gap-3 rounded-lg border px-3.5 py-2.5 text-left text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-sky-600 ${
                        showRight
                          ? 'border-emerald-400 bg-emerald-50 text-emerald-950'
                          : showWrong
                            ? 'border-rose-400 bg-rose-50 text-rose-950'
                            : isPicked
                              ? 'border-sky-500 bg-sky-50 text-sky-950 shadow-xs'
                              : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span>{opt}</span>
                      {showRight && (
                        <span className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-emerald-700">
                          <CheckCircle2 className="h-4 w-4" />
                          Верно
                        </span>
                      )}
                      {showWrong && (
                        <span className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-rose-700">
                          <XCircle className="h-4 w-4" />
                          Ошибка
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Quiz Summary & Action Card in the 6th grid slot */}
        <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-[0_6px_0_#e2e8f0]">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Готов проверить свои ответы?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Выбери по одному ответу на каждый из 5 вопросов, затем нажми
              кнопку «Проверить». За отличный результат тебя ждут звёздочки!
            </p>

            {checked && (
              <div
                className={`mt-4 flex items-center gap-2.5 rounded-lg border p-3 text-sm font-bold ${
                  computedScore === 5
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                    : computedScore >= 3
                      ? 'border-amber-300 bg-amber-50 text-amber-900'
                      : 'border-rose-300 bg-rose-50 text-rose-900'
                }`}
              >
                {computedScore >= 4 ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                ) : (
                  <XCircle className="h-5 w-5 shrink-0 text-amber-600" />
                )}
                <span>
                  {computedScore === 5
                    ? 'Молодец! Все 5 из 5 ответов верны!'
                    : `Правильных ответов: ${computedScore} из 5. Посмотри подсказки и попробуй еще раз!`}
                </span>
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleCheck}
              disabled={!allAnswered}
              className="btn-3d inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-xl bg-emerald-600 px-6 py-2.5 font-display text-sm font-bold text-white shadow-[0_5px_0_#047857] hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Проверить</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-display text-sm font-bold text-slate-700 hover:bg-slate-100"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Сбросить</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
