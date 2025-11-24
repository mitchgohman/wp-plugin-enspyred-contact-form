import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

// compoents
import ControlGroup from "../ControlGroup";

//styles
import { sharedInputStyles } from "./styles";
const PhoneStyled = styled(PhoneInput)`
    display: flex;

    .PhoneInputCountry {
        flex: 0 0 35px;

        .PhoneInputCountryIcon {
            border: none;
            box-shadow: none;
            img {
                border: none;
            }
        }
    }

    input {
        flex: 1;
        ${sharedInputStyles}
    }
`;

// component
export const Phone = ({ value, onChange, id, labelText, placeholder }) => {
    return (
        <PhoneStyled
            id={id}
            defaultCountry="US"
            value={value}
            onChange={onChange}
            placeholder={placeholder || labelText}
        />
    );
};

// prop-types
Phone.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
};

const ControlGroupPhone = (props) => {
    return (
        <ControlGroup {...props}>
            <Phone {...props} />
        </ControlGroup>
    );
};

export default ControlGroupPhone;
