import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { TypoSmall } from '../../StyledComponents/Typo';
import { Badge } from 'react-bootstrap';


const MyOrder = ({ order, handleDeleteOrder }) => {
    const { camera, img_url, totalPrice, quantity, address, phone, orderedAt, status } = order || {};

    // const orderedDate = new Date(orderedAt).toDateString();

    return (
        <Grid item xs={6} sm={4} md={4}>

            <Card className="d-lg-flex">
                <Box sx={{
                    display: 'flex', flexDirection: 'column', height: 400,
                    backgroundImage: 'linear-gradient(315deg, #63a4ff 0%, #83eaf1 74%)'
                }} className="text-white">
                    <CardContent sx={{ flexGrow: '1 0 auto' }}>
                        <TypoSmall component="div" style={{ color: 'darkblue', fontWeight: 600 }}>
                            {camera.slice(0, 35).split('a  ')}
                        </TypoSmall>
                        <Typography variant="body2" className="bg-info" style={{ fontWeight: 'bold' }} component="div">
                            Ordered At: {orderedAt}
                        </Typography>
                        <Typography variant="body1" className="bg-white" style={{ color: 'grey', fontWeight: 'bold' }} >
                            Status
                        </Typography>
                        <Typography variant="body1" className="bg-white blue" style={{ fontWeight: 'bold' }} component="div">
                            {
                                status === 'Approved' ?
                                    <Badge bg="success" text="light" className="mb-2">
                                        Shipped
                                    </Badge>
                                    :
                                    <Badge bg="dark" text="warning" className="mb-2">
                                        Pending
                                    </Badge>
                            }
                        </Typography>
                        <p className="lines"></p>
                        <Typography variant="body1" className="bg-white" style={{ color: 'grey', fontWeight: 'bold' }} >
                            Address
                        </Typography>
                        <Typography variant="body1" className="bg-white blue" style={{ fontWeight: 'bold' }} component="div">
                            {address}
                        </Typography>
                        <p className="lines"></p>
                        <Typography variant="body1" className="bg-white" style={{ color: 'grey', fontWeight: 'bold' }} >
                            Phone
                        </Typography>
                        <Typography variant="body1" className="bg-white blue" style={{ fontWeight: 'bold' }} component="div">
                            {phone}
                        </Typography>
                    </CardContent>
                    <Button onClick={() => handleDeleteOrder(order)} variant="contained" className="bg-danger mb-2">Remove Order</Button>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, gap: 2 }}>
                        <TypoSmall component="div">
                            Price: BDT. {totalPrice}
                        </TypoSmall>
                        <Badge bg="warning" text="dark">
                            Quantity: {quantity}
                        </Badge>{' '}
                    </Box>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 'auto' }}
                    className="img-fluid"
                    image={img_url}
                    alt="Live from space album cover"
                />
            </Card>
        </Grid>
    );
};

export default MyOrder;