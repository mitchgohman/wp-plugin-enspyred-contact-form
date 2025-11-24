import { useEffect, useState } from "react";
import styled from "styled-components";

// context
import { useUniversalForm } from "@Core/components/Form/context/useUniversalForm.js";

// components
import Button from "../dumb/Button/index";

//styles
const SubmitButtonStyled = styled.div`
    margin-left: 174px;
`;

const SHOW_SUBMIT_BUTTON_DELAY = 3000;

// component
const SubmitButton = () => {
    const {
        formStatus,
        submitButtonText,
        delaySubmitButton,
        honeyPot: { isEmpty, isTestingHoneyPot },
    } = useUniversalForm();

    const [buttonText, setButtonText] = useState(submitButtonText);
    const [isDisabled, setIsDisabled] = useState(delaySubmitButton);

    useEffect(() => {
        if (delaySubmitButton) {
            setTimeout(() => {
                setIsDisabled(false);
            }, SHOW_SUBMIT_BUTTON_DELAY);
        }
    }, []);

    useEffect(() => {
        if (!isEmpty) {
            setButtonText("Invalid input detected");
            if (!isTestingHoneyPot) {
                setIsDisabled(true);
            }
        } else if (formStatus === "processing") {
            setButtonText("Submitting...");
            setIsDisabled(true);
        } else if (delaySubmitButton && isDisabled) {
            setButtonText("Please wait…");
        } else {
            setButtonText(submitButtonText);
        }
    }, [formStatus, isDisabled, isEmpty, submitButtonText, delaySubmitButton]);

    return (
        <SubmitButtonStyled>
            <Button type="submit" disabled={isDisabled}>
                {buttonText}
            </Button>
        </SubmitButtonStyled>
    );
};

export default SubmitButton;
