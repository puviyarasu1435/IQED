import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Box, Input, Typography } from "@mui/material";
import { Formik, Form, FormikProvider } from "formik";
import { SignUpvalidSchema } from "../Schema/AuthSchema";
import { FormTextField } from "../../../Common";

const steps = ["Profile", "Contact Info", "Password"];

const SignUpForm = ({PageSwitch}) => {
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFormSubmit = useCallback(
    (values, { setSubmitting }) => {
      console.log(values);
      console.log("activeStep", activeStep);
      if (activeStep === steps.length - 1) {
        alert(JSON.stringify(values, null, 2));
      } else {
        handleNext();
      }
      setSubmitting(false);
      return true;
    },
    [activeStep]
  );

  const initialValues = {
    profileImage: "",
    userName: "",
    name: "",
    age: "",
    email: "",
    password: "",
    schoolName: "",
    grade: "",
    contactNumber: "",
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
    <Box mt={2}>
      <Typography
        component="h1"
        variant="h4"
        sx={{
          width: "100%",
          fontSize: "20px",
          fontWeight: "800",
          color: "#515151",
          marginBottom: "1rem",
        }}
      >
        CREATE ACCOUNT
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={SignUpvalidSchema[activeStep]}
        onSubmit={handleFormSubmit}
      >
        {(formik) => (
          <FormikProvider value={formik}>
            <Form>
              <Box display="flex" flexDirection="column" gap={1}>
                {activeStep === 0 && (
                  <>
                    <FormTextField
                      field={"userName"}
                      placeholder={"UserName"}
                    />
                    <FormTextField field={"name"} placeholder={"Name"} />
                    <FormTextField field={"age"} placeholder={"Age"} />
                    <FormTextField
                      field={"schoolName"}
                      placeholder={"SchoolName"}
                    />
                    <FormTextField field={"grade"} placeholder={"Grade"} />
                  </>
                )}

                {activeStep === 1 && (
                  <>
                    <FormTextField field={"email"} placeholder={"Email"} />
                    <FormTextField
                      field={"contactNumber"}
                      placeholder={"Contact Numb"}
                    />
                  </>
                )}

                {activeStep === 2 && (
                  <>
                    <Input
                      type="file"
                      name="profileImage"
                      onChange={(event) =>
                        handleProfileImageChange(event, formik.setFieldValue)
                      }
                      error={
                        formik.touched.profileImage &&
                        Boolean(formik.errors.profileImage)
                      }
                      inputProps={{ accept: "image/*" }}
                    />
                    {formik.touched.profileImage &&
                      formik.errors.profileImage && (
                        <div style={{ color: "red" }}>
                          {formik.errors.profileImage}
                        </div>
                      )}

                    <FormTextField
                      field={"password"}
                      placeholder={"Password"}
                      type={"password"}
                    />
                    <FormTextField
                      field={"confirmPassword"}
                      placeholder={"Confirm Password"}
                      type={"password"}
                    />
                  </>
                )}

                <Box display="flex" flexDirection="column" gap={1} mt={1}>
                  <Box>
                    <Typography
                      component="p"
                      sx={{ fontSize: "12px", fontWeight: "bold" }}
                    >
                      By clicking 'Next,' you agree to our
                      <Link> Terms and Conditions.</Link>
                    </Typography>
                  </Box>

                  {activeStep === steps.length - 1 ? (
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={formik.isSubmitting}
                      onClick={formik.handleSubmit}
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      onClick={formik.handleSubmit}
                    >
                      Next
                    </Button>
                  )}

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
                      <Link onClick={PageSwitch} >SignIn</Link>
                    </span>
                  </Typography>
                </Box>
              </Box>
            </Form>
          </FormikProvider>
        )}
      </Formik>
    </Box>
  );
};

export default SignUpForm;
