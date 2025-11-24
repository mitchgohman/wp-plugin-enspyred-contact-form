import styled from "styled-components";
import PropTypes from "prop-types";

// styles
const FieldsetStyled = styled.fieldset`
    ${({ $isHidden }) => $isHidden && "display: none;"}

    margin-bottom: 50px;

    legend {
        font-size: 18px;
        font-weight: bold;

        span {
            color: #999;
            margin-left: 10px;
            font-size: 16px;
            font-weight: normal;
        }
    }
`;

// component
const Fieldset = ({ children, title, description, isHidden = false }) => {
    return (
        <FieldsetStyled $isHidden={isHidden}>
            <legend>
                {title}
                {description && <span>({description})</span>}
            </legend>
            {children}
        </FieldsetStyled>
    );
};

export default Fieldset;

// prop-types
Fieldset.propTypes = {
    children: PropTypes.any,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    isHidden: PropTypes.bool,
};
