import {useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {ChevronLeft, ChevronRight, BookOpen, ShieldCheck} from 'lucide-react';
import {LessonProgress, SPREADS, SpreadId} from './types/book';
import {CelebrationBurst} from './components/CelebrationBurst';
import {ErrorBoundary} from './components/ErrorBoundary';
import {OwnerDashboardModal} from './components/OwnerDashboardModal';
import {SpreadCover} from './components/SpreadCover';
import {SpreadEditorTheory} from './components/SpreadEditorTheory';
import {SpreadProjectVideo} from './components/SpreadProjectVideo';
import {SpreadWorkbook} from './components/SpreadWorkbook';
import {SpreadQuiz} from './components/SpreadQuiz';
import {SpreadHomework} from './components/SpreadHomework';

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

export default function App() {
  const [currentSpread, setCurrentSpread] = useState<SpreadId>('cover');
  const [flipDirection, setFlipDirection] = useState<1 | -1>(1);
  const [progress, setProgress] = useState<LessonProgress>(INITIAL_PROGRESS);

  const [burstKey, setBurstKey] = useState(0);
  const [burstVariant, setBurstVariant] = useState<'stars' | 'fireworks'>('stars');
  const [ownerModalOpen, setOwnerModalOpen] = useState(false);

  const currentIndex = SPREADS.findIndex((s) => s.id === currentSpread);
  const currentMeta = SPREADS[currentIndex];

  const triggerCelebration = (variant: 'stars' | 'fireworks' = 'stars') => {
    setBurstVariant(variant);
    setBurstKey((prev) => prev + 1);
  };

  const goToSpread = (targetId: SpreadId) => {
    const targetIdx = SPREADS.findIndex((s) => s.id === targetId);
    if (targetIdx === -1 || targetId === currentSpread) return;
    setFlipDirection(targetIdx > currentIndex ? 1 : -1);
    setCurrentSpread(targetId);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      goToSpread(SPREADS[currentIndex - 1].id);
    }
  };

  const goNext = () => {
    if (currentIndex < SPREADS.length - 1) {
      goToSpread(SPREADS[currentIndex + 1].id);
    }
  };

  const handleCardFlip = (cardId: string) => {
    setProgress((prev) => {
      if (prev.flippedCardIds.includes(cardId)) return prev;
      return {...prev, flippedCardIds: [...prev.flippedCardIds, cardId]};
    });
  };

  const handleToggleHomework = (itemId: string) => {
    setProgress((prev) => {
      const exists = prev.homeworkChecked.includes(itemId);
      const next = exists
        ? prev.homeworkChecked.filter((id) => id !== itemId)
        : [...prev.homeworkChecked, itemId];
      return {...prev, homeworkChecked: next};
    });
  };

  // Top bar displays the 5 lesson spreads as concise single-line links
  const navSpreads = SPREADS.filter((s) => s.id !== 'cover');

  return (
    <ErrorBoundary>
      <div className="flex min-h-screen flex-col bg-slate-100 text-slate-900">
        <CelebrationBurst triggerKey={burstKey} variant={burstVariant} />
        <OwnerDashboardModal
          open={ownerModalOpen}
          lang="ru"
          onClose={() => setOwnerModalOpen(false)}
        />

      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-xs">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3 sm:px-6">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => goToSpread('cover')}
            className="whitespace-nowrap shrink-0 font-display text-lg font-bold tracking-tight text-slate-900 hover:text-sky-700 focus-visible:outline-2 focus-visible:outline-sky-600"
          >
            Цифровая грамотность
          </button>

          {/* Zone 2: 5 concise single-line nav links */}
          <nav
            aria-label="Разделы учебника"
            className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex"
          >
            {navSpreads.map((spread) => {
              const active = currentSpread === spread.id;
              return (
                <button
                  key={spread.id}
                  type="button"
                  onClick={() => goToSpread(spread.id)}
                  className={`whitespace-nowrap shrink-0 border-b-2 py-1 transition-colors focus-visible:outline-2 focus-visible:outline-sky-600 ${
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

          {/* Zone 3: 1 Primary Action */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() =>
                currentSpread === 'homework'
                  ? goToSpread('cover')
                  : goNext()
              }
              className="btn-3d inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-lg bg-sky-600 px-4 py-2 font-display text-xs font-bold text-white shadow-[0_3px_0_#0369a1] hover:bg-sky-500 focus-visible:outline-2 focus-visible:outline-sky-700"
            >
              <BookOpen className="h-3.5 w-3.5 shrink-0" />
              <span>
                {currentSpread === 'cover'
                  ? 'Открыть учебник'
                  : currentSpread === 'homework'
                    ? 'К обложке'
                    : 'Дальше'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main 3D Book Workspace */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {/* Mobile Section Jump Strip */}
        <div className="mb-5 flex items-center gap-2 overflow-x-auto pb-1 md:hidden">
          {SPREADS.map((spread) => {
            const active = currentSpread === spread.id;
            return (
              <button
                key={spread.id}
                type="button"
                onClick={() => goToSpread(spread.id)}
                className={`whitespace-nowrap shrink-0 rounded-lg border px-3 py-1.5 font-display text-xs font-bold transition-colors ${
                  active
                    ? 'border-sky-600 bg-sky-600 text-white'
                    : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                {spread.shortTitle}
              </button>
            );
          })}
        </div>

        {/* 3D Perspective Stage for Page-Flipping */}
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
              animate={{
                opacity: 1,
                rotateY: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                rotateY: flipDirection > 0 ? -18 : 18,
                scale: 0.985,
              }}
              transition={{
                duration: 0.38,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                transformOrigin:
                  flipDirection > 0 ? 'left center' : 'right center',
              }}
            >
              {currentSpread === 'cover' ? (
                <SpreadCover onOpenBook={() => goToSpread('editor')} />
              ) : (
                /* Open 2-Page 3D Textbook Frame */
                <div className="relative flex overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-[0_22px_45px_-12px_rgba(15,23,42,0.16),0_8px_0_#cbd5e1]">
                  {/* Left Book Stacked Pages Edge */}
                  <div
                    aria-hidden="true"
                    className="hidden w-2.5 shrink-0 border-r border-slate-200 bg-gradient-to-l from-slate-100 via-white to-slate-200 sm:block"
                  />

                  {/* Open Paper Spread Container */}
                  <div className="paper-texture relative flex-1 p-5 sm:p-8 lg:p-10">
                    {/* Subtle Center Spine Crease on Large Desktop */}
                    <div
                      aria-hidden="true"
                      className="book-spine-shadow pointer-events-none absolute inset-y-0 left-1/2 hidden w-10 -translate-x-1/2 lg:block"
                    />

                    <div className="relative z-10">
                      {currentSpread === 'editor' && (
                        <SpreadEditorTheory
                          flippedIds={progress.flippedCardIds}
                          onCardFlip={handleCardFlip}
                        />
                      )}
                      {currentSpread === 'project' && (
                        <SpreadProjectVideo
                          videoWatched={progress.videoWatched}
                          onVideoWatch={() =>
                            setProgress((prev) => ({
                              ...prev,
                              videoWatched: true,
                            }))
                          }
                          onCelebrate={() => triggerCelebration('stars')}
                        />
                      )}
                      {currentSpread === 'workbook' && (
                        <SpreadWorkbook
                          progress={progress}
                          onTask1Pass={() =>
                            setProgress((prev) => ({...prev, task1Passed: true}))
                          }
                          onTask2Pass={() =>
                            setProgress((prev) => ({...prev, task2Passed: true}))
                          }
                          onTask3Select={(objId) =>
                            setProgress((prev) => ({
                              ...prev,
                              task3SelectedObject: objId,
                            }))
                          }
                          onTask4Save={() =>
                            setProgress((prev) => ({...prev, task4Saved: true}))
                          }
                          onTask5Pass={() =>
                            setProgress((prev) => ({...prev, task5Passed: true}))
                          }
                          onTask6Pass={() =>
                            setProgress((prev) => ({...prev, task6Passed: true}))
                          }
                          onTask7Complete={() =>
                            setProgress((prev) => ({
                              ...prev,
                              task7Completed: true,
                            }))
                          }
                          onCelebrate={() => triggerCelebration('stars')}
                        />
                      )}
                      {currentSpread === 'quiz' && (
                        <SpreadQuiz
                          savedScore={progress.quizScore}
                          onQuizComplete={(score) =>
                            setProgress((prev) => ({...prev, quizScore: score}))
                          }
                          onCelebrate={() => triggerCelebration('stars')}
                        />
                      )}
                      {currentSpread === 'homework' && (
                        <SpreadHomework
                          progress={progress}
                          onToggleHomework={handleToggleHomework}
                          onFinishLesson={() => {
                            setProgress((prev) => ({
                              ...prev,
                              lessonCompleted: true,
                            }));
                            triggerCelebration('fireworks');
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Right Book Stacked Pages Edge */}
                  <div
                    aria-hidden="true"
                    className="hidden w-2.5 shrink-0 border-l border-slate-200 bg-gradient-to-r from-slate-100 via-white to-slate-200 sm:block"
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom 3D Page-Flipping Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xs sm:px-6">
          <button
            type="button"
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="btn-3d inline-flex min-h-[42px] items-center gap-2 whitespace-nowrap rounded-xl border border-slate-300 bg-white px-4 py-2 font-display text-sm font-bold text-slate-700 shadow-[0_3px_0_#cbd5e1] hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Предыдущая страница</span>
          </button>

          <div className="flex flex-wrap items-center justify-center gap-3 text-center text-xs font-semibold text-slate-600 sm:text-sm">
            <span>{currentMeta.fullTitle}</span>
            <span className="text-slate-400" aria-hidden="true">
              ·
            </span>
            <span className="tabular-nums text-slate-500">
              {currentIndex + 1} / {SPREADS.length}
            </span>
            <span className="text-slate-400" aria-hidden="true">
              ·
            </span>
            <button
              type="button"
              onClick={() => setOwnerModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-700 hover:border-sky-300 hover:text-sky-700"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-sky-600" />
              <span>Кабинет учителя</span>
            </button>
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={currentIndex === SPREADS.length - 1}
            className="btn-3d inline-flex min-h-[42px] items-center gap-2 whitespace-nowrap rounded-xl bg-sky-600 px-4 py-2 font-display text-sm font-bold text-white shadow-[0_3px_0_#0369a1] hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
          >
            <span>Следующая страница</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </main>
      </div>
    </ErrorBoundary>
  );
}
