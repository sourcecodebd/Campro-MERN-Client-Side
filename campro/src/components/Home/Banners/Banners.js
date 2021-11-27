import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './Banner.css';
import { BannerButton } from '../../StyledComponents/BannerButton';
import { Link } from 'react-router-dom';

const Banners = () => {
    const [banners, setBanners] = useState([]);
    useEffect(() => {
        fetch(`https://desolate-woodland-29933.herokuapp.com/cameras/explore`)
            .then(res => res.json())
            .then(data => setBanners(data));
    }, []);

    const prev = `<i class="fas fa-backward text-white p-2 rounded-pill"></i>`;
    const next = `<i class="fas fa-forward text-white p-2 rounded-pill"></i>`;
    const options = {
        margin: 30,
        responsiveClass: true,
        nav: true,
        navText: [prev, next],
        autoplay: true,
        smartSpeed: 2000,
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 1,
            },
            600: {
                items: 1,
            },
            700: {
                items: 1,
            },
            1000: {
                items: 1,
            }
        },
    };
    /*  */

    const bgStyle = {
        backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    }
    const backgroundStyle = {
        backgroundImage: `URL('./campro_products/Canon-EOS-250D-DSLR-Camera-with-18-55mm-IS-STM-Lens-2-Black.jpg')`,
        backgroundSize: 'fit-content',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        paddingTop: 1,
        minHeight: '80vh',
        backgroundColor: 'rgba(45, 58, 74, 0.8)',
        backgroundBlendMode: 'darken, multiply',
        clipPath: 'circle(50%)'
    }

    return (
        <div className="bg-orange" style={{ boxShadow: 'rgba(0.6, 0.6, 0.6, 0.6) 2px 4px 8px' }}>
            <div style={backgroundStyle}>
                <Container>
                    {
                        banners.length === 0 ?
                            <div className="d-flex justify-content-evenly align-items-center mx-auto" style={{ minHeight: "90vh" }}>
                                <img src="./Campro-loader.gif" className="img-fluid col-md-2 col-6 mx-auto" alt="" />
                            </div>
                            :
                            <Grid container spacing={{ xs: 0, md: 0.5 }} columns={{ xs: 6, sm: 8, md: 8 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Grid item xs={6} md={4} className="mt-1">


                                    <div id="banner">
                                        <OwlCarousel className='owl-theme' autoPlay={true} loop nav {...options} style={bgStyle}>
                                            {
                                                banners?.map(({ id, camera, description, img_url }) =>
                                                    <div className='d-flex justify-content-end flex-column align-items-center col-12' key={id} style={{ height: '420px' }}>
                                                        <div style={{ backgroundImage: `url(${img_url})`, backgroundPosition: "center", backgroundSize: "cover", height: '400px', width: '100%' }} className="col-md-6">
                                                            <div className="bg-blur py-2" style={{ height: 150 }}>
                                                                <h6 className="fw-bold">{camera}</h6>
                                                                <small className="font-small">{Array.isArray(description) ? description[0].desc.slice(0, 150) + ' ...' : description.slice(0, 150) + ' ...'}</small>
                                                                <br />
                                                                <Link to="/explore">
                                                                    <BannerButton variant="contained" className="mt-3">Explore</BannerButton>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>

                                                )
                                            }
                                        </OwlCarousel>
                                    </div>

                                </Grid>
                                <Grid container item xs={6} md={2} className="d-flex justify-content-center align-items-center mt-1">
                                    <Grid container item xs={12} md={12}>
                                        <Grid item xs={3} md={12}>
                                            <img src="./banner-girl.jpg" width="420" style={{ height: '100%' }} className="img-fluid" alt="" />
                                        </Grid>
                                        <Grid item xs={3} md={12}>
                                            <video width="420" src="./campro_discount.mp4" type="video/mp4" className="img-fluid" autoplay="" loop muted>
                                            </video>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid >
                    }
                </Container >
            </div>
        </div>
    );
};

export default Banners;