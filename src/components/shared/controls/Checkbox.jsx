/* eslint-disable react/prop-types */
import { Checkbox, FormControlLabel } from "@mui/material";
import { useController } from "react-hook-form";

const Check = ({ label, name, control }) => {
  const { field } = useController({ name, control });

  return (
    <FormControlLabel
      control={<Checkbox {...field} checked={!!field?.value} />}
      label={label}
    />
  );
};

export default Check;
