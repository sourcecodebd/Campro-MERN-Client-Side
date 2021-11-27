import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import Camera from '../ExploreCamera/ExploreCamera';
import { TypoLarge } from '../../StyledComponents/Typo';

const ExploreCameras = () => {
    const [cameras, setCameras] = useState([]);
    useEffect(() => {
        fetch(`https://desolate-woodland-29933.herokuapp.com/cameras/explore`)
            .then(res => res.json())
            .then(data => setCameras(data));
    }, []);

    return (
        <Container sx={{ mb: 5 }}>
            <TypoLarge className="mt-5">Explore Our Cameras</TypoLarge>
            <p className="lines mt-2 mb-5"></p>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 6, sm: 8, md: 12 }}>
                {
                    cameras.length === 0 ?
                        <div className="d-flex justify-content-evenly align-items-center mx-auto" style={{ minHeight: "90vh" }}>
                            <img src="https://cdn.dribbble.com/users/553759/screenshots/2340102/11_8---little-loader.gif" className="img-fluid col-md-2 col-6 mx-auto" alt="" />
                        </div>
                        :
                        cameras?.map(cam => <Camera cam={cam} key={cam.id} />)
                }
            </Grid>
        </Container>
    );
};

export default ExploreCameras;