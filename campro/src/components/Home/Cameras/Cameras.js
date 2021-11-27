import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import Camera from '../Camera/Camera';
import { TypoLarge } from '../../StyledComponents/Typo';
import { BannerButton } from '../../StyledComponents/BannerButton';
import { Link } from 'react-router-dom';

const Cameras = () => {
    const [cameras, setCameras] = useState([]);
    useEffect(() => {
        fetch(`https://desolate-woodland-29933.herokuapp.com/cameras/home`)
            .then(res => res.json())
            .then(data => setCameras(data));
    }, []);

    return (
        <Container>
            <TypoLarge className="mt-5">Cameras</TypoLarge>
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
            <Link to='/explore'>
                <BannerButton className="mt-5">
                    View More
                </BannerButton>
            </Link>
        </Container>
    );
};

export default Cameras;