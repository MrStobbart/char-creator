import { config } from './../helpers/config';
import axios from 'axios';
import logger from '../helpers/winston';

interface GitHubResponse {
  type: string;
  encoding: string;
  size: number;
  name: string;
  path: string;
  content: string;
  sha: string;
  url: string;
  git_url: string;
  html_url: string;
  download_url: string;
  _links: {
    git: string;
    self: string;
    html: string;
  };
}

interface GitHubErrorResponse {
  message: string;
}

export const getRulesFromGithub = async (fileUrl: string) => {
  try {
    const response = await axios.get<GitHubResponse & GitHubErrorResponse>(fileUrl, {
      headers: {
        Authorization: `token ${config.githubToken}`,
      },
    });

    return Buffer.from(response.data.content, 'base64').toString();
  } catch (error) {
    logger.error(`Could not fetch and parse rule file from GitHub: ${error.message}`);
    throw error;
  }
};
