import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        font-size: 62.5%;
    }

    body {
        background-color: #080f25;
        color: #aeb9e1;
        font-family: "Mona Sans", sans-serif;

        &::-webkit-scrollbar {
            width: 1.7em;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #404962;

            &:hover {
                background-color: #343b4f;
                transition: 0.3s ease;
            }
        }

        &::-webkit-scrollbar-track {
            background-color: #101935;
        }
    }

    h1, h2, h3 {
        font-weight: 500;
    }

    h1 {
        font-size: clamp(1.9rem, 2vw, 2.28rem);
        color: #ffffff;
    }

    h2 {
        font-size: clamp(1.65rem, 1.9vw, 2rem);
        color: #ffffff;
    }

    h3 {
        font-size: clamp(1.4rem, 1.9vw, 1.7rem);
    }

    h4 {
        font-size: clamp(1.1rem, 1.2vw, 1.35rem);
        font-weight: 400;
    }

    p {
        font-size: 1.35rem;
        font-weight: 400;

    }

    a {
        color: inherit;
        text-decoration: none;
    }

    ul {
        list-style-type: none;
    }

    li {
        font-size: 1.4rem;
        color: inherit;
    }

    input {
        outline: 0;
        color: #c7d3ff;
    }

    label {
        font-size: 1.15rem;
        font-weight: 500;
        margin-bottom: 0.8em;
        display: inline-block;
        color: #c7d3ff;
    }

    button {
        border: none;
        color: inherit;
        cursor: pointer;
    }
`;

export default GlobalStyles;
