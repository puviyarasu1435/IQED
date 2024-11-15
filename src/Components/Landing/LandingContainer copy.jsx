
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const CustomListItem = ({ content }) => (
  <ListItem sx={{ display: "list-item" }} disablePadding>
    <ListItemText
      primary={content}
      primaryTypographyProps={{
        fontSize: { xs: "14px", md: "20px" },
        fontWeight: "600",
      }}
    />
  </ListItem>
);

const LandingContainer = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const listItems = [
    "There are 30 multiple choice questions.",
    "Approximate test time: Fifteen minutes.",
    "The questions are of varying difficulty.",
    "All questions are worth the same points.",
  ];
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        mt: isSm ? "30%" : null,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          px: "15px",
          py: "5px",
          color: "#02216F",
          fontSize: { xs: "40px", md: "48px", lg: "60px" },
          fontWeight: "bold",
        }}
      >
        Welcome to the <br />
        <b>IQED</b> Challenge Platform.
      </Typography>

      <Box
        sx={{
          bgcolor: "#02216F",
          width: { xs: "80%", md: "55%" },
          borderRadius: "20px",
          m: "20px",
          p: "20px",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontSize: { xs: "18px", md: "28px" },
            fontWeight: "bold",
          }}
        >
          General test instructions:
        </Typography>
        <Divider sx={{ bgcolor: "#FFDA55", mb: "3%" }} />

        <Box sx={{ pl: { xs: "5%", md: "10%" }, color: "#fff" }}>
          <List sx={{ listStyleType: "disc" }}>
            {listItems.map((item, index) => (
              <CustomListItem key={index} content={item} />
            ))}
          </List>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "right", width: "100%" }}>
          <Button
            component={Link}
            to="/quiz/ewe"
            variant="contained"
            sx={{
              fontWeight: "bold",
              fontSize: { md: "20px" },
              backgroundColor: "#FFDA55",
              color: "#02216F",
              boxShadow: "2px 3px white",
              borderRadius: { xs: "5px", md: "10px" },
              textTransform: "none",
              border: "1px solid",
              borderColor: "white",
              "&:hover": {
                color: "#fff",
                backgroundColor: "black",
                transform: "translateY(-5px)",
                transition: "transform 0.3s ease-in-out",
              },
            }}
          >
            Take the Test!
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingContainer;
