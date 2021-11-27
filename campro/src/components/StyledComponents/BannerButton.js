import { Button } from '@mui/material';
import { styled } from '@mui/styles';

const BannerButton = styled(Button)(
    {
        backgroundColor: '#051937 !important',
        color: 'white !important',
        transition: '0.8s !important',
        '&:hover': {
            background: 'linear-gradient(to top left, #d129a3,  #6c43b5, #1048b0) !important'
        }
    }
)

export { BannerButton };