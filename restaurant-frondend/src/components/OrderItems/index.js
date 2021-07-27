import React from 'react';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';

import { Link } from 'react-router-dom';

import useStyles from './style';

import { useDispatch, useSelector } from 'react-redux';
import { config } from '../../config';
import { addItem, removeItem } from '../../features/Cart/actions';
import formatRupiah from '../../utils/formatRupiah';
import sumPrice from '../../utils/sumPrice';

const OrderItems = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const clickAddItem = (item) => {
        dispatch(addItem(item));
    }

    const clickRemoveItem = (item) => {
        dispatch(removeItem(item));
    }

    const cart = useSelector(state => state.cart);
    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell>Items</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                        </TableRow>
                    </TableHead>
                    {
                        cart.length ? (
                            <TableBody>
                                {
                                    cart.map(item => (
                                        <TableRow key={item._id} >
                                            <TableCell className={classes.tableItem} component="th" scope="row">
                                                <img className={classes.imageItem} src={`${config.image_url}/${item.image_url}`} alt={item.name} />
                                                <Typography>
                                                    {item.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <div className={classes.tableQuantity}>
                                                    <IconButton onClick={() => clickRemoveItem(item)}>
                                                        <RemoveIcon fontSize="small" />
                                                    </IconButton>
                                                    <Typography>
                                                        {item.qty}
                                                    </Typography>
                                                    <IconButton onClick={() => clickAddItem(item)}>
                                                        <AddIcon fontSize="small" />
                                                    </IconButton>
                                                </div>
                                            </TableCell>
                                            <TableCell align="right">
                                                <div className={classes.tableSubtotal}>
                                                    <Typography>
                                                        {formatRupiah(item.qty * item.price)}
                                                    </Typography>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        ) : (
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center" colSpan={3}>
                                        No Data
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )
                    }
                    <TableFooter>
                        <TableRow >
                            <TableCell align="left">
                                <Link className={classes.linkMenu} to="/menu">Continue Shopping</Link>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>

            <Card className={classes.totalCardWrapper}>
                <CardContent className={classes.totalWrapper}>
                    <Typography variant="h6" className={classes.totalText}>
                        Total
                    </Typography>
                    <Typography variant="h6" className={classes.totalText}>
                        {formatRupiah(sumPrice(cart))}
                    </Typography>
                </CardContent>
            </Card>

            
        </div>
    )
}

export default OrderItems
