// components
import UniversalForm from "@Core/components/Form";

import styled from "styled-components";

//styles
const EnspyredContactFormStyled = styled.div`
    * {
        box-sizing: border-box;
    }
`;

// component
const EnspyredContactForm = (props) => {
    return (
        <EnspyredContactFormStyled>
            <UniversalForm {...props} />
        </EnspyredContactFormStyled>
    );
};

export default EnspyredContactForm;
