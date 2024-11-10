import * as React from "react";
import PropTypes from "prop-types";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  OutlinedInput,
} from "@mui/material";


const InputDialogBox = ({ open, close, title, content , submitCallBack }) => {
  return (
    <Dialog
      open={open}
      onClose={close}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          handleClose();
        },
        sx: {
          padding: "20px", // Add padding here
        },
      }}
    >
      <DialogTitle sx={{ fontSize: "24px", fontWeight: "bold" }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <DialogContentText sx={{ fontSize: "14px" }}>
            {content}
        </DialogContentText>
        <OutlinedInput
          autoFocus
          required
          name="email"
          label="Email address"
          placeholder="Email address"
          type="email"
          fullWidth
          sx={{ height: "40px" }}
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={close} sx={{ color: "#02216F" }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          type="submit"
          onClick={submitCallBack}
          sx={{
            fontWeight: "bold",
            backgroundColor: "#1A49BA",
            overflow: "hidden",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "Black",
              transition: "transform 0.3s ease-in-out",
              transform: "translateY(-5px)",
            },
            boxShadow: "2px 3px #FFDA55",
          }}
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

InputDialogBox.propTypes = {
  close: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default InputDialogBox;
