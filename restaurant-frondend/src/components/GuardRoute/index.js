import React from 'react';
import { Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import ProtectedPage from '../ProtectedPage';

const GuardRoute = ({children,  ...rest}) => {
    const { user } = useSelector(state => state.auth);

    return <Route {...rest}>
        {user ? children : <ProtectedPage />}
    </Route>
}

export default GuardRoute
