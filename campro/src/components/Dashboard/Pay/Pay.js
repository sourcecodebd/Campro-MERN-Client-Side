import { Container, Grid } from '@mui/material';
import React from 'react';
import { TypoMed } from '../../StyledComponents/Typo';

const Pay = () => {
    return (
        <Container>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 6, sm: 8, md: 12 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid item xs={6} sm={6} md={6} className="bg-orange rounded-3 shadow" sx={{ py: 3 }}>
                    <TypoMed sx={{ color: 'white !important' }}>Payment System will coming soon!</TypoMed>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Pay;