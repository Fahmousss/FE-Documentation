import handlersUserManagement from '@/pages/user-management/utils/form';
import { setupWorker } from 'msw/browser';
import brandHandlers from './handlers/brand';

let worker;

if (import.meta.env.MODE === 'msw') {
  console.log('masuk msw');
  worker = setupWorker(...handlersUserManagement, ...brandHandlers);
  worker.start({
    onUnhandledRequest: 'bypass',
  });
}
