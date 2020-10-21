import { getRulesFromGithub } from './../gitHubConnector';
import { mocked } from 'ts-jest/utils';
import { RuleLocationData, getRuleLocation } from './../ruleLocations';
import { ParsedTable } from 'mdtable2json';
import { trimEntries, getRules } from './../extractRules';
import { exampleRulesFile, exampleTableExcerpt2, exampleTableWithLink } from './testMarkdownData';
import { getTableEndIndex, parseTableForGivenHeader } from '../extractRules';

jest.mock('../gitHubConnector.ts');
const getRulesFromGithubMock = mocked(getRulesFromGithub).mockImplementation(() =>
  Promise.resolve(exampleTableWithLink),
);

jest.mock('../ruleLocations.ts');
mocked(getRuleLocation).mockReturnValue({
  fileUrl: 'https://api.github.com/repos/MrStobbart/savage-worlds/contents/Savage%20Run/Savage-Run-Stobbart.md',
  data: [
    {
      title: 'edges',
      tableHeaders: ['#### Magische Talente'],
      propertyNames: {
        Talent: 'label',
        Anforderungen: 'requirements',
        Beschreibung: 'information',
        Wirkung: 'modifiers',
      },
    },
  ],
});

describe('getTableEndIndex', () => {
  it('returns the correct endIndex of a table', () => {
    const lastTableIndex = getTableEndIndex(exampleRulesFile, 27);
    expect(lastTableIndex).toBe(505);
  });
  it.todo('can handle the special case with the (');
});

describe('parseTableForGivenHeader', () => {
  it('returns the object with the data from the table', () => {
    const parsedTable = parseTableForGivenHeader(exampleRulesFile, '#### Soziale Talente');
    expect(parsedTable).toMatchSnapshot();

    const parsedTable2 = parseTableForGivenHeader(exampleTableExcerpt2, '#### Fertigkeitsstufen');
    expect(parsedTable2).toMatchSnapshot();
  });

  it('parses the correct table when there is a link in the table', () => {
    const parsedTable = parseTableForGivenHeader(exampleTableWithLink, '#### Magische Talente');

    expect(parsedTable.headers.length).toBe(4);
    expect(parsedTable.json.length).toBe(11);

    expect(parsedTable).toMatchSnapshot();
  });
});

describe('trimEntries', () => {
  it('trims all entries correctly', () => {
    const parsedTable: ParsedTable = {
      headers: [' toast', 'sack ', 'normal'],
      json: [{ ' toast': ' 1', 'sack ': '2 ', normal: '3 ' }],
    };

    const ruleLocationData: RuleLocationData = {
      title: '',
      tableHeaders: [],
      propertyNames: { toast: 'label', sack: 'information', normal: 'requirements' },
    };
    expect(trimEntries(parsedTable, ruleLocationData)).toMatchSnapshot();
  });
});

describe('getRules', () => {
  it('returns the rules in the correct format', async () => {
    const rules = await getRules('savageRun');
    expect(rules.edges['Magische Talente']).toBeDefined();
    expect(rules.edges['Magische Talente'].length).toBe(11);
    expect(rules).toMatchSnapshot();
  });
});
