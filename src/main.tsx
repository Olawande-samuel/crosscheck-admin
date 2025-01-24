import ReactDOM from 'react-dom/client';
import { Suspense, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './app';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Suspense>
            <Toaster
              duration={3500}
              position="top-right"
              toastOptions={{
                classNames: {
                  error: 'bg-red-500 text-white',
                  success: 'bg-green-400 text-white',
                  warning: 'text-yellow-400',
                  info: 'bg-blue-400',
                },
              }}
            />
            <App />
          </Suspense>
        </QueryClientProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
