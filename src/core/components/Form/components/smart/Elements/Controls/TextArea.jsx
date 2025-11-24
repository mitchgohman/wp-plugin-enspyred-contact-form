import PropTypes from "prop-types";

// prop types
import { elementPropTypeShape } from "../elementPropTypeShape";

// components
import ControlGroupTextArea from "../../../dumb/Controls/TextArea";

// context
import { useUniversalForm } from "@Core/components/Form/context/useUniversalForm.js";

// component
const TextArea = ({ element, control }) => {
    const { setElementControl } = useUniversalForm();

    const onChange = (e) => {
        setElementControl(element, control, e.target.value);
    };

    return <ControlGroupTextArea {...control} onChange={onChange} />;
};

export default TextArea;

// prop-types
TextArea.propTypes = {
    element: PropTypes.shape(elementPropTypeShape).isRequired,
    control: PropTypes.object.isRequired,
};
