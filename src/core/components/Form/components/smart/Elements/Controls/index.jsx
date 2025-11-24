import PropTypes from "prop-types";

// prop types
import { elementPropTypeShape } from "../elementPropTypeShape";

// components
import TextArea from "../Controls/TextArea";
import Select from "../Controls/Select";
import Phone from "../Controls/Phone";
import HoneyPot from "../Controls/HoneyPot";
import Input from "../Controls/Input";
import Image from "../Controls/Image";

const Controls = ({ element }) => {
    const { controls } = element;
    return controls.map((control) => {
        let ControlComponent;

        switch (control.type) {
            case "textarea":
                ControlComponent = TextArea;
                break;
            case "select":
                ControlComponent = Select;
                break;
            case "phone":
                ControlComponent = Phone;
                break;
            case "honeyPot":
                ControlComponent = HoneyPot;
                break;
            case "image":
                ControlComponent = Image;
                break;
            default:
                ControlComponent = Input;
                break;
        }
        return (
            <ControlComponent
                key={`${element.id}-${control.id}`}
                element={element}
                control={control}
            />
        );
    });
};

export default Controls;

// prop-types
Controls.propTypes = {
    element: PropTypes.shape(elementPropTypeShape).isRequired,
};
