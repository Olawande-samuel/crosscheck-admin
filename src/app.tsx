/* eslint-disable import/no-extraneous-dependencies */
import 'src/global.css';

import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme/theme-provider';

// redux
import { store, persistor } from './redux/store';
// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
