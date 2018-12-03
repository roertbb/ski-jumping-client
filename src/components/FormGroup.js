import styled from 'styled-components';

const FormGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  padding: ${({ theme }) => -theme.spacing.s};
`;

export default FormGroup;
