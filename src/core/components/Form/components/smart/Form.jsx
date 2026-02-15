/* global __PLUGIN_VERSION__ */
import PropTypes from "prop-types";
import styled from "styled-components";

// context
import { useUniversalForm } from "@Core/components/Form/context/useUniversalForm.js";

//styles
const FormStyled = styled.form`
    max-width: ${({ $maxWidth }) => $maxWidth};
`;

const Form = ({ children }) => {
    const { elements, onSubmit, formStatus, maxWidth } = useUniversalForm();

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(elements);
    };

    if (formStatus === "submitted") return null;

    const resolvedMaxWidth = maxWidth || "600px";

    return (
        <FormStyled
            data-version={__PLUGIN_VERSION__}
            onSubmit={handleSubmit}
            $maxWidth={resolvedMaxWidth}
        >
            {children}
        </FormStyled>
    );
};

export default Form;

// prop-types
Form.propTypes = {
    children: PropTypes.any,
};
