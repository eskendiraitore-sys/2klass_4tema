import {BookOpen, Globe, Sparkles, ArrowRight} from 'lucide-react';
import {useState} from 'react';

interface SpreadCoverProps {
  onOpenBook: () => void;
}

const TRILINGUAL_TERMS = [
  {lang: 'Русский', short: 'RU', word: 'создание персонажа', accent: 'text-sky-700'},
  {lang: 'Қазақша', short: 'KZ', word: 'кейіпкер құру', accent: 'text-amber-700'},
  {lang: 'English', short: 'EN', word: 'character creation', accent: 'text-emerald-700'},
];

export function SpreadCover({onOpenBook}: SpreadCoverProps) {
  const [imgError, setImgError] = useState(false);
  const [activeLang, setActiveLang] = useState<string>('RU');

  return (
    <div className="mx-auto max-w-5xl">
      {/* 3D Hardcover Book Frame */}
      <div className="relative flex overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-[0_24px_48px_-12px_rgba(15,23,42,0.18),0_8px_0_#cbd5e1]">
        {/* Left Book Spine */}
        <div
          aria-hidden="true"
          className="hidden w-10 shrink-0 flex-col items-center justify-between bg-gradient-to-r from-sky-800 via-sky-700 to-sky-600 py-8 text-sky-100 shadow-inner sm:flex"
        >
          <span className="h-2 w-2 rounded-full bg-sky-300/60" />
          <span className="-rotate-90 whitespace-nowrap font-display text-xs font-semibold tracking-wider text-sky-100/90">
            2 КЛАСС · РАЗДЕЛ II
          </span>
          <span className="h-2 w-2 rounded-full bg-sky-300/60" />
        </div>

        {/* Cover Content Grid */}
        <div className="paper-texture grid flex-1 grid-cols-1 items-stretch gap-8 p-6 sm:p-10 lg:grid-cols-12">
          {/* Left Column: Title, Trilingual Dictionary & CTA */}
          <div className="flex flex-col justify-between gap-6 lg:col-span-6">
            <div>
              <p className="text-xs font-semibold tracking-wide text-slate-500">
                Цифровая грамотность · Раздел II · Стр. 30–33
              </p>

              <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                Цифровая грамотность. 2 класс.
                <span className="mt-1 block text-sky-700">
                  § 8: Создание собственного персонажа
                </span>
              </h1>

              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Интерактивный 3D-учебник и электронная рабочая тетрадь. Изучи
                графический редактор Scratch, создай своего героя и собери
                первую программу!
              </p>
            </div>

            {/* Trilingual Dictionary Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_6px_0_#e2e8f0]">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                  <Globe className="h-4 w-4 text-sky-600" />
                  <span>Трёхъязычный словарик</span>
                </div>
                <span className="text-xs font-medium text-slate-500">
                  Нажми на слово
                </span>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {TRILINGUAL_TERMS.map((item) => {
                  const isActive = activeLang === item.short;
                  return (
                    <button
                      key={item.short}
                      type="button"
                      onClick={() => setActiveLang(item.short)}
                      className={`rounded-lg border p-2.5 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                        isActive
                          ? 'border-sky-300 bg-sky-50/70 shadow-sm'
                          : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                      }`}
                    >
                      <span className="block text-[11px] font-semibold text-slate-500">
                        {item.lang}
                      </span>
                      <span
                        className={`mt-0.5 block font-display text-sm font-bold leading-snug ${item.accent}`}
                      >
                        {item.word}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="mt-3 border-t border-slate-100 pt-2.5 text-xs text-slate-600">
                создание персонажа – кейіпкер құру – character creation
              </p>
            </div>

            {/* Primary 3D Push Button */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenBook}
                className="btn-3d inline-flex min-h-[48px] items-center gap-3 whitespace-nowrap rounded-xl bg-sky-600 px-7 py-3.5 font-display text-base font-bold text-white shadow-[0_6px_0_#0369a1] hover:bg-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
              >
                <BookOpen className="h-5 w-5 shrink-0" />
                <span>Открыть учебник</span>
                <ArrowRight className="h-5 w-5 shrink-0" />
              </button>
              <a
                href="/kz.html"
                className="inline-flex min-h-[44px] items-center gap-1.5 whitespace-nowrap rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-display text-sm font-bold text-slate-700 shadow-xs transition-colors hover:border-sky-300 hover:text-sky-700"
              >
                <Globe className="h-4 w-4 text-amber-600" />
                <span>Қазақша нұсқасы</span>
              </a>
            </div>
          </div>

          {/* Right Column: Book Cover Illustration */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-amber-50/50 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.12)]">
              {!imgError ? (
                <img
                  src="/src/assets/images/book_cover_hero_1795725589282.jpg"
                  alt="Ученица рисует собственного персонажа на графическом планшете"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="aspect-[4/3] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[4/3] w-full flex-col items-center justify-center bg-gradient-to-br from-sky-100 via-amber-50 to-emerald-100 p-8 text-center">
                  <Sparkles className="h-12 w-12 text-sky-600" />
                  <p className="mt-3 font-display text-lg font-bold text-slate-800">
                    Создание собственного персонажа в Scratch
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-3 text-xs text-slate-600">
                <span className="font-semibold text-slate-800">
                  Графический редактор Scratch
                </span>
                <span>Интерактивная 3D-книга</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Book Stacked Pages Edge */}
        <div
          aria-hidden="true"
          className="hidden w-3 shrink-0 border-l border-slate-200 bg-gradient-to-r from-slate-100 via-white to-slate-200 sm:block"
        />
      </div>
    </div>
  );
}
