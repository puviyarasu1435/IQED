import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';


const CButton = styled(Button)({
  height: {xs: '30px', sm: '30px', md: '50px', lg: '50px'},
  fontWeight: 'bold',
  borderRadius: {xs: '5px', sm: '5px', md: '10px', lg: '15px'},
  textTransform: "none",
  border: '1px solid', 
  fontFamily:"Poppins",
  "&:hover": {
    transition: "transform 0.3s ease-in-out",
    transform: "translateY(-2px)",
    boxShadow: "2px 3px #ffff", 
  },
}); 
export default CButton;