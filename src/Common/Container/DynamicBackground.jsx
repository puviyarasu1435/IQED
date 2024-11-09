import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';


const DynamicBackground = styled(Box)({
    backgroundSize: "cover",
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
});

export default DynamicBackground;