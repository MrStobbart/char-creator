import { rulesRouter } from './rulesRouter';
import express from 'express';
import { charactersRouter } from './charactersRouter';

export const router = express.Router();

router.use(charactersRouter);
router.use(rulesRouter);
