// styles/GlobalStyle.js

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Daehan';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Daehan-Regular.woff')
            format('woff');
        font-weight: 400;
        font-display: swap;
    }

    @font-face {
        font-family: 'Daehan';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Daehan-Bold.woff')
            format('woff');
        font-weight: 700;
        font-display: swap;
    }

    @font-face {
        font-family: 'SpokaHanSansNeo';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Thin.woff') format('woff');
        font-weight: 100;
        font-display: swap;
    }

    @font-face {
        font-family: 'SpokaHanSansNeo';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Light.woff') format('woff');
        font-weight: 300;
        font-display: swap;
    }

    @font-face {
        font-family: 'SpokaHanSansNeo';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Regular.woff') format('woff');
        font-weight: normal;
        font-display: swap;
    }

    @font-face {
        font-family: 'SpokaHanSansNeo';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Medium.woff') format('woff');
        font-weight: 500;
        font-display: swap;
    }

    @font-face {
        font-family: 'SpokaHanSansNeo';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Bold.woff') format('woff');
        font-weight: 700;
        font-display: swap;
    }

    * {
        margin: 0;
        padding: 0;
    }

    body {
        box-sizing: border-box;
        font-family: 'Daehan', sans-serif;
    }
`;

export default GlobalStyle;