import { Container, Grid, Paper, TextField, Snackbar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import VanillaTilt from 'vanilla-tilt';
import useAuth from '../../../hooks/useAuth';
import { TypoLarge, TypoSmall } from '../../StyledComponents/Typo';
import MuiAlert from '@mui/material/Alert';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { MuiButton2 } from '../../StyledComponents/MuiButton2';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Register = () => {
    // MUI Snackbar starts
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    // MUI Snackbar ends

    const { firebase } = useAuth();
    const { signUpUsingEmail, updateUserName, saveUser, verifyEmail, open, setOpen, success, setSuccess, error, setError } = firebase;
    const history = useHistory();
    const destination = '/login';

    const [registerData, setRegisterData] = useState({});
    const handleInputChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newRegisterData = { ...registerData };
        newRegisterData[field] = value;
        setRegisterData(newRegisterData);
    }
    const handleEmailRegister = e => {
        signUpUsingEmail(registerData.email, registerData.password)
            .then(result => {
                saveUser(registerData.name, registerData.email, 'POST');
                setSuccess('Registered Successfully!');
                setError('');
                updateUserName(registerData.name);
                setOpen(true);
                verifyEmail();
                setTimeout(() => {
                    setSuccess('Verification mail sent to your email address!');
                }, 1000)
                setTimeout(() => {
                    history.replace(destination);
                }, 3000);
            })
            .catch(err => {
                setSuccess('');
                console.log(err.code);
                setError(err.code);
                setOpen(true);
            })
        e.preventDefault();
    }

    useEffect(() => {
        VanillaTilt.init(document.querySelectorAll(".js-tilt-register"), {
            max: 5,
            speed: 50
        });
        VanillaTilt.init(document.querySelectorAll(".js-tilt"), {
            max: 50,
            speed: 1000
        });

    }, []);

    const destroyTilt = () => {
        const element = document.querySelector(".js-tilt-register");
        VanillaTilt.init(element);
        element.vanillaTilt.destroy();
    }

    return (
        <div style={{ backgroundImage: "linear-gradient(to top left, #d129a3,  #6c43b5, #1048b0)", minHeight: '103vh' }}>
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
                <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid onClick={destroyTilt} item xs={12} sm={12} md={6} className="js-tilt-register" sx={{ marginTop: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Paper elevation={3} sx={{ py: 6, width: '90%' }}>
                            <TypoLarge gutterBottom>
                                Sign Up
                            </TypoLarge>
                            <p className="lines"></p>
                            <form onSubmit={handleEmailRegister} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <TextField
                                    onBlur={handleInputChange}
                                    type="text"
                                    name="name"
                                    sx={{ width: '80%', my: 2 }}
                                    id="standard-basic"
                                    label="Name"
                                    variant="standard"
                                />
                                <TextField
                                    onBlur={handleInputChange}
                                    type="email"
                                    name="email"
                                    sx={{ width: '80%', my: 2 }}
                                    id="standard-basic"
                                    label="Email"
                                    variant="standard"
                                />
                                <TextField
                                    onBlur={handleInputChange}
                                    type="password"
                                    name="password"
                                    sx={{ width: '80%', my: 2 }}
                                    id="standard-basic"
                                    label="Password"
                                    variant="standard"
                                />
                                <MuiButton2 sx={{ width: '80%', my: 2 }} type="submit" className="shadow">Register</MuiButton2>
                            </form>
                            <Link to='/login'><TypoSmall sx={{ mt: 2 }}>Already Registered? Login Now</TypoSmall></Link>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} className="js-tilt" sx={{ margin: 'auto', caretColor: 'transparent' }}>
                        <img src="./campro.png" className="img-fluid rounded-pill shadow-lg" alt="IMG" data-tilt />
                    </Grid>
                </Grid>
            </Container >
        </div>
    );
};

export default Register;