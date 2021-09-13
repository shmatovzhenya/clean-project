import type { Logger } from '../useCases/types';

class LoggerToConsole implements Logger {
  error(error) {
    console.error(error);
  }
}

export {
  LoggerToConsole,
};
