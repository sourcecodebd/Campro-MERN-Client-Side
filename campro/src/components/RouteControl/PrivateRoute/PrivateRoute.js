import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { CircularProgress } from '@mui/material';

const PrivateRoute = ({ children, ...rest }) => {
    const { firebase } = useAuth();
    const { user, isLoading } = firebase;
    if (isLoading) {
        return (
            <div style={{ transform: 'translateY(50vh)' }}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                (user?.email || user?.displayName) ?
                    children
                    :
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
            }
        />
    );
};

export default PrivateRoute;