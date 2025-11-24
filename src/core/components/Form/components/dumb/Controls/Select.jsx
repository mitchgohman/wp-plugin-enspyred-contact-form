import PropTypes from "prop-types";
import styled from "styled-components";
import ReactSelect from "react-select";

// compoents
import ControlGroup from "../ControlGroup";

//styles
const SelectStyled = styled(ReactSelect)`
    font-size: 18px;
`;

// component
export const Select = ({
    value,
    onChange,
    id,
    labelText,
    type = "text",
    options,
    placeholder,
}) => {
    return (
        <SelectStyled
            id={id}
            name={id}
            value={value}
            type={type}
            onChange={onChange}
            placeholder={placeholder || labelText}
            options={options}
        />
    );
};

// prop-types
Select.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    type: PropTypes.string,
    options: PropTypes.array.isRequired,
    placeholder: PropTypes.string,
};

const ControlGroupSelect = (props) => {
    return (
        <ControlGroup {...props}>
            <Select {...props} />
        </ControlGroup>
    );
};

export default ControlGroupSelect;
