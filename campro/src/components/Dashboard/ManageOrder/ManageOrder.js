import { Button } from '@mui/material';
import React from 'react';
import { Badge } from 'react-bootstrap';

const ManageOrder = ({ order, handleApprove, handleDeleteOrder }) => {
    const { _id, img_url, camera, name, email, status } = order;
    return (
        <tr>
            <img src={img_url} width="80px" alt="" />
            <td>{camera}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>
                {
                    status === 'Pending' ?
                        <Badge bg="warning" text="dark">
                            {status}
                        </Badge>
                        :
                        <Badge bg="info">
                            {status}
                        </Badge>
                }
            </td>
            {
                status === 'Pending' ?
                    <td><Button onClick={() => handleApprove(order)} variant="contained" className="bg-primary"><i className="fas fa-check-circle me-2"></i>Approve</Button></td>
                    :
                    ""
            }
            <td><Button onClick={() => handleDeleteOrder(_id)} variant="contained" className="bg-danger"><i className="fas fa-trash-alt me-2"></i>Cancel</Button>
            </td>
        </tr>
    );
};

export default ManageOrder;