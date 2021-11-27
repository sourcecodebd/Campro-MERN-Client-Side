import React, { useState, useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './Reviews.css';
import { TypoLarge } from '../../StyledComponents/Typo';
import { Rating } from '@mui/material';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch(`https://desolate-woodland-29933.herokuapp.com/reviews`)
            .then(res => res.json())
            .then(data => setReviews(data));
    }, []);

    const prev = `<i class="fas fa-backward bg-blue text-white p-2 rounded-pill"></i>`;
    const next = `<i class="fas fa-forward bg-blue text-white p-2 rounded-pill"></i>`;
    const options = {
        margin: 30,
        responsiveClass: true,
        nav: true,
        autoplay: true,
        navText: [prev, next],
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 1,
            },
            600: {
                items: 2,
            },
            700: {
                items: 3,
            },
            1000: {
                items: 4,
            }
        },
    };
    /*  */

    return (
        <div>
            {
                reviews.length === 0 ?
                    <div className="d-flex justify-content-evenly align-items-center mx-auto" style={{ minHeight: "90vh" }}>
                        <img src="https://cdn.dribbble.com/users/553759/screenshots/2340102/11_8---little-loader.gif" className="img-fluid col-md-2 col-6 mx-auto" alt="" />
                    </div>
                    :
                    <div id="review">
                        <TypoLarge className="mt-5">Customer Reviews</TypoLarge>
                        <p className="lines mt-2 mb-5"></p>
                        <OwlCarousel className='owl-theme' autoplay={true} loop nav {...options}>
                            {
                                reviews?.map((review, i) =>
                                    /* <div className='d-flex justify-content-end flex-column align-items-center col-12' style={{ background: `linear-gradient(rgba(0.1, 0.1, 0.1, 0.1),rgba(255, 255, 255, 0.9)), url(${img})` }}>
                                        <div className="bg-blur p-md-3 m-md-3 shadow">
                                            <img src={img} className="rounded-custom" alt="" />
                                            <h6 className="fw-bold text-light">{title}</h6>
                                            <small className="font-small">{desc}</small>
                                        </div>
                                    </div> */

                                    <div className="review-container" key={review._id}>
                                        <div className="reviews">
                                            <div className="review-img">
                                                {
                                                    review.photoURL ?
                                                        <img src={review.photoURL} width="120px" height="120px" alt="" />
                                                        :
                                                        <i style={{ marginBottom: 22 }} className={review.profilePhoto + ' fa-6x'}></i>
                                                }
                                            </div>
                                            <div className="review-body shadow">
                                                <div className="review-text">
                                                    <h6 className="fw-bold mt-5" style={{ height: '30px' }}>{review.name}</h6>
                                                    <Rating name="read-only" value={review.rating} readOnly />
                                                    <div className="review-desc overflow-auto text-center">
                                                        <small className="font-small">{review.comment.slice(0, 140)}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </OwlCarousel>
                    </div>
            }
        </div>
    );
};

export default Reviews;