import PropTypes from "prop-types";

// prop types
import { elementPropTypeShape } from "../elementPropTypeShape";

// components
import Controls from "../Controls";

// component
const DeafultElement = ({ element }) => {
    return <Controls element={element} />;
};

export default DeafultElement;

// prop-types
DeafultElement.propTypes = {
    element: PropTypes.shape(elementPropTypeShape).isRequired,
};
