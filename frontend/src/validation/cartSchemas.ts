import * as Yup from "yup";

export const cartValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  phone: Yup.string()
    .matches(/^[0-9()-]+$/, "Phone must match format: 123-123-1212")
    .required("Phone is required"),
  address: Yup.string().required("Address is required"),
});
