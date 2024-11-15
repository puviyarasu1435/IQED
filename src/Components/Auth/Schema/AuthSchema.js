import * as yup from "yup";

export const SignUpvalidSchema = [
  yup.object().shape({
    userName: yup.string().required("UserName is required").max(8, "UserName must be at least 8 characters long"),
    name: yup.string().required(),
    age: yup
      .string()
      .required("Age is required")
      .matches(/^\d{2}$/, "Age must be exactly 2 digits"),
    schoolName: yup.string().required("This field is required"),
    grade: yup.string().required(),
  }),
  yup.object().shape({
    email: yup.string().email().required(),
    OTP: yup
      .string()
      .required("OTP is required")
      .matches(/^\d{6}$/, "OTP must be exactly 6 digits"),
    // contactNumber: yup
    //   .string()
    //   .required("Contact Number is required")
    //   .matches(/^\d{10}$/, "Contact Number must be exactly 10 digits"),
  }),
  yup.object().shape({
    // profileImage: yup.string().required("File is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(4, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@$!%*?&)"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match"),
  }),
];



export const SignInvalidSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
  .string()
  .required("Password is required"),
  })
  