import PropTypes from "prop-types";

// prop types
import { elementPropTypeShape } from "../elementPropTypeShape";

// components
import ControlGroupSelect from "../../../dumb/Controls/Select";

// context
import { useUniversalForm } from "@Core/components/Form/context/useUniversalForm.js";

// component
const Select = ({ element, control }) => {
    const { setElementControl } = useUniversalForm();

    const onChange = (selectedOption) => {
        setElementControl(element, control, selectedOption);
    };

    return <ControlGroupSelect {...control} onChange={onChange} />;
};

export default Select;

// prop-types
Select.propTypes = {
    element: PropTypes.shape(elementPropTypeShape).isRequired,
    control: PropTypes.object.isRequired,
};
