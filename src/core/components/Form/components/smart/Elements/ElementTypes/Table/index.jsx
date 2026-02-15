import PropTypes from "prop-types";
import styled from "styled-components";

// prop types
import { elementPropTypeShape } from "../../elementPropTypeShape";

// context
import { useUniversalForm } from "@Core/components/Form/context/useUniversalForm.js";

// components
import { Select } from "../../../../dumb/Controls/Select";

// styles
import { sharedInputStyles } from "../../../../dumb/Controls/styles";

const TableStyled = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;

    th {
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;
        padding: 8px 4px;
        text-align: left;
        border-bottom: 2px solid rgb(208, 208, 208);
    }

    th:first-child {
        width: 40px;
        text-align: center;
    }

    td {
        padding: 4px;
        vertical-align: top;
    }

    td:first-child {
        text-align: center;
        font-weight: bold;
        padding-top: 10px;
        color: #666;
    }
`;

const CellInput = styled.input`
    ${sharedInputStyles}
    font-size: 16px;
    padding: 4px 8px;
`;

const ErrorMessage = styled.div`
    color: #900;
    font-size: 12px;
    font-weight: bold;
`;

// component
const Table = ({ element }) => {
    const { columns, rows, controls } = element;
    const { setElementControl } = useUniversalForm();

    if (!controls || !columns || !rows) return null;

    const getControl = (rowNum, columnKey) => {
        const controlId = `${element.id}-r${rowNum}-${columnKey}`;
        return controls.find((c) => c.id === controlId);
    };

    const renderCell = (rowNum, column) => {
        const control = getControl(rowNum, column.key);
        if (!control) return null;

        const onChange = (valOrEvent) => {
            // Select passes value object directly, Input passes event
            const value = valOrEvent?.target
                ? valOrEvent.target.value
                : valOrEvent;
            setElementControl(element, control, value);
        };

        let CellComponent;
        if (column.type === "select") {
            CellComponent = (
                <Select
                    id={control.id}
                    labelText={column.label}
                    value={control.value}
                    onChange={onChange}
                    options={control.options || []}
                    placeholder={column.label}
                />
            );
        } else {
            CellComponent = (
                <CellInput
                    id={control.id}
                    name={control.id}
                    value={control.value}
                    type={column.type || "text"}
                    onChange={onChange}
                    placeholder={column.label}
                />
            );
        }

        return (
            <td key={control.id}>
                {CellComponent}
                {control.errorMessage && (
                    <ErrorMessage>{control.errorMessage}</ErrorMessage>
                )}
            </td>
        );
    };

    return (
        <TableStyled>
            <thead>
                <tr>
                    <th>#</th>
                    {columns.map((col) => (
                        <th key={col.key}>{col.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, rowIndex) => {
                    const rowNum = rowIndex + 1;
                    return (
                        <tr key={rowNum}>
                            <td>{row.label || rowNum}</td>
                            {columns.map((col) => renderCell(rowNum, col))}
                        </tr>
                    );
                })}
            </tbody>
        </TableStyled>
    );
};

export default Table;

// prop-types
Table.propTypes = {
    element: PropTypes.shape(elementPropTypeShape).isRequired,
};
