import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import NavBar from '../../Shared/Header/NavBar/NavBar';
import Banners from '../Banners/Banners';
import Cameras from '../Cameras/Cameras';
import Contacts from '../Contacts/Contacts';
import Reviews from '../Reviews/Reviews';

const Home = () => {
    return (
        <div>
            <NavBar />
            <Banners />
            <Cameras />
            <Reviews />
            <Contacts />
            <Footer />
        </div>
    );
};

export default Home;