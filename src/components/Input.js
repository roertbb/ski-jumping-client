import styled, { css } from 'styled-components';

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.s};
  color: ${({ theme }) => theme.color.black};
  outline: none;
  flex: 1;
  margin: 0 ${({ theme }) => theme.spacing.s} ${({ theme }) => theme.spacing.m};

  ::placeholder {
    color: ${({ theme }) => theme.color.gray};
  }

  ${({ invalid, theme }) =>
    invalid &&
    css`
      border: 2px solid ${theme.color.red};
      color: ${theme.color.red};
    `}
`;

export default Input;
