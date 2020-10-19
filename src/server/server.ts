import { router } from './routes/index';
import { ApiError } from './models/ApiError';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import history from 'connect-history-api-fallback';
import dbConnectionMiddleware from './helpers/dbConnector';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Db, Collection } from 'mongodb';
import logger, { MorganLoggerStream } from './helpers/winston';

const app = express();
const port = 8080;

/* eslint-disable */
declare global {
  namespace Express {
    interface Request {
      db: Db;
      collection: Collection;
    }
  }
}
/* eslint-enable */

// Middleware: Make mongoDb db object available in req.
app.use(dbConnectionMiddleware('mongodb://127.0.0.1:27017', 'char-creator'));

const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  app.use(cors());
}

app.use(morgan('dev', { stream: new MorganLoggerStream() }));

// Middleware: Parse request body to json.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', router);

app.get('/api/savage-worlds-fantasy/qualities', (req, res) => {
  throw new Error('TODO Not implemented yet');
});

if (isProduction) {
  // Serve dist files in production mode
  logger.info('Serve the production build');

  const staticFileMiddleware = express.static('dist');
  app.use(staticFileMiddleware);
  app.use(
    history({
      disableDotRule: true,
      verbose: false,
    }),
  );
  app.use(staticFileMiddleware);
  app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    logger.error(err);
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json({ status: 'error', message: err.message });
    }
    return res.status(500).json({ status: 'error', message: 'An unknown error occurred!' });
  });
} else {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err);
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json({ status: 'error', message: err.message });
    }
    return res.status(500).json({ status: 'error', message: err.message, stack: err.stack });
  });
}

app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});
