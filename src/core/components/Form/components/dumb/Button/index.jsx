import styled from "styled-components";
import PropTypes from "prop-types";

// styles
const ButtonStyled = styled.button`
    display: inline-block;
    padding: 10px 15px;
    border: none;
    outline: none;
    border-radius: 5px;
    font-size: 18px;
    background-color: #09389a;
    color: white;

    cursor: pointer;

    &:hover,
    &:focus {
        background-color: #0c275f;
    }
    &:active {
    }

    &:disabled {
        cursor: not-allowed;
    }
`;

// component
const Button = ({ children, type = "text", ...rest }) => {
    return (
        <ButtonStyled type={type} {...rest}>
            {children}
        </ButtonStyled>
    );
};

export default Button;

// prop-types
Button.propTypes = {
    children: PropTypes.any,
    type: PropTypes.string,
};
