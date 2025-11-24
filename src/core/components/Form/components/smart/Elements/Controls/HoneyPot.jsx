import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// prop types
import { elementPropTypeShape } from "../elementPropTypeShape";

// context
import { useUniversalForm } from "@Core/components/Form/context/useUniversalForm.js";
import { debugWarn } from "@Core/debug.js";

// styles
const SHOW_HONEYPOT_DELAY = 3000;

// component
const HoneyPot = ({ element, control }) => {
    const { value, id, labelText, placeholder } = control;
    const [showInput, setShowInput] = useState(false);
    const { setElementControl } = useUniversalForm();

    const {
        setHoneyPotIsEmpty,
        honeyPot: { hasHoneyPot },
    } = useUniversalForm();

    const onChange = (e) => {
        const newHoneyPotValue = e.target.value;
        debugWarn(
            "HoneyPot Value Changed: Submitting Form has been disabled",
            { newHoneyPotValue }
        );
        setElementControl(element, control, newHoneyPotValue);
        if (newHoneyPotValue && newHoneyPotValue.length > 0) {
            setHoneyPotIsEmpty(false);
        }
    };

    // Delay showing input to protect legit users leveraging autofill
    useEffect(() => {
        // Delay showing the input for 3 seconds
        const timer = setTimeout(() => {
            setShowInput(true);
        }, SHOW_HONEYPOT_DELAY);

        return () => clearTimeout(timer);
    }, []);

    if (!hasHoneyPot || !showInput) return null;

    // HoneyPot input is hidden and skipped in tab order to avoid impacting screen readers and keyboard users
    return (
        <input
            onChange={onChange}
            name={id}
            id={id}
            value={value}
            autoComplete="off"
            tabIndex="-1"
            placeholder={placeholder || labelText}
        />
    );
};

export default HoneyPot;

// prop-types
HoneyPot.propTypes = {
    element: PropTypes.shape(elementPropTypeShape).isRequired,
    control: PropTypes.object.isRequired,
};
