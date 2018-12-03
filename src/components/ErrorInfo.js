import styled from 'styled-components';

const ErrorInfo = styled.p`
  color: ${({ theme }) => theme.color.red};
  flex-basis: 100%;
  font-size: ${({ theme }) => theme.font.error};
  margin: -${({ theme }) => theme.spacing.s} ${({ theme }) => theme.spacing.s} ${({ theme }) => theme.spacing.s};
`;

export default ErrorInfo;
