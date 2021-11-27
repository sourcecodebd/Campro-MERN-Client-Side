import React from 'react';
import NavBar from './NavBar/NavBar';

const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), URL('./campro_product/Canon-EOS-250D-DSLR-Camera-with-18-55mm-IS-STM-Lens-2-Black.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
}

const Header = () => {
    return (
        <div style={backgroundStyle}>
            <NavBar />
        </div>
    );
};

export default Header;