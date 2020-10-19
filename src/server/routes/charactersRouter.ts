import express from 'express';
import { ApiResponse } from '../models/ApiResponse';
import { ApiError } from '../models/ApiError';

export const charactersRouter = express.Router();

charactersRouter
  .route('/savage-worlds-fantasy/characters')
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
charactersRouter
  .route('/savage-worlds-fantasy/characters/:id')
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
