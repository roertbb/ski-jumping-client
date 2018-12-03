import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin: 0 -${({ theme }) => theme.spacing.s};
`;

export default Row;
