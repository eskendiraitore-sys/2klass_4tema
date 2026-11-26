import {useState} from 'react';
import {
  Check,
  Award,
  Sparkles,
  BookCheck,
  CheckCircle2,
  X,
} from 'lucide-react';
import {LessonProgress} from '../types/book';
import {StudentSubmitCard} from './StudentSubmitCard';

interface SpreadHomeworkProps {
  progress: LessonProgress;
  onToggleHomework: (itemId: string) => void;
  onFinishLesson: () => void;
}

const HOMEWORK_ITEMS = [
  {
    id: 'hw-words',
    title: 'Выучить новые слова на трёх языках',
    detail: 'создание персонажа – кейіпкер құру – character creation',
  },
  {
    id: 'hw-tools',
    title: 'Повторить назначение инструментов графического редактора Scratch',
    detail: 'Кисть, Заливка, Ластик, Выбор / Выделение',
  },
  {
    id: 'hw-draw',
    title: 'Нарисовать в Scratch собственный персонаж или предмет со стр. 33',
    detail: 'Зелёный куб, голубой стакан или домик',
  },
  {
    id: 'hw-video',
    title: 'Посмотреть видео-практику от учителя',
    detail: 'Закрепить шаги проекта «Возвращение из школы домой»',
  },
];

export function SpreadHomework({
  progress,
  onToggleHomework,
  onFinishLesson,
}: SpreadHomeworkProps) {
  const [showMedalModal, setShowMedalModal] = useState(false);
  const [medalImgError, setMedalImgError] = useState(false);

  const handleCompleteClick = () => {
    onFinishLesson();
    setShowMedalModal(true);
  };

  const completedTasksCount =
    (progress.task1Passed ? 1 : 0) +
    (progress.task2Passed ? 1 : 0) +
    (progress.task3SelectedObject ? 1 : 0) +
    (progress.task4Saved ? 1 : 0) +
    (progress.task5Passed ? 1 : 0) +
    (progress.task6Passed ? 1 : 0) +
    (progress.task7Completed ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col justify-between gap-3 rounded-xl border border-indigo-200 bg-indigo-50/70 p-4 sm:flex-row sm:items-center sm:px-6">
        <div>
          <p className="text-xs font-semibold text-indigo-800">
            Финальный разворот · Домашнее задание
          </p>
          <h2 className="font-display text-lg font-bold text-slate-900 sm:text-xl">
            Домашнее задание и завершение урока
          </h2>
        </div>
        <span className="text-xs font-semibold text-slate-600 tabular-nums">
          Отмечено пунктов: {progress.homeworkChecked.length} из 4
        </span>
      </div>

      {/* 2-Column Closing Spread */}
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
        {/* Left Page: 3D Homework Checklist Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_8px_0_#e2e8f0] lg:col-span-7">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <BookCheck className="h-5 w-5 text-sky-600" />
            <h3 className="font-display text-lg font-bold text-slate-900">
              Чек-лист домашнего задания
            </h3>
          </div>

          <div className="mt-4 space-y-3">
            {HOMEWORK_ITEMS.map((item) => {
              const checked = progress.homeworkChecked.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onToggleHomework(item.id)}
                  className={`flex w-full items-start gap-3.5 rounded-xl border p-4 text-left transition-all focus-visible:outline-2 focus-visible:outline-sky-600 ${
                    checked
                      ? 'border-emerald-300 bg-emerald-50/60 shadow-xs'
                      : 'border-slate-200 bg-slate-50/50 hover:border-sky-300 hover:bg-white'
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors ${
                      checked
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {checked && <Check className="h-4 w-4" />}
                  </span>

                  <div>
                    <p
                      className={`font-display text-sm font-bold sm:text-base ${
                        checked ? 'text-emerald-950' : 'text-slate-900'
                      }`}
                    >
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

        {/* Right Page: Lesson Summary & Big 3D Reward Button */}
        <div className="flex flex-col justify-between rounded-xl border border-amber-200 bg-gradient-to-b from-amber-50/70 to-white p-6 shadow-[0_8px_0_#fde68a] lg:col-span-5">
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-bold text-slate-900">
              <Award className="h-6 w-6 text-amber-600" />
              <span>Твои успехи за урок</span>
            </div>

            <div className="mt-4 space-y-2.5 text-sm">
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3.5 py-2.5">
                <span className="text-slate-700">Карточки учебника</span>
                <span className="font-display font-bold text-slate-900 tabular-nums">
                  {progress.flippedCardIds.length} / 4
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3.5 py-2.5">
                <span className="text-slate-700">Рабочая тетрадь</span>
                <span className="font-display font-bold text-slate-900 tabular-nums">
                  {completedTasksCount} / 7
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3.5 py-2.5">
                <span className="text-slate-700">Викторина к тексту</span>
                <span className="font-display font-bold text-slate-900 tabular-nums">
                  {progress.quizScore !== null
                    ? `${progress.quizScore} / 5`
                    : 'Не пройдена'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={handleCompleteClick}
              className="btn-3d flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-xl bg-amber-500 px-6 py-3.5 font-display text-base font-extrabold text-slate-950 shadow-[0_6px_0_#b45309] hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
            >
              <Sparkles className="h-5 w-5 shrink-0" />
              <span>Завершить урок и получить награду</span>
            </button>

            {progress.lessonCompleted && (
              <p className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                Медаль «Юный художник Scratch» получена!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Отправка результата учителю */}
      <StudentSubmitCard lang="ru" progress={progress} />

      {/* Animated 3D Medal Modal */}
      {showMedalModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Награда: Юный художник Scratch"
          className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs"
          onClick={() => setShowMedalModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border-2 border-amber-300 bg-white p-6 text-center shadow-[0_24px_48px_rgba(15,23,42,0.3),0_10px_0_#f59e0b] sm:p-8"
          >
            <button
              type="button"
              onClick={() => setShowMedalModal(false)}
              aria-label="Закрыть окно награды"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>

            <p className="text-xs font-bold tracking-wide text-amber-700">
              Поздравляем с завершением § 8!
            </p>
            <h3 className="mt-1 font-display text-2xl font-extrabold text-slate-900">
              Юный художник Scratch
            </h3>

            {/* 3D Floating Medal Display */}
            <div className="mx-auto my-5 flex h-52 w-52 items-center justify-center overflow-hidden rounded-full border-4 border-amber-300 bg-amber-50 p-2 shadow-[0_14px_28px_rgba(245,158,11,0.35)]">
              {!medalImgError ? (
                <img
                  src="/src/assets/images/medal_young_artist_1795725590542.jpg"
                  alt="3D-медаль Юный художник Scratch"
                  referrerPolicy="no-referrer"
                  onError={() => setMedalImgError(true)}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-white">
                  <Award className="h-20 w-20" />
                </div>
              )}
            </div>

            <p className="text-sm leading-relaxed text-slate-600">
              Ты научился пользоваться графическим редактором Scratch,
              разобрался с инструментами и собрал алгоритм ветвления!
            </p>

            <button
              type="button"
              onClick={() => setShowMedalModal(false)}
              className="btn-3d mt-5 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-sky-600 px-7 py-2.5 font-display text-sm font-bold text-white shadow-[0_5px_0_#0369a1] hover:bg-sky-500"
            >
              Ура! Спасибо!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
