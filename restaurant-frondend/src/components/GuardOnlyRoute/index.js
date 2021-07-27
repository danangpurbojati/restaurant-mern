import React from 'react';
import {useSelector} from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const GuardOnlyRoute = ({children, ...rest}) => {
    const { user } = useSelector(state => state.auth);

    return <Route {...rest}>
        {!user ? children : <Redirect to="/" />}
    </Route>
}

export default GuardOnlyRoute
