import dotenv from 'dotenv';
import logger from './winston';

const validateEnv = () => {
  if (!process.env.GITHUB_ACCESS_TOKEN) {
    logger.error(`Env variable GITHUB_ACCESS_TOKEN is missing`);
    process.exit(1);
  }
};

dotenv.config();
validateEnv();

export const config = Object.freeze({
  githubToken: process.env.GITHUB_ACCESS_TOKEN || '',
});
