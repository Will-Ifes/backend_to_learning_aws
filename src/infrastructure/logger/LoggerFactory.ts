import logger from './Logger';

class LoggerFactory {
  static createLogger(context: string) {
    return {
      info: (message: string) => logger.info(`[${context}] ${message}`),
      error: (message: string) => logger.error(`[${context}] ${message}`),
      warn: (message: string) => logger.warn(`[${context}] ${message}`),
      debug: (message: string) => logger.debug(`[${context}] ${message}`),
    };
  }
}

export default LoggerFactory;