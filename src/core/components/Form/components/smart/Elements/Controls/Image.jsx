import PropTypes from "prop-types";
import { useState } from "react";

// prop types
import { elementPropTypeShape } from "../elementPropTypeShape";

// components
import ImageControl from "../../../dumb/Controls/Image";

// context
import { useUniversalForm } from "@Core/components/Form/context/useUniversalForm.js";

// component
const Image = ({ element, control }) => {
    const { setElementControl } = useUniversalForm();
    const [error, setError] = useState(null);

    const onChange = (e) => {
        const file = e.target.value;
        const errorMessage = e.target.dataset?.error;

        if (errorMessage) {
            setError(errorMessage);
            setElementControl(element, control, null);
        } else {
            setError(null);
            setElementControl(element, control, file);
        }
    };

    // Pass error to ControlGroup via errorMessage prop
    const controlWithError = {
        ...control,
        errorMessage: error,
    };

    return <ImageControl {...controlWithError} onChange={onChange} />;
};

export default Image;

// prop-types
Image.propTypes = {
    element: PropTypes.shape(elementPropTypeShape).isRequired,
    control: PropTypes.object.isRequired,
};
