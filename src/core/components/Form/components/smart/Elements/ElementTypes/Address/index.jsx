import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

// prop types
import { elementPropTypeShape } from "../../elementPropTypeShape";

// context
import { useUniversalForm } from "@Core/components/Form/context/useUniversalForm.js";

// components
import SameAsAddress from "./SameAsAddress";
import Controls from "../../Controls";

// component
const Address = ({ element }) => {
    const { controls, legend, sameAs } = element;
    const [isSameAs, setIsSameAs] = useState(false);
    const { setElementControls, elements } = useUniversalForm();
    const sameAsAddress = sameAs && elements.find((e) => e.id === sameAs);
    const sameAsControls = sameAsAddress?.controls || [];

    // We only want to trigger isSameAs Updates if there is a change to the sameAsAddress.controls
    const sameAsControlsHash = useMemo(
        () =>
            JSON.stringify(
                sameAsControls.map(({ id, value }) => ({ id, value }))
            ),
        [sameAsControls]
    );

    // isSameAs Updates
    useEffect(() => {
        if (isSameAs) {
            let newControls = [];

            sameAsControls.forEach(({ labelText, value }) => {
                const counterInput = controls.find(
                    (i) => i.labelText === labelText
                );
                newControls.push({
                    ...counterInput,
                    value,
                });
            });

            setElementControls(element, newControls);
        }
    }, [isSameAs, sameAsControlsHash]);

    if (!controls) return null;

    return (
        <>
            <SameAsAddress
                sameAsAddress={sameAsAddress}
                legend={legend}
                isSameAs={isSameAs}
                setIsSameAs={setIsSameAs}
            />
            <Controls element={element} controls={controls} />
        </>
    );
};

export default Address;

// prop-types
Address.propTypes = {
    element: PropTypes.shape(elementPropTypeShape).isRequired,
};
