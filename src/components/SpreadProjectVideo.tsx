import {useEffect, useRef, useState} from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Paintbrush,
  Sparkles,
  Video,
  CheckCircle2,
  MousePointerClick,
} from 'lucide-react';
import {ProjectDebugGame} from './ProjectDebugGame';

// ВСТАВИТЬ ССЫЛКУ НА ВИДЕО ЗДЕСЬ (например, ссылку на MP4 или YouTube embed)
const VIDEO_PRACTICE_URL: string = 'https://www.youtube.com/watch?v=XS5g9cgUL1w';

interface SpreadProjectVideoProps {
  videoWatched: boolean;
  onVideoWatch: () => void;
  onCelebrate: () => void;
}

export function SpreadProjectVideo({
  videoWatched,
  onVideoWatch,
  onCelebrate,
}: SpreadProjectVideoProps) {
  const [boyProgress, setBoyProgress] = useState(12); // percentage from left (school -> house)
  const [isWalking, setIsWalking] = useState(false);
  const [stoppedOnGreen, setStoppedOnGreen] = useState(false);

  const [isPlayerActive, setIsPlayerActive] = useState(false);
  const [demoSceneIndex, setDemoSceneIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const walkTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isWalking) return;
    walkTimerRef.current = window.setInterval(() => {
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
      if (walkTimerRef.current !== null) {
        clearInterval(walkTimerRef.current);
      }
    };
  }, [isWalking]);

  const handleSpriteClick = () => {
    if (stoppedOnGreen) {
      setBoyProgress(12);
      setStoppedOnGreen(false);
      setIsWalking(true);
      return;
    }
    setIsWalking(true);
  };

  const resetStage = () => {
    setIsWalking(false);
    setStoppedOnGreen(false);
    setBoyProgress(12);
  };

  const handleOpenVideo = () => {
    setIsPlayerActive(true);
    onVideoWatch();
  };

  const demoSteps = [
    {
      title: 'Кадр 1: Рисуем фон сцены',
      caption: 'Нарисуй школу слева, дом справа, дорожку, солнце и зеленую траву у дома.',
    },
    {
      title: 'Кадр 2: Создаем спрайт мальчика',
      caption: 'Нажми на кисточку в разделе «Новый спрайт» и нарисуй ученика с рюкзаком.',
    },
    {
      title: 'Кадр 3: Собираем скрипт ветвления',
      caption: 'Когда спрайт нажат → если касается зеленого цвета, остановиться, иначе идти 10 шагов.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-4 sm:flex-row sm:items-center sm:px-6">
        <div>
          <p className="text-xs font-semibold text-amber-800">
            Учебник · Разворот 2 · Стр. 32–33
          </p>
          <h2 className="font-display text-lg font-bold text-slate-900 sm:text-xl">
            Проект «Возвращение из школы домой» и Видео-практика
          </h2>
        </div>
        <span className="text-xs font-semibold text-slate-600">
          Пошаговая инструкция + демонстрация
        </span>
      </div>

      {/* 2-Column Book Spread */}
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
        {/* Left Page: 3D Step-by-step Instructions & Scratch Blocks */}
        <div className="flex flex-col justify-between gap-5 lg:col-span-6">
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_6px_0_#e2e8f0]">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-600 font-display text-sm font-bold text-white shadow-sm">
                  1
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900">
                    Нарисовать фон сцены
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    В редакторе фона нарисуй <strong>дом</strong>,{' '}
                    <strong>школу</strong>, <strong>дорожку</strong>,{' '}
                    <strong>солнце</strong> и <strong>зеленый участок</strong>{' '}
                    перед домом.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_6px_0_#e2e8f0]">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600 font-display text-sm font-bold text-white shadow-sm">
                  2
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900">
                    Нарисовать нового спрайта
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Нажми кнопку{' '}
                    <span className="inline-flex items-center gap-1 rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-xs font-bold text-slate-800">
                      <Paintbrush className="h-3 w-3 text-emerald-700" />
                      Нарисовать новый спрайт
                    </span>{' '}
                    рядом с «Новый спрайт» и нарисуй мальчика-ученика.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: 3D Scratch Blocks */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_6px_0_#e2e8f0]">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-600 font-display text-sm font-bold text-white shadow-sm">
                  3
                </span>
                <div className="w-full">
                  <h3 className="font-display text-base font-bold text-slate-900">
                    Собрать скрипт для движения персонажа
                  </h3>
                  <p className="mt-1 text-xs text-slate-600">
                    Когда мальчик коснется зеленого цвета, он остановится:
                  </p>

                  {/* Authentic 3D Scratch Code Stack */}
                  <div className="mt-3 space-y-1.5 rounded-lg border border-slate-200 bg-slate-50 p-3 font-display text-xs font-bold text-white">
                    <div className="inline-block rounded-t-xl rounded-br-lg bg-amber-500 px-3.5 py-2 shadow-[0_3px_0_#b45309]">
                      когда спрайт нажат{' '}
                      <span className="font-sans font-normal text-amber-100">
                        (События)
                      </span>
                    </div>

                    <div className="rounded-lg bg-orange-500 p-2 shadow-[0_3px_0_#c2410c]">
                      <div className="flex flex-wrap items-center gap-1.5 pb-1.5">
                        <span>если</span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500 px-2.5 py-0.5 text-[11px] shadow-inner">
                          касается цвета
                          <span
                            aria-label="зеленый цвет"
                            className="inline-block h-3.5 w-5 rounded border border-white bg-emerald-500"
                          />
                          ?
                        </span>
                        <span>, то</span>
                      </div>

                      <div className="ml-4 rounded-md bg-orange-400/30 p-1.5">
                        <div className="inline-block rounded-md bg-sky-600 px-3 py-1.5 shadow-[0_2px_0_#0369a1]">
                          идти 10 шагов
                        </div>
                      </div>

                      <div className="py-1 text-xs">иначе</div>

                      <div className="ml-4 rounded-md bg-orange-400/30 p-1.5">
                        <div className="inline-block rounded-md bg-amber-600 px-3 py-1.5 shadow-[0_2px_0_#92400e]">
                          стоп этот скрипт
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Page: Interactive Mini-Stage + 3D Video Practice Player */}
        <div className="flex flex-col justify-between gap-5 lg:col-span-6">
          {/* Interactive Mini-Simulator of the Scratch Project */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_6px_0_#e2e8f0]">
            <div className="mb-2.5 flex items-center justify-between gap-2">
              <span className="font-display text-sm font-bold text-slate-900">
                Попробуй прямо здесь: нажми на мальчика!
              </span>
              <button
                type="button"
                onClick={resetStage}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Сначала</span>
              </button>
            </div>

            <div className="relative h-36 overflow-hidden rounded-lg border border-sky-200 bg-gradient-to-b from-sky-200 via-sky-100 to-amber-100">
              {/* Sun */}
              <div className="absolute right-10 top-3 h-8 w-8 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.8)]" />
              {/* School (left) */}
              <div className="absolute bottom-7 left-3 flex flex-col items-center">
                <div className="h-0 w-0 border-x-[22px] border-b-[16px] border-x-transparent border-b-rose-500" />
                <div className="flex h-12 w-11 items-end justify-center rounded-b bg-amber-200 border border-amber-400 text-[9px] font-bold text-amber-900 pb-1">
                  Школа
                </div>
              </div>
              {/* Road */}
              <div className="absolute inset-x-0 bottom-0 h-7 bg-amber-200/90 border-t border-amber-300" />
              {/* Green stop zone near house */}
              <div className="absolute bottom-0 right-14 h-7 w-12 border-t-2 border-emerald-600 bg-emerald-500/90 flex items-center justify-center text-[9px] font-bold text-white">
                Трава
              </div>
              {/* House (right) */}
              <div className="absolute bottom-7 right-3 flex flex-col items-center">
                <div className="h-0 w-0 border-x-[24px] border-b-[18px] border-x-transparent border-b-orange-600" />
                <div className="flex h-12 w-11 items-end justify-center rounded-b bg-orange-100 border border-orange-300 text-[9px] font-bold text-orange-900 pb-1">
                  Дом
                </div>
              </div>

              {/* Clickable Boy Sprite */}
              <button
                type="button"
                onClick={handleSpriteClick}
                style={{left: `${boyProgress}%`}}
                title="Нажми на мальчика, чтобы он пошел домой"
                className="btn-3d absolute bottom-5 -translate-x-1/2 cursor-pointer rounded-lg bg-white/85 px-2 py-1 text-center shadow-md ring-2 ring-sky-500 transition-[left] duration-200 hover:bg-white focus-visible:outline-2 focus-visible:outline-sky-700"
              >
                <span className="block text-xl leading-none" role="img" aria-label="Мальчик-ученик">
                  🧒
                </span>
                <span className="mt-0.5 block text-[10px] font-bold text-sky-900">
                  {stoppedOnGreen ? 'Стоп!' : isWalking ? 'Идёт...' : 'Нажми'}
                </span>
              </button>
            </div>

            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-slate-600">
                <MousePointerClick className="h-3.5 w-3.5 text-sky-600" />
                {stoppedOnGreen
                  ? 'Мальчик коснулся зеленого цвета и остановился у дома!'
                  : isWalking
                    ? 'Выполняется ветка «иначе → идти 10 шагов»...'
                    : 'Нажми на спрайта, чтобы запустить скрипт.'}
              </span>
              {stoppedOnGreen && (
                <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Сработало!
                </span>
              )}
            </div>
          </div>

          {/* 3D Video-Practice Player Block */}
          <div className="flex flex-1 flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-[0_8px_0_#cbd5e1]">
            <div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-sky-600" />
                  <h3 className="font-display text-base font-bold text-slate-900">
                    Видео-практика
                  </h3>
                </div>
                {videoWatched && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Просмотрено
                  </span>
                )}
              </div>

              {/* Video Viewport */}
              <div className="relative mt-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-inner">
                {VIDEO_PRACTICE_URL ? (
                  (() => {
                    const url = VIDEO_PRACTICE_URL.trim();
                    const ytMatch = url.match(
                      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]+)/
                    );
                    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);

                    if (ytMatch) {
                      return (
                        <iframe
                          src={`https://www.youtube.com/embed/${ytMatch[1]}${isPlayerActive ? '?autoplay=1' : ''}`}
                          title="Видео-инструкция по проекту Scratch"
                          className="aspect-video w-full"
                          allow="autoplay; encrypted-media; picture-in-picture"
                          allowFullScreen
                        />
                      );
                    }
                    if (vimeoMatch) {
                      return (
                        <iframe
                          src={`https://player.vimeo.com/video/${vimeoMatch[1]}`}
                          title="Видео-инструкция по проекту Scratch"
                          className="aspect-video w-full"
                          allowFullScreen
                        />
                      );
                    }
                    return (
                      <video
                        src={url}
                        controls
                        onPlay={onVideoWatch}
                        className="aspect-video w-full bg-black"
                      />
                    );
                  })()
                ) : (
                  <div className="relative aspect-video w-full overflow-hidden">
                    {!imgError ? (
                      <img
                        src="/src/assets/images/scratch_school_scene_1795725590148.jpg"
                        alt="Сцена проекта Возвращение из школы домой"
                        referrerPolicy="no-referrer"
                        onError={() => setImgError(true)}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-800 to-slate-900 text-white">
                        <Sparkles className="h-10 w-10 text-amber-300" />
                      </div>
                    )}

                    {/* Contrast Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/35 to-transparent" />

                    {/* Interactive Demo Overlay when opened */}
                    {isPlayerActive ? (
                      <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
                        <div className="flex items-center justify-between gap-2">
                          <span className="rounded bg-slate-950/75 px-2.5 py-1 text-xs font-bold text-amber-300">
                            Интерактивный гид · Шаг {demoSceneIndex + 1} из 3
                          </span>
                          <button
                            type="button"
                            onClick={() => setIsPlayerActive(false)}
                            className="inline-flex items-center gap-1 rounded bg-slate-950/75 px-2.5 py-1 text-xs font-semibold text-white hover:bg-slate-900"
                          >
                            <Pause className="h-3.5 w-3.5" />
                            <span>Свернуть</span>
                          </button>
                        </div>

                        <div className="rounded-lg bg-slate-950/80 p-3 backdrop-blur-xs">
                          <p className="font-display text-sm font-bold text-white">
                            {demoSteps[demoSceneIndex].title}
                          </p>
                          <p className="mt-1 text-xs text-slate-200">
                            {demoSteps[demoSceneIndex].caption}
                          </p>
                          <div className="mt-2.5 flex items-center gap-2">
                            {demoSteps.map((_, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setDemoSceneIndex(idx)}
                                className={`rounded px-2.5 py-1 text-xs font-bold transition-colors ${
                                  demoSceneIndex === idx
                                    ? 'bg-sky-500 text-white'
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                }`}
                              >
                                Шаг {idx + 1}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white">
                        <div>
                          <p className="font-display text-sm font-bold">
                            Видео-урок от учителя
                          </p>
                          <p className="text-xs text-slate-200">
                            Создание фона, мальчика и скрипта движения
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleOpenVideo}
                className="btn-3d inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-xl bg-sky-600 px-5 py-2.5 font-display text-sm font-bold text-white shadow-[0_5px_0_#0369a1] hover:bg-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
              >
                <Play className="h-4 w-4 fill-current" />
                <span>Смотреть видео-инструкцию</span>
              </button>
              <span className="text-xs text-slate-500">
                Посмотри перед практикой в Scratch
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Дополнительное задание: Мини-игра «Найди ошибки в коде» */}
      <ProjectDebugGame onCelebrate={onCelebrate} />
    </div>
  );
}
