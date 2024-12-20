import { createLogger, format, transports } from 'winston' 
const { combine, timestamp, printf } = format;


const customFormat = printf(({ level, message, timestamp, ...meta }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${message} ${
    Object.keys(meta).length ? JSON.stringify(meta) : ''
  }`;
});

export const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    customFormat
  ),
  transports: [
    new transports.File({ filename: 'logs/info.log', level:'info'}),
    new transports.File({ filename: 'logs/error.log', level:'error'})
  ]
});

