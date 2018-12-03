import styled from 'styled-components';

const Label = styled.label`
  display: block;
  color: ${({ theme }) => theme.color.black};
  flex-basis: 100%;
  margin: 0 ${({ theme }) => theme.spacing.s} ${({ theme }) => theme.spacing.s};
`;

export default Label;
