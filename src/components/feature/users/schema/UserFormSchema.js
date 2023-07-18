import * as yup from "yup";

export const userFormSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  role: yup
    .string()
    .transform((value) => {
      if (value !== undefined && value !== {}) {
        return value.label;
      }

      return null;
    })
    .required(),
  startDate: yup.string().required(),
  isActive: yup.boolean(),
});
