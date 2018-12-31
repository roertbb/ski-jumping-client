import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.color.black};

  &.${props => props.activeClassName} {
    font-weight: ${({ theme }) => theme.font.bold};
  }
`;

export default StyledLink;
