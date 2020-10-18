import { exampleRulesFile, exampleTableExcerpt2, exampleTableWithLink } from './testMarkdownData';
import { getTableEndIndex, parseTableForGivenHeader } from '../extractRules';

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
