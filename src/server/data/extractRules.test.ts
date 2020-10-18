import { getTableEndIndex, parseTableForGivenHeader } from './extractRules';
const exampleRulesFile = `
This is some other Stuff

#### Soziale Talente

| *Talent* | *Anforderungen* | *Beschreibung* | *Wirkung* |
| ------------------------- | --------------------------- | ------------------------------------------------------------ | -------------------------- |
| *Demütigung* | Anfänger, Einschüchtern W8 | Solche mit einem herben Verstand können das Ego eines Gegners mit einer einzigen Anmerkung oder einer Geste zerstören. Der Charakter kann verspotten Proben wiederholen. | Provozieren wiederholbar |

#### Magische Talente

AH (Magier) impliziert auch Schamanen
`;

const exampleTableExcerpt = `
#### Soziale Talente

| *Talent* | *Anforderungen* | *Beschreibung* | *Wirkung* |
| ------------------------- | --------------------------- | ------------------------------------------------------------ | -------------------------- |
| *Demütigung* | Anfänger, Einschüchtern W8 | Solche mit einem herben Verstand können das Ego eines Gegners mit einer einzigen Anmerkung oder einer Geste zerstören. Der Charakter kann verspotten Proben wiederholen. | Provozieren wiederholbar |

`;

const exampleTableExcerpt2 = `
#### Fertigkeitsstufen

| Fertigkeitsstufe | Würfel | Bedeutung |
|--------------------|-------------|--------------|
| Nicht vorhanden | W4-1 | Ahnungslos |
| 1 | W4 | Anfänger |
| 2 | W6 | Ausgebildet |
| 3 | W8 | Kompetent |
| 4 | W10 | Herausragend |
| 5 | W12 | Profi |
| 6 | WildDie W8 | Legendär |
| 7 | WildDie W10 | |
| 8 | WildDie W12 | |`;

describe('getTableEndIndex', () => {
  it('returns the correct endIndex of a table', () => {
    const lastTableIndex = getTableEndIndex(exampleRulesFile, 27);
    expect(lastTableIndex).toBe(506);
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
});
