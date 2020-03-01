import dotenv from 'dotenv';
dotenv.config();

export const config = Object.freeze({
  githubToken: process.env.GITHUB_ACCESS_TOKEN || '',
});
