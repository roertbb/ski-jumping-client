import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');

  body {
    padding: 0;
    margin: 0;
    font-family: Montserrat, sans-serif;
    color: ${({ theme }) => theme.color.black};
    background-color: ${({ theme }) => theme.color.background};
  }

  * {
    font-family: Montserrat, sans-serif;
  }

  h1, h2, h3, h4, h5, p, button {
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.spacing.m}
  }

  p {
    margin-bottom: 0;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
