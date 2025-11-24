import PropTypes from "prop-types";
import styled from "styled-components";

// components
import ControlGroup from "../ControlGroup";

// styles
import { sharedInputStyles } from "./styles";

const FileInputStyled = styled.input`
    ${sharedInputStyles}
    cursor: pointer;

    &::-webkit-file-upload-button {
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 8px 12px;
        margin-right: 10px;
        cursor: pointer;
        font-size: 14px;

        &:hover {
            background-color: #e0e0e0;
        }
    }
`;

const FileInfoStyled = styled.div`
    margin-top: 8px;
    font-size: 14px;
    color: #666;
`;

// utility function to format file size
const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

// utility function to safely check if value is a File object
const isFile = (value) => {
    return (
        value &&
        typeof value === "object" &&
        value.constructor &&
        value.constructor.name === "File" &&
        typeof value.name === "string" &&
        typeof value.size === "number"
    );
};

// component
export const File = ({
    value,
    onChange,
    id,
    labelText,
    placeholder,
    accept = "*",
    supportedFormats = [],
    maxFileSize, // in MB
}) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Check file format if supportedFormats is specified
            if (supportedFormats.length > 0) {
                const fileExtension = file.name.split(".").pop().toLowerCase();
                if (!supportedFormats.includes(fileExtension)) {
                    // Pass error via onChange - the smart component will handle it
                    onChange({
                        target: {
                            value: null,
                            dataset: {
                                error: `File format not supported. Please use: ${supportedFormats.join(", ")}`,
                            },
                        },
                    });
                    return;
                }
            }

            // Check file size if maxFileSize is specified
            if (maxFileSize && typeof maxFileSize === "number") {
                const maxSizeInBytes = maxFileSize * 1024 * 1024; // Convert MB to bytes
                if (file.size > maxSizeInBytes) {
                    onChange({
                        target: {
                            value: null,
                            dataset: {
                                error: `File size too large. Maximum allowed: ${maxFileSize}MB (current: ${formatFileSize(file.size)})`,
                            },
                        },
                    });
                    return;
                }
            }

            // Pass file to onChange
            onChange({
                target: {
                    value: file,
                    dataset: {
                        error: null,
                    },
                },
            });
        } else {
            onChange({
                target: {
                    value: null,
                    dataset: {
                        error: null,
                    },
                },
            });
        }
    };

    // Use supportedFormats to build accept attribute if provided, otherwise use accept prop
    const acceptFormats =
        supportedFormats.length > 0
            ? supportedFormats.map((format) => `.${format}`).join(",")
            : accept;

    return (
        <>
            <FileInputStyled
                id={id}
                name={id}
                type="file"
                onChange={handleFileChange}
                accept={acceptFormats}
                placeholder={placeholder || labelText}
            />
            {supportedFormats.length > 0 && (
                <FileInfoStyled>
                    Supported formats: {supportedFormats.join(", ")}
                </FileInfoStyled>
            )}
            {maxFileSize && (
                <FileInfoStyled>
                    Maximum file size: {maxFileSize}MB
                </FileInfoStyled>
            )}
            {isFile(value) && (
                <FileInfoStyled>
                    Selected: {value.name} ({formatFileSize(value.size)})
                </FileInfoStyled>
            )}
        </>
    );
};

// prop-types
File.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.instanceOf(File),
        PropTypes.object,
        PropTypes.string,
    ]),
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    accept: PropTypes.string,
    supportedFormats: PropTypes.arrayOf(PropTypes.string),
    maxFileSize: PropTypes.number, // in MB
};

const ControlGroupFile = (props) => {
    return (
        <ControlGroup {...props}>
            <File {...props} />
        </ControlGroup>
    );
};

export default ControlGroupFile;
