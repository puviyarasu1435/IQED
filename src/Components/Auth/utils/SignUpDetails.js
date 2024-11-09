import * as yup from "yup";

export const SignUpvalidSchema = [
  yup.object().shape({
    UserName: yup.string().required(),
    Name: yup.string().required(),
    Age: yup.string().required("Age is required").matches(/^\d{2}$/, "Age must be exactly 2 digits"),
    SchoolName: yup.string().required("This field is required"),
    Grade: yup.string().required(),
  }),
  yup.object().shape({
    Email: yup.string().email().required(),
    ContactNumber: yup
      .string()
      .required("Contact Number is required")
      .matches(/^\d{10}$/, "Contact Number must be exactly 10 digits"),
  }),
  yup.object().shape({
    Password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@$!%*?&)"
      ),
    ConfirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("Password")], "Passwords must match"),
  }),
];

// OTP: yup
// .string()
// .required("OTP is required")
// .matches(/^\d{6}$/, "OTP must be exactly 6 digits"),
