/* eslint-disable react/prop-types */
import { FormHelperText } from "@mui/material";
import { useController } from "react-hook-form";
import Select, { components } from "react-select";

const Control = ({ children, ...props }) => (
  <components.SingleValue {...props}>
    <span
      data-testid="singleValue"
      style={{
        display: "flex",
        border: "1px solid #808080",
        borderRadius: "2px",
      }}
    >
      {children}
    </span>
  </components.SingleValue>
);

const ReactSelect = ({ id, label, name, control, options }) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <>
      <label>{label}</label>
      <Select {...field} options={options} id={id} components={{ Control }} />
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </>
  );
};

export default ReactSelect;
