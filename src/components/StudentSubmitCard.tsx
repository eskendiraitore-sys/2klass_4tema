import {useState} from 'react';
import {Send, CheckCircle2, AlertCircle} from 'lucide-react';
import {LessonProgress} from '../types/book';
import {submitStudentProgress} from '../firebase';

interface StudentSubmitCardProps {
  lang: 'ru' | 'kz';
  progress: LessonProgress;
  onSubmitted?: () => void;
}

export function StudentSubmitCard({
  lang,
  progress,
  onSubmitted,
}: StudentSubmitCardProps) {
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('2А');
  const [submitting, setSubmitting] = useState(false);
  const [submittedOk, setSubmittedOk] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const t =
    lang === 'kz'
      ? {
          title: 'Нәтижені мұғалімге жіберу',
          desc: 'Мұғалім сенің жетістіктеріңді көруі үшін аты-жөнің мен сыныбыңды жаз.',
          nameLabel: 'Аты-жөні',
          namePlaceholder: 'Мысалы: Әлихан Серік',
          classLabel: 'Сыныбы',
          classPlaceholder: '2А',
          btn: 'Мұғалімге жіберу',
          sending: 'Жіберілуде...',
          success: 'Керемет! Нәтижең мұғалімнің кабинетіне сәтті жіберілді!',
          errEmpty: 'Аты-жөніңді (кемі 2 әріп) және сыныбыңды жаз.',
        }
      : {
          title: 'Отправить результат учителю',
          desc: 'Впиши своё имя и класс, чтобы учитель увидел твои успехи за урок.',
          nameLabel: 'Имя и фамилия',
          namePlaceholder: 'Например: Алихан Серик',
          classLabel: 'Класс',
          classPlaceholder: '2А',
          btn: 'Отправить учителю',
          sending: 'Отправка...',
          success: 'Отлично! Твой результат успешно отправлен учителю!',
          errEmpty: 'Пожалуйста, впиши имя (минимум 2 буквы) и класс.',
        };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (studentName.trim().length < 2 || studentClass.trim().length < 1) {
      setErrorMsg(t.errEmpty);
      return;
    }
    setSubmitting(true);
    try {
      await submitStudentProgress({
        studentName,
        studentClass,
        language: lang,
        progress,
      });
      setSubmittedOk(true);
      onSubmitted?.();
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Ошибка отправки. Попробуй еще раз.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-sky-200 bg-sky-50/60 p-5 shadow-[0_6px_0_#bae6fd]"
    >
      <h3 className="font-display text-base font-bold text-slate-900">
        {t.title}
      </h3>
      <p className="mt-1 text-xs text-slate-600 sm:text-sm">{t.desc}</p>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-12">
        <div className="sm:col-span-8">
          <label className="mb-1 block text-xs font-bold text-slate-700">
            {t.nameLabel}
          </label>
          <input
            type="text"
            value={studentName}
            maxLength={80}
            onChange={(e) => {
              setStudentName(e.target.value);
              setSubmittedOk(false);
            }}
            placeholder={t.namePlaceholder}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-4">
          <label className="mb-1 block text-xs font-bold text-slate-700">
            {t.classLabel}
          </label>
          <input
            type="text"
            value={studentClass}
            maxLength={20}
            onChange={(e) => {
              setStudentClass(e.target.value);
              setSubmittedOk(false);
            }}
            placeholder={t.classPlaceholder}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none"
          />
        </div>
      </div>

      {errorMsg && (
        <div className="mt-3 flex items-center gap-2 text-xs font-bold text-rose-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {submittedOk && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 p-2.5 text-xs font-bold text-emerald-900">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>{t.success}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn-3d mt-4 inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-xl bg-sky-600 px-5 py-2.5 font-display text-sm font-bold text-white shadow-[0_4px_0_#0369a1] hover:bg-sky-500 disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        <span>{submitting ? t.sending : t.btn}</span>
      </button>
    </form>
  );
}
