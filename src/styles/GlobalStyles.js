import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #1a1a1a;
    color: white;
    min-height: 100vh;
    margin: 0;
  }

  #root {
    min-height: 100vh;
    background-color: #1a1a1a;
  }

  button {
    font-family: inherit;
  }
`;

export default GlobalStyles;