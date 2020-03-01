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
  const ruleFileString = Buffer.from(ruleFile.content, 'base64').toString();
  console.log(ruleFileString);
};

getRules('savageRun');
