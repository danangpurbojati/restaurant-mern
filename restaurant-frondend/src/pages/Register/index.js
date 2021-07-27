import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';

import useStyles from '../Login/style';
import { registerUser } from '../../api/auth';

import { useHistory } from 'react-router-dom';

const Register = () => {
    const classes = useStyles();
    const history = useHistory();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [data, setData] = useState({
        fullname: '',
        email: '',
        password: ''
    });

    const onChangeForm = (event) => {
        const value = event.target.value;
        setData({
            ...data,
            [event.target.name]: value
        })
    }

    const onSubmitRegister = async (event) => {
        event.preventDefault();
        setError(false);

        const registerForm = await registerUser(data);

        if (registerForm.data.error) {
            setError(true);
            setErrorMessage(registerForm.data.message)
        } else {
            setError(false);
            setErrorMessage('');
            history.push('/login');
        }
    
        

    }

    return (
        <Container className={classes.authContainer} maxWidth="xs">
            <Card>
                <CardContent>
                    <Typography className={classes.authTitle} variant="h4" align="center">
                        Register
                    </Typography>

                    {
                        error && (
                            <Alert variant="filled" severity="error">{errorMessage}</Alert>
                        )
                    }

                    <form className={classes.authForm} onSubmit={onSubmitRegister}>
                        <TextField 
                            fullWidth
                            required
                            variant="outlined"
                            label="Full name"
                            name="fullname"
                            className={classes.authInput}
                            onChange={onChangeForm}
                            value={data.fullname}
                        />
                        <TextField 
                            fullWidth
                            required
                            type="email"
                            name="email"
                            variant="outlined"
                            label="Email Address"
                            className={classes.authInput}
                            onChange={onChangeForm}
                            value={data.email}
                        />
                        <TextField 
                            fullWidth
                            variant="outlined"
                            label="password"
                            type="password"
                            name="password"
                            required
                            className={classes.authInput}
                            onChange={onChangeForm}
                            value={data.password}
                        />
                        <Button type="submit" variant="contained" fullWidth color="primary">
                            Register
                        </Button>
                    </form>                        
                </CardContent>
            </Card>
        </Container>
    )
}

export default Register
