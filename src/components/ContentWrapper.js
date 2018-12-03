import styled from 'styled-components';

const ContentWrapper = styled.div`
  display: block;
  flex-basis: 100%;
  padding: ${({ theme }) => theme.spacing.xl};
`;

export default ContentWrapper;
