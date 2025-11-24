import PropTypes from "prop-types";

// prop types
import { elementPropTypeShape } from "../elementPropTypeShape";

// components
import ControlGroupPhone from "../../../dumb/Controls/Phone";

// context
import { useUniversalForm } from "@Core/components/Form/context/useUniversalForm.js";

// component
const Phone = ({ element, control }) => {
    const { setElementControl } = useUniversalForm();

    const onChange = (value) => {
        setElementControl(element, control, value);
    };

    return <ControlGroupPhone {...control} onChange={onChange} />;
};

export default Phone;

// prop-types
Phone.propTypes = {
    element: PropTypes.shape(elementPropTypeShape).isRequired,
    control: PropTypes.object.isRequired,
};
