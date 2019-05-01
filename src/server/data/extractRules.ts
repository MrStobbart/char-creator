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
    const sections: FodtSection[] =
      document['office:document']['office:body'][0]['office:text'][0]['text:section'];

    const sectionOtherTables = sections.find(section => section.$['text:name']! === 'Other')!;

    console.log(
      sectionOtherTables['table:table'][0]['table:table-row'][0]['table:table-cell'][0]['text:p'][0]
        ._
    );

    // const edgesTables = [
    //   'tableBackgroundEdges',
    //   'tableGeneralEdges',
    //   'tableRangedEdges',
    //   'tableCloseCombarEdges',
    //   'tableLeaderEdges',
    //   'tableSocialEdges',
    //   'tableMagicEdges',
    //   'tableExpertEdges',
    // ];
    // sectionOtherTables.forEach(table => {
    //   const tableName = table['$']['table:name'];
    //   if (edgesTables.includes(tableName)) {
    //     console.log(table);
    //     console.log('tableColumn:', table['table:table-column']);
    //     console.log('tableRow:', table['table:table-row']);
    //     console.log('tableCell:', table['table:table-row'][0]['table:table-cell']);
    //     const tableCells = table['table:table-row'][1]['table:table-cell'];
    //     tableCells.forEach((tableCell, index) => {
    //       console.log(`tableCell ${index}:`, tableCell['text:p']);
    //     });
    //   }
    // });

    console.log('Done');
  });
});

// function createEdgesEntry(tableRow) {
//   const tableCells = tableRow['table:table-cell'];
// }
