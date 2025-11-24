// context
import { useUniversalForm } from "@Core/components/Form/context/useUniversalForm.js";

// Components
import Fieldset from "../../dumb/Fieldset";
import DeafultElement from "./ElementTypes";
import Address from "./ElementTypes/Address";

// component
const Elements = () => {
    const { elements } = useUniversalForm();
    return elements.map((element) => {
        const {
            legend: { title, description },
            isHidden,
        } = element;

        let Component;
        switch (element?.type) {
            case "address":
                Component = Address;
                break;
            default:
                Component = DeafultElement;
                break;
        }

        return (
            <Fieldset
                key={element.id}
                title={title}
                description={description}
                isHidden={isHidden}
            >
                <Component element={element} />
            </Fieldset>
        );
    });
};

export default Elements;
