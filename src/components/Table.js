import React from 'react';

import { Table, Button } from 'reactstrap';

function TableWrapper({
  noInfo,
  labels,
  values,
  items,
  itemsKey,
  del,
  update
}) {
  return (
    <Table striped>
      <thead>
        <tr>
          {labels.map(label => (
            <th key={label}>{label}</th>
          ))}
          <th>
            <span className="float-right mr-2">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item[itemsKey]}>
            {values.map(value => (
              <td key={value}>{item[value]}</td>
            ))}
            <td>
              {!noInfo ? (
                <Button
                  className="mr-2 float-right"
                  color="primary"
                  type="button"
                >
                  Info
                </Button>
              ) : null}
              <Button
                onClick={() => del(item[itemsKey])}
                className="mr-2 float-right"
                color="danger"
                type="button"
              >
                Delete
              </Button>
              <Button
                onClick={() => update(item)}
                className="mr-2 float-right"
                color="warning"
                type="button"
              >
                Edit
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableWrapper;
