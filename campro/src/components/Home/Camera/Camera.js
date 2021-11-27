import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Card, Typography, CardContent, CardHeader, IconButton, Avatar, CardActions, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LayersIcon from '@mui/icons-material/Layers';
import Rating from 'react-rating';
import Badge from 'react-bootstrap/Badge';
// tooltip MUI
import Tooltip from '@mui/material/Tooltip';

const Camera = ({ cam }) => {
    // tooltip MUI
    const positionRef = useRef({
        x: 0,
        y: 0,
    });
    const popperRef = useRef(null);
    const areaRef = useRef(null);

    const handleMouseMove = (event) => {
        positionRef.current = { x: event.clientX, y: event.clientY };

        if (popperRef.current != null) {
            popperRef.current.update();
        }
    };
    // tooltip MUI

    const { _id, camera, description, img_url, rating, rating_count, price, tag, random_color, date } = cam || {};
    const fullSymbol = 'fa fa-star';

    let history = useHistory();
    const handlePlaceOrder = id => {
        history.push(`/place-order/${id}`);
    }

    return (
        <Grid item xs={6} sm={4} md={4}>
            <Card sx={{ maxWidth: 345, height: 570 }}>
                <CardHeader
                    style={{ height: 120 }}
                    avatar={
                        <Avatar sx={{ bgcolor: random_color }} aria-label="recipe">
                            {camera.slice(0, 3).split(' ')}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={camera}
                    subheader={new Date(date).toLocaleDateString()}
                />
                <img src={img_url} style={{ height: 70 }} className="img-fluid" alt="" />
                <CardContent style={{ height: 210 }}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <LayersIcon />
                                </ListItemIcon>
                                <ListItemText primary={
                                    <p style={{ fontSize: '12px' }}>{Array.isArray(description) ? description[0].desc.slice(0, 50) + ' ...' : description.slice(0, 50) + ' ...'}</p>
                                } />
                            </ListItemButton>
                        </ListItem>
                        {
                            Array.isArray(description) ?
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <LayersIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={
                                            <p style={{ fontSize: '12px' }}>{description[1].desc.slice(0, 50) + '...'}</p>
                                        } />
                                    </ListItemButton>
                                </ListItem>
                                :
                                ""
                        }
                    </List>
                </CardContent>
                <div className="d-flex justify-content-between px-3" style={{ height: '30px' }}>
                    <div style={{ color: 'gold' }}>
                        <Rating
                            emptySymbol="fa fa-star-o"
                            placeholderSymbol={fullSymbol}
                            placeholderRating={rating}
                            readonly
                        />
                    </div>
                    <h5>
                        <Badge bg="info">People: {rating_count}</Badge>
                    </h5>
                </div>
                <Typography variant="h6" className="red fw-bold fs-2 mt-1" sx={{
                    transition: '0.8s',
                    opacity: 0.4,
                    '&:hover': {
                        opacity: 1, transform: 'scale(1.5)', backgroundColor: 'red', color: 'white', cursor: 'pointer'
                    }
                }}>
                    ৳ {price}
                </Typography>
                <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2 }}>

                    <div>
                        <Tooltip
                            title="Place Order"
                            placement="top"
                            arrow
                            PopperProps={{
                                popperRef,
                                anchorEl: {
                                    getBoundingClientRect: () => {
                                        return new DOMRect(
                                            positionRef.current.x,
                                            areaRef.current.getBoundingClientRect().y,
                                            0,
                                            0,
                                        );
                                    },
                                },
                            }}
                        >

                            <IconButton aria-label="add to favorites"
                                // tooltip
                                ref={areaRef}
                                onMouseMove={handleMouseMove}
                                // tooltip

                                onClick={() => handlePlaceOrder(_id)}>
                                <ShoppingCartIcon sx={{
                                    fontSize: 40, color: '#a439b0',
                                    '&:hover': {
                                        backgroundColor: 'red !important', color: 'white !important', borderRadius: '100%', fontSize: 50
                                    }

                                }} />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <h6>
                        <Badge bg="warning" className="text-dark">Tag: {tag}</Badge>
                    </h6>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Camera;