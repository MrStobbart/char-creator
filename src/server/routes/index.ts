import express from 'express';
import { charactersRouter } from './characters';

export const router = express.Router();

router.use('/', charactersRouter);
