import styled from "styled-components";

// context
import { useUniversalForm } from "@Core/components/Form/context/useUniversalForm.js";

//styles
const MessageStyled = styled.div`
    margin: 50px 0px;
    padding: 20px;
    background-color: ${({ $status }) =>
        $status === "success" ? "#b3caf9" : "#fbbc47"};
    text-align: center;
    font-weight: bold;
    border-radius: 5px;
`;

// component
const Message = () => {
    const { globalMessage } = useUniversalForm();
    const { status, message } = globalMessage;
    if (status === "none") return null;
    return (
        <MessageStyled
            $status={status}
            dangerouslySetInnerHTML={{ __html: message }}
        />
    );
};

export default Message;
