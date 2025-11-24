import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

// component
const SpamBusterProvider = ({ children, reCaptchaKey }) => {
    return (
        <GoogleReCaptchaProvider reCaptchaKey={reCaptchaKey}>
            {children}
        </GoogleReCaptchaProvider>
    );
};

export default SpamBusterProvider;

import PropTypes from "prop-types";

// prop-types
SpamBusterProvider.propTypes = {
    children: PropTypes.any,
    reCaptchaKey: PropTypes.string.isRequired,
};
