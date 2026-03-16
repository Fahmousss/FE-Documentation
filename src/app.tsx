import Router from '@/core/routes';
import store, { persistor } from '@/core/store';
import ConfigProviderAntd from '@/core/styles/config-antd';
import { client } from '@/core/utils/query.utils';
import { QueryClientProvider } from '@tanstack/react-query';
import '@xyflow/react/dist/style.css';
import 'chart.js/auto';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { DEV } from './core/constant/config.constant';
import { MessageProvider } from './core/hooks/use-message-context';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <QueryClientProvider client={client}>
      {DEV && <ReactQueryDevtools initialIsOpen={true} buttonPosition="bottom-left" />}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConfigProviderAntd>
            <MessageProvider>
              <RouterProvider router={Router} />
            </MessageProvider>
          </ConfigProviderAntd>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
