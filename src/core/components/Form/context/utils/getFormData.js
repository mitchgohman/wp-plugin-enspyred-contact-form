import { parsePhoneNumber } from "react-phone-number-input";

export const getFormData = ({
    subject,
    elements,
    spamBusterToken,
    hasHoneyPot,
}) => {
    const hasFiles = checkForFiles(elements);
    const { apiElements, fileMap } = getApiElements(elements);

    let formData;

    if (hasFiles) {
        // Use FormData for multipart form submission
        formData = new FormData();
        formData.append("subject", subject);
        formData.append("apiElements", JSON.stringify(apiElements));
        formData.append("spamBusterToken", spamBusterToken);

        // Append files to FormData
        Object.entries(fileMap).forEach(([controlId, file]) => {
            formData.append(`file_${controlId}`, file);
        });

        if (hasHoneyPot) {
            formData.append("honeyPot", getHoneyPot(elements));
        }
    } else {
        // Use regular JSON object for standard form submission
        formData = {
            subject,
            apiElements,
            spamBusterToken,
        };

        if (hasHoneyPot) {
            formData.honeyPot = getHoneyPot(elements);
        }
    }

    return formData;
};

const checkForFiles = (elements) => {
    return elements.some((formInput) => {
        if (formInput.type === "honeyPot") return false;

        return formInput.controls.some((control) => {
            return control.type === "image" && control.value instanceof File;
        });
    });
};

const getApiElements = (elements) => {
    const apiElements = [];
    const fileMap = {};

    elements.forEach((formInput) => {
        const { legend, controls, type } = formInput;

        if (type !== "honeyPot") {
            const newControls = controls.map(
                ({ id, labelText, value, type: controlType }) => {
                    if (controlType === "image" && value instanceof File) {
                        // Store file reference separately for FormData
                        fileMap[id] = value;
                        return {
                            id,
                            labelText,
                            value: value.name, // Store filename for API
                            type: controlType,
                        };
                    }

                    // unwrap select elements
                    let finalValue = value?.value || value;

                    // Format phone numbers for human readability in emails
                    if (controlType === "phone" && finalValue) {
                        try {
                            const phoneNumber = parsePhoneNumber(finalValue);
                            if (phoneNumber) {
                                // Use formatInternational for format like: +1 (626) 590-4974
                                finalValue = phoneNumber.formatInternational();
                            }
                        } catch (error) {
                            // If parsing fails, keep the original value
                            console.warn(
                                "Phone number formatting failed:",
                                error,
                            );
                        }
                    }

                    return {
                        id,
                        labelText,
                        value: finalValue,
                        type: controlType,
                    };
                },
            );

            apiElements.push({
                group: legend.title,
                controls: newControls,
            });
        }
    });

    return { apiElements, fileMap };
};

const getHoneyPot = (elements) => {
    const honeyPotGroup = elements.find((e) => e.type === "honeyPot");
    const { value } = honeyPotGroup.controls.find((e) => e.type === "honeyPot");
    return value;
};
