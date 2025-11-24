/*---------------------------
| Store
---------------------------*/
// Action Types
const actionPrefix = "UniversalFormContext:";
export const actionTypes = {
    SET_ELEMENTS: `${actionPrefix} setElements`,
    SET_FORM_STATUS: `${actionPrefix} setFormStatus`,
    SET_GLOBAL_MESSAGE: `${actionPrefix} setGlobalMessage`,
    SET_HONEYPOT_IS_EMPTY: `${actionPrefix} setHoneyPotIsEmpty`,
    SET_FORM_SUBMIT_ATTEMPTED: `${actionPrefix} setFormSubmitAttempted`,
};

// Reducer
export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_ELEMENTS: {
            return { ...state, elements: action.elements };
        }
        case actionTypes.SET_FORM_STATUS: {
            return { ...state, formStatus: action.formStatus };
        }
        case actionTypes.SET_GLOBAL_MESSAGE: {
            return { ...state, globalMessage: action.globalMessage };
        }
        case actionTypes.SET_HONEYPOT_IS_EMPTY: {
            return {
                ...state,
                honeyPot: {
                    ...state.honeyPot,
                    isEmpty: action.isEmpty,
                },
            };
        }
        case actionTypes.SET_FORM_SUBMIT_ATTEMPTED: {
            return {
                ...state,
                formSubmitAttempted: action.formSubmitAttempted,
            };
        }
        default: {
            return { ...state };
        }
    }
};
