import PropTypes from "prop-types";
import styled from "styled-components";

// compoents
import ControlGroup from "../ControlGroup";

//styles
import { sharedInputStyles } from "./styles";
const TextAreaStyled = styled.textarea`
    ${sharedInputStyles}
    min-height: 300px;
    padding: 7px 10px;
`;

// component
export const TextArea = ({ value, onChange, id, labelText, placeholder }) => {
    return (
        <TextAreaStyled
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder || labelText}
        />
    );
};

// prop-types
TextArea.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
};

const ControlGroupTextArea = (props) => {
    return (
        <ControlGroup {...props}>
            <TextArea {...props} />
        </ControlGroup>
    );
};

export default ControlGroupTextArea;
