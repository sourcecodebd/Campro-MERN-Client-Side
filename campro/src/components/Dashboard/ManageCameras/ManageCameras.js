import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { LinearProgress, Stack } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import { Table } from 'react-bootstrap';
import ManageCamera from '../ManageCamera/ManageCamera';
import swal from 'sweetalert';
import { TypoMed } from '../../StyledComponents/Typo';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ManageCameras = () => {
    // MUI Snackbar starts
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    // MUI Snackbar ends

    const [cameras, setCameras] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const { firebase } = useAuth();
    const { success, setSuccess, error, setError, open, setOpen } = firebase;
    useEffect(() => {
        fetch('https://desolate-woodland-29933.herokuapp.com/cameras/explore')
            .then(res => res.json())
            .then(data => {
                setCameras(data);
            })
    }, [deleted])

    const handleDeleteCamera = id => {
        const safeMsg = document.createElement("div");
        safeMsg.innerHTML =
            `<div class="d-flex justify-content-center align-items-center gap-2" style="transform: translateY(30px)">
                <i class="fas fa-user-shield"></i>
                Your Product is safe!
            </div>`;

        new swal({
            title: "Are you sure?",
            text: "Once removed, you won't be able to recover this product!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`https://desolate-woodland-29933.herokuapp.com/camera/delete/${id}`, {
                        method: 'DELETE',
                        headers: { "content-type": "application/json" }
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount) {
                                setSuccess(`Camera Model has been removed successfully!`);
                                setOpen(true);
                                setDeleted(true);
                            }
                            else {
                                setDeleted(false);
                                setError(``);
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
                        <TypoMed className="mb-2">Manage Cameras</TypoMed>
                        <p className="lines mb-3"></p>
                        {
                            cameras.length === 0 ?
                                <Stack sx={{ width: '100%', color: 'grey.500', minHeight: '100vh' }} spacing={2}>
                                    <LinearProgress color="secondary" />
                                </Stack>
                                :
                                <Table responsive className="overflow-auto">
                                    <thead>
                                        <tr>
                                            <th>Camera</th>
                                            <th>Model</th>
                                            <th>Price</th>
                                            <th>Rating</th>
                                            <th>Camera Manage</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            cameras.map(cam => <ManageCamera cam={cam} key={cam._id} handleDeleteCamera={handleDeleteCamera} />)
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

export default ManageCameras;