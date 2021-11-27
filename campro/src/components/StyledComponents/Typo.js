import { Typography } from "@mui/material";
import { styled } from "@mui/styles";

const TypoLarge = styled(Typography)({
    fontSize: '35px !important',
    color: '#a439b0',
    fontWeight: 'bold !important',
    textTransform: 'uppercase',
})
const TypoMed = styled(Typography)({
    fontSize: '25px !important',
    color: '#a439b0',
    fontWeight: 'bold !important',
})
const TypoSmall = styled(Typography)({
    fontSize: '18px !important'
})

export { TypoLarge, TypoMed, TypoSmall };