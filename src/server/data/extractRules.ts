import fetch from 'node-fetch';
import { ruleLocations } from './ruleLocations';
import { config } from '../helpers/config';

const getRules = async (ruleSetName: string) => {
  const ruleLocation = ruleLocations[ruleSetName];
  if (!ruleLocation) throw new Error(`No rule set with the name ${ruleSetName} found`);

  const response = await fetch(ruleLocation.fileUrl, {
    headers: {
      Authorization: `token ${config.githubToken}`,
    },
  });
  const ruleFile = await response.json();
  return Buffer.from(ruleFile.content, 'base64').toString();
};

const getTableExtract = (ruleFile: string, tableHeader: string) => {
  const tableHeaderIndex = ruleFile.indexOf(tableHeader);

  if (tableHeaderIndex === -1) throw new Error(`Table header '${tableHeader}' does not exist in rule file.`);

  const tableEndIndex = getTableEndIndex(ruleFile, tableHeaderIndex);

  ruleFile.substring(tableHeaderIndex, tableEndIndex);
};

const getTableEndIndex = (ruleFile: string, startIndex: number): number => {
  const nextHashIndex = ruleFile.substring(startIndex).indexOf('#');
  if (ruleFile.charAt(nextHashIndex - 1) === '(') {
    return getTableEndIndex(ruleFile, nextHashIndex + 10); // a header can have a lot of hashtags
  }
  return nextHashIndex;
};

getRules('savageRun');

/**
 * 1. Start string until next #
 * 2. Only if #does not have a ( in front of it
 */
