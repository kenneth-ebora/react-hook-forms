/* eslint-disable react/prop-types */
import { Checkbox, TableCell, TableRow } from "@mui/material";

const CheckedRow = ({ component, isChecked, onChange, children }) => {
  return (
    <TableRow>
      <TableCell component={component}>
        <Checkbox
          checked={isChecked}
          onChange={(e) => onChange(e.target.checked)}
        />
      </TableCell>
      {children}
    </TableRow>
  );
};

export default CheckedRow;
