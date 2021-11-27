import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import NavBar from '../../Shared/Header/NavBar/NavBar';
import ExploreCameras from '../ExploreCameras/ExploreCameras';


const Explore = () => {
    return (
        <div>
            <NavBar />
            <ExploreCameras />
            <Footer />
        </div>
    );
};

export default Explore;