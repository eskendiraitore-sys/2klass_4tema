import {useEffect, useState} from 'react';
import {
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import {
  X,
  Copy,
  Check,
  ShieldCheck,
  LogIn,
  LogOut,
  Trash2,
  CheckCircle2,
  Users,
  Link2,
} from 'lucide-react';
import {
  auth,
  db,
  handleFirestoreError,
  OperationType,
  OWNER_EMAIL,
  SHARE_URL_KZ,
  SHARE_URL_RU,
  SHORT_URL_KZ,
  SHORT_URL_RU,
  signInTeacher,
  signOutTeacher,
  StudentSubmissionRecord,
} from '../firebase';

interface OwnerDashboardModalProps {
  open: boolean;
  lang: 'ru' | 'kz';
  onClose: () => void;
}

export function OwnerDashboardModal({
  open,
  lang,
  onClose,
}: OwnerDashboardModalProps) {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [authReady, setAuthReady] = useState(false);
  const [submissions, setSubmissions] = useState<StudentSubmissionRecord[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthReady(true);
    });
    return unsub;
  }, []);

  const isOwner =
    Boolean(user?.emailVerified) && user?.email === OWNER_EMAIL;

  useEffect(() => {
    if (!open || !authReady || !isOwner) {
      setSubmissions([]);
      return;
    }

    const q = query(
      collection(db, 'submissions'),
      orderBy('createdAt', 'desc')
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const list: StudentSubmissionRecord[] = snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            studentName: String(data.studentName ?? ''),
            studentClass: String(data.studentClass ?? ''),
            language: data.language === 'kz' ? 'kz' : 'ru',
            flippedCardsCount: Number(data.flippedCardsCount ?? 0),
            videoWatched: Boolean(data.videoWatched),
            workbookCompletedCount: Number(data.workbookCompletedCount ?? 0),
            quizTaken: Boolean(data.quizTaken),
            quizScore: Number(data.quizScore ?? 0),
            homeworkCheckedCount: Number(data.homeworkCheckedCount ?? 0),
            lessonCompleted: Boolean(data.lessonCompleted),
            status: data.status === 'reviewed' ? 'reviewed' : 'submitted',
            createdAt: data.createdAt ?? null,
          };
        });
        setSubmissions(list);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'submissions');
      }
    );

    return unsub;
  }, [open, authReady, isOwner]);

  if (!open) return null;

  const t =
    lang === 'kz'
      ? {
          title: 'Мұғалім кабинеті (Иесі)',
          subtitle: 'Оқушыларға жіберілетін сілтемелер және нәтижелер кестесі',
          linksTitle: 'Оқушыларға жіберуге арналған дайын сілтемелер',
          ruLabel: 'Орысша нұсқасы (RU)',
          kzLabel: 'Қазақша нұсқасы (KZ)',
          copy: 'Көшіру',
          copied: 'Көшірілді!',
          signInPrompt:
            'Барлық оқушылардың жауаптарын көру үшін иесінің Google-аккаунтымен кіріңіз:',
          signInBtn: 'Google арқылы кіру',
          signOutBtn: 'Шығу',
          notOwner:
            'Қолжетімсіз. Оқушылардың нәтижелерін тек иесі ғана көре алады:',
          empty:
            'Әзірге жіберілген жұмыстар жоқ. Оқушылар соңғы бетте аты-жөнін жазып жіберген кезде, нәтижелер осында бірден пайда болады.',
          markReviewed: 'Тексерілді',
          reviewed: 'Тексерілген',
          submitted: 'Жаңа',
        }
      : {
          title: 'Кабинет учителя (Владелец)',
          subtitle: 'Ссылки для отправки ученикам и таблица результатов',
          linksTitle: 'Рабочие ссылки для отправки детям',
          ruLabel: 'Русская версия (RU)',
          kzLabel: 'Казахская версия (KZ)',
          copy: 'Копировать',
          copied: 'Скопировано!',
          signInPrompt:
            'Чтобы видеть результаты всех учеников, войдите под Google-аккаунтом владельца:',
          signInBtn: 'Войти через Google',
          signOutBtn: 'Выйти',
          notOwner:
            'Нет доступа. Просматривать ответы учеников может только владелец:',
          empty:
            'Пока нет отправленных работ. Как только ученики впишут имя и отправят результат на финальной странице, данные появятся здесь в реальном времени.',
          markReviewed: 'Отметить проверенным',
          reviewed: 'Проверено',
          submitted: 'Новое',
        };

  const handleCopy = async (key: string, url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // ignore clipboard errors
    }
  };

  const handleLogin = async () => {
    setAuthError(null);
    try {
      await signInTeacher();
    } catch (e) {
      setAuthError(
        e instanceof Error ? e.message : 'Не удалось выполнить вход'
      );
    }
  };

  const handleReview = async (id: string) => {
    try {
      await updateDoc(doc(db, 'submissions', id), {status: 'reviewed'});
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `submissions/${id}`);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'submissions', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `submissions/${id}`);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900 sm:text-xl">
                {t.title}
              </h2>
              <p className="text-xs text-slate-600 sm:text-sm">{t.subtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          {/* Student Share Links */}
          <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-4">
            <div className="mb-3 flex items-center gap-2 font-display text-sm font-bold text-slate-900">
              <Link2 className="h-4 w-4 text-sky-600" />
              <span>{t.linksTitle}</span>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-3">
                <p className="text-[11px] font-bold text-slate-500">
                  {t.ruLabel}
                </p>
                <div className="flex items-center justify-between gap-2 rounded-md bg-sky-50 px-2.5 py-1.5">
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase text-sky-700">
                      Короткая ссылка
                    </span>
                    <p className="truncate font-mono text-xs font-bold text-slate-900">
                      {SHORT_URL_RU}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('ru-short', SHORT_URL_RU)}
                    className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-sky-600 px-3 py-1.5 font-display text-xs font-bold text-white hover:bg-sky-500"
                  >
                    {copiedKey === 'ru-short' ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    <span>{copiedKey === 'ru-short' ? t.copied : t.copy}</span>
                  </button>
                </div>
                <div className="flex items-center justify-between gap-2 px-1">
                  <p className="truncate font-mono text-[11px] text-slate-500">
                    {SHARE_URL_RU}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCopy('ru-full', SHARE_URL_RU)}
                    className="shrink-0 text-[11px] font-semibold text-sky-700 hover:underline"
                  >
                    {copiedKey === 'ru-full' ? t.copied : 'Полная'}
                  </button>
                </div>
              </div>

              <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-3">
                <p className="text-[11px] font-bold text-slate-500">
                  {t.kzLabel}
                </p>
                <div className="flex items-center justify-between gap-2 rounded-md bg-amber-50 px-2.5 py-1.5">
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase text-amber-800">
                      Қысқа сілтеме
                    </span>
                    <p className="truncate font-mono text-xs font-bold text-slate-900">
                      {SHORT_URL_KZ}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('kz-short', SHORT_URL_KZ)}
                    className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 font-display text-xs font-bold text-slate-950 hover:bg-amber-400"
                  >
                    {copiedKey === 'kz-short' ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    <span>{copiedKey === 'kz-short' ? t.copied : t.copy}</span>
                  </button>
                </div>
                <div className="flex items-center justify-between gap-2 px-1">
                  <p className="truncate font-mono text-[11px] text-slate-500">
                    {SHARE_URL_KZ}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCopy('kz-full', SHARE_URL_KZ)}
                    className="shrink-0 text-[11px] font-semibold text-amber-800 hover:underline"
                  >
                    {copiedKey === 'kz-full' ? t.copied : 'Толық'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Auth & Submissions Section */}
          {!user ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
              <Users className="mx-auto h-10 w-10 text-sky-600" />
              <p className="mt-3 text-sm font-medium text-slate-700">
                {t.signInPrompt}{' '}
                <strong className="font-mono text-slate-900">
                  {OWNER_EMAIL}
                </strong>
              </p>
              {authError && (
                <p className="mt-2 text-xs font-bold text-rose-700">
                  {authError}
                </p>
              )}
              <button
                type="button"
                onClick={handleLogin}
                className="btn-3d mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-sky-600 px-6 py-2.5 font-display text-sm font-bold text-white shadow-[0_4px_0_#0369a1] hover:bg-sky-500"
              >
                <LogIn className="h-4 w-4" />
                <span>{t.signInBtn}</span>
              </button>
            </div>
          ) : !isOwner ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-center">
              <p className="text-sm font-semibold text-rose-900">
                {t.notOwner} <span className="font-mono">{OWNER_EMAIL}</span>
              </p>
              <p className="mt-1 text-xs text-slate-600">
                Вы вошли как: {user.email}
              </p>
              <button
                type="button"
                onClick={() => void signOutTeacher()}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>{t.signOutBtn}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm font-bold text-slate-900">
                  Ученики ({submissions.length}) ·{' '}
                  <span className="font-normal text-slate-500">
                    {user.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => void signOutTeacher()}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>{t.signOutBtn}</span>
                </button>
              </div>

              {submissions.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600">
                  {t.empty}
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full border-collapse text-left text-xs sm:text-sm">
                    <thead className="border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-600">
                      <tr>
                        <th className="px-3.5 py-2.5">Ученик</th>
                        <th className="px-3 py-2.5">Класс</th>
                        <th className="px-3 py-2.5">Язык</th>
                        <th className="px-3 py-2.5">Теория</th>
                        <th className="px-3 py-2.5">Тетрадь</th>
                        <th className="px-3 py-2.5">Викторина</th>
                        <th className="px-3 py-2.5">Медаль</th>
                        <th className="px-3 py-2.5">Статус</th>
                        <th className="px-3 py-2.5 text-right">Действия</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {submissions.map((sub) => (
                        <tr key={sub.id} className="hover:bg-slate-50/70">
                          <td className="px-3.5 py-2.5 font-bold text-slate-900">
                            {sub.studentName}
                          </td>
                          <td className="px-3 py-2.5 text-slate-700">
                            {sub.studentClass}
                          </td>
                          <td className="px-3 py-2.5 font-mono text-xs uppercase text-slate-600">
                            {sub.language}
                          </td>
                          <td className="px-3 py-2.5 tabular-nums text-slate-700">
                            {sub.flippedCardsCount}/4
                          </td>
                          <td className="px-3 py-2.5 tabular-nums text-slate-700">
                            {sub.workbookCompletedCount}/7
                          </td>
                          <td className="px-3 py-2.5 tabular-nums font-semibold text-slate-900">
                            {sub.quizTaken ? `${sub.quizScore}/5` : '—'}
                          </td>
                          <td className="px-3 py-2.5">
                            {sub.lessonCompleted ? (
                              <span className="font-bold text-amber-700">
                                Да ★
                              </span>
                            ) : (
                              <span className="text-slate-400">Нет</span>
                            )}
                          </td>
                          <td className="px-3 py-2.5">
                            <span
                              className={`text-xs font-bold ${
                                sub.status === 'reviewed'
                                  ? 'text-emerald-700'
                                  : 'text-sky-700'
                              }`}
                            >
                              {sub.status === 'reviewed'
                                ? t.reviewed
                                : t.submitted}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              {sub.status !== 'reviewed' && (
                                <button
                                  type="button"
                                  title={t.markReviewed}
                                  onClick={() => void handleReview(sub.id)}
                                  className="rounded-md border border-emerald-200 bg-emerald-50 p-1.5 text-emerald-700 hover:bg-emerald-100"
                                >
                                  <CheckCircle2 className="h-4 w-4" />
                                </button>
                              )}
                              <button
                                type="button"
                                title="Удалить"
                                onClick={() => void handleDelete(sub.id)}
                                className="rounded-md border border-rose-200 bg-rose-50 p-1.5 text-rose-700 hover:bg-rose-100"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
