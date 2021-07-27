import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Link } from 'react-router-dom'

import useStyles from './style';

import { setCategory, setKeyword } from '../../features/Menu/actions';
import { useDispatch, useSelector } from 'react-redux';

import { userLogout } from '../../features/Auth/actions';
import { logout } from '../../api/auth';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
    const classes = useStyles();
    const auth = useSelector(state => state.auth);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const [ openMenu, setOpenMenu ] = useState(false);
    const history = useHistory();

    // authOption
    const [authOption, setAuthOption] = useState(null);

    const handleClickAuth = (event) => {
        setAuthOption(event.currentTarget);
    };

    const handleCloseAuth = () => {
        setAuthOption(null);
    };
    // end auth option

    const clickNavbar = () => {
        setOpenMenu(true);
    }

    const closeMenu = () => {
        setOpenMenu(false);
    }

    const handleLogOut = () => {
        setAuthOption(null);
        setOpenMenu(false);
        logout()
            .then(() => dispatch(userLogout()))
            .then(() => history.push('/login'))
    }


    // Search Menu
    const [searchMenu, setsearchMenu] = useState('');

    const changeMenu = (event) => {
        setsearchMenu(event.target.value);
    }

    const submitSearch = (event) => {
        event.preventDefault();
        dispatch(setKeyword(searchMenu));
        setOpenMenu(false);
        history.push('/menu');
    }

    return (
        <AppBar position="sticky" color="primary">
            <Container maxWidth="lg">
                <Toolbar className={classes.navbar}>
                    <div className={classes.menuGroup}>
                        <Link className={classes.menuLink} to="/">
                            <FastfoodIcon className={classes.menuItem} fontSize="large" />
                        </Link>
                        <Hidden smDown>
                            <Typography className={classes.menuItem} variant="h5">
                                <Link onClick={() => dispatch(setCategory(''))} className={classes.menuLink} to="/menu">
                                    Menu
                                </Link>
                            </Typography>
                        </Hidden>
                    </div>
                    <div className={classes.menuGroup}>
                        <Hidden smDown>
                            <div className={classes.menuItem}>
                                <Paper onSubmit={submitSearch} component="form" className={classes.search}>
                                    <InputBase
                                        className={classes.input}
                                        placeholder="Search Menu"
                                        value={searchMenu}
                                        onChange={changeMenu}
                                    />
                                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>
                            </div>
                            <div className={classes.menuItem}>
                                <Link className={classes.menuLink} to="/order">
                                    <Badge badgeContent={cart.length} color="secondary">
                                        <ShoppingCartIcon />
                                    </Badge>
                                </Link>
                            </div>
                            <Typography className={classes.menuItem} variant="h5">
                                {
                                    auth.user ? (
                                        <div>
                                            <div onClick={handleClickAuth} className={classes.authMenu}>
                                                <Typography variant="h5">
                                                    {auth.user.fullname}
                                                </Typography>
                                                <ExpandMoreIcon />
                                            </div>
                                            <Menu
                                                id="simple-menu"
                                                anchorEl={authOption}
                                                keepMounted
                                                open={Boolean(authOption)}
                                                onClose={handleCloseAuth}
                                            >
                                                <MenuItem onClick={handleCloseAuth}>
                                                    <Link style={{textDecoration: 'none', color: 'inherit'}} to="/order-history">Order History</Link>
                                                </MenuItem>
                                                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                                            </Menu>
                                        </div>                                          
                                    ) : (
                                        <Link className={classes.menuLink} to="/login">
                                            Login
                                        </Link>
                                    )
                                }
                                
                            </Typography>
                        </Hidden>
                        <Hidden mdUp>
                            <Link className={classes.menuLink} to="/order">
                                <Badge badgeContent={cart.length} color="secondary">
                                    <ShoppingCartIcon />
                                </Badge>
                            </Link>
                            <Button onClick={clickNavbar} className={classes.menuLink}>
                                <MenuIcon />
                            </Button>
                            <Drawer anchor="right" open={openMenu}>
                                <div>
                                    <IconButton onClick={closeMenu}>
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                                <Divider />
                                <List className={classes.drawer}>
                                    <ListItem>
                                        <Typography className={classes.menuItem} variant="h6">
                                            <Link onClick={() => {dispatch(setCategory('')); closeMenu()}} className={classes.menuLink} to="/menu">
                                                Menu
                                            </Link>
                                        </Typography>
                                    </ListItem>
                                    <ListItem>
                                        <Typography className={classes.menuItem} variant="h6">
                                            <Link onClick={closeMenu} className={classes.menuLink} to="/order">
                                                Order
                                            </Link>
                                        </Typography>
                                    </ListItem>
                                    <ListItem>
                                        <Paper onSubmit={submitSearch} component="form" className={classes.mobileSearch}>
                                            <InputBase
                                                className={classes.input}
                                                placeholder="Search Menu"
                                                value={searchMenu}
                                                onChange={changeMenu}
                                            />
                                            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                                                <SearchIcon />
                                            </IconButton>
                                        </Paper>
                                    </ListItem>
                                    <ListItem>
                                        <div className={classes.menuItem}>
                                            {
                                                auth.user ? (
                                                    <div>
                                                        <Typography variant="h6">
                                                            <Link onClick={closeMenu} className={classes.menuLink} to="/order-history">
                                                                Order-History
                                                            </Link>
                                                        </Typography>
                                                        <Typography style={{cursor: 'pointer'}} variant="h6" onClick={handleLogOut}>
                                                            LogOut
                                                        </Typography>

                                                    </div>
                                                ) : (
                                                    <Typography variant="h6">
                                                        <Link onClick={closeMenu} className={classes.menuLink} to="/login">
                                                            Login
                                                        </Link>
                                                    </Typography>

                                                )
                                            }
                                        </div>
                                    </ListItem>
                                </List>
                            </Drawer>
                        </Hidden>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar
