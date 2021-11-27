import { Container, Grid, Paper, TextField, Snackbar, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import VanillaTilt from 'vanilla-tilt';
import useAuth from '../../../hooks/useAuth';
import { MuiButton } from '../../StyledComponents/MuiButton';
import { TypoLarge, TypoSmall } from '../../StyledComponents/Typo';
import MuiAlert from '@mui/material/Alert';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
    // MUI Snackbar starts
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    // MUI Snackbar ends

    const { firebase } = useAuth();
    const { user, signInUsingGoogle, signInUsingEmail, saveUser, resetUserPassword, open, setOpen, success, setSuccess, error, setError } = firebase;
    const location = useLocation();
    const history = useHistory();
    const destination = location?.state?.from || '/';

    const [loginData, setLoginData] = useState({});
    const handleInputChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    const handleEmailLogin = e => {
        signInUsingEmail(loginData.email, loginData.password)
            .then(result => {
                if (result.user.emailVerified || result.user.email === 'admin@admin.com') {
                    setSuccess('Logged In Successfully!');
                    setError('');
                    setOpen(true);
                    setTimeout(() => {
                        history.replace(destination);
                    }, 1000);
                }
                else {
                    setError('Verify your email address to get access to your account!');
                    setSuccess('');
                    setOpen(true);
                }
            })
            .catch(err => {
                setSuccess('');
                console.log(err.code);
                setError(err.code);
                setOpen(true);
            })
        e.preventDefault();
    }
    const handleResetPassword = () => {
        resetUserPassword(loginData.email);
    }

    console.log(user.email, user.displayName)
    const handleGoogleLogin = () => {
        signInUsingGoogle()
            .then(result => {
                saveUser(result.user.displayName, result.user.email, 'PUT');
                setSuccess('Logged In Successfully!');
                setError('');
                setOpen(true);
                setTimeout(() => {
                    history.replace(destination);
                }, 1000);
            })
            .catch(err => {
                setSuccess('');
                setError(err.code);
                setOpen(true);
            })
    }

    useEffect(() => {
        VanillaTilt.init(document.querySelectorAll(".js-tilt-login"), {
            max: 5,
            speed: 50
        });
        VanillaTilt.init(document.querySelectorAll(".js-tilt"), {
            max: 50,
            speed: 1000
        });

    }, []);

    const destroyTilt = () => {
        const element = document.querySelector(".js-tilt-login");
        VanillaTilt.init(element);
        element.vanillaTilt.destroy();
    }

    return (

        <div style={{ backgroundImage: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)", minHeight: '103vh' }}>
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
                    <Grid onClick={destroyTilt} item xs={12} sm={12} md={6} className="js-tilt-login" sx={{ marginTop: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Paper elevation={3} sx={{ py: 5, width: '90%' }}>
                            <TypoLarge gutterBottom>
                                Sign In
                            </TypoLarge>
                            <p className="lines"></p>
                            <form onSubmit={handleEmailLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                                <Button onClick={handleResetPassword} sx={{ textDecoration: 'underline', color: '#1DB4F6' }}>
                                    Forgot Password? Reset Now
                                </Button>
                                <MuiButton sx={{ width: '80%', my: 2 }} type="submit" className="shadow">Login</MuiButton>
                            </form>
                            <button onClick={handleGoogleLogin} className="bg-danger rounded-custom text-white border-0 shadow" style={{ caretColor: 'transparent' }}><i className="fab fa-google fa-2x d-flex justify-content-center align-items-center"></i></button>
                            <Link to='/register'><TypoSmall sx={{ mt: 2 }}>New User? Register Now</TypoSmall></Link>
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

export default Login;