import Slider from "react-slick";
import { Box } from "@mui/material";
import {CarouselCard} from "../../../Common";
import { YellowDesignSVG } from "../../../assets/SVG";

const CarouselBox = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box
      height="100%"
      width="50%"
      sx={{
        backgroundImage: `url(${YellowDesignSVG})`,
        backgroundSize: "cover",
        borderRadius: "8px",
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Slider
        {...settings}
        style={{ width: "80%", height: "80%" }}
        arrows={false}
      >
        <CarouselCard>
          Overcome Math Anxiety and Boost Your Memory.
        </CarouselCard>
        <CarouselCard>
          Embrace math challenges as opportunities to grow.
        </CarouselCard>
        <CarouselCard>
          A sharp mind holds the key to unlocking your memory's full potential.
        </CarouselCard>
      </Slider>
    </Box>
  );
};

export default CarouselBox;
