import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
// import { CircularProgress } from '@mui/material';
import { Badge, ProgressBar } from 'react-bootstrap';

const UserRoute = ({ children, ...rest }) => {
    const { firebase } = useAuth();
    const { user, admin } = firebase;

    // const [warning, setWarning] = useState(true);
    const [interWarning, setInterWarning] = useState(true);

    /* useEffect(() => {
        const timer = window.setTimeout(() => {
            setWarning(false);
        }, 3000)
        return () => clearTimeout(timer);
    }, [setWarning]); */


    const [counter, setCounter] = useState(0);
    useEffect(() => {
        const interv = setInterval(() => {
            if (counter < 10) {
                setCounter(counter + 1);
            }
            if (counter === 10) {
                setCounter(100);
                setInterWarning(false);
            }
        }, 1000)
        return () => clearInterval(interv);
    }, [setInterWarning, setCounter, counter]);
    console.log(counter);

    if (admin) {
        return (
            <div style={{ transform: 'translateY(30vh)' }}>
                {/* {
                    warning && <CircularProgress />
                } */}
                {
                    interWarning && <ProgressBar variant="warning" animated now={counter * 10} />
                }
                {
                    // !warning
                    !interWarning &&
                    <h3 className="shadow p-3 col-md-6 mx-auto bg-danger overflow-auto rounded-3">
                        <Badge bg="warning">
                            Unauthorized Access to User Route! Admins aren't allowed to perform this action.
                        </Badge>
                    </h3>
                }
            </div >
        );
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                (!admin && (user?.email || user?.displayName)) ?
                    children
                    :
                    <Redirect
                        to={{
                            pathname: '/dashboard',
                            state: { from: location }
                        }}
                    />
            }
        />
    );
};

export default UserRoute;