import styled, { css } from 'styled-components';

const Select = styled.select`
  color: ${({ theme }) => theme.color.black};
  flex: 1;
  margin: 0 ${({ theme }) => theme.spacing.s} ${({ theme }) => theme.spacing.m};
  padding: ${({ theme }) => theme.spacing.s};

  ${({ theme, value }) =>
    value === '' &&
    css`
      color: ${theme.color.gray};
      option {
        color: ${theme.color.black};
      }
    `}}

  ${({ invalid, theme }) =>
    invalid &&
    css`
      border: 2px solid ${theme.color.red};
      color: ${theme.color.red};
    `}
`;

export default Select;
