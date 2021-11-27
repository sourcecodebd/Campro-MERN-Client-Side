import React, { useState } from 'react';
import { Container, Grid, Paper, TextField, Snackbar, Rating, ListItem } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useHistory } from 'react-router';

import useAuth from '../../../hooks/useAuth';
import { MuiButton2 } from '../../StyledComponents/MuiButton2';
import { TypoMed, TypoSmall } from '../../StyledComponents/Typo';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddCamera = () => {
    // MUI Snackbar starts
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    // MUI Snackbar ends
    const [rating, setRating] = React.useState(2);

    const { firebase } = useAuth();
    const { success, setSuccess, error, setError, open, setOpen } = firebase;

    const [cameraData, setCameraData] = useState({});
    const handleInputChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newCamera = { ...cameraData };
        newCamera[field] = value;
        setCameraData(newCamera);
    }

    const history = useHistory();
    const handleAddCamera = e => {
        const key = Math.random().toString(36).substr(2, 11);
        const newDate = new Date();
        const date = newDate.toLocaleDateString();
        const colors = [
            'red',
            'limegreen',
            'darkblue',
            'green',
            'rgb(44, 100, 255)',
            'grey',
            'rgb(223, 132, 13)',
            'rgb(173, 3, 173)'
        ]
        const random_color = colors[Math.floor(Math.random() * 8)];

        const newCamera = { ...cameraData, key, rating, date, random_color }

        fetch(`https://desolate-woodland-29933.herokuapp.com/camera/add/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCamera)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setSuccess('Camera added successfully!');
                    setError('');
                    setOpen(true);
                    e.target.reset();
                    setTimeout(() => {
                        history.push('/home');
                    }, 1000)
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
                            Add Camera
                        </TypoMed>
                        <p className="lines"></p>
                        <Paper
                            className="mx-auto d-md-flex"
                            sx={{
                                width: 'fit-content',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                listStyle: 'none',
                                p: 0.5,
                                mt: 3,
                            }}
                            component="ul"
                        >
                            <ListItem className="d-flex flex-column">
                                <TypoSmall className="mx-auto">
                                    Enter Rating*
                                </TypoSmall>
                                <Rating
                                    value={rating}
                                    onChange={(event, newValue) => {
                                        setRating(newValue);
                                    }}
                                />

                            </ListItem>
                        </Paper>
                        <form onSubmit={handleAddCamera} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <TextField
                                onBlur={handleInputChange}
                                type="text"
                                name="camera"
                                sx={{ width: '80%', my: 2 }}
                                id="standard-basic"
                                label="Camera"
                                variant="standard"
                                required
                            />
                            <TextField
                                onBlur={handleInputChange}
                                type="number"
                                name="price"
                                sx={{ width: '80%', my: 2 }}
                                id="standard-basic"
                                label="Price"
                                variant="standard"
                                required
                            />
                            <TextField
                                onBlur={handleInputChange}
                                type="number"
                                name="rating_count"
                                sx={{ width: '80%', my: 2 }}
                                id="standard-basic"
                                label="Rating Count"
                                variant="standard"
                                required
                            />
                            <TextField
                                onBlur={handleInputChange}
                                type="text"
                                name="description"
                                sx={{ width: '80%', my: 2 }}
                                id="standard-basic"
                                label="Description"
                                variant="standard"
                                required
                            />
                            <TextField
                                onBlur={handleInputChange}
                                type="text"
                                name="img_url"
                                sx={{ width: '80%', my: 2 }}
                                id="standard-basic"
                                label="Enter Image URL"
                                variant="standard"
                                required
                            />
                            <TextField
                                onBlur={handleInputChange}
                                type="text"
                                name="tag"
                                sx={{ width: '80%', my: 2 }}
                                id="standard-basic"
                                label="Tag"
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

export default AddCamera;