import MongoDb, { MongoClientOptions } from 'mongodb';
import { Request, Response, NextFunction } from 'express';
const MongoClient = MongoDb.MongoClient;

function createConnection(url: string, options: MongoClientOptions) {
  options.useNewUrlParser = true; // eslint-disable-line
  return MongoClient.connect(url, options)
    .then(db => {
      console.log('Mongo Connection established!');
      return db;
    })
    .catch(err => {
      const message = `Could not connect to MongoDB!\n
      lease make sure Mongodb is installed and running!\n
      Mongo url: ${url}\nError obj: ${JSON.stringify(err, null, 2)}`;
      console.log(message);
    });
}

export default function(url: string, databaseName: string, options: MongoClientOptions = {}) {
  if (typeof url !== 'string') {
    throw new TypeError('Expected uri to be a string');
  }
  const property = 'db';

  let connection: Promise<void | MongoDb.MongoClient> | undefined = createConnection(url, options);

  return (req: Request, res: Response, next: NextFunction) => {
    if (!connection) {
      connection = createConnection(url, options);
    }

    connection
      .then(client => {
        if (client instanceof MongoClient) {
          req.db = client.db(databaseName);
        }
        next();
      })
      .catch(err => {
        const message = `Error while applying connector middleware on request: ${req.originalUrl}\n
        Error obj: ${JSON.stringify(err, null, 2)}`;
        console.log(message);
        connection = undefined;
        next(err);
      });
  };
}
