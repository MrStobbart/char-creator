import { readFile } from 'fs';
import { Parser } from 'xml2js';
import { Property } from '../../models/interfaces';

const fileName = '\\savageWorldsFantasy\\Regeländerungen-Fantasy-0.9.0.fodt';
const filePath = __dirname + fileName;
console.log(filePath);

interface FodtAttributes {
  'text:name'?: string;
  'xml:id'?: string;
  'table:name'?: string;
}

interface TextH {}

interface FodtElement {
  $: FodtAttributes;
}

interface FodtText extends FodtElement {
  _?: string;
  'text:span'?: FodtSpanText[];
}
interface FodtSpanText {
  _: string;
}
interface FodtTextList extends FodtElement {
  'text:span': FodtText[];
}
interface FodtListItem extends FodtElement {
  'text:p': FodtTextList[];
}
interface FodtList extends FodtElement {
  'text:list-item': FodtListItem[];
}
interface FodtTable extends FodtElement {
  'table:table-row': FodtTableRow[];
}
interface FodtTableRow extends FodtAttributes {
  'table:table-cell': FodtSection[];
}

interface FodtSection extends FodtElement {
  'text:h': FodtText[];
  'text:p': FodtText[];
  'text:list': FodtList[];
  'table:table': FodtTable[];
}

interface EdgesGroup {
  id: string;
  label: string;
  selectables: Edge[];
}

interface Edge {
  id: string; // = title
  requirements: string[];
  description: string;
}

function createRequirementsArrayFromString(requirements: string = ''): string[] {
  // TODO make this better
  const requirementsArr = requirements.split(',');
  return requirementsArr.map(requirement => requirement.trim());
}

function readEdgesFromTable(table: FodtTable): Edge[] | undefined {
  const edges: Edge[] = [];
  for (let i = 0; i < table['table:table-row'].length; i++) {
    const tableRow = table['table:table-row'][i];
    const id = tableRow['table:table-cell'][0]['text:p'][0]._;
    const description = tableRow['table:table-cell'][2]['text:p'][0]._ || '';
    if (!id) {
      console.error('ERROR: Id is missing');
      continue;
    }
    const requirementsString = tableRow['table:table-cell'][1]['text:p'][0]._;
    const requirements = createRequirementsArrayFromString(requirementsString);
    const edge: Edge = {
      id: id.trim(),
      requirements,
      description: description.trim(),
    };
    edges.push(edge);
  }
  return edges;
}

const parser = new Parser();
readFile(filePath, (err, data) => {
  if (err) {
    console.log(err);
  }
  parser.parseString(data, (err: Error, document: any) => {
    if (err) {
      console.log(err);
      return;
    }
    // console.dir(document);
    const edges: Property[] = [];
    const sections: FodtSection[] = document['office:document']['office:body'][0]['office:text'][0]['text:section'];

    const sectionOtherTables = sections.find(section => section.$['text:name'] === 'Other');

    if (sectionOtherTables === undefined) {
      throw Error('Parsing error: Section other not found');
    }

    const tables = sectionOtherTables['table:table'];
    for (let i = 0; i < tables.length; i++) {
      const table = tables[i];

      const edgesTables = [
        'tableBackgroundEdges',
        'tableGeneralEdges',
        'tableRangedEdges',
        'tableCloseCombarEdges',
        'tableLeaderEdges',
        'tableSocialEdges',
        'tableMagicEdges',
        'tableExpertEdges',
      ];
      const tableName = table.$['table:name'] || '';
      const isEdgeTable = edgesTables.includes(tableName);
      if (isEdgeTable) {
        const edges = readEdgesFromTable(table);
      }
    }
    console.log(edges);

    console.log('Done');
  });
});
