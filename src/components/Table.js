import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    text-align: left;
  }

  td,
  th {
    padding: ${({ theme }) => theme.spacing.s};
    border: 1px solid ${({ theme }) => theme.color.gray};
  }

  td:last-child,
  th:last-child {
    width: ${({ info }) => (info ? '220px' : '150px')};
  }
`;

function TableWrapper({ info, labels, values, items, itemsKey, del, update }) {
  return (
    <>
      <h3>Search results</h3>
      {items.length === 0 ? (
        <p>
          Couldn't found results with such parameters{' '}
          <span role="img" aria-label="thinking">
            🤔
          </span>
        </p>
      ) : (
        <Table info={info}>
          <thead>
            <tr>
              {labels.map(label => (
                <th key={label}>{label}</th>
              ))}
              <th>
                <span>Actions</span>
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
                  {info ? (
                    <Button
                      color="info"
                      type="button"
                      onClick={() => info(item)}
                    >
                      <span role="img" aria-label="info">
                        🔍
                      </span>
                    </Button>
                  ) : null}
                  <Button
                    onClick={() => update(item)}
                    color="edit"
                    type="button"
                  >
                    <span role="img" aria-label="update">
                      ✍
                    </span>
                  </Button>
                  <Button
                    onClick={() => del(item[itemsKey])}
                    color="danger"
                    type="button"
                  >
                    <span role="img" aria-label="delete">
                      ❌
                    </span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default TableWrapper;
