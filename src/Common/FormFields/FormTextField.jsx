import { TextField } from "@mui/material";
import { useFormikContext } from "formik";

const FormTextField = ({ field, ...props }) => {
  const { values, errors, touched, handleChange } = useFormikContext();

  return (
    <TextField
      name={field}
      value={values[field]}
      onChange={handleChange}
      error={touched[field] && Boolean(errors[field])}
      helperText={touched[field] && errors[field] }
      inputProps={{
        style: {
          padding: 5,
        },
      }}
      sx={{ 
        "& input::placeholder": { 
          fontSize: "13px", 
          paddingLeft: "5px" 
        },
        "&& .MuiFormHelperText-root" :{
          lineHeight:'1rem'
        }
      }}
      {...props}
    />
  );
};

export default FormTextField;
