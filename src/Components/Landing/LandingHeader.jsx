import {Button,Container,AppBar, Toolbar, Box} from "@mui/material";
import { Link } from "react-router-dom";
import { Logo } from "../../Common";

function LandingHeader() {
  return (
    <AppBar sx={{ backgroundColor: "transparent", boxShadow: "0",position:'relative',p:2}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <Logo widthCus={{xs: '80px', sm: '80px', md: '150px', lg: '150px'}} />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {/* <Button
              component={Link}
              to="/Auth"
              fullWidth
              variant="contained"
              sx={{
                m: {xs: '10px', sm: '10px', md: '20px', lg: '20px'},
                height: {xs: '30px', sm: '30px', md: '50px', lg: '50px'},
                fontWeight: 'bold',
                backgroundColor: "#ffff",
                color: "#02216F",
                boxShadow: "2px 3px #02216F",
                borderRadius: {xs: '5px', sm: '5px', md: '10px', lg: '10px'},
                textTransform: "none",
                border: '1px solid', 
                borderColor: '#02216F', 
                "&:hover": {
                  color: "#ffff",
                  backgroundColor: "#02216F",
                  transition: "transform 0.3s ease-in-out",
                  transform: "translateY(-5px)",
                  boxShadow: "2px 3px #ffff",
                },
              }}
            >
              Sign In
            </Button> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default LandingHeader;
