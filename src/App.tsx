import React from 'react';
import './App.css';

import { AuthenticatedApp } from 'authenticated-app';
import { UnAuthenticatedApp } from './unauthenticated-app';
import { useAuth } from 'context/auth-context-redux';
import { ErrorBoundary } from 'component/error-boundary';
import { FullPageErrorFallback } from 'component/lib';


function App() {
  const { user } = useAuth()

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {
          user ? <AuthenticatedApp /> : <UnAuthenticatedApp />
        }
      </ErrorBoundary>
    </div>
  );
}

export default App;
