import { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// context
import { useUniversalForm } from "./useUniversalForm";

// styles
const MountingWrapperStyled = styled.div``;

// component
const MountingWrapper = ({ children }) => {
    const { formStatus, setFormStatus } = useUniversalForm();

    useEffect(() => {
        if (formStatus === "errors") {
            // Scroll up to first .form-error-message using scrollIntoView wrapped in setTimeout
            const firstError = document.querySelector(".form-error-message");
            if (firstError) {
                setTimeout(() => {
                    firstError.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });
                    // reset global message
                    setFormStatus("idle");
                }, 1000);
            }
        }
    }, [formStatus]);

    return <MountingWrapperStyled>{children}</MountingWrapperStyled>;
};

export default MountingWrapper;

// prop-types
MountingWrapper.propTypes = {
    children: PropTypes.any,
};
