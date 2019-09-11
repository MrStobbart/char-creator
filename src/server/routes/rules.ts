import express from 'express';

const rulesRouter = express.Router();

rulesRouter.get('rules', async (req, res) => {
  /**
   * 1. Read markdown file
   * 2. Read tables
   * 3. Craete Data array with combined results
   */
});
