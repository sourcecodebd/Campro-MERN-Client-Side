import React from 'react';
import { Chip, Container, Grid, ListItem, Paper, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import useAuth from '../../../hooks/useAuth';
import { TypoMed, TypoSmall } from '../../StyledComponents/Typo';
import { BannerButton } from '../../StyledComponents/BannerButton';
import { Link } from 'react-router-dom';
import MyOrder from '../MyOrder/MyOrder';
import swal from 'sweetalert'
import { Badge } from 'react-bootstrap';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MyOrders = ({ orders, quantities, setDeleted }) => {
    // MUI Snackbar starts
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    // MUI Snackbar ends
    const { firebase } = useAuth();
    const { success, setSuccess, error, setError, open, setOpen } = firebase;

    const billReducer = (prev, next) => prev + next.totalPrice;
    const payment_bill = orders?.reduce(billReducer, 0);

    const handleDeleteOrder = order => {
        const safeMsg = document.createElement("div");
        safeMsg.innerHTML =
            `<div class="d-flex justify-content-center align-items-center gap-2" style="transform: translateY(30px)">
                <i class="fas fa-user-shield"></i>
                Your Order is safe!
            </div>`;

        new swal({
            title: "Are you sure?",
            text: "Once cancelled, you won't be able to recover this Order!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    if (order.status !== "Approved") {
                        fetch(`https://desolate-woodland-29933.herokuapp.com/order/delete/${order._id}`, {
                            method: 'DELETE',
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.deletedCount) {
                                    setSuccess('Your Order has beem cancelled successfully!');
                                    setError('');
                                    setOpen(true);
                                    setDeleted(true);
                                    // const remaining = orders?.filter(ord => ord._id !== order._id);
                                    // setOrders(remaining);
                                }
                                else {
                                    setDeleted(false);
                                }
                            })
                    }
                    else {
                        setSuccess('');
                        setError('Approved Orders cannot be cancelled!');
                        setOpen(true);
                    }
                } else {
                    new swal({
                        content: safeMsg
                    });
                }
            });
    }

    return (
        <Container>
            {
                success &&
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} sx={{ transform: 'translateY(-80vh)' }}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        {success}
                    </Alert>
                </Snackbar>
            }
            {
                error &&
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} sx={{ transform: 'translateY(-80vh)' }}>
                    <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>
            }
            <TypoMed className="mb-2">My Orders</TypoMed>
            <p className="lines mb-3"></p>

            <Paper
                className="mx-auto bg-orange"
                sx={{
                    color: 'white',
                    width: 'fit-content',
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    p: 0.5,
                    mb: 1,
                }}
                component="ul"
            >
                <ListItem>
                    <TypoSmall className="mx-2">
                        Payment Bill BDT.
                    </TypoSmall>
                    <Chip
                        sx={{
                            color: 'white',
                            backgroundColor: 'grey',
                        }}
                        label={payment_bill.toFixed(2)}
                    />
                </ListItem>
            </Paper>

            <h3>
                <Badge bg="warning" text="dark">
                    Order Quantity: {quantities}
                </Badge>{' '}
            </h3>

            <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 6, sm: 8, md: 8 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                    orders.length === 0 ?
                        <TypoSmall className="text-center mt-4 shadow p-2" sx={{ backgroundImage: 'linear-gradient(315deg, #63a4ff 0%, #83eaf1 74%)' }}>
                            No Order has been placed!
                        </TypoSmall>
                        :
                        orders?.map(order => <MyOrder
                            order={order}
                            handleDeleteOrder={handleDeleteOrder}
                            key={order._id}
                        />)
                }
            </Grid>
            <Link to='/home'>
                <BannerButton className="mt-5">
                    Home
                </BannerButton>
            </Link>
        </Container>
    );
};

export default MyOrders;