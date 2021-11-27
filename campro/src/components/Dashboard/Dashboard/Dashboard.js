import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Switch, Link, useRouteMatch } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { Collapse, ListItemButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
import Profile from '../Profile/Profile';
import AdminRoute from '../../RouteControl/AdminRoute/AdminRoute';
import AddCamera from '../AddCamera/AddCamera';
import ManageOrders from '../ManageOrders/ManageOrders';
import ManageCameras from '../ManageCameras/ManageCameras';
import PrivateRoute from '../../RouteControl/PrivateRoute/PrivateRoute';
import MyOrders from '../MyOrders/MyOrders';
import Review from '../Review/Review';
import Pay from '../Pay/Pay';
import { IconButton } from '@mui/material';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import UserRoute from '../../RouteControl/UserRoute/UserRoute';

const drawerWidth = 240;

function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const { firebase } = useAuth();
    const { user, logOut, admin, open, setOpen } = firebase;
    const { url, path } = useRouteMatch();

    const StyledBadge = styled(Badge)(({ theme }) => ({
        color: 'black',
        '& .MuiBadge-badge': {
            right: -3,
            top: 3,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    // get user
    const [userData, setUserData] = useState({});
    useEffect(() => {
        fetch(`https://desolate-woodland-29933.herokuapp.com/user?email=${user.email}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('idToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setUserData(data))
    }, [user.email])

    // orders in cart
    const [orders, setOrders] = useState([]);
    const [quantities, setQuantities] = useState(0);
    const [deleted, setDeleted] = useState(false);
    useEffect(() => {
        fetch(`https://desolate-woodland-29933.herokuapp.com/my-orders?email=${user.email}`, {
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

        const quantityReducer = (prev, curr) => prev + curr.quantity;
        const totalQuantity = Array.isArray(orders) ? orders?.reduce(quantityReducer, 0) : "0";
        setQuantities(totalQuantity);
    }, [user.email, orders, quantities, deleted])

    // orders in cart

    const handleClick = () => {
        setOpen(!open);
    };

    const bgStyle = {
        background: `URL('/campro_products/Canon-EOS-250D-DSLR-Camera-with-18-55mm-IS-STM-Lens-2-Black.jpg')`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(45, 58, 74, 0.8)',
        backgroundBlendMode: 'darken, multiply',
    }

    const drawer = (
        <div className="text-white drawer-custom" style={bgStyle}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(5px)', background: 'rgba(185, 181, 181, 0.5)', py: 2 }}>
                <Box>
                    {
                        user.photoURL ?
                            <img src={user.photoURL} className="rounded-pill border border-white border-3 img-fluid" width="50px" alt="" />
                            :
                            <i className="fas fa-user fa-2x blue border border-white p-2 bg-white rounded-pill"></i>
                    }
                    <Typography className="mx-auto">{user.displayName}</Typography>
                    <small>ID <span className="font-small">{userData._id}</span></small>
                </Box>
            </Toolbar>
            <List>

                <Link to="/home">
                    <ListItem button className="hoverStyle py-3 d-flex justify-content-center align-items-center">
                        <i className="fas fa-home me-3"></i>Home
                    </ListItem>
                </Link>
                <Divider />
                <Link to={`${url}`}>
                    <ListItem button className="hoverStyle py-3 d-flex justify-content-center align-items-center">
                        <i className="fas fa-id-badge me-3"></i>Profile
                    </ListItem>
                </Link>
                <Divider />
                {
                    !admin &&
                    <div>
                        <Link to={`${url}/pay`}>
                            <ListItem button className="hoverStyle py-3 d-flex justify-content-center align-items-center">
                                <i className="far fa-credit-card me-3"></i>Pay
                            </ListItem>
                        </Link>
                        <Divider />
                        <Link to={`${url}/my-orders`}>
                            <ListItem button className="hoverStyle py-3 d-flex justify-content-center align-items-center">
                                <IconButton aria-label="cart" sx={{ mr: 2 }}>
                                    <StyledBadge badgeContent={!quantities ? 0 : quantities} color="secondary">
                                        <ShoppingCartIcon sx={{ color: 'white' }} />
                                    </StyledBadge>
                                </IconButton> My Orders
                            </ListItem>
                        </Link>
                        <Divider />
                        <Link to={`${url}/review`}>
                            <ListItem button className="hoverStyle py-3 d-flex justify-content-center align-items-center">
                                <i className="fas fa-pen-nib me-3"></i>Review
                            </ListItem>
                        </Link>
                    </div>

                }
                <Divider />

                {
                    admin &&
                    <ListItemButton onClick={handleClick} className="hoverStyle d-flex justify-content-center align-items-center">
                        <ListItem button>
                            <i className="fas fa-user-cog me-3"></i>Admin
                        </ListItem>
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                }
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {

                        admin &&
                        <List component="div" disablePadding>
                            <ListItem button className="hoverStyle py-3 d-flex justify-content-center align-items-center">
                                <Link to={`${url}/make-admin`} ><i className="fas fa-users-cog me-3"></i>Make Admin</Link>
                            </ListItem>
                            <Divider />
                            <ListItem button className="hoverStyle py-3 d-flex justify-content-center align-items-center">
                                <Link to={`${url}/add-camera`}><i className="fas fa-camera-retro me-3"></i>Add Camera</Link>
                            </ListItem>
                            <Divider />
                            <ListItem button className="hoverStyle py-3 d-flex justify-content-center align-items-center">
                                <Link to={`${url}/manage-cameras`}><i className="fas fa-tools me-3"></i>Manage Cameras</Link>
                            </ListItem>
                            <Divider />
                            <ListItem button className="hoverStyle py-3 d-flex justify-content-center align-items-center">
                                <Link to={`${url}/manage-orders`}><i className="fas fa-tasks me-3"></i>Manage Orders</Link>
                            </ListItem>
                        </List>
                    }
                </Collapse>

                <ListItem onClick={logOut} button className="hoverStyle py-3 d-flex justify-content-center align-items-center">
                    <i className="fas fa-sign-out-alt me-3"></i>Logout
                </ListItem>

            </List >
        </div >
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box className="d-lg-flex d-md-flex">
            <CssBaseline />
            <AppBar
                className="bg-orange"
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        <a href="/dashboard"><i className="fas fa-clipboard-list me-2"></i> Dashboard</a>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >

                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />

                <Switch>
                    <PrivateRoute exact path={path}>
                        <Profile />
                    </PrivateRoute>
                    <UserRoute path={`${path}/pay`}>
                        <Pay />
                    </UserRoute>
                    <UserRoute path={`${path}/my-orders`}>
                        <MyOrders orders={orders} setOrders={setOrders} quantities={quantities} deleted={deleted} setDeleted={setDeleted} />
                    </UserRoute>
                    <UserRoute path={`${path}/review`}>
                        <Review />
                    </UserRoute>
                    <AdminRoute path={`${path}/make-admin`}>
                        <MakeAdmin />
                    </AdminRoute>
                    <AdminRoute path={`${path}/add-camera`}>
                        <AddCamera />
                    </AdminRoute>
                    <AdminRoute path={`${path}/manage-cameras`}>
                        <ManageCameras />
                    </AdminRoute>
                    <AdminRoute path={`${path}/manage-orders`}>
                        <ManageOrders />
                    </AdminRoute>
                </Switch>


            </Box>
        </Box>
    );
}

Dashboard.propTypes = {
    window: PropTypes.func,
};

export default Dashboard;