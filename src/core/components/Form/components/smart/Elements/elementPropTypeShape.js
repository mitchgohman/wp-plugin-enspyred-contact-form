import PropTypes from "prop-types";

const legendPropTypeShape = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
};

export const elementPropTypeShape = {
    id: PropTypes.string.isRequired,
    legend: PropTypes.shape(legendPropTypeShape).isRequired,
    type: PropTypes.string.isRequired,
    controls: PropTypes.array.isRequired,
};
