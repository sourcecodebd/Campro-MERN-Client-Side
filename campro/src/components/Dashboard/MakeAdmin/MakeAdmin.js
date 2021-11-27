import React, { useState } from 'react';
import { Container, Grid, Paper, TextField, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import useAuth from '../../../hooks/useAuth';
import { MuiButton2 } from '../../StyledComponents/MuiButton2';
import { TypoMed } from '../../StyledComponents/Typo';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MakeAdmin = () => {
    // MUI Snackbar starts
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    // MUI Snackbar ends
    const { firebase } = useAuth();
    const { token, success, setSuccess, error, setError, open, setOpen } = firebase;

    const [adminData, setAdminData] = useState({});
    const handleInputChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newAdminData = { ...adminData };
        newAdminData[field] = value;
        setAdminData(newAdminData);
    }

    const handleAddAdmin = e => {
        const newAdmin = { ...adminData }

        fetch(`https://desolate-woodland-29933.herokuapp.com/admin/add`, {
            method: 'PUT',
            headers: {
                "content-type": "application/json",
                'authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(newAdmin)
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
                else if (res.status === 401) {
                    return res.json();
                }
            })
            .then(data => {
                if (data.modifiedCount > -1) {
                    setSuccess('You have successfully Added an Admin!');
                    setError('');
                    setOpen(true);
                }
                else if (data.message) {
                    setSuccess('');
                    setError(data.message);
                    setOpen(true);
                }
            })

        e.preventDefault();
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
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 8, md: 8 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid item xs={6} sm={4} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Paper elevation={3} sx={{ py: 6, width: '90%' }}>
                        <TypoMed gutterBottom>
                            Add Admin
                        </TypoMed>
                        <p className="lines"></p>
                        <form onSubmit={handleAddAdmin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <TextField
                                onBlur={handleInputChange}
                                type="text"
                                name="name"
                                sx={{ width: '80%', my: 2 }}
                                id="standard-basic"
                                label="New Admin Name"
                                variant="standard"
                                required
                            />
                            <TextField
                                onBlur={handleInputChange}
                                type="email"
                                name="email"
                                sx={{ width: '80%', my: 2 }}
                                id="standard-basic"
                                label="Email"
                                variant="standard"
                                required
                            />
                            <MuiButton2 sx={{ width: '80%', my: 2 }} type="submit" className="shadow">Continue</MuiButton2>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MakeAdmin;