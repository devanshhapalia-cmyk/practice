// const winston = require('winston');
// // Create a logger with console and file transports
// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.json()
//   ),
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: 'app.log' })
//   ],
// });

// logger.info('This is an info message');
// logger.error('This is an error message');

// const pino = require('pino');

// // Create a logger
// const logger1 = pino({ level: 'info' });

// logger1.info('This is an info message');
// logger1.error('This is an error message');

// // // Logging examples
// // logger.error('This is an error message');     // Highest priority
// // logger.warn('This is a warning message');
// // logger.info('This is an info message');
// // logger.http('HTTP request logged');           // For web requests
// // logger.verbose('Verbose level message');
// // logger.debug('Debug level message');
// // logger.silly('Silly level message');         // Lowest priority

import winston from "winston";

// Logger configuration
const logger = winston.createLogger({
  level: "verbose", // minimum level to log
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "app.log" })
  ]
});

// Logging examples
logger.error("This is an error message");
logger.warn("This is a warning message");
logger.info("Server started on port 3000");
logger.http("GET /api/users 200 OK");
logger.verbose("Cache hit for key:user123");
logger.debug("Query result:", { id: 1, name: "Alice" });
logger.silly("Silly log: just having fun 😎");

