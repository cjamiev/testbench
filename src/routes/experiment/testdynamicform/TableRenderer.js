import React from 'react';
import Table from 'components/table';

const getEmptyObject = (keys) => keys.reduce((acc, item) => ({ ...acc, [item]: '' }), {});

const getUniqueHeaders = (source) => {
  const headers = source.reduce((acc, entry) => {
    return [...acc, ...Object.keys(entry)];
  }, []);

  return headers.filter((item, pos) => headers.indexOf(item) === pos);
};

const getTableData = (source) => {
  const headers = getUniqueHeaders(source);
  const emptySourceField = getEmptyObject(headers);

  const rows = source.map((entry) => {
    return {
      ...emptySourceField,
      ...entry
    };
  });

  return { headers, rows };
};

const renderRows = (values) =>
  values.map((entry) => {
    const rows = Object.values(entry).map((item, i) => <td key={JSON.stringify(item) + i}>{JSON.stringify(item)}</td>);

    return <tr key={JSON.stringify(entry)}>{rows}</tr>;
  });

const TableRenderer = (label, source) => {
  const { headers, rows } = getTableData(source);

  return (
    <div>
      <label>{label}</label>
      <Table headers={headers} body={renderRows(rows)} />
    </div>
  );
};

export default TableRenderer;
