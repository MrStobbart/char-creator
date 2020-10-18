declare module 'mdtable2json' {
  export interface ParsedTable {
    headers: string[];
    json: { [header: string]: string }[];
  }
  export const getTables: (markdown: string) => ParsedTable[];
}
