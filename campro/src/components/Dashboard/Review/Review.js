import React, { useState } from 'react';
import { Container, Grid, Paper, TextField, Snackbar, Rating, ListItem, } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useHistory } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { TypoMed, TypoSmall } from '../../StyledComponents/Typo';
import { BannerButton } from '../../StyledComponents/BannerButton';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Review = () => {
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
    const { user, success, setSuccess, error, setError, open, setOpen } = firebase;

    const [reviewData, setReviewData] = useState({ name: user.displayName, email: user.email, comment: '' });
    const handleInputChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newReview = { ...reviewData, rating };
        console.log(reviewData)
        newReview[field] = value;
        setReviewData(newReview);
    }
    const { photoURL } = user;
    const profilePhoto = 'fas fa-user';

    const history = useHistory();
    const handleSubmitReview = e => {
        const newDate = new Date();
        const reviewedAt = newDate.toLocaleDateString();
        let reviewGiven;
        if (photoURL) {
            reviewGiven = { ...reviewData, reviewedAt, photoURL }
        }
        else {
            reviewGiven = { ...reviewData, reviewedAt, profilePhoto }
        }

        fetch(`https://desolate-woodland-29933.herokuapp.com/review/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewGiven)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setSuccess('Your Review sent successfully!');
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

    console.log('rating', rating)

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
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 8, md: 12 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid item xs={6} sm={8} md={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Paper elevation={3} sx={{ py: 6, width: '100%', backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
                        <TypoMed className="text-white" gutterBottom>
                            Give Your Valuable Review
                        </TypoMed>
                        <p className="lines-charm"></p>
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
                                    Give 5 star rating*
                                </TypoSmall>
                                <Rating
                                    value={rating}
                                    onChange={(event, newValue) => {
                                        setRating(newValue);
                                    }}
                                />

                            </ListItem>
                        </Paper>
                        <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                            <textarea
                                row="7"
                                onBlur={handleInputChange}
                                type="text"
                                name="comment"
                                style={{
                                    width: '80%', my: 2, backgroundColor: 'white', outline: 'none', height: 200, borderRadius: '5px'
                                }}
                                placeholder="Comment"
                            />
                            <BannerButton sx={{ width: '80%', my: 2 }} type="submit" className="shadow">Continue</BannerButton>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Container >
    );
};

export default Review;