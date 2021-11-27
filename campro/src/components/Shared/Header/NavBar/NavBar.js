import React, { useState, useEffect } from 'react';
import { Button, IconButton } from '@mui/material';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import { MuiButton } from '../../../StyledComponents/MuiButton';
import { pressOnBar } from '../Nav';
import './NavBar.css';


const NavBar = () => {
    const StyledBadge = styled(Badge)(({ theme }) => ({
        color: 'black',
        '& .MuiBadge-badge': {
            right: -3,
            top: 3,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    const activeStyles = {
        backgroundImage: 'linear-gradient(to bottom right, #f61d8e, #d129a3, #a439b0, #6c43b5, #1048b0)',
        color: 'white',
        lineHeight: '60px',
        width: 'fit-content',
        padding: '0 10px'
    }
    const mobileNavBg = {
        backgroundImage: `url('/campro_products/Canon-EOS-200D-mark-II-DSLR-Camera.jpg')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: 'fit-content'
    }
    const { firebase } = useAuth();
    const { user, logOut, admin } = firebase;

    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch(`https://desolate-woodland-29933.herokuapp.com/my-orders?email=${user?.email}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('idToken')}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
                else if (res.status === 401) {
                    return res.json();
                }
            })
            .then(data => setOrders(data));
    }, [user?.email])

    const quantityReducer = (prev, curr) => prev + curr.quantity;
    const totalQuantity = Array.isArray(orders) ? orders?.reduce(quantityReducer, 0) : "0";
    console.log(totalQuantity);

    return (
        <div id="header">
            <div className="navbar-main">
                <div className="navbar-logo">
                    <a href="/"><img src="./campro-logo.png" width="130px" style={{ caretColor: 'transparent' }} className="img-fluid" alt="." /></a>
                </div>
                <nav>
                    <div className="nav">
                        <li><NavLink to='/search' activeStyle={activeStyles}><i className="fas fa-search"></i></NavLink></li>
                        <li><NavLink to='/home' activeStyle={activeStyles}>Home</NavLink></li>
                        <li><NavLink to='/explore' activeStyle={activeStyles}>Explore</NavLink></li>
                        <li><NavLink to='/dashboard' activeStyle={activeStyles}>Dashboard</NavLink></li>
                        {
                            admin ?
                                <NavLink to='/dashboard/manage-orders' style={{ padding: '0 10px', marginTop: 10 }}>
                                    <IconButton aria-label="cart">
                                        <StyledBadge badgeContent={!totalQuantity ? 0 : totalQuantity} color="secondary">
                                            <ShoppingCartIcon sx={{ fontSize: '30px !important' }} />
                                        </StyledBadge>
                                    </IconButton>
                                </NavLink>
                                :
                                <Link to='/dashboard/my-orders' style={{ padding: '0 10px', marginTop: 10 }}>
                                    <IconButton aria-label="cart">
                                        <StyledBadge badgeContent={!totalQuantity ? 0 : totalQuantity} color="secondary">
                                            <ShoppingCartIcon sx={{ fontSize: '30px !important' }} />
                                        </StyledBadge>
                                    </IconButton>
                                </Link>
                        }
                        {
                            admin &&
                            <div className="d-flex justify-content-center align-items-center">
                                <li><NavLink to='/dashboard/manage-orders' activeStyle={activeStyles}>Admin</NavLink></li>
                            </div>
                        }

                        {
                            (user?.email || user?.displayName) ?
                                <div className="d-flex">
                                    <li>
                                        {user?.displayName}
                                        {
                                            user.photoURL ?
                                                <img src={user?.photoURL} width="30px" className=" rounded-pill border-6 ms-4" alt={user?.displayName} />
                                                :
                                                <i className="fas fa-user ms-2"></i>
                                        }
                                    </li>
                                    <li>
                                        <Button onClick={logOut} variant="contained" className="bg-danger"><i className="fas fa-sign-out-alt me-2"></i> Logout</Button>
                                    </li>
                                </div>

                                :
                                <li>
                                    <NavLink to='/login'>
                                        <MuiButton variant="contained"><i className="fas fa-sign-in-alt me-2"></i> Login</MuiButton>
                                    </NavLink>
                                </li>
                        }
                    </div>
                    <i onClick={pressOnBar} className="fas fa-bars fa-2x" id="menubar"></i>
                </nav>
            </div >
            <div className="mobile-nav mt-3" style={mobileNavBg}>
                <div className="bg-blur">
                    <li><NavLink to='/search' activeStyle={activeStyles}><i className="fas fa-search pt-5"></i></NavLink></li>
                    <li><NavLink to='/home' activeStyle={activeStyles}>Home</NavLink></li>
                    <li><NavLink to='/explore' activeStyle={activeStyles}>Explore</NavLink></li>
                    <li><NavLink to='/dashboard' activeStyle={activeStyles}>Dashboard</NavLink></li>
                    {
                        admin ?
                            <NavLink to='/dashboard/manage-orders' style={{ padding: '0 10px', marginTop: 10 }}>
                                <IconButton aria-label="cart">
                                    <StyledBadge badgeContent={!totalQuantity ? 0 : totalQuantity} color="secondary">
                                        <ShoppingCartIcon sx={{ fontSize: '30px !important' }} />
                                    </StyledBadge>
                                </IconButton>
                            </NavLink>
                            :
                            <Link to='/dashboard/my-orders' style={{ padding: '0 10px', marginTop: 10 }}>
                                <IconButton aria-label="cart">
                                    <StyledBadge badgeContent={!totalQuantity ? 0 : totalQuantity} color="secondary">
                                        <ShoppingCartIcon sx={{ fontSize: '30px !important' }} />
                                    </StyledBadge>
                                </IconButton>
                            </Link>
                    }
                    {
                        admin &&
                        <div>
                            <li><NavLink to='/dashboard/manage-orders' activeStyle={activeStyles}>Admin</NavLink></li>
                        </div>
                    }
                    {
                        (user?.email || user?.displayName) ?
                            <div>
                                <li>
                                    {user?.displayName}
                                    {
                                        user.photoURL ?
                                            <img src={user?.photoURL} width="35px" className="rounded-pill border border-warning border-2 ms-4" alt="" />
                                            :
                                            <i className="fas fa-user ms-2"></i>
                                    }
                                </li>
                                <li>
                                    <Button onClick={logOut} variant="contained" className="bg-danger"><i className="fas fa-sign-out-alt me-2"></i> Logout</Button>
                                </li>
                            </div>

                            :
                            <li>
                                <NavLink to='/login'>
                                    <MuiButton variant="contained"><i className="fas fa-sign-in-alt me-2"></i> Login</MuiButton>
                                </NavLink>
                            </li>
                    }
                </div>
            </div>
        </div >
    );
};

export default NavBar;