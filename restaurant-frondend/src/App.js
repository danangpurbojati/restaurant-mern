import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

// redux things
import { Provider } from 'react-redux';
import store from './app/store';

import Navbar from './components/Navbar';
import Footer from './components/Footer'
import Home from './pages/Home';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Login from './pages/Login';
import Register from './pages/Register';

import { listen } from './app/listener';
import OrderHistory from './pages/OrderHistory';
import Invoice from './pages/Invoice';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import GuardOnlyRoute from './components/GuardOnlyRoute';
import GuardRoute from './components/GuardRoute';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: `#0f0f0f`,
        },
    },
});

const App = () => {

    useEffect(() => {
        listen();
    }, []);

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Router>
                    <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
                        <Navbar />

                        <div style={{flexGrow: 1}}>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/menu" component={Menu} />
                                <GuardRoute path="/order">
                                    <Order />
                                </GuardRoute>
                                <GuardRoute path="/order-history">
                                    <OrderHistory />
                                </GuardRoute>
                                <GuardRoute path="/invoice/:order_id">
                                    <Invoice />
                                </GuardRoute>
                                <GuardOnlyRoute path="/login">
                                    <Login />
                                </GuardOnlyRoute>
                                <GuardOnlyRoute path="/register">
                                    <Register />
                                </GuardOnlyRoute>
                            </Switch>
                        </div>

                        <Footer />
                    </div>
                </Router>
            </ThemeProvider>
        </Provider>
    )
}

export default App
