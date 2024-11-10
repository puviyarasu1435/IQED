import { Box, Typography } from "@mui/material";
import { BlurContainerSVG } from "../../assets/SVG";

const CarouselCard = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${BlurContainerSVG})`,
        backgroundSize: "cover",
        width: "100%",
        height: "60vh",
        borderRadius: "8px",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "#fff",
          textAlign: "center",
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "38px",
          fontWeight: "bold",
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default CarouselCard;
