import { ruleLocations } from './ruleLocations';
import { config } from '../helpers/config';
import logger from '../helpers/winston';
import axios from 'axios';
import mdtable2json, { ParsedTable } from 'mdtable2json';

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
  const nextHashIndex = ruleFile.substring(startIndex).indexOf('\n#', 15);

  const fixedNextHashIndex = nextHashIndex === -1 ? ruleFile.length : nextHashIndex;

  if (ruleFile.charAt(fixedNextHashIndex - 1) === '(') {
    return getTableEndIndex(ruleFile, fixedNextHashIndex + 15);
  }

  return fixedNextHashIndex + startIndex;
};

export const parseTableForGivenHeader = (ruleFile: string, tableHeader: string): ParsedTable => {
  const tableHeaderIndex = ruleFile.indexOf(tableHeader);

  if (tableHeaderIndex === -1) throw new Error(`Table header '${tableHeader}' does not exist in rule file.`);

  const tableEndIndex = getTableEndIndex(ruleFile, tableHeaderIndex);

  const tableExcerpt = ruleFile.substring(tableHeaderIndex, tableEndIndex);
  const fixedTableExcerpt = tableExcerpt.replace(/[*]/g, '');

  return mdtable2json.getTables(fixedTableExcerpt)[0];
};

type TableData = { [subTitle: string]: ParsedTable };

const getRules = async (ruleSetName: string) => {
  const ruleLocation = ruleLocations[ruleSetName];
  if (!ruleLocation) throw new Error(`No rule set with the name ${ruleSetName} found`);

  const rules = await getRulesFromGithub(ruleLocation.fileUrl);

  const parsedData: { [title: string]: TableData } = {};
  ruleLocation.data.forEach(dataType => {
    const tableData: TableData = {};

    dataType.tableHeaders.forEach(tableHeader => {
      tableData[tableHeader] = parseTableForGivenHeader(rules, tableHeader);
    });

    parsedData[dataType.title] = tableData;
  });

  console.log(JSON.stringify(parsedData, null, 2));

  return parsedData;
};

getRules('savageRun');

/**
 * 1. Start string until next #
 * 2. Only if #does not have a ( in front of it
 */
