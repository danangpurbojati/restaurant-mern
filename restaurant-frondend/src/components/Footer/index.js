import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import FastfoodIcon from '@material-ui/icons/Fastfood';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';

import { Link } from 'react-router-dom';
import useStyles from './styles';

const Footer = () => {
    const classes = useStyles();

    return (
        <div className={classes.footerWrapper}>
            <Container maxWidth="md">
                <Grid className={classes.footerMenuWrapper} container>
                    <Grid className={classes.menuFooter} xs={12} md={4} item>
                        <Link className={classes.footerMenuLink} to='/home'>
                            <FastfoodIcon fontSize="large" />
                            <Typography variant="h5">
                                My Resto
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid className={classes.menuFooter} xs={12} md={4} item>
                        <Typography variant="h6">
                            About Us
                        </Typography>
                        <Typography  variant="subtitle1" color="textPrimary">
                            <Link to="#" className={classes.socialLink}>
                                About My Resto
                            </Link>
                        </Typography>
                        <Typography  variant="subtitle1" color="textPrimary">
                            <Link to="#" className={classes.socialLink}>
                                FAQ
                            </Link>
                        </Typography>
                        <Typography  variant="subtitle1" color="textPrimary">
                            <Link to="#" className={classes.socialLink}>
                                Our Location
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid className={classes.menuFooter} xs={12} md={4} item>
                        <Typography variant="h6">
                            Contact Us
                        </Typography>
                        <div>
                            <Link className={classes.socialLink} to="https://facebook.com">
                                <FacebookIcon fontSize="large" />
                            </Link>
                            <Link className={classes.socialLink} to="https://twitter.com">
                                <TwitterIcon fontSize="large" />
                            </Link>
                            <Link className={classes.socialLink} to="https://instagram.com">
                                <InstagramIcon fontSize="large" />
                            </Link>
                            <Link className={classes.socialLink} to="https://youtube.com">
                                <YouTubeIcon fontSize="large" />
                            </Link>
                        </div>
                    </Grid>
                </Grid>
            </Container>
            <Typography className={classes.footerDesigner} variant="subtitle1" align="center">
                created by <a target="_blank" rel="noreferrer" className={classes.footerDesignerLink} href="https://github.com/danangpurbojati">purbojati</a>
            </Typography>
        </div>
    )
}

export default Footer
