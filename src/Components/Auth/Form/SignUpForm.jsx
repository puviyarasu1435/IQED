import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Stepper,
  Step,
  StepLabel,
  Input,
  Typography,
} from "@mui/material";
import { Formik, Form } from "formik";
import { SignUpvalidSchema } from "../utils/SignUpDetails";
import { Link } from "react-router-dom";

const steps = ["Profile", "Contact Info", "Password"];

const SignUpForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFormSubmit = (values, { setSubmitting }) => {

    console.log(values)
    if (activeStep === steps.length - 1) {
      alert(JSON.stringify(values, null, 2));
    } else {
      handleNext();
    }
    setSubmitting(false);
    return true;
  };

  const initialValues = {
    ProfileImage: "",
    UserName: "",
    Name: "",
    Age: "",
    Email: "",
    Password: "",
    SchoolName: "",
    Grade: "",
    ContactNumber: "",
  };

  const handleProfileImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box width={400} mx="auto" display="flex" flexDirection="column" alignItems={"center"} justifyContent="space-between">
      <Typography
        component="h1"
        variant="h4"
        sx={{
          width: "100%",
          fontSize: "20px",
          fontWeight: "800",
          color: "#515151",
          textAlign: "center",
          marginBottom: "10%",
        }}
      >
        CREATE ACCOUNT
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={SignUpvalidSchema[activeStep]}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          isValid,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={1}>
              {activeStep === 0 && (
                <>
                  <TextField
                    name="UserName"
                    placeholder="Username"
                    variant="outlined"
                    value={values.UserName}
                    onChange={handleChange}
                    error={Boolean(errors.UserName)}
                    helperText={errors.UserName}
                  />
                  <TextField
                    name="Name"
                    placeholder="Name"
                    variant="outlined"
                    value={values.Name}
                    onChange={handleChange}
                    error={touched.Name && Boolean(errors.Name)}
                    helperText={touched.Name && errors.Name}
                  />
                  <TextField
                    name="Age"
                    placeholder="Age"
                    variant="outlined"
                    value={values.Age}
                    onChange={handleChange}
                    error={touched.Age && Boolean(errors.Age)}
                    helperText={touched.Age && errors.Age}
                  />
                  <TextField
                    name="SchoolName"
                    placeholder="School"
                    variant="outlined"
                    value={values.SchoolName}
                    onChange={handleChange}
                    error={touched.SchoolName && Boolean(errors.SchoolName)}
                    helperText={touched.SchoolName && errors.SchoolName}
                  />
                  <TextField
                    name="Grade"
                    placeholder="Grade"
                    variant="outlined"
                    value={values.Grade}
                    onChange={handleChange}
                    error={touched.Grade && Boolean(errors.Grade)}
                    helperText={touched.Grade && errors.Grade}
                  />
                </>
              )}

              {activeStep === 1 && (
                <>
                  <TextField
                    name="Email"
                    placeholder="Email"
                    variant="outlined"
                    value={values.Email}
                    onChange={handleChange}
                    error={Boolean(errors.Email)}
                    helperText={errors.Email}
                  />
                  <TextField
                    name="ContactNumber"
                    placeholder="Contact Number"
                    variant="outlined"
                    value={values.ContactNumber}
                    onChange={handleChange}
                    error={Boolean(errors.ContactNumber)}
                    helperText={errors.ContactNumber}
                  />
                </>
              )}

              {activeStep === 2 && (
                <>
                  <Input
                    type="file"
                    name="ProfileImage"
                    onChange={(event) =>
                      handleProfileImageChange(event, setFieldValue)
                    }
                    error={touched.ProfileImage && Boolean(errors.ProfileImage)}
                    inputProps={{ accept: "image/*" }}
                  />
                  {touched.ProfileImage && errors.ProfileImage && (
                    <div style={{ color: "red" }}>{errors.ProfileImage}</div>
                  )}
                  <TextField
                    name="Password"
                    placeholder="Password"
                    type="password"
                    variant="outlined"
                    value={values.Password}
                    onChange={handleChange}
                    error={touched.Password && Boolean(errors.Password)}
                    helperText={touched.Password && errors.Password}
                  />
                </>
              )}

              <Box display="flex" flexDirection="column" justifyContent="space-between" gap={2} mt={1}>
                <Box>
                  <Typography
                    component="p"
                    sx={{ fontSize: "12px", fontWeight: "bold"}}
                  >
                    By clicking 'Next,' you agree to our
                    <Link> Terms and Conditions.</Link>
                  </Typography>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
                </Button>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="contained"
                >
                  Back
                </Button>
                <Typography sx={{ textAlign: "center", fontSize: "12px" }}>
                I have an account?{" "}
                <span>
                  <Link to="/Signin">SignIn</Link>
                </span>
              </Typography>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SignUpForm;
