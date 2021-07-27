import React, { useEffect, useState, useCallback } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { getInvoiceByOrderId } from '../../api/invoice';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import useStyles from './styles';

const Invoice = () => {
    const classes = useStyles();
    const { params } = useRouteMatch();
    const [data, setData] = useState('')

    const detailInvoice = useCallback(async () => {
        const { data } = await getInvoiceByOrderId(params.order_id);
        
        setData(data);
    }, [params.order_id])

    useEffect(() => {
        detailInvoice();
    }, [detailInvoice]);

    return (
        <Container className={classes.wrapper} maxWidth="md">
            <TableContainer className={classes.tableContainer} component={Paper}>
                <Table>
                    <TableHead className={classes.header}>
                        <TableRow>
                            <TableCell colSpan={2} align="center">
                                <Typography>
                                    Invoice Detail
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {
                        data ? (
                            <TableBody>
                                <TableRow>
                                    <TableCell>Order Id</TableCell>
                                    <TableCell>{data.order._id}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Status</TableCell>
                                    <TableCell>{data.payment_status}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Ordered by</TableCell>
                                    <TableCell>{data.user.fullname}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Email</TableCell>
                                    <TableCell>{data.user.email}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Address</TableCell>
                                    <TableCell>{data.deliveryAddress}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Total</TableCell>
                                    <TableCell>{data.total}</TableCell>
                                </TableRow>
                            </TableBody>
                        ) : (
                            <TableBody>
                                <TableRow>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Waiting</TableCell>
                                </TableRow>
                            </TableBody>
                        )
                    }
                </Table>
            </TableContainer>
            <Link className={classes.backLink} to="/order-history">
                Back to Order History
            </Link>
        </Container>
    )
}

export default Invoice
