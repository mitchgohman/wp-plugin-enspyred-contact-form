export const DEFAULT_GLOBAL_MESSAGE = { status: "none", message: "" };

const isTestingHoneyPot = import.meta.env.VITE_FORMS_TEST_HONEYPOT === "true";

export const getDefaultState = ({ elements, hasHoneyPot, subject, debug = false }) => {
    return {
        elements: enhanceElements(
            elements,
            hasHoneyPot,
            isTestingHoneyPot,
            debug,
        ),
        formStatus: "idle",
        formSubmitAttempted: false,
        globalMessage: DEFAULT_GLOBAL_MESSAGE,
        subject: getSubject(debug, subject),
        honeyPot: {
            hasHoneyPot,
            isEmpty: true,
            isTestingHoneyPot,
        },
    };
};

const getSubject = (debug, subject) => {
    return debug
        ? `${subject}: Test ${new Date().toLocaleString()}`
        : subject;
};

const enhanceElements = (
    elements,
    hasHoneyPot,
    isTestingHoneyPot,
    debug,
) => {
    let enhancedElements = elements.map((element) => {
        const { type } = element;

        if (type === "address") {
            return enhanceAddressElement(element, debug);
        }

        if (type === "table") {
            return enhanceTableElement(element, debug);
        }

        return enhanceElement(element, debug);
    });

    if (hasHoneyPot) {
        enhancedElements = [
            ...enhancedElements,
            addHoneyPot(isTestingHoneyPot),
        ];
    }

    return enhancedElements;
};

// Standard FormInput
const enhanceElement = (element, debug) => {
    const newControls = element.controls.map((i) => {
        if (debug) {
            i.value = i.testValue;
        }
        return i;
    });

    return {
        ...element,
        controls: newControls,
    };
};

// Address Augmentation
const enhanceAddressElement = (element, debug) => {
    const { id, rules, selectState, hasCountry } = element;

    let controls = [];

    controls.push({
        id: `${id}-address`,
        type: "text",
        labelText: "Address",
        value: debug ? "123 Anywhere Street" : "",
        rules,
    });
    controls.push({
        id: `${id}-city`,
        type: "text",
        labelText: "City",
        value: debug ? "Colorado Springs" : "",
        rules,
    });

    const commonStateProps = {
        id: `${id}-state`,
        labelText: "State",
        rules,
    };

    if (selectState?.options.length > 0) {
        controls.push({
            ...commonStateProps,
            value: selectState?.value,
            type: "select",
            options: selectState.options,
        });
    } else {
        controls.push({
            ...commonStateProps,
            value: debug ? "IL" : "",
            type: "text",
        });
    }

    controls.push({
        id: `${id}-zip`,
        type: "text",
        labelText: "Zip",
        value: debug ? "80922" : "",
        rules,
    });

    if (hasCountry) {
        controls.push({
            id: `${id}-country`,
            type: "text",
            labelText: "Country",
            value: debug ? "United States of America" : "",
            rules,
        });
    }

    return {
        ...element,
        controls,
    };
};

// Table Augmentation
const enhanceTableElement = (element, debug) => {
    const { id, columns, rows } = element;

    const controls = [];

    rows.forEach((row, rowIndex) => {
        const rowNum = rowIndex + 1;

        columns.forEach((column) => {
            // Row rules override column rules
            const rules =
                row.rules !== undefined ? row.rules : column.rules || [];

            const control = {
                id: `${id}-r${rowNum}-${column.key}`,
                type: column.type || "text",
                labelText: `Row ${rowNum} - ${column.label}`,
                value: debug ? `Test ${column.label} ${rowNum}` : "",
                rules,
            };

            if (column.type === "select" && column.options) {
                control.options = column.options;
                control.value = debug ? column.options[0] || "" : "";
            }

            controls.push(control);
        });
    });

    return {
        ...element,
        controls,
    };
};

// HoneyPot Group
const addHoneyPot = (isTestingHoneyPot) => {
    return {
        id: "organization",
        legend: { title: "Organization" },
        type: "honeyPot",
        isHidden: !isTestingHoneyPot,
        controls: [
            {
                id: "organization",
                type: "honeyPot",
                labelText: "Organization",
                placeholder: "Organization",
                value: "",
            },
        ],
    };
};
