import PropTypes from "prop-types";

// prop types
import { elementPropTypeShape } from "../elementPropTypeShape";

// components
import ControlGroupInput from "../../../dumb/Controls/Input";

// context
import { useUniversalForm } from "@Core/components/Form/context/useUniversalForm.js";

// component
const Input = ({ element, control }) => {
    const { setElementControl } = useUniversalForm();

    const onChange = (e) => {
        setElementControl(element, control, e.target.value);
    };

    return <ControlGroupInput {...control} onChange={onChange} />;
};

export default Input;

// prop-types
Input.propTypes = {
    element: PropTypes.shape(elementPropTypeShape).isRequired,
    control: PropTypes.object.isRequired,
};
