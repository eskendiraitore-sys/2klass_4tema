import {Component, ErrorInfo, ReactNode} from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    message: '',
  };

  static getDerivedStateFromError(error: Error): State {
    return {hasError: true, message: error.message};
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Application error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
          <div className="w-full max-w-md rounded-2xl border border-rose-200 bg-white p-6 text-center shadow-lg">
            <h2 className="font-display text-xl font-bold text-slate-900">
              Произошла ошибка
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Пожалуйста, обновите страницу или проверьте подключение к сети.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-xl bg-sky-600 px-5 py-2.5 font-display text-sm font-bold text-white hover:bg-sky-500"
            >
              Обновить страницу
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
