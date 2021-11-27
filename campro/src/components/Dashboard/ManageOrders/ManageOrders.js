import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { LinearProgress, Stack } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import { Table } from 'react-bootstrap';
import ManageOrder from '../ManageOrder/ManageOrder';
import swal from 'sweetalert';
import { TypoMed } from '../../StyledComponents/Typo';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ManageOrders = () => {
    // MUI Snackbar starts
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    // MUI Snackbar ends

    const [orders, setOrders] = useState([]);
    const [approved, setApproved] = useState(false);
    // const [deleted, setDeleted] = useState(false);
    const { firebase } = useAuth();
    const { success, setSuccess, error, open, setOpen } = firebase;
    useEffect(() => {
        fetch('https://desolate-woodland-29933.herokuapp.com/orders')
            .then(res => res.json())
            .then(data => {
                setOrders(data);
            })
    }, [orders, approved])

    const handleApprove = order => {
        const newOrder = {};
        newOrder.status = 'Approved';
        fetch(`https://desolate-woodland-29933.herokuapp.com/manage-order/approve/${order._id}`, {
            method: 'PUT',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newOrder)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    setSuccess('Order has been approved successfully!');
                    setOpen(true);
                    setApproved(true);
                }
                else {
                    setApproved(false);
                }
            })
    }

    const handleDeleteOrder = id => {
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
                    fetch(`https://desolate-woodland-29933.herokuapp.com/order/delete/${id}`, {
                        method: 'DELETE',
                        headers: { "content-type": "application/json" }
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount === 1) {
                                setSuccess(`Customer's order has been cancelled successfully!`);
                                setOpen(true);
                                const remaining = orders.filter(order => order._id !== id);
                                setOrders(remaining);
                                // setDeleted(true);
                            }
                        })
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
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>
            }
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 8, md: 12 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid item xs={6} sm={8} md={12}>
                    <Paper elevation={3} sx={{ py: 5 }}>
                        <TypoMed className="mb-2">Manage Orders</TypoMed>
                        <p className="lines mb-3"></p>
                        {
                            orders.length === 0 ?
                                <Stack sx={{ width: '100%', color: 'grey.500', minHeight: '100vh' }} spacing={2}>
                                    <LinearProgress color="secondary" />
                                </Stack>
                                :
                                <Table responsive className="overflow-auto">
                                    <thead>
                                        <tr>
                                            <th>Camera</th>
                                            <th>Model</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Status</th>
                                            <th>Order Manage</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            orders.map(order => <ManageOrder order={order} key={order._id} handleApprove={handleApprove} handleDeleteOrder={handleDeleteOrder} />)
                                        }

                                    </tbody>
                                </Table>
                        }
                    </Paper>
                </Grid>
            </Grid>
        </Container >
    );
};

export default ManageOrders;