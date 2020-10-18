import { ruleLocations } from './ruleLocations';
import { config } from '../helpers/config';
import logger from '../helpers/winston';
import axios from 'axios';
import mdtable2json from 'mdtable2json';

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

const getRulesFromGithub = async (fileUrl: string) => {
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

export const getTableEndIndex = (ruleFile: string, startIndex: number): number => {
  const nextHashIndex = ruleFile.substring(startIndex).indexOf('#', 15);

  const fixedNextHashIndex = nextHashIndex === -1 ? ruleFile.length : nextHashIndex;

  if (ruleFile.charAt(fixedNextHashIndex - 1) === '(') {
    return getTableEndIndex(ruleFile, fixedNextHashIndex + 15);
  }

  return fixedNextHashIndex + startIndex;
};

export const parseTableForGivenHeader = (ruleFile: string, tableHeader: string) => {
  const tableHeaderIndex = ruleFile.indexOf(tableHeader);

  if (tableHeaderIndex === -1) throw new Error(`Table header '${tableHeader}' does not exist in rule file.`);

  const tableEndIndex = getTableEndIndex(ruleFile, tableHeaderIndex);

  const tableExcerpt = ruleFile.substring(tableHeaderIndex, tableEndIndex);
  const fixedTableExcerpt = tableExcerpt.replace(/[*]/g, '');

  return mdtable2json.getTables(fixedTableExcerpt);
};

export const parseMarkdownTable = (tableExcerpt: string) => {};

const getRules = async (ruleSetName: string) => {
  const ruleLocation = ruleLocations[ruleSetName];
  if (!ruleLocation) throw new Error(`No rule set with the name ${ruleSetName} found`);

  const rules = await getRulesFromGithub(ruleLocation.fileUrl);

  const tableExtract = parseTableForGivenHeader(rules, '#### Hintergrundtalente');
};

getRules('savageRun');

/**
 * 1. Start string until next #
 * 2. Only if #does not have a ( in front of it
 */
