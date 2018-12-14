import styled, { css } from 'styled-components';

const propToColor = (theme, color, hover) => {
  const col = hover ? theme.color.hover : theme.color;
  if (color === 'success') return col.green;
  else if (color === 'danger') return col.red;
  else if (color === 'info') return col.blue;
  else if (color === 'edit') return col.yellow;
  else if (color === 'disabled') return col.gray;
};

const Button = styled.button`
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.s} ${({ theme }) => theme.spacing.m};
  background-color: ${({ theme, color }) => propToColor(theme, color, false)};
  border: 0;
  /* outline: none; */
  border-radius: ${({ theme }) => theme.spacing.s};
  color: white;
  transition: 0.25s ease-in-out;
  box-shadow: ${({ theme }) => theme.shadow};
  margin: 0 ${({ theme }) => theme.spacing.s};

  :hover {
    background-color: ${({ theme, color }) => propToColor(theme, color, true)};
  }

  ${({ theme, mb }) =>
    mb &&
    css`
      margin-bottom: ${theme.spacing.m};
    `}
`;

export default Button;
