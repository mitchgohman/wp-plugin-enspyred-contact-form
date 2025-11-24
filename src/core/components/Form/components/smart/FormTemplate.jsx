import styled from "styled-components";

// components
import Message from "./Message";
import Form from "./Form";
import Elements from "./Elements";
import SubmitButton from "./SubmitButton";

//styles
const FormTemplateStyled = styled.div``;

// component
const FormTemplate = () => {
    return (
        <FormTemplateStyled>
            <Form>
                <Elements />
                <SubmitButton />
            </Form>
            <Message />
        </FormTemplateStyled>
    );
};

export default FormTemplate;
