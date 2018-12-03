import styled from 'styled-components';

const Header = styled.header`
  box-sizing: border-box;
  width: 100vw;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: ${({ theme }) => theme.shadow};
  position: relative;
  z-index: 200;

  h1 {
    margin-bottom: 0;
  }
`;

export default Header;
