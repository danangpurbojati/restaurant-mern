import React, { useEffect, useState } from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import CardContent from '@material-ui/core/CardContent';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Pagination from '@material-ui/lab/Pagination';

import useStyles from './style';

import { useDispatch, useSelector } from 'react-redux';
import { fetchMenus, setPage, setCategory } from '../../features/Menu/actions';
import { config } from '../../config';
import { addItem } from '../../features/Cart/actions';
import formatRupiah from '../../utils/formatRupiah';

const Menu = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const menus = useSelector(state => state.menus);

    const [selectCategory, setSelectCategory] = useState('');
    const changeCategory = (event) => {
        dispatch(setCategory(event.target.value));
        setSelectCategory(event.target.value);
    }

    const addCartItem = (item) => {
        dispatch(addItem(item))
    }

    useEffect(() => {
        dispatch(fetchMenus());
    }, [dispatch, menus.currentPage, menus.category, menus.keyword])

    return (
        <Container className={classes.menuPageWrapper} maxWidth="md">
            <Typography className={classes.menuTitle} variant="h3" align="center">
                Choose Your Menus
            </Typography>
            <Typography className={classes.menuSubTitle} variant="h6" align="center">
                Find Menu you looking for
            </Typography>

            <div className={classes.filterWrapper}>
                <Typography variant="h6">
                    Select Filter :
                </Typography>
                <FormControl className={classes.select}>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={selectCategory}
                        onChange={changeCategory}
                    >
                        <MenuItem value={null}>None</MenuItem>
                        <MenuItem value='drink'>Drink</MenuItem>
                        <MenuItem value='food'>Food</MenuItem>
                        <MenuItem value='snack'>Snack</MenuItem>
                        <MenuItem value='cake'>Cake</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <Divider />

            <Grid className={classes.menuItemWrapper} container spacing={2}>
                {
                    menus.menus.map(menu => (
                        <Grid key={menu._id} item xs={12} sm={6} md={3}>
                            <Card>
                                <img className={classes.menuImage} src={`${config.image_url}/${menu.image_url}`} alt={menu.name} />
                                <CardContent>
                                    <Typography gutterBottom variant="h6">
                                        {menu.name}
                                    </Typography>
                                    <Typography>
                                        {formatRupiah(menu.price)}
                                    </Typography>
                                    <Typography color="textSecondary" style={{ height: '40px'}} variant="subtitle2">
                                        {menu.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => addCartItem(menu)} variant="contained" fullWidth size="small" color="primary">
                                        Order
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>

            <Pagination 
                color="primary" 
                shape="rounded" 
                variant="outlined" 
                className={classes.pagination} 
                count={Math.ceil(menus.totalItems / menus.perPage)}
                page={menus.currentPage}
                onChange={(e, value) => dispatch(setPage(value))}
            />
        </Container>
    )
}

export default Menu
