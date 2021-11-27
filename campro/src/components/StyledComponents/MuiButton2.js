import { Button } from '@mui/material';
import { styled } from '@mui/styles';

const MuiButton2 = styled(Button)(
    {
        backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        color: 'white !important',
        transition: '0.8s !important',
        '&:hover': {
            background: '#051937 !important',
        }
    }
)

export { MuiButton2 };