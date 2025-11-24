import styled from "styled-components";
import PropTypes from "prop-types";

// components
import Label from "./Label";

// styles
const ControlGroupStyled = styled.div`
    display: flex;
    margin-bottom: 10px;
    gap: 10px;
`;

const LabelWrapper = styled.div`
    flex: 0 0 150px;
    text-align: right;
    padding-top: 3px;
`;

const ControlWrapper = styled.div`
    flex: 1;
`;

const ErrorMessage = styled.div`
    color: #900;
    font-weight: bold;
`;

// component
const ControlGroup = ({
    children,
    id,
    labelText,
    errorMessage = "",
    isRequired = false,
}) => {
    return (
        <ControlGroupStyled>
            <LabelWrapper>
                <Label
                    inputId={id}
                    labelText={labelText}
                    isRequired={isRequired}
                />
            </LabelWrapper>
            <ControlWrapper>
                <div className="control">{children}</div>
                {errorMessage && (
                    <ErrorMessage className="form-error-message">
                        {errorMessage}
                    </ErrorMessage>
                )}
            </ControlWrapper>
        </ControlGroupStyled>
    );
};

export default ControlGroup;

// prop-types
ControlGroup.propTypes = {
    children: PropTypes.any,
    id: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
    isRequired: PropTypes.bool,
};
