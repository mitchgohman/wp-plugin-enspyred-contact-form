import PropTypes from "prop-types";

// prop types
import { elementPropTypeShape } from "../elementPropTypeShape";

// components
import ControlGroupCheckbox from "../../../dumb/Controls/Checkbox";

// context
import { useUniversalForm } from "@Core/components/Form/context/useUniversalForm.js";

// component
const Checkbox = ({ element, control }) => {
    const { setElementControl } = useUniversalForm();

    const onChange = (e) => {
        setElementControl(element, control, e.target.checked);
    };

    return <ControlGroupCheckbox {...control} onChange={onChange} />;
};

export default Checkbox;

// prop-types
Checkbox.propTypes = {
    element: PropTypes.shape(elementPropTypeShape).isRequired,
    control: PropTypes.object.isRequired,
};
