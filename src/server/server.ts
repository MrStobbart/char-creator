import { ApiResponse } from './models/ApiResponse';
import { ApiError } from './models/ApiError';
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
import history from 'connect-history-api-fallback';
import dbConnectionMiddleware from './middlewares/dbConnector';
import { Db, Collection } from 'mongodb';
import savageWorldsFantasyQualities from './data/savageWorldsFantasy/qualities';

const app = express();
const port = 8080;

// Middleware: Make mongoDb db object available in req.
app.use(dbConnectionMiddleware('mongodb://127.0.0.1:27017', 'char-creator'));

declare global {
  namespace Express {
    interface Request {
      db: Db;
      collection: Collection;
    }
  }
}

const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  app.use(cors());
  // Log every request made to the console
  app.use(logger('dev'));
}

// Middleware: Parse request body to json.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.route('/api/users');

app.route('/api/savage-worlds-fantasy/qualities').get((req, res) => {
  res.status(200).json(new ApiResponse('success', savageWorldsFantasyQualities));
});

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
    // console.log('asdasdas', req.db);
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
      .then(mongoRes =>
        res.status(200).json(new ApiResponse('success', { characterId: req.params.id }))
      )
      .catch(err => next(err));
  });

if (isProduction) {
  // Serve dist files in production mode
  console.log('Serve the production build');

  const staticFileMiddleware = express.static('dist');
  app.use(staticFileMiddleware);
  app.use(
    history({
      disableDotRule: true,
      verbose: false,
    })
  );
  app.use(staticFileMiddleware);
  app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json({ status: 'error', message: err.message });
    }
    return res.status(500).json({ status: 'error', message: 'An unknown error occurred!' });
  });
} else {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json({ status: 'error', message: err.message });
    }
    return res.status(500).json({ status: 'error', message: err.message, stack: err.stack });
  });
}

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});