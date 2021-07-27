import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import useStyles from './style';

import { useDispatch, useSelector } from 'react-redux';
import { saveAddress } from '../../features/Address/actions';

const Address = () => {
    const classes = useStyles();
    const [address, setAddress] = useState('');
    const dispatch = useDispatch();
    const addressData = useSelector(state => state.address.address);

    const onChange = (event) => {
        setAddress(event.target.value);
    }
    
    const onSubmitAddress = (event) => {
        event.preventDefault();
        dispatch(saveAddress(address));
        setAddress('');
    }
    return (
        <div>
            <Card>
                <CardContent>
                    <form onSubmit={onSubmitAddress} className={classes.addressForm}>
                        <TextField 
                            label="Enter Your Address"
                            variant="outlined"
                            size="small"
                            className={classes.addressInput}
                            onChange={onChange}
                            value={address}
                        />
                        <Button type="submit" size="small" variant="contained" color="primary">Add New Address</Button>
                    </form>
                    <Typography className={classes.addressText}>
                        {
                            addressData.length ? (`${addressData}`) : ('No Address')

                        }
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Address
