import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, TextField, Snackbar, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import useAuth from '../../hooks/useAuth';
import { useParams, useHistory } from 'react-router';
import { TypoMed } from '../StyledComponents/Typo';
import Rating from 'react-rating';
import { MuiButton2 } from '../StyledComponents/MuiButton2';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PlaceOrder = () => {
    // MUI Snackbar starts
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    // MUI Snackbar ends

    const { id } = useParams();
    const { firebase } = useAuth();
    const { user, success, setSuccess, error, setError, open, setOpen } = firebase;
    const [singleCamera, setSingleCamera] = useState({});
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`https://desolate-woodland-29933.herokuapp.com/camera/${id}`)
            .then(res => res.json())
            .then(data => {
                setSingleCamera(data);
            })
        fetch(`https://desolate-woodland-29933.herokuapp.com/my-orders?email=${user.email}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('idToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [id, user.email])

    const { camera, img_url, price, rating } = singleCamera;
    const vat = 0.45;
    const deliveryCharge = 100;
    const totalPrice = parseFloat(price) + parseFloat(price) * vat + deliveryCharge;
    const fullSymbol = 'fa fa-star';

    const [orderData, setOrderData] = useState({ name: user.displayName, email: user.email, address: '', phone: '' });
    const handleInputChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newOrder = { ...orderData };
        newOrder[field] = value;
        setOrderData(newOrder);
    }
    const { photoURL } = user;
    const profilePhoto = 'fas fa-user';

    const history = useHistory();
    const handlePlaceOrder = e => {
        const newDate = new Date();
        const orderedAt = newDate.toLocaleDateString();
        let orderPlaced;
        if (photoURL) {
            orderPlaced = { ...orderData, camera, totalPrice, img_url, orderedAt, photoURL }
        }
        else {
            orderPlaced = { ...orderData, camera, totalPrice, img_url, orderedAt, profilePhoto }
        }

        const foundCamera = orders.find(order => order.camera === camera);
        if (!foundCamera?.quantity) {
            orderPlaced.quantity = 1;
        }
        else {
            orderPlaced.quantity = 1;
            orderPlaced.quantity += foundCamera.quantity;
        }
        orderPlaced.status = 'Pending';

        fetch(`https://desolate-woodland-29933.herokuapp.com/order/place/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderPlaced)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > -1) {
                    setSuccess('Your Order sent successfully!');
                    setError('');
                    setOpen(true);
                    e.target.reset();
                    setTimeout(() => {
                        history.push('/dashboard/my-orders');
                    }, 1000)
                }
            })

        e.preventDefault();
    }


    return (
        <Container sx={{ my: 5 }}>
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
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>
            }
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 8, md: 8 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid item xs={6} sm={4} md={4}>
                    <Paper elevation={3} sx={{ py: 5 }}>
                        <img src={img_url} className="img-fluid" alt="" />
                        <TypoMed sx={{ mb: 2 }}>{camera}</TypoMed>
                        <Typography>
                            <span className="fw-bold">Price: </span>
                            <span className="text-danger">BDT. </span> {price}
                        </Typography>
                        <small>(With 45% VAT,</small><br />
                        <small>Delivery Charge Applicable)</small>
                        <Typography>
                            <span className="fw-bold">Estimated Price: </span>
                            <span className="text-danger">BDT. </span>
                            <span className="text-success fs-2">{totalPrice.toFixed(2)}</span>
                        </Typography>
                        <Typography sx={{ color: 'gold' }}>
                            <Rating
                                emptySymbol="fa fa-star-o"
                                placeholderSymbol={fullSymbol}
                                placeholderRating={rating}
                                readonly
                            />
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={4} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Paper elevation={3} sx={{ py: 6, width: '90%' }}>
                        <TypoMed gutterBottom>
                            Place Your Order
                        </TypoMed>
                        <p className="lines"></p>
                        <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <TextField
                                onChange={handleInputChange}
                                type="text"
                                name="name"
                                sx={{ width: '80%', my: 2 }}
                                id="standard-basic"
                                label="Name"
                                defaultValue={user.displayName}
                                variant="standard"
                            />
                            <TextField
                                onChange={handleInputChange}
                                type="email"
                                name="email"
                                sx={{ width: '80%', my: 2 }}
                                id="standard-basic"
                                label="Email"
                                defaultValue={user.email}
                                variant="standard"
                            />
                            <TextField
                                onBlur={handleInputChange}
                                type="text"
                                name="address"
                                sx={{ width: '80%', my: 2 }}
                                id="standard-basic"
                                label="Address"
                                variant="standard"
                                required
                            />
                            <TextField
                                onBlur={handleInputChange}
                                type="text"
                                name="phone"
                                sx={{ width: '80%', my: 2 }}
                                id="standard-basic"
                                label="Phone"
                                variant="standard"
                                required
                            />
                            <MuiButton2 sx={{ width: '80%', my: 2 }} type="submit" className="shadow">Continue</MuiButton2>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Container >
    );
};

export default PlaceOrder;