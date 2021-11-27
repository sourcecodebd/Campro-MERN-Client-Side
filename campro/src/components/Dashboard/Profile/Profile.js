import { Container, Grid, Paper, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { TypoMed, TypoSmall } from '../../StyledComponents/Typo';
import { Badge, Button } from 'react-bootstrap'

const Profile = () => {
    const { firebase } = useAuth();
    const { user } = firebase;

    const [profile, setProfile] = useState({});
    useEffect(() => {
        fetch(`https://desolate-woodland-29933.herokuapp.com/user?email=${user.email}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('idToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setProfile(data));
    }, [user.email]);

    return (
        <Container sx={{ my: 5 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 8, md: 8 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid item xs={6} sm={4} md={4}>
                    <Paper elevation={3} sx={{ py: 5, px: 2 }} className="bg-orange text-white">
                        {
                            user.photoURL ?
                                <img src={user.photoURL} className="img-fluid rounded-3" alt="" />
                                :
                                <i className="fas fa-user fa-5x blue border border-white p-2 bg-white rounded-3"></i>
                        }
                        <TypoMed sx={{ mb: 2, color: 'yellow !important' }}>{user.displayName}</TypoMed>
                        <div className="overflow-auto">
                            <Button variant="light">
                                ID: <Badge bg="dark">{profile._id}</Badge>
                                <span className="visually-hidden">unread messages</span>
                            </Button>
                        </div>
                        <TypoSmall sx={{ my: 2 }}>Logged In Email: {user.email}</TypoSmall>
                        <Typography>
                            <span className="fw-bold">Joined At: </span>
                            <Badge bg="warning">{profile.joinedAt ? profile.joinedAt : new Date().toDateString()}</Badge>

                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container >
    );
};

export default Profile;