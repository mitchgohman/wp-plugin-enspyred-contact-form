import { useReducer, useMemo } from "react";
import PropTypes from "prop-types";

// Add static import for axios
import axios from "../../axios.js";

// Spam
import SpamBusterProvider from "@Core/components/Form/SpamBuster";

// context
import UniversalFormContext from "./context";
import { reducer } from "./context/store";
import { getDefaultState } from "./context/utils/getDefaultState";

// components
import MountingWrapper from "./context/MountingWrapper";
import FormTemplate from "./components/smart/FormTemplate";

// component
const UniversalForm = ({ globalSettings, formConfig, formId }) => {
    const {
        elements,
        asyncApiCall, // function that handles api call, or string API endpoint
        subject,
        trackingId,
        submitButtonText = "Submit",
        submitButtonAlign = "right",
        delaySubmitButton = true,
        hasHoneyPot = true,
        orientation = "side-by-side",
        debug = false,
        maxWidth = "600px",
    } = formConfig;

    const { recaptcha_site_key: reCaptchaKey } = globalSettings;

    // Create a custom submission function that includes formId
    const customAsyncApiCall = useMemo(() => {
        if (typeof asyncApiCall === "function") {
            return asyncApiCall;
        }

        // Return a custom function that uses the new endpoint
        return async (formData) => {
            if (formData instanceof FormData) {
                // Handle multipart form data (with files)
                formData.append("formId", formId);
                return axios.post("submit", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            } else {
                // Handle regular JSON data
                return axios.post("submit", {
                    ...formData,
                    formId: formId,
                });
            }
        };
    }, [asyncApiCall, formId]);

    const nonStateProps = useMemo(
        () => ({
            submitButtonText,
            submitButtonAlign,
            trackingId,
            asyncApiCall: customAsyncApiCall,
            delaySubmitButton,
            globalSettings,
            orientation,
            maxWidth,
        }),
        [
            submitButtonText,
            submitButtonAlign,
            trackingId,
            customAsyncApiCall,
            delaySubmitButton,
            globalSettings,
            orientation,
            maxWidth,
        ]
    );

    const stateProps = getDefaultState({ elements, hasHoneyPot, subject, debug });

    // Whatever you want to manage as internal state
    const [state, dispatch] = useReducer(reducer, stateProps);

    // useMemo so it does not pass value on every render
    const value = useMemo(
        () => ({ state, dispatch, nonStateProps }),
        [state, dispatch, nonStateProps]
    );

    return (
        <SpamBusterProvider reCaptchaKey={reCaptchaKey}>
            <UniversalFormContext.Provider value={value}>
                <MountingWrapper>
                    <FormTemplate />
                </MountingWrapper>
            </UniversalFormContext.Provider>
        </SpamBusterProvider>
    );
};

export default UniversalForm;

// prop-types
const formConfigShape = {
    elements: PropTypes.array.isRequired,
    asyncApiCall: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
        .isRequired,
    trackingId: PropTypes.string.isRequired,
    submitButtonText: PropTypes.string,
    delaySubmitButton: PropTypes.bool,
    hasHoneyPot: PropTypes.bool,
};

UniversalForm.propTypes = {
    globalSettings: PropTypes.object.isRequired,
    formConfig: PropTypes.shape(formConfigShape).isRequired,
    formId: PropTypes.string.isRequired,
};
