import React, { useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Skeleton from '@material-ui/lab/Skeleton';

import useStyles from './style';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../../features/Category/actions';
import { config } from '../../config';

import { useHistory } from 'react-router-dom';

import { setCategory as hehe } from '../../features/Menu/actions';

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);

    const history = useHistory();

    const clickCategory = (category) => {
        history.push(`/menu`);
        dispatch(hehe(category))
    }

    useEffect(() => {
        dispatch(fetchCategory());
    }, [dispatch])

    return (
        <div>
            <div className={classes.heroWrapper}>
                <Container maxWidth="md">
                    <Typography className={classes.heroTittle} variant="h2" align="center">
                        My Resto
                    </Typography>
                    <Typography className={classes.heroSubTittle} variant="h5" align="center" color="textSecondary" paragraph>
                        Find Your Favorites Menu To Enjoy On Your Own Or With Someone Special
                    </Typography>
                    <div className={classes.heroLinkWrapper}>
                        <Button onClick={() => history.push('/menu')} color="primary" variant="contained">Our Menu</Button>
                    </div>
                </Container>
            </div>

            <div>
                <Container className={classes.categoryWrapper} maxWidth="md">
                    <Typography className={classes.categoryTitle} variant="h4" align="center">
                        We Serve Delicious food
                    </Typography>

                    {
                        categories.length ? (
                            <Grid spacing={3} container>
                                {
                                    categories.map(category => (
                                        <Grid key={category._id} item xs={12} sm={6}>
                                            <Card className={classes.card}>
                                                <img className={classes.cardImage} src={`${config.image_url}/${category.image_url}`} alt={category.name} />
                                                <div className={classes.cardText}>
                                                    <Typography className={classes.categoryCardTitle} variant="h5">
                                                        {category.name}
                                                    </Typography>
                                                    <Button onClick={() => clickCategory(category.name)} size="small" variant="contained">
                                                        Order Now
                                                    </Button>
                                                </div>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        ) : (
                            <div>
                                <Grid container spacing={3}>
                                    <Grid  item xs={12} sm={6}>
                                        <Skeleton variant="rect" height={120} />
                                    </Grid>
                                    <Grid  item xs={12} sm={6}>
                                        <Skeleton variant="rect" height={120} />
                                    </Grid>
                                </Grid>
                                <Typography className={classes.loading}>
                                    Loading ...
                                </Typography>
                            </div>
                        )
                    }
                </Container>
            </div>
        </div>
    )
}

export default Home
