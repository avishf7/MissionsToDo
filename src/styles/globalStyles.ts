import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *, *::after, *::before { 
      box-sizing: inherit;
    }

    html {
      box-sizing: border-box;
    }

    body {
      background-color: black;
      margin: 0;
    }

    button {
      user-select: none;
      cursor: pointer;
      border: none;
      width: fit-content;
      opacity: 0.7
    }

    button:active {
      opacity: 0.8
    }
`;

