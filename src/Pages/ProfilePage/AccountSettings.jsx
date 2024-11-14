import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Divider,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const AccountSettings = ({ onClose }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  // Profile fields data including the profile image field
  const [profileFields, setProfileFields] = useState([
    { label: "Username", value: "john_com9500_34505" },
    { label: "First Name", value: "Gowthamraj" },
    { label: "Last Name", value: "VP" },
    { label: "Grade", value: "3rd Grade" },
    { label: "Language", value: "English" },
    { label: "Profile Image", value: "/path/to/avatar.jpg" }, // Profile image added
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [originalFields, setOriginalFields] = useState(profileFields);

  // State for dialogs
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openDeleteAccount, setOpenDeleteAccount] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log("Updated Profile Fields:", profileFields);
    setOriginalFields(profileFields);
    setIsEditing(false);
    setIsChanged(false);
  };

  const handleCancel = () => {
    setProfileFields(originalFields);
    setIsEditing(false);
    setIsChanged(false);
  };

  const handleInputChange = (label, value) => {
    setProfileFields((prevFields) => {
      const updatedFields = prevFields.map((field) =>
        field.label === label ? { ...field, value } : field
      );
      const hasChanges = updatedFields.some(
        (field, index) => field.value !== prevFields[index].value
      );
      setIsChanged(hasChanges);
      return updatedFields;
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageURL = URL.createObjectURL(file);
      setProfileFields((prevFields) =>
        prevFields.map((field) =>
          field.label === "Profile Image"
            ? { ...field, value: newImageURL }
            : field
        )
      );
      setIsChanged(true);
    }
  };

  const openChangePasswordDialog = () => setOpenChangePassword(true);
  const closeChangePasswordDialog = () => {
    setOpenChangePassword(false);
    setNewPassword("");
    setConfirmPassword("");
  };

  const openDeleteAccountDialog = () => setOpenDeleteAccount(true);
  const closeDeleteAccountDialog = () => setOpenDeleteAccount(false);

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword) {
      console.log("Password updated successfully");
      closeChangePasswordDialog();
    } else {
      alert("Passwords do not match!");
    }
  };

  const handleDeleteAccount = () => {
    console.log("Account deleted");
    closeDeleteAccountDialog();
  };

  const hoverEffect = {
    "&:hover": {
      cursor: "pointer",
      bgcolor: "#f0f0f0",
    },
  };

  const buttonStyle = {
    fontWeight: "bold",
    backgroundColor: "#1A49BA",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "Black",
      transition: "transform 0.3s ease-in-out",
      transform: "translateY(-5px)",
    },
    boxShadow: "2px 3px #FFDA55",
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        gap: "20px",
        overflow: "hidden",
        marginTop:'10px',
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 0,
          gap: isSm ? "10px" : "20px",
          bgcolor: "#1A49BA",
          boxSizing: "border-box",
          p: "20px",
          borderRadius: "10px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant={isSm ? "h6" : "h5"}
          sx={{
            color: "White",
            fontWeight: "bold",
          }}
        >
          Account Settings
        </Typography>

        <IconButton
          aria-label="Exit"
          sx={{ color: "#FFDA55" }}
          onClick={onClose}
        >
          <CancelIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          p: "20px",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          gap: "10px",
          bgcolor: "#F3F7FF",
          borderRadius: "10px",
          border: "2px solid",
          borderColor: "#02216F",
          boxShadow: "2px 3px #02216F",
          boxSizing:'border-box',
          mb:'10px',
          mr:'10px'
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: "16px",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={profileFields.find((field) => field.label === "Profile Image").value}
              sx={{ width: 100, height: 100, mb: "8px" }}
            />
            {isEditing ? (
              <>
                <input
                  type="file"
                  accept="image/*"
                  id="profile-image-upload"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    color: "#fff",
                    bgcolor: "#FFDA55",
                    "&:hover": { bgcolor: "#FFC107" },
                  }}
                  onClick={() =>
                    document.getElementById("profile-image-upload").click()
                  }
                >
                  <CameraAltIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </>
            ) : (
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  color: "#fff",
                  bgcolor: "#FFDA55",
                  "&:hover": { bgcolor: "#FFC107" },
                }}
                onClick={handleEditClick}
              >
                <EditIcon sx={{ fontSize: 20 }} />
              </IconButton>
            )}
          </Box>
        </Box>

        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Profile Information
        </Typography>

        <List sx={{ mb: "10px" }}>
          {profileFields.map((field) => (
            <React.Fragment key={field.label}>
              {field.label !== "Profile Image" && (
                <ListItem>
                  {isEditing ? (
                    <TextField
                      id={field.label}
                      value={field.value}
                      onChange={(e) =>
                        handleInputChange(field.label, e.target.value)
                      }
                      fullWidth
                      variant="outlined"
                    />
                  ) : (
                    <ListItemText primary={field.label} secondary={field.value} />
                  )}
                </ListItem>
              )}
              <Divider />
            </React.Fragment>
          ))}
        </List>

        {isEditing && (
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button
              variant="contained"
              sx={buttonStyle}
              onClick={handleSave}
              disabled={!isChanged}
            >
              Save
            </Button>
            <Button variant="contained" sx={buttonStyle} onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        )}

        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Account Settings
        </Typography>

        <List sx={{ mb: "16px" }}>
          <ListItem button onClick={openChangePasswordDialog} sx={hoverEffect}>
            <ListItemText primary="Change Password" />
          </ListItem>
          <Divider />
          <ListItem button onClick={openDeleteAccountDialog} sx={hoverEffect}>
            <ListItemText primary="Delete Account" />
          </ListItem>
          <ListItem button onClick={""} sx={hoverEffect}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>

      {/* Change Password Dialog */}
      <Dialog open={openChangePassword} onClose={closeChangePasswordDialog}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your new password and confirm it to update your account.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeChangePasswordDialog}>Cancel</Button>
          <Button onClick={handlePasswordChange}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={openDeleteAccount} onClose={closeDeleteAccountDialog}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteAccountDialog}>Cancel</Button>
          <Button onClick={handleDeleteAccount} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountSettings;
