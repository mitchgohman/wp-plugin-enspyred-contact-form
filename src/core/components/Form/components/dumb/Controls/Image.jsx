import PropTypes from "prop-types";

// components
import ControlGroupFile from "./File";

// component
export const Image = ({ supportedFormats = [], ...props }) => {
    // Set image-specific defaults
    const imageProps = {
        ...props,
        accept: "image/*",
        supportedFormats:
            supportedFormats.length > 0
                ? supportedFormats
                : ["jpg", "jpeg", "png", "gif", "webp"],
    };

    return <ControlGroupFile {...imageProps} />;
};

// prop-types
Image.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.instanceOf(File),
        PropTypes.object,
        PropTypes.string,
    ]),
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    supportedFormats: PropTypes.arrayOf(PropTypes.string),
};

export default Image;
