import React from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';

interface ErrorCatcherProps {
  children: React.ReactNode;
  onReset?: () => void;
  fallbackRender?: (props: FallbackProps) => React.ReactNode;
}

const DefaultErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <>
    <div className="mt-2">
      <p>An error occurred in the application.</p>
      {process.env.NODE_ENV === 'development' && (
        <pre className="mt-2 p-2 bg-gray-100 rounded text-sm overflow-auto">
          {error.message}
          {error.stack && <code className="block mt-2 text-xs">{error.stack}</code>}
        </pre>
      )}
    </div>
    <button
      onClick={resetErrorBoundary}
      className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-2">
      Try Again
    </button>
  </>
);

const ErrorCatcher = ({ children, onReset, fallbackRender }: ErrorCatcherProps) => {
  return (
    <ErrorBoundary fallbackRender={fallbackRender || DefaultErrorFallback} onReset={onReset}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorCatcher;
