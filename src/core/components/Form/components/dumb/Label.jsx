import styled from "styled-components";
import PropTypes from "prop-types";

// styles
const LabelStyled = styled.label`
    margin: 0px;

    .required {
        color: #900;
        font-size: 20px;
        margin-right: 5px;
        font-weight: normal;
    }
`;

// component
const Label = ({
    inputId,
    labelText,
    isRequired = false,
    dangerouslySetHTML = false,
}) => {
    return (
        <LabelStyled htmlFor={inputId}>
            {isRequired && <span className="required">*</span>}
            {dangerouslySetHTML ? (
                <span dangerouslySetInnerHTML={{ __html: labelText }} />
            ) : (
                <>{labelText}:</>
            )}
        </LabelStyled>
    );
};

export default Label;

// prop-types
Label.propTypes = {
    inputId: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    isRequired: PropTypes.bool,
    dangerouslySetHTML: PropTypes.bool,
};
