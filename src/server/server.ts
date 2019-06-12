import { ApiResponse } from './models/ApiResponse';
import { ApiError } from './models/ApiError';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import history from 'connect-history-api-fallback';
import dbConnectionMiddleware from './middlewares/dbConnector';
import { Db, Collection } from 'mongodb';
import logger, { LoggerStream } from './helpers/winston';

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

app.use(morgan('dev', { stream: new LoggerStream() }));

// Middleware: Parse request body to json.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.route('/api/users');

app.route('/api/savage-worlds-fantasy/qualities').get((req, res) => {});

app
  .route('/api/savage-worlds-fantasy/characters')
  .all((req, res, next) => {
    req.collection = req.db.collection('swFantasyCharacters');
    next();
  })

  // Get all characters
  .get((req, res, next) => {
    req.collection
      .find({})
      .toArray()
      .then(data => res.status(200).json(new ApiResponse('success', data)))
      .catch(err => next(err));
  });

// TODO add this kind of error handling to all endpoints
app
  .route('/api/savage-worlds-fantasy/characters/:id')
  .all((req, res, next) => {
    req.collection = req.db.collection('swFantasyCharacters');
    next();
  })

  // Get specific character
  .get((req, res, next) => {
    req.collection
      .findOne({ _id: req.params.id })
      .then(mongoRes => {
        if (!mongoRes) {
          next(new ApiError(404, `No character with the id ${req.params.id} found!`));
        }
        res.status(200).json(new ApiResponse('success', mongoRes));
      })
      .catch(err => next(err));
  })

  // Upsert character with given id
  .put((req, res, next) => {
    req.collection
      .findOneAndReplace({ _id: req.params.id }, req.body, { returnOriginal: false, upsert: true })
      .then(mongoRes => res.status(200).json(new ApiResponse('success', mongoRes.value)))
      .catch(err => next(err));
  })

  // Delete character with given id
  .delete((req, res, next) => {
    req.collection
      .findOneAndDelete({ _id: req.params.id })
      .then(mongoRes => res.status(200).json(new ApiResponse('success', { characterId: req.params.id })))
      .catch(err => next(err));
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
