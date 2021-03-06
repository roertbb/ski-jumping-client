import React from 'react';
import styled, { css } from 'styled-components';
import Button from './Button';
import Spinner from './Spiner';
import { withRouter } from 'react-router-dom';

export const Table = styled.table`
  & + * {
    margin-top: ${({ theme }) => theme.spacing.l};
  }

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

  ${({ noActions }) =>
    !noActions &&
    css`
      td:last-child,
      th:last-child {
        width: ${({ info, single }) =>
          info ? '220px' : single ? '80px' : '150px'};
      }
    `}
`;

function TableWrapper({
  info,
  route,
  labels,
  values,
  items,
  itemsKey,
  del,
  update,
  history
}) {
  return (
    <>
      <h3>Search results</h3>
      {!items ? (
        <Spinner />
      ) : items.length === 0 ? (
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
                      onClick={() =>
                        history.push(`/${route}/${item[itemsKey]}`)
                      }
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
                    onClick={() => del(getIds(itemsKey, item))}
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

const getIds = (id, item) => {
  if (!Array.isArray(id)) {
    return {
      [id]: item[id]
    };
  } else {
    const constraints = {};
    id.forEach(i => {
      constraints[i] = item[i];
    });
    return constraints;
  }
};

export default withRouter(TableWrapper);
