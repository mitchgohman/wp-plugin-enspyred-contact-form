import { isValidPhoneNumber } from "react-phone-number-input";

export const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateFormControl = (control) => {
    const { labelText, rules = [], value, type } = control;
    let errorMessage = "";
    let isValid = true;

    // Handle required validation for different types
    if (rules.includes("required")) {
        if (type === "checkbox") {
            // For checkboxes, required means it must be checked (true)
            if (value !== true) {
                errorMessage = `${labelText} is required.`;
                isValid = false;
            }
        } else {
            // For other types, check if value is empty or has no length
            if (!value || value.length === 0) {
                errorMessage = `${labelText} is required.`;
                isValid = false;
            }
        }
    } else if (rules.includes("email") && !isEmailValid(value)) {
        errorMessage = `${labelText} is not a valid email.`;
        isValid = false;
    } else if (rules.includes("phone") && !isValidPhoneNumber(value)) {
        errorMessage = `${labelText} is not a valid phone number.`;
        isValid = false;
    }

    return {
        control: {
            ...control,
            errorMessage,
        },
        isValid,
    };
};

export const validateFormInputs = (elements, setElements) => {
    let isValid = true;
    const newElements = elements.map((element) => {
        const controls = element.controls.map((control) => {
            const { control: validatedControl, isValid: controlValid } =
                validateFormControl(control);
            if (!controlValid) isValid = false;
            return validatedControl;
        });

        return {
            ...element,
            controls,
        };
    });
    setElements(newElements);
    return isValid;
};
