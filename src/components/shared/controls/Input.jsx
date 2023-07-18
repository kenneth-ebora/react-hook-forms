/* eslint-disable react/prop-types */
import { FormHelperText, TextField } from "@mui/material";
import { useController } from "react-hook-form";

const Input = ({ label, name, control, type = "text" }) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <>
      <TextField
        {...field}
        margin="dense"
        id={label}
        label={label}
        type={type}
        fullWidth
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        error={!!error}
      />
      {error && (
        <FormHelperText data-testid="errorMessage">
          {error.message}
        </FormHelperText>
      )}
    </>
  );
};

export default Input;
