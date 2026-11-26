import {useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {ChevronLeft, ChevronRight, BookOpen, ShieldCheck} from 'lucide-react';
import {LessonProgress, SpreadId, SpreadMeta} from './types/book';
import {CelebrationBurst} from './components/CelebrationBurst';
import {ErrorBoundary} from './components/ErrorBoundary';
import {OwnerDashboardModal} from './components/OwnerDashboardModal';
import {
  KzCover,
  KzEditorTheory,
  KzProjectVideo,
} from './kz/KazakhSpreadsTop';
import {
  KzWorkbook,
  KzQuiz,
  KzHomework,
} from './kz/KazakhWorkbookQuizHomework';

const KZ_SPREADS: SpreadMeta[] = [
  {
    id: 'cover',
    shortTitle: 'Мұқаба',
    fullTitle: '§ 8: Өз кейіпкеріңді жасау',
    pages: 'Мұқаба',
  },
  {
    id: 'editor',
    shortTitle: 'Оқулық',
    fullTitle: 'Scratch графикалық редакторы',
    pages: '30–31-б.',
  },
  {
    id: 'project',
    shortTitle: 'Жоба',
    fullTitle: '«Мектептен үйге қайту» жобасы',
    pages: '32–33-б.',
  },
  {
    id: 'workbook',
    shortTitle: 'Дәптер',
    fullTitle: 'Интерактивті жұмыс дәптері',
    pages: '30–33-б.',
  },
  {
    id: 'quiz',
    shortTitle: 'Викторина',
    fullTitle: 'Мәтін бойынша сұрақтар',
    pages: 'Білімді тексеру',
  },
  {
    id: 'homework',
    shortTitle: 'Үй жұмысы',
    fullTitle: 'Үй тапсырмасы және марапат',
    pages: 'Қорытынды',
  },
];

const INITIAL_PROGRESS: LessonProgress = {
  flippedCardIds: [],
  videoWatched: false,
  task1Passed: false,
  task2Passed: false,
  task3SelectedObject: null,
  task4Saved: false,
  task5Passed: false,
  task6Passed: false,
  task7Completed: false,
  quizScore: null,
  homeworkChecked: [],
  lessonCompleted: false,
};

export default function AppKz() {
  const [currentSpread, setCurrentSpread] = useState<SpreadId>('cover');
  const [flipDirection, setFlipDirection] = useState<1 | -1>(1);
  const [progress, setProgress] = useState<LessonProgress>(INITIAL_PROGRESS);

  const [burstKey, setBurstKey] = useState(0);
  const [burstVariant, setBurstVariant] = useState<'stars' | 'fireworks'>('stars');
  const [ownerModalOpen, setOwnerModalOpen] = useState(false);

  const currentIndex = KZ_SPREADS.findIndex((s) => s.id === currentSpread);
  const currentMeta = KZ_SPREADS[currentIndex];

  const triggerCelebration = (variant: 'stars' | 'fireworks' = 'stars') => {
    setBurstVariant(variant);
    setBurstKey((prev) => prev + 1);
  };

  const goToSpread = (targetId: SpreadId) => {
    const targetIdx = KZ_SPREADS.findIndex((s) => s.id === targetId);
    if (targetIdx === -1 || targetId === currentSpread) return;
    setFlipDirection(targetIdx > currentIndex ? 1 : -1);
    setCurrentSpread(targetId);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const goPrev = () => {
    if (currentIndex > 0) goToSpread(KZ_SPREADS[currentIndex - 1].id);
  };

  const goNext = () => {
    if (currentIndex < KZ_SPREADS.length - 1)
      goToSpread(KZ_SPREADS[currentIndex + 1].id);
  };

  const navSpreads = KZ_SPREADS.filter((s) => s.id !== 'cover');

  return (
    <ErrorBoundary>
      <div className="flex min-h-screen flex-col bg-slate-100 text-slate-900">
        <CelebrationBurst triggerKey={burstKey} variant={burstVariant} />
        <OwnerDashboardModal
          open={ownerModalOpen}
          lang="kz"
          onClose={() => setOwnerModalOpen(false)}
        />

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-xs">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => goToSpread('cover')}
            className="whitespace-nowrap shrink-0 font-display text-lg font-bold tracking-tight text-slate-900 hover:text-sky-700"
          >
            Цифрлық сауаттылық
          </button>

          <nav
            aria-label="Оқулық бөлімдері"
            className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex"
          >
            {navSpreads.map((spread) => {
              const active = currentSpread === spread.id;
              return (
                <button
                  key={spread.id}
                  type="button"
                  onClick={() => goToSpread(spread.id)}
                  className={`whitespace-nowrap shrink-0 border-b-2 py-1 transition-colors ${
                    active
                      ? 'border-sky-600 text-sky-700'
                      : 'border-transparent hover:border-slate-300 hover:text-slate-900'
                  }`}
                >
                  {spread.shortTitle}
                </button>
              );
            })}
          </nav>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() =>
                currentSpread === 'homework' ? goToSpread('cover') : goNext()
              }
              className="btn-3d inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-lg bg-sky-600 px-4 py-2 font-display text-xs font-bold text-white shadow-[0_3px_0_#0369a1] hover:bg-sky-500"
            >
              <BookOpen className="h-3.5 w-3.5 shrink-0" />
              <span>
                {currentSpread === 'cover'
                  ? 'Оқулықты ашу'
                  : currentSpread === 'homework'
                    ? 'Мұқабаға'
                    : 'Келесі'}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-5 flex items-center gap-2 overflow-x-auto pb-1 md:hidden">
          {KZ_SPREADS.map((spread) => (
            <button
              key={spread.id}
              type="button"
              onClick={() => goToSpread(spread.id)}
              className={`whitespace-nowrap shrink-0 rounded-lg border px-3 py-1.5 font-display text-xs font-bold ${
                currentSpread === spread.id
                  ? 'border-sky-600 bg-sky-600 text-white'
                  : 'border-slate-200 bg-white text-slate-700'
              }`}
            >
              {spread.shortTitle}
            </button>
          ))}
        </div>

        <div className="perspective-1800 relative">
          <AnimatePresence mode="wait" custom={flipDirection}>
            <motion.div
              key={currentSpread}
              custom={flipDirection}
              initial={{
                opacity: 0,
                rotateY: flipDirection > 0 ? 18 : -18,
                scale: 0.985,
              }}
              animate={{opacity: 1, rotateY: 0, scale: 1}}
              exit={{
                opacity: 0,
                rotateY: flipDirection > 0 ? -18 : 18,
                scale: 0.985,
              }}
              transition={{duration: 0.38, ease: [0.16, 1, 0.3, 1]}}
              style={{
                transformOrigin:
                  flipDirection > 0 ? 'left center' : 'right center',
              }}
            >
              {currentSpread === 'cover' ? (
                <KzCover onOpenBook={() => goToSpread('editor')} />
              ) : (
                <div className="relative flex overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-[0_22px_45px_-12px_rgba(15,23,42,0.16),0_8px_0_#cbd5e1]">
                  <div
                    aria-hidden="true"
                    className="hidden w-2.5 shrink-0 border-r border-slate-200 bg-gradient-to-l from-slate-100 via-white to-slate-200 sm:block"
                  />
                  <div className="paper-texture relative flex-1 p-5 sm:p-8 lg:p-10">
                    <div
                      aria-hidden="true"
                      className="book-spine-shadow pointer-events-none absolute inset-y-0 left-1/2 hidden w-10 -translate-x-1/2 lg:block"
                    />
                    <div className="relative z-10">
                      {currentSpread === 'editor' && (
                        <KzEditorTheory
                          flippedIds={progress.flippedCardIds}
                          onCardFlip={(id) =>
                            setProgress((p) =>
                              p.flippedCardIds.includes(id)
                                ? p
                                : {...p, flippedCardIds: [...p.flippedCardIds, id]}
                            )
                          }
                        />
                      )}
                      {currentSpread === 'project' && (
                        <KzProjectVideo
                          videoWatched={progress.videoWatched}
                          onVideoWatch={() =>
                            setProgress((p) => ({...p, videoWatched: true}))
                          }
                          onCelebrate={() => triggerCelebration('stars')}
                        />
                      )}
                      {currentSpread === 'workbook' && (
                        <KzWorkbook
                          progress={progress}
                          onTask1Pass={() =>
                            setProgress((p) => ({...p, task1Passed: true}))
                          }
                          onTask2Pass={() =>
                            setProgress((p) => ({...p, task2Passed: true}))
                          }
                          onTask3Select={(objId) =>
                            setProgress((p) => ({
                              ...p,
                              task3SelectedObject: objId,
                            }))
                          }
                          onTask4Save={() =>
                            setProgress((p) => ({...p, task4Saved: true}))
                          }
                          onTask5Pass={() =>
                            setProgress((p) => ({...p, task5Passed: true}))
                          }
                          onTask6Pass={() =>
                            setProgress((p) => ({...p, task6Passed: true}))
                          }
                          onTask7Complete={() =>
                            setProgress((p) => ({...p, task7Completed: true}))
                          }
                          onCelebrate={() => triggerCelebration('stars')}
                        />
                      )}
                      {currentSpread === 'quiz' && (
                        <KzQuiz
                          savedScore={progress.quizScore}
                          onQuizComplete={(score) =>
                            setProgress((p) => ({...p, quizScore: score}))
                          }
                          onCelebrate={() => triggerCelebration('stars')}
                        />
                      )}
                      {currentSpread === 'homework' && (
                        <KzHomework
                          progress={progress}
                          onToggleHomework={(itemId) =>
                            setProgress((p) => ({
                              ...p,
                              homeworkChecked: p.homeworkChecked.includes(itemId)
                                ? p.homeworkChecked.filter((x) => x !== itemId)
                                : [...p.homeworkChecked, itemId],
                            }))
                          }
                          onFinishLesson={() => {
                            setProgress((p) => ({...p, lessonCompleted: true}));
                            triggerCelebration('fireworks');
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <div
                    aria-hidden="true"
                    className="hidden w-2.5 shrink-0 border-l border-slate-200 bg-gradient-to-r from-slate-100 via-white to-slate-200 sm:block"
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xs sm:px-6">
          <button
            type="button"
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="btn-3d inline-flex min-h-[42px] items-center gap-2 whitespace-nowrap rounded-xl border border-slate-300 bg-white px-4 py-2 font-display text-sm font-bold text-slate-700 shadow-[0_3px_0_#cbd5e1] disabled:opacity-45 disabled:shadow-none"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Алдыңғы бет</span>
          </button>

          <div className="flex flex-wrap items-center justify-center gap-3 text-center text-xs font-semibold text-slate-600 sm:text-sm">
            <span>{currentMeta.fullTitle}</span>
            <span className="text-slate-400">·</span>
            <span className="tabular-nums text-slate-500">
              {currentIndex + 1} / {KZ_SPREADS.length}
            </span>
            <span className="text-slate-400">·</span>
            <button
              type="button"
              onClick={() => setOwnerModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-700 hover:border-sky-300 hover:text-sky-700"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-sky-600" />
              <span>Мұғалім кабинеті</span>
            </button>
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={currentIndex === KZ_SPREADS.length - 1}
            className="btn-3d inline-flex min-h-[42px] items-center gap-2 whitespace-nowrap rounded-xl bg-sky-600 px-4 py-2 font-display text-sm font-bold text-white shadow-[0_3px_0_#0369a1] disabled:bg-slate-300 disabled:shadow-none"
          >
            <span>Келесі бет</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </main>
      </div>
    </ErrorBoundary>
  );
}
