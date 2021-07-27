import React from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './style';

const ProtectedPage = () => {
    const history = useHistory();
    const classes = useStyles();

    return (
        <Container className={classes.wrapper} maxWidth="xs">
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h6" align="center">
                        you dont have permission to access this page
                    </Typography>
                    <Button color="primary" onClick={() => history.push('/login')} variant="contained" fullWidth>
                        Login To Open Access
                    </Button>
                </CardContent>
            </Card>
        </Container>
    )
}

export default ProtectedPage
