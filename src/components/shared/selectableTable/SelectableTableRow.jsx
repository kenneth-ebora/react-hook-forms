/* eslint-disable react/prop-types */
import { Checkbox, TableCell, TableRow } from "@mui/material";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

import "./SelectableTableRow.css";

// eslint-disable-next-line react/display-name
const SelectableTableRow = forwardRef(
  (
    {
      component,
      children,
      onSelect,
      highlightOnSelect = false,
      checkboxProps = { disabled: false },
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isDisabled, setIsDisabled] = useState(checkboxProps.disabled);
    const checkboxRef = useRef();

    useImperativeHandle(
      ref,
      () => {
        return {
          check(isChecked) {
            if (!isDisabled) {
              setIsChecked(isChecked);
            }
          },
          disable(value) {
            setIsDisabled(value);
          },
          isChecked() {
            return checkboxRef.current.checked;
          },
          isDisabled() {
            return isDisabled;
          },
        };
      },
      []
    );

    return (
      <TableRow
        className={highlightOnSelect && isChecked ? "row-selected" : ""}
      >
        <TableCell component={component}>
          <Checkbox
            disabled={isDisabled}
            checked={isChecked}
            onChange={(e) => {
              setIsChecked(e.target.checked);
              onSelect(e.target.checked);
            }}
            inputRef={checkboxRef}
          />
        </TableCell>
        {children}
      </TableRow>
    );
  }
);

export default SelectableTableRow;
