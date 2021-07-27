import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';

import { Link, useHistory } from 'react-router-dom';

import useStyles from './style';

import { useDispatch } from 'react-redux';
import { userLogin } from '../../features/Auth/actions';
import { login } from '../../api/auth';

const Login = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })

    const onChangeForm = (event) => {
        const value = event.target.value;
        setLoginForm({
            ...loginForm,
            [event.target.name]: value
        })
    }

    const onSubmitForm = async (event) => {
        event.preventDefault();
        setError(false);

        const { data } = await login(loginForm.email, loginForm.password);

        if(data.error){
            setError(true);
            setErrorMessage(data.message)
        } else {
            const {user, token} = data;
            dispatch(userLogin(user, token));
            setError(false);
            setErrorMessage('');
            history.push('/');
        }

        setLoginForm({
            email: '',
            password: ''
        })
    }

    return (
        <Container className={classes.authContainer} maxWidth="xs">
            <Card>
                <CardContent>
                    <Typography className={classes.authTitle} variant="h4" align="center">
                        Login
                    </Typography>
                    {
                        error && (
                            <Alert variant="filled" severity="error">{errorMessage}</Alert>
                        )
                    }
                    <form onSubmit={onSubmitForm} className={classes.authForm}>
                        <TextField 
                            fullWidth
                            required
                            variant="outlined"
                            label="Email Address"
                            className={classes.authInput}
                            onChange={onChangeForm}
                            name="email"
                            value={loginForm.email}
                        />
                        <TextField 
                            fullWidth
                            required
                            variant="outlined"
                            label="password"
                            type="password"
                            className={classes.authInput}
                            onChange={onChangeForm}
                            name="password"
                            value={loginForm.password}
                        />
                        <Button type="submit" variant="contained" fullWidth color="primary">
                            Login
                        </Button>
                    </form>

                    <Typography align="center">
                        <Link to="/register">
                            Dont Have an Account, Register Here
                        </Link>
                    </Typography>
                    
                </CardContent>
            </Card>
        </Container>
    )
}

export default Login
