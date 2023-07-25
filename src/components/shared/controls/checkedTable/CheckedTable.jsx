/* eslint-disable react/prop-types */
import { Table, TableBody, TableHead } from "@mui/material";

const CheckedTable = ({ tableHead, tableBody }) => {
  return (
    <Table>
      <TableHead>{tableHead}</TableHead>
      <TableBody>{tableBody}</TableBody>
    </Table>
  );
};

export default CheckedTable;
