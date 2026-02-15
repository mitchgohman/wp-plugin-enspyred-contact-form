import styled from "styled-components";
import PropTypes from "prop-types";

// components
import Label from "./Label";

// context
import { useUniversalForm } from "@Core/components/Form/context/useUniversalForm.js";

// styles
const ControlGroupStyled = styled.div`
    display: flex;
    flex-direction: ${({ $stacked }) => ($stacked ? "column" : "row")};
    margin-bottom: 10px;
    gap: ${({ $stacked }) => ($stacked ? "4px" : "10px")};
`;

const LabelWrapper = styled.div`
    ${({ $stacked }) =>
        $stacked
            ? `
        text-align: left;
    `
            : `
        flex: 0 0 150px;
        text-align: right;
        padding-top: 3px;
    `}
`;

const ControlWrapper = styled.div`
    flex: 1;
`;

const ErrorMessage = styled.div`
    color: #900;
    font-weight: bold;
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
const ControlGroup = ({
    children,
    id,
    labelText,
    errorMessage = "",
    isRequired = false,
    orientation,
    preText,
    postText,
    dangerouslySetHTML = false,
}) => {
    const { orientation: globalOrientation } = useUniversalForm();
    const resolved = orientation || globalOrientation || "side-by-side";
    const stacked = resolved === "stacked";

    return (
        <ControlGroupStyled $stacked={stacked}>
            <LabelWrapper $stacked={stacked}>
                <Label
                    inputId={id}
                    labelText={labelText}
                    isRequired={isRequired}
                    dangerouslySetHTML={dangerouslySetHTML}
                />
            </LabelWrapper>
            <ControlWrapper>
                {preText &&
                    (dangerouslySetHTML ? (
                        <PreText dangerouslySetInnerHTML={{ __html: preText }} />
                    ) : (
                        <PreText>{preText}</PreText>
                    ))}
                <div className="control">{children}</div>
                {errorMessage && (
                    <ErrorMessage className="form-error-message">
                        {errorMessage}
                    </ErrorMessage>
                )}
                {postText &&
                    (dangerouslySetHTML ? (
                        <PostText
                            dangerouslySetInnerHTML={{ __html: postText }}
                        />
                    ) : (
                        <PostText>{postText}</PostText>
                    ))}
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
    orientation: PropTypes.oneOf(["side-by-side", "stacked"]),
    preText: PropTypes.string,
    postText: PropTypes.string,
    dangerouslySetHTML: PropTypes.bool,
};
