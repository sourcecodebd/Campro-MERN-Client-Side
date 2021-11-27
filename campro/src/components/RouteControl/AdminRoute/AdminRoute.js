import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { Badge } from 'react-bootstrap';

const AdminRoute = ({ children, ...rest }) => {
    const { firebase } = useAuth();
    const { user, admin } = firebase;

    if (!admin) {
        return (
            <div style={{ transform: 'translateY(35vh)' }}>
                <h3 className="shadow p-3 col-md-6 mx-auto bg-danger overflow-auto rounded-3">
                    <Badge bg="warning">
                        Unauthorized Access to Admin Route! Users aren't allowed to perform this action.
                    </Badge>
                </h3>
            </div>
        );
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                (admin && (user?.email || user?.displayName)) ?
                    children
                    :
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location }
                        }}
                    />
            }
        />
    );
};

export default AdminRoute;