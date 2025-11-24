import PropTypes from "prop-types";
import styled from "styled-components";

// compoents
import ControlGroup from "../ControlGroup";

//styles
import { sharedInputStyles } from "./styles";
const InputStyled = styled.input`
    ${sharedInputStyles}
`;

// component
export const Input = ({
    value,
    onChange,
    id,
    labelText,
    type = "text",
    placeholder,
}) => {
    return (
        <InputStyled
            id={id}
            name={id}
            value={value}
            type={type}
            onChange={onChange}
            placeholder={placeholder || labelText}
        />
    );
};

// prop-types
Input.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
};

const ControlGroupInput = (props) => {
    return (
        <ControlGroup {...props}>
            <Input {...props} />
        </ControlGroup>
    );
};

export default ControlGroupInput;
