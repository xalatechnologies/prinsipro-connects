import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { DataServiceProvider } from '@contexts/DataServiceContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <DataServiceProvider>
        <App />
      </DataServiceProvider>
    </ErrorBoundary>
  </StrictMode>
);