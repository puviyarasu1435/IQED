import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';



const CTextField = styled(TextField)({
   
    '& .MuiInputBase-input': {
        height:"10px"
    },
    '& .MuiFormLabel-root': {
        fontsize: "20px",
        transform:"translate(10px, 10px) scale(1)"
    },
    '& .MuiInputLabel-shrink': {
        transform:"translate(14px, -10px) scale(0.75)",
        userselect:"none"
    },
    
}); 
export default CTextField;


