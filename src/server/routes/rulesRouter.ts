import { getRules } from '../data/extractRules';
import { ApiResponse } from '../models/ApiResponse';
import express from 'express';

export const rulesRouter = express.Router();

rulesRouter.get('/rules/:ruleSet', async (req, res, next) => {
  const ruleSet = req.params.ruleSet || '';

  if (!ruleSet) {
    res.status(400).json(new ApiResponse('fail', null, 'No ruleSet name supplied'));
  }

  try {
    const rules = await getRules(ruleSet);
    res.json(new ApiResponse('success', rules));
  } catch (error) {
    console.log('!!!!CX');

    next(error);
  }
});
