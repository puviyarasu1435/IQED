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
  InputAdornment,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UpdateUser } from "../../Redux/Slice/UserSlice/UserSlice";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
const AccountSettings = ({ onClose }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const UserData = useSelector((state) => state.UserState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profileFields, setProfileFields] = useState([
    { label: "Name", value: UserData.Name || "Gowthamraj" },
    { label: "School Name", value: UserData.School_Name || "TNGR" },
    { label: "Grade", value: UserData.Grade || "10th" },
  ]);

  const [profileImagePreview, setProfileImagePreview] = useState(
    UserData.profileImageUrl || "/default-avatar.jpg"
  );
  const [profileImageBase64, setProfileImageBase64] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openDeleteAccount, setOpenDeleteAccount] = useState(false);
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modifiedFields, setModifiedFields] = useState({});
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowOldPassword = () => setShowOldPassword((prev) => !prev);
  const toggleShowNewPassword = () => setShowNewPassword((prev) => !prev);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (label, value) => {
    setProfileFields((prevFields) =>
      prevFields.map((field) =>
        field.label === label ? { ...field, value } : field
      )
    );

    setModifiedFields((prevModified) => ({
      ...prevModified,
      [label]: value,
    }));
    setIsChanged(true);
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImageBase64(reader.result); // Store the base64 image for dispatch
        setIsChanged(true);
      };
      reader.readAsDataURL(file);

      const previewUrl = URL.createObjectURL(file);
      setProfileImagePreview(previewUrl); // Show the preview directly
    }
  };

  const handleSave = () => {
    const updatedUserData = { ...modifiedFields };
    profileFields.forEach((field) => {
      if (field.changed) {
        updatedUserData[field.label.replace(" ", "_")] = field.value;
      }
    });

    if (profileImageBase64) {
      updatedUserData.profileImage = profileImageBase64;
    }

    if (Object.keys(updatedUserData).length > 0) {
      console.log("Updated Profile Data:", updatedUserData);
      dispatch(UpdateUser(updatedUserData));
    }

    setIsEditing(false);
    setIsChanged(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsChanged(false);
    setProfileImagePreview(UserData.profileImageUrl || "/default-avatar.jpg");
    setProfileImageBase64("");
  };

  const openChangePasswordDialog = () => setOpenChangePassword(true);
  const closeChangePasswordDialog = () => {
    setOpenChangePassword(false);
    setNewPassword("");
    setConfirmPassword("");
  };

  const openDeleteAccountDialog = () => setOpenDeleteAccount(true);
  const closeDeleteAccountDialog = () => setOpenDeleteAccount(false);

  const handlePasswordChange = (event) => {
    event.preventDefault(); // Prevent default form submission

    const passwordCriteria = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    // Clear previous errors
    setOldPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");

    // Validate old password
    if (oldPassword !== UserData.Password) {
      setOldPasswordError("Incorrect current password.");
      return;
    }

    // Validate new password criteria
    if (!passwordCriteria.test(newPassword)) {
      setNewPasswordError(
        "Password must be at least 8 characters long, with at least one uppercase letter and one number."
      );
      return;
    }

    // Validate confirm password matches new password
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    // Clear errors and log the new password
    console.log("New password:", newPassword); // Log the new password
    dispatch(UpdateUser({ Password: newPassword }));
    closeChangePasswordDialog();
  };

  const handleDeleteAccount = () => {
    console.log("Account deleted");
    closeDeleteAccountDialog();
  };
  const handleLogOut = () => {
    sessionStorage.clear();
    navigate("/auth");
    toast.success("Logout..");
    handleClose();
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
        marginTop: "10px",
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
          boxSizing: "border-box",
          mb: "10px",
          mr: "10px",
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
              src={profileImagePreview}
              sx={{ width: 100, height: 100, mb: "8px" }}
            />
            {isEditing ? (
              <>
                <input
                  type="file"
                  accept="image/*"
                  id="profile-image-upload"
                  style={{ display: "none" }}
                  onChange={handleProfileImageChange}
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
          <ListItem>
            <ListItemText
              primary="Username"
              secondary={UserData.UserName ? UserData.UserName : "john9500"}
            />
          </ListItem>
          <ListItem>
            <Divider />
            <ListItemText
              primary="Email"
              secondary={UserData.Email ? UserData.Email : "john9500@gmail.com"}
            />
          </ListItem>
          <Divider />
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
                    <ListItemText
                      primary={field.label}
                      secondary={field.value}
                    />
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
          <ListItem button onClick={handleLogOut} sx={hoverEffect}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>

      {/* Change Password Dialog */}
      <Dialog open={openChangePassword} onClose={closeChangePasswordDialog}>
        <DialogTitle>Change Password</DialogTitle>
        <form onSubmit={handlePasswordChange}>
          <DialogContent>
            <DialogContentText>
              Enter your current password, new password, and confirm it to
              update your account.
            </DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              label="Current Password"
              type={showOldPassword ? "text" : "password"} // Toggle type based on visibility state
              fullWidth
              variant="outlined"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              error={!!oldPasswordError}
              helperText={oldPasswordError}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowOldPassword}>
                      {showOldPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin="dense"
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={!!newPasswordError}
              helperText={newPasswordError}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowNewPassword }>
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              required
              margin="dense"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowConfirmPassword  }>
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeChangePasswordDialog}>Cancel</Button>
            <Button type="submit">Save</Button> {/* Submit form */}
          </DialogActions>
        </form>
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
