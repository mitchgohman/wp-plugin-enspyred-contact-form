import styled from "styled-components";
import PropTypes from "prop-types";

// styles
const SameAsAddressStyled = styled.div`
    margin-bottom: 20px;

    input {
        margin-right: 5px;
        position: relative;
        top: 2px;
    }
`;

// component
const SameAsAddress = ({ sameAsAddress, legend, isSameAs, setIsSameAs }) => {
    if (!sameAsAddress) return null;

    return (
        <SameAsAddressStyled>
            <input
                type="checkbox"
                checked={isSameAs}
                onChange={() => setIsSameAs(!isSameAs)}
            />
            <b>{legend.title}</b> is the same as my{" "}
            <b>{sameAsAddress.legend.title}</b>.
        </SameAsAddressStyled>
    );
};

export default SameAsAddress;

// prop-types
SameAsAddress.propTypes = {
    sameAsAddress: PropTypes.object,
    isSameAs: PropTypes.bool.isRequired,
    legend: PropTypes.string.isRequired,
    setIsSameAs: PropTypes.func.isRequired,
};
