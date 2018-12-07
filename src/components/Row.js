import styled, { css } from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin: 0 -${({ theme }) => theme.spacing.s};

  ${({ theme, info }) =>
    info &&
    css`
      display: block;

      p {
        margin: 0 ${({ theme }) => theme.spacing.s}
          ${({ theme }) => theme.spacing.m};
      }
    `}
`;

export default Row;
