export const DEFAULT_GLOBAL_MESSAGE = { status: "none", message: "" };

const isTestingHoneyPot = import.meta.env.VITE_FORMS_TEST_HONEYPOT === "true";
const testAddFiller = import.meta.env.VITE_FORMS_TEST_FILLER === "true";

export const getDefaultState = ({ elements, hasHoneyPot, subject }) => {
    return {
        elements: enhanceElements(
            elements,
            hasHoneyPot,
            isTestingHoneyPot,
            testAddFiller
        ),
        formStatus: "idle",
        formSubmitAttempted: false,
        globalMessage: DEFAULT_GLOBAL_MESSAGE,
        subject: getSubject(testAddFiller, subject),
        honeyPot: {
            hasHoneyPot,
            isEmpty: true,
            isTestingHoneyPot,
        },
    };
};

const getSubject = (testAddFiller, subject) => {
    return testAddFiller
        ? `${subject}: Test ${new Date().toLocaleString()}`
        : subject;
};

const enhanceElements = (
    elements,
    hasHoneyPot,
    isTestingHoneyPot,
    testAddFiller
) => {
    let enhancedElements = elements.map((element) => {
        const { type } = element;

        if (type === "address") {
            return enhanceAddressElement(element, testAddFiller);
        }

        return enhanceElement(element, testAddFiller);
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
const enhanceElement = (element, testAddFiller) => {
    const newControls = element.controls.map((i) => {
        if (testAddFiller) {
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
const enhanceAddressElement = (element, testAddFiller) => {
    const { id, rules, selectState, hasCountry } = element;

    let controls = [];

    controls.push({
        id: `${id}-address`,
        type: "text",
        labelText: "Address",
        value: testAddFiller ? "123 Anywhere Street" : "",
        rules,
    });
    controls.push({
        id: `${id}-city`,
        type: "text",
        labelText: "City",
        value: testAddFiller ? "Colorado Springs" : "",
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
            value: testAddFiller ? "CA" : "",
            type: "text",
        });
    }

    controls.push({
        id: `${id}-zip`,
        type: "text",
        labelText: "Zip",
        value: testAddFiller ? "80922" : "",
        rules,
    });

    if (hasCountry) {
        controls.push({
            id: `${id}-country`,
            type: "text",
            labelText: "Country",
            value: testAddFiller ? "United States of America" : "",
            rules,
        });
    }

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
