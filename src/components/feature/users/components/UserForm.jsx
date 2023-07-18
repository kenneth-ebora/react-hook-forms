/* eslint-disable react/prop-types */
import { Button, DialogActions, DialogContent, Grid } from "@mui/material";
import Input from "../../../shared/controls/Input";
import { useForm } from "react-hook-form";
import { userFormSchema } from "../schema/UserFormSchema";
import { useYupValidationResolver } from "../../../../hooks/useYupValidationResolver";
import ReactSelect from "../../../shared/controls/Select";
import ReactDatePicker from "../../../shared/controls/DatePicker";
import Check from "../../../shared/controls/Checkbox";

const roleList = [
  {
    label: "Admin",
    value: 1,
  },
  {
    label: "Viewer",
    value: 2,
  },
];

const UserForm = ({ handleClose }) => {
  const resolver = useYupValidationResolver(userFormSchema);
  const { control, handleSubmit, watch, setValue } = useForm({
    resolver,
    reValidateMode: "all",
    mode: "all",
    defaultValues: {
      firstName: "Kenneth",
      lastName: "Ebora",
      startDate: new Date(),
      isActive: true,
    },
  });
  console.log(watch());

  const onSubmit = (schema) => {
    console.log(watch());
  };

  return (
    <>
      <DialogContent sx={{ overflow: "visible" }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Input name="firstName" label="First Name" control={control} />
          </Grid>
          <Grid item xs={6}>
            <Input name="lastName" label="Last Name" control={control} />
          </Grid>
          <Grid item xs={12}>
            <ReactSelect
              name="role"
              label="Role"
              control={control}
              options={roleList}
            />
          </Grid>
          <Grid item xs={6}>
            <ReactDatePicker
              name="startDate"
              label="Start Date"
              control={control}
            />
          </Grid>
          <Grid item xs={6}>
            <Check name="isActive" label="Active" control={control} />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={() => {
                setValue("isActive", true, { shouldValidate: true });
              }}
            >
              Set to Admin
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)}>Save</Button>
      </DialogActions>
    </>
  );
};

export default UserForm;
