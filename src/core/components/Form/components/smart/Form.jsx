import PropTypes from "prop-types";
import styled from "styled-components";

// context
import { useUniversalForm } from "@Core/components/Form/context/useUniversalForm.js";

//styles
const FormStyled = styled.form`
    max-width: 600px;
`;

const Form = ({ children }) => {
    const { elements, onSubmit, formStatus } = useUniversalForm();

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(elements);
    };

    if (formStatus === "submitted") return null;

    return (
        <FormStyled data-version="1.0.3" onSubmit={handleSubmit}>
            {children}
        </FormStyled>
    );
};

export default Form;

// prop-types
Form.propTypes = {
    children: PropTypes.any,
};
