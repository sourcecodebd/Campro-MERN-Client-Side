import React, { useState } from 'react';
import { Container, Grid, Paper, TextField, Snackbar, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { MuiButton2 } from '../../StyledComponents/MuiButton2';
import useAuth from '../../../hooks/useAuth';
import './Contacts.css';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Contacts = () => {
    // MUI Snackbar starts
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    // MUI Snackbar ends

    const { firebase } = useAuth();
    const { user, success, setSuccess, error, setError, open, setOpen } = firebase;
    const [messageData, setMessageData] = useState({});
    const handleInputChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newMessage = { ...messageData };
        newMessage[field] = value;
        setMessageData(newMessage);
    }
    const { photoURL } = user;
    const profilePhoto = 'fas fa-user';

    const handleContact = e => {
        let message;
        if (photoURL) {
            message = { ...messageData, photoURL }
        }
        else {
            message = { ...messageData, profilePhoto }
        }
        fetch(`https://desolate-woodland-29933.herokuapp.com/message/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setSuccess('Your Message sent successfully!');
                    setError('');
                    setOpen(true);
                    e.target.reset();
                }
            })

        e.preventDefault();
    }

    const bgStyle = {
        background: `URL('./campro_products/Canon-EOS-250D-DSLR-Camera-with-18-55mm-IS-STM-Lens-2-Black.jpg')`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(45, 58, 74, 0.8)',
        backgroundBlendMode: 'darken, multiply'
    }
    return (
        <div>
            <Container sx={{ mb: 6 }}>
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
                <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item xs={12} sm={8} md={6} sx={{ marginTop: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Paper elevation={3} sx={{ py: 6, width: '100%' }} style={bgStyle}>
                            <Typography variant="h4" sx={{ color: 'white' }} gutterBottom>
                                Send Message to Admin
                            </Typography>
                            <p className="lines-charm"></p>
                            <form onSubmit={handleContact} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <TextField
                                    onBlur={handleInputChange}
                                    type="text"
                                    name="name"
                                    sx={{ width: '80%', my: 2, backgroundColor: 'white', borderRadius: '5px' }}
                                    id="standard-basic"
                                    label="Name"
                                    variant="standard"
                                    required
                                />
                                <TextField
                                    onBlur={handleInputChange}
                                    type="email"
                                    name="email"
                                    sx={{ width: '80%', my: 2, backgroundColor: 'white', borderRadius: '5px' }}
                                    id="standard-basic"
                                    label="Email"
                                    variant="standard"
                                    required
                                />
                                <textarea
                                    row="7"
                                    onBlur={handleInputChange}
                                    type="text"
                                    name="message"
                                    style={{
                                        width: '80%', my: 2, backgroundColor: 'white', outline: 'none', height: 200, borderRadius: '5px'
                                    }}
                                    placeholder="Message"
                                    required
                                />
                                <MuiButton2 sx={{ width: '80%', my: 2 }} type="submit" className="shadow">Proceed</MuiButton2>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </Container >
        </div >
    );
};

export default Contacts;