import { css } from "styled-components";

//styles
export const sharedInputStyles = css`
    font-size: 18px;
    padding: 5px 10px;
    width: 100%;
    background-color: #fff;
    border: solid 1px rgb(208, 208, 208);
    display: block;

    &:focus {
        background-color: #e7efff;
    }

    &::placeholder {
        color: #acacac; /* Text color */
        font-style: italic; /* Italic font */
        font-size: 16px; /* Font size */
    }
`;
