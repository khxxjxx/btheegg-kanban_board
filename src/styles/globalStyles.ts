'use client';

import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';

const styles = css`
  * {
    box-sizing: border-box;
  }
  body {
    height: 100vh;
    background-color: ${({ theme }) => theme.color.black30};
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  input,
  textarea {
    -moz-user-select: auto;
    -webkit-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
  }
  input:focus {
    outline: none;
  }
  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }
`;

const GlobalStyles = createGlobalStyle` 
  ${reset}
  ${styles}
`;

export default GlobalStyles;
