import PropTypes from "prop-types";
import styled from "styled-components";

// styles
const CheckboxContainer = styled.div`
    margin-bottom: 10px;
`;

const CheckboxWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 12px;

    input[type="checkbox"] {
        width: 20px;
        height: 20px;
        cursor: pointer;
        flex-shrink: 0;
        margin-top: 2px;
    }

    label {
        cursor: pointer;
        user-select: none;
        margin: 0;
        flex: 1;
        font-size: 16px;
        line-height: 1.5;
    }
`;

const ErrorMessage = styled.div`
    color: #900;
    font-weight: bold;
    margin-top: 5px;
    margin-left: 32px;
`;

const PreText = styled.div`
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 1.5;
`;

const PostText = styled.div`
    margin-top: 10px;
    font-size: 14px;
    line-height: 1.5;
`;

// component
export const Checkbox = ({
    value,
    onChange,
    id,
    labelText,
    dangerouslySetHTML = false,
    errorMessage,
    preText,
    postText,
}) => {
    return (
        <CheckboxContainer>
            {preText &&
                (dangerouslySetHTML ? (
                    <PreText dangerouslySetInnerHTML={{ __html: preText }} />
                ) : (
                    <PreText>{preText}</PreText>
                ))}
            <CheckboxWrapper>
                <input
                    type="checkbox"
                    id={id}
                    name={id}
                    checked={value || false}
                    onChange={onChange}
                />
                <label htmlFor={id}>
                    {dangerouslySetHTML ? (
                        <span dangerouslySetInnerHTML={{ __html: labelText }} />
                    ) : (
                        labelText
                    )}
                </label>
            </CheckboxWrapper>
            {errorMessage && (
                <ErrorMessage className="form-error-message">
                    {errorMessage}
                </ErrorMessage>
            )}
            {postText &&
                (dangerouslySetHTML ? (
                    <PostText dangerouslySetInnerHTML={{ __html: postText }} />
                ) : (
                    <PostText>{postText}</PostText>
                ))}
        </CheckboxContainer>
    );
};

// prop-types
Checkbox.propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    dangerouslySetHTML: PropTypes.bool,
    errorMessage: PropTypes.string,
    preText: PropTypes.string,
    postText: PropTypes.string,
};

const ControlGroupCheckbox = (props) => {
    return <Checkbox {...props} />;
};

export default ControlGroupCheckbox;
