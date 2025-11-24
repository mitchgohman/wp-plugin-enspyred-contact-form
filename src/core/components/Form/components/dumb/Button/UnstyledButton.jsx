import styled from "styled-components";

const UnstyledButton = styled.button`
    all: unset;
    cursor: pointer; /* Add if you want the button to behave like a clickable element */
    display: inline-flex; /* Optional: Ensures alignment for children like icons or text */
    align-items: center; /* Optional */
    justify-content: center; /* Optional */
`;

export default UnstyledButton;
