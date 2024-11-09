import React, { useState } from 'react';
import * as Yup from 'yup';
import { Button, Box, Typography, TextField } from '@mui/material';
import { Label } from 'flowbite-react';
// Import the custom component

// Define the validation schema with Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});
const CustomInput = ({ label, name, value, onChange, error, helperText }) => {
    return (
      <Box sx={{ mb: 1 }}>
        <TextField
          name={name}
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={helperText}
          variant="outlined"
          fullWidth
          placeholder={label}
          inputProps={{
            style: {
              fontSize: '12px',
              height: "30px",            
              padding: "0 14px"
            },
          }}
        />
      </Box>
    );
  };
  
 
const BasicForm = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validate = async () => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validate();
    if (isValid) {
      console.log('Form Submitted', values);
      setValues({ name: '', email: '', password: '' }); // Reset form
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        User Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <CustomInput
          label="Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          helperText={errors.name}
        />
        <CustomInput
          label="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          helperText={errors.email}
        />
        <CustomInput
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          helperText={errors.password}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default BasicForm;
