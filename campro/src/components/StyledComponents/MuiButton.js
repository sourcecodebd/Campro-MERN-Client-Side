import { Button } from '@mui/material';
import { styled } from '@mui/styles';

const MuiButton = styled(Button)(
    {
        backgroundImage: 'linear-gradient(to top left, #d129a3,  #6c43b5, #1048b0)',
        color: 'white !important',
        transition: '0.8s !important',
        '&:hover': {
            background: '#051937 !important',
        }
    }
)

export { MuiButton };