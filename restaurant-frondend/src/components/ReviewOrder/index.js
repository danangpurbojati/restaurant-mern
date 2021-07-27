import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

import { useSelector } from 'react-redux';
import { config } from '../../config';
import sumPrice from '../../utils/sumPrice';
import formatRupiah from '../../utils/formatRupiah';

const ReviewOrder = () => {
    const addressData = useSelector(state => state.address.address);
    const auth = useSelector(state => state.auth.user);
    const cart = useSelector(state => state.cart);

    return (
        <Card style={{marginTop: 16}}>
            <CardContent>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead style={{backgroundColor: '#b9b9b9'}}>
                            <TableRow>
                                <TableCell colSpan={2}>
                                    Detail
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    Name
                                </TableCell>
                                <TableCell>
                                    {auth.fullname}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Email
                                </TableCell>
                                <TableCell>
                                    {auth.email}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Address
                                </TableCell>
                                <TableCell>
                                    {addressData}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <TableContainer style={{marginTop: 16}} component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead style={{backgroundColor: '#b9b9b9'}}>
                        <TableRow>
                            <TableCell>Items</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                cart.map(item => (
                                    <TableRow key={item._id} >
                                        <TableCell component="th" scope="row">
                                            {item.name}
                                        </TableCell>
                                        <TableCell align="center">
                                            {item.qty}
                                        </TableCell>
                                        <TableCell align="right"> {formatRupiah(item.qty * item.price)}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <Card style={{marginTop: 16}}>
                    <CardContent>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <Typography>
                                Delivery Fee
                            </Typography>
                            <Typography>
                                {formatRupiah(config.delivery_fee)}
                            </Typography>                                    
                        </div>
                        <Divider />
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <Typography variant="h5" style={{fontWeight: 'bold'}}>
                                Total
                            </Typography>
                            <Typography variant="h5" style={{fontWeight: 'bold'}}>
                                {formatRupiah(sumPrice(cart) + config.delivery_fee)}
                            </Typography>                                    
                        </div>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    )
}

export default ReviewOrder
