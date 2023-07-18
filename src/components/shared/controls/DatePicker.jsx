/* eslint-disable react/prop-types */
import { FormHelperText } from "@mui/material";
import { useController, useWatch } from "react-hook-form";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const ReactDatePicker = ({ label, name, control }) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const value = useWatch({ control, name });

  return (
    <>
      <label>{label}</label>
      <DatePicker {...field} selected={value} />
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </>
  );
};

export default ReactDatePicker;
