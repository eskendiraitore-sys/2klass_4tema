import {initializeApp} from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  doc,
  getDocFromServer,
  getFirestore,
  serverTimestamp,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import {LessonProgress} from './types/book';

export const OWNER_EMAIL = 'eskendiraitore@gmail.com';
export const SHARE_URL_RU =
  'https://ais-pre-fsdukkn4w4zcd6oaey5hnj-375644932755.asia-northeast1.run.app';
export const SHARE_URL_KZ = `${SHARE_URL_RU}/kz.html`;
export const SHORT_URL_RU = 'https://tinyurl.com/24k69tov';
export const SHORT_URL_KZ = 'https://tinyurl.com/23poteuu';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes('the client is offline')
    ) {
      console.error('Please check your Firebase configuration.');
    }
  }
}
void testConnection();

export async function signInTeacher() {
  return signInWithPopup(auth, googleProvider);
}

export async function signOutTeacher() {
  return signOut(auth);
}

export interface StudentSubmissionRecord {
  id: string;
  studentName: string;
  studentClass: string;
  language: 'ru' | 'kz';
  flippedCardsCount: number;
  videoWatched: boolean;
  workbookCompletedCount: number;
  quizTaken: boolean;
  quizScore: number;
  homeworkCheckedCount: number;
  lessonCompleted: boolean;
  status: 'submitted' | 'reviewed';
  createdAt: Timestamp | null;
}

function generateValidId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let out = 'sub_';
  for (let i = 0; i < 16; i++) {
    out += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return out;
}

export async function submitStudentProgress(params: {
  studentName: string;
  studentClass: string;
  language: 'ru' | 'kz';
  progress: LessonProgress;
}): Promise<string> {
  const cleanName = params.studentName.trim().slice(0, 80);
  const cleanClass = params.studentClass.trim().slice(0, 20);
  if (cleanName.length < 2 || cleanClass.length < 1) {
    throw new Error('Укажите имя (минимум 2 символа) и класс.');
  }

  const p = params.progress;
  const workbookCount =
    (p.task1Passed ? 1 : 0) +
    (p.task2Passed ? 1 : 0) +
    (p.task3SelectedObject ? 1 : 0) +
    (p.task4Saved ? 1 : 0) +
    (p.task5Passed ? 1 : 0) +
    (p.task6Passed ? 1 : 0) +
    (p.task7Completed ? 1 : 0);

  const docId = generateValidId();
  const path = `submissions/${docId}`;

  const payload = {
    studentName: cleanName,
    studentClass: cleanClass,
    language: params.language,
    flippedCardsCount: Math.min(4, Math.max(0, p.flippedCardIds.length)),
    videoWatched: Boolean(p.videoWatched),
    workbookCompletedCount: Math.min(7, Math.max(0, workbookCount)),
    quizTaken: p.quizScore !== null,
    quizScore:
      p.quizScore !== null ? Math.min(5, Math.max(0, p.quizScore)) : 0,
    homeworkCheckedCount: Math.min(4, Math.max(0, p.homeworkChecked.length)),
    lessonCompleted: Boolean(p.lessonCompleted),
    status: 'submitted' as const,
    createdAt: serverTimestamp(),
  };

  try {
    await setDoc(doc(db, 'submissions', docId), payload);
    return docId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}
