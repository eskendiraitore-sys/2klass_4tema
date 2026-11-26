export type SpreadId =
  | 'cover'
  | 'editor'
  | 'project'
  | 'workbook'
  | 'quiz'
  | 'homework';

export interface SpreadMeta {
  id: SpreadId;
  shortTitle: string;
  fullTitle: string;
  pages: string;
}

export const SPREADS: SpreadMeta[] = [
  {
    id: 'cover',
    shortTitle: 'Обложка',
    fullTitle: '§ 8: Создание собственного персонажа',
    pages: 'Обложка',
  },
  {
    id: 'editor',
    shortTitle: 'Учебник',
    fullTitle: 'Графический редактор Scratch',
    pages: 'Стр. 30–31',
  },
  {
    id: 'project',
    shortTitle: 'Проект',
    fullTitle: 'Проект «Возвращение из школы домой»',
    pages: 'Стр. 32–33',
  },
  {
    id: 'workbook',
    shortTitle: 'Тетрадь',
    fullTitle: 'Интерактивная рабочая тетрадь',
    pages: 'Стр. 30–33',
  },
  {
    id: 'quiz',
    shortTitle: 'Викторина',
    fullTitle: 'Вопросы к тексту',
    pages: 'Проверка знаний',
  },
  {
    id: 'homework',
    shortTitle: 'Домашка',
    fullTitle: 'Домашнее задание и награда',
    pages: 'Итог урока',
  },
];

export interface LessonProgress {
  flippedCardIds: string[];
  videoWatched: boolean;
  task1Passed: boolean;
  task2Passed: boolean;
  task3SelectedObject: string | null;
  task4Saved: boolean;
  task5Passed: boolean;
  task6Passed: boolean;
  task7Completed: boolean;
  quizScore: number | null;
  homeworkChecked: string[];
  lessonCompleted: boolean;
}
