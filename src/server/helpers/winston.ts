import appRoot from 'app-root-path';
import winston, { format } from 'winston';
import { unescapeNewline } from '.';

// Custom format
const alignWithTime = winston.format.combine(
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(info => {
    const { timestamp, level, message, ...args } = info;
    const ts = timestamp.slice(0, 19).replace('T', ' ');

    return `${ts} [${level}]: ${message} ${
      Object.keys(args).length ? unescapeNewline(JSON.stringify(args, null, 2)) : ''
    }`;
  }),
);
const alignedWithColorsAndTime = format.combine(winston.format.colorize(), alignWithTime);

// define the custom settings for each transport (file, console)
const options = {
  // Options for the log file (print error, warn and info)
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
    format: alignWithTime,
  },
  // Options for the log file (print error, warn, info and debug)
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    format: alignedWithColorsAndTime,
  },
};

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  transports: [new winston.transports.File(options.file), new winston.transports.Console(options.console)],
  exitOnError: true, // do not exit on handled exceptions
});

if (process.env.NODE_ENV !== 'production') {
  logger.debug('Logging initialized at debug level');
}

export class LoggerStream {
  public write(message: string) {
    // Log morgan logs at info level without last new line
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  }
}

export default logger;
