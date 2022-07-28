import * as Sentry from '@sentry/nextjs';

import { isProd } from './isProd';

interface LoggerService {
  log: (message: any) => void;
}

class Logger implements LoggerService {
  log(message: any) {
    if (isProd) {
      Sentry.captureException(message);
    } else {
      // eslint-disable-next-line no-console
      console.log(message);
    }
  }
}

export const logger = new Logger();
