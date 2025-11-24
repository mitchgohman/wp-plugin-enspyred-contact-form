import { useContext } from "react";

// spam buster
import { useSpamBuster } from "@Core/components/Form/SpamBuster/useSpamBuster.js";

// api
import axios from "@Core/axios";
import { debugError } from "@Core/debug.js";

// context
import UniversalFormContext from "./";
import { actionTypes } from "./store";

// utils
import { DEFAULT_GLOBAL_MESSAGE } from "./utils/getDefaultState";
import {
    validateFormInputs,
    validateFormControl,
} from "./utils/validateFormInputs";
import { getFormData } from "./utils/getFormData";

export const useUniversalForm = () => {
    const { state, dispatch, nonStateProps } = useContext(UniversalFormContext);
    const {
        formSubmitAttempted,
        subject,
        honeyPot: { hasHoneyPot },
    } = state;
    const { trackingId, asyncApiCall } = nonStateProps;

    const spamBuster = useSpamBuster(trackingId);

    const setElements = (elements) => {
        setGlobalMessage();
        dispatch({
            type: actionTypes.SET_ELEMENTS,
            elements,
        });
    };

    const setElement = (element) => {
        const elements = state.elements.map((el) => {
            return element.id === el.id ? element : el;
        });
        setElements(elements);
    };

    const setElementControls = (element, controls) => {
        const newControls = element.controls.map((c) => {
            const newControl = controls.find((nc) => nc.id === c.id);
            return newControl || c;
        });

        setElement({
            ...element,
            controls: newControls,
        });
    };

    const setElementControl = (element, control, value) => {
        let newControl = {
            ...control,
            value: value,
        };

        if (formSubmitAttempted) {
            const { control: validatedControl } =
                validateFormControl(newControl);
            newControl = validatedControl;
        }

        setElementControls(element, [newControl]);
    };

    const setFormStatus = (formStatus) => {
        dispatch({
            type: actionTypes.SET_FORM_STATUS,
            formStatus,
        });
    };

    const setGlobalMessage = (globalMessage = DEFAULT_GLOBAL_MESSAGE) => {
        dispatch({
            type: actionTypes.SET_GLOBAL_MESSAGE,
            globalMessage,
        });
    };

    const setHoneyPotIsEmpty = (isEmpty) => {
        dispatch({
            type: actionTypes.SET_HONEYPOT_IS_EMPTY,
            isEmpty,
        });
    };

    const setFormSubmitAttempted = (formSubmitAttempted) => {
        dispatch({
            type: actionTypes.SET_FORM_SUBMIT_ATTEMPTED,
            formSubmitAttempted,
        });
    };

    const onSubmit = async (elements) => {
        setFormStatus("processing");
        setGlobalMessage(DEFAULT_GLOBAL_MESSAGE);
        setFormSubmitAttempted(true);

        // Validate Form
        const valid = validateFormInputs(elements, setElements);
        if (!valid) {
            setGlobalMessage({
                status: "error",
                message: `There were one or more invalid form fields. Please check the form and try again.`,
            });
            setFormStatus("errors");
            return false;
        }

        // ReCaptcah: Grab Token
        const spamResp = await spamBuster.getToken();
        if (spamResp.status !== "success") {
            debugError(
                "Unable to retrieve ReCaptcha token",
                spamResp.message
            );
            setGlobalMessage({
                status: "error",
                message: `Google ReCaptcha Failed. Please refresh the page and try again.`,
            });
            setFormStatus("errors");
            return false;
        }

        // Convert User Data to API Post Data Object
        const formData = getFormData({
            subject,
            elements,
            spamBusterToken: spamResp.token,
            hasHoneyPot,
        });

        try {
            let apiResp;

            // Consumer asyncApiCall
            if (typeof asyncApiCall === "function") {
                // If consumer provides function, they are responsible for
                // handling api call, and response
                // respone shape: { status ("success" || "error"), message: "string" }
                apiResp = await asyncApiCall(formData);
            } else {
                // internal API call
                if (formData instanceof FormData) {
                    apiResp = await axios.post(asyncApiCall, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
                } else {
                    apiResp = await axios.post(asyncApiCall, formData);
                }
            }

            const { data: serverResp } = apiResp;

            if (serverResp?.status === "success") {
                setFormStatus("submitted");
                setGlobalMessage({
                    status: "success",
                    message: serverResp.message,
                });
            } else {
                debugError(serverResp);
                setFormStatus("errors");
                setGlobalMessage({
                    status: "error",
                    message: serverResp.message,
                });
            }
        } catch (err) {
            debugError(err);
            setFormStatus("errors");
            setGlobalMessage({
                status: "error",
                message:
                    "An unexpected error occurred. Please check the form and try again.",
            });
        }
    };

    return {
        ...state,
        ...nonStateProps,
        onSubmit,
        setElements,
        setElement,
        setElementControls,
        setElementControl,
        setFormStatus,
        setHoneyPotIsEmpty,
        setGlobalMessage,
        setFormSubmitAttempted,
    };
};
