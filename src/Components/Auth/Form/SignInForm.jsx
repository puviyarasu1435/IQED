import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Box, Input, Typography } from "@mui/material";
import { Formik, Form, FormikProvider } from "formik";
import { SignInvalidSchema } from "../Schema/AuthSchema";
import { FormTextField, InputDialogBox } from "../../../Common";

const SignInForm = ({ PageSwitch }) => {
  const [open, setOpen] = useState(false);
  const handleFormSubmit = (values, { setSubmitting }) => {
    console.log(values);
    alert(JSON.stringify(values, null, 2));
  };

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <Box>
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
        SIGN IN
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={SignInvalidSchema}
        onSubmit={handleFormSubmit}
      >
        {(formik) => (
          <FormikProvider value={formik}>
            <Form>
              <Box display="flex" flexDirection="column" gap={1}>
                <FormTextField field={"email"} placeholder={"Email"} />
                <FormTextField
                  field={"password"}
                  placeholder={"password"}
                  type={"password"}
                />

                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  gap={1}
                  mt={1}
                >
                  <Box sx={{fontSize:'12px', display: "flex", justifyContent: "flex-end" }}>
                    <Link onClick={()=>setOpen(true)} >Forgot your password?</Link>
                  </Box>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={formik.isSubmitting}
                    onClick={formik.handleSubmit}
                  >
                    Submit
                  </Button>
                  <Typography sx={{ textAlign: "center", fontSize: "12px" }}>
                    Don't have an account?{" "}
                    <span>
                      <Link onClick={PageSwitch}>SignUp</Link>
                    </span>
                  </Typography>
                </Box>
              </Box>
            </Form>
            <InputDialogBox open={open} close={()=>setOpen(false)} title={"Resert Password"} content={"Enter your account&apos;s email address, and we&apos;ll send you a link to reset your password."} submitCallBack={null} />
          </FormikProvider>
        )}
      </Formik>
    </Box>
  );
};

export default SignInForm;
