import React, { useEffect, useState } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';

import { getOrders } from '../../api/order';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import useStyles from './style';
import formatRupiah from '../../utils/formatRupiah';
import sumPrice from '../../utils/sumPrice';

const OrderHistory = () => {
    const classes = useStyles()
    const [data, setData] = useState('')

    const fetchOrder = async () => {
        const limit = 100;
        const page = 1;
        const { data } = await getOrders({limit, page});

        // console.log(data);
        setData(data);
    }

    useEffect(() => {
        fetchOrder()
    }, []);

    return (
        <Container className={classes.historyWrapper} maxWidth="md">
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell>Order Id</TableCell>
                            <TableCell align="center">Items</TableCell>
                            <TableCell align="center">Total</TableCell>
                            <TableCell align="center">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    {
                        data ? (
                            <TableBody>
                                {
                                    data.data.map(order => (
                                        <TableRow key={order._id}>
                                            <TableCell component="th" scope="row">
                                                <Typography>
                                                    {order._id}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                {
                                                    order.order_items.map(item => (
                                                        <Typography key={item._id}>
                                                            {item.name}
                                                        </Typography>
                                                    ))
                                                }
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography>
                                                    {formatRupiah(sumPrice(order.order_items) + order.deliveryFee)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Link className={classes.invoiceLink} to={`/invoice/${order._id}`}>
                                                    <Chip
                                                        variant="outlined"
                                                        size="small"
                                                        label={order.status}
                                                        color="secondary"
                                                        clickable
                                                    />
                                                    
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>

                        ) : (
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={4}>
                                        <Typography>
                                            No Order
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )
                    }
                </Table>
            </TableContainer>
        </Container>
    )
}

export default OrderHistory
