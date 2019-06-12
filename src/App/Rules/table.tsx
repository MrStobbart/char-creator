import * as React from 'react';
import { useTranslation } from 'react-i18next';
import ReactTable, { Column } from 'react-table';

export interface TableComponentPorps {
  data: {}[];
  columns: Column<{}>[];
}
export default function TableComponent(props: TableComponentPorps) {
  const [t] = useTranslation();
  return <ReactTable data={props.data} columns={props.columns} />;
}
