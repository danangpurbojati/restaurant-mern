import React, { useState } from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import OrderItems from '../../components/OrderItems';
import Address from '../../components/Address';
import ReviewOrder from '../../components/ReviewOrder';

import useStyles from './style';

import { useSelector, useDispatch } from 'react-redux';
import { config } from '../../config';
import { createOrder } from '../../api/order';

import { useHistory } from 'react-router-dom';
import { clearItems } from '../../features/Cart/actions';
import { saveCart } from '../../api/cart';

const steps = ['Order Items', 'Address', 'Review your order'];

const getStepContent = (step) => {
    switch (step) {
        case 0:
            return <OrderItems />
        case 1:
            return <Address />
        case 2:
            return <ReviewOrder />
        default:
          throw new Error('Unknown step');
    }
}

const Order = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = useState(0);

    const addressData = useSelector(state => state.address.address);
    const cart = useSelector(state => state.cart);
    const { token } = useSelector(state => state.auth);

    const handleSubmitOrder = async () => {
        const payload = {
            deliveryFee: config.delivery_fee,
            deliveryAddress: addressData
        }

        const cartOrder = await saveCart(token, cart);

        if(cartOrder.error) {
            console.log('cart yang salah bosku')
        }

        const data = await createOrder(payload);

        console.log(data)

        if(data.error) {
            console.log('ada yang salah bosku')
        }

        history.push('/order-history');

        dispatch(clearItems());


    }

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <Container className={classes.orderPageWrapper} maxWidth="md">
            <Typography className={classes.orderPageTittle} variant="h4" align="center">
                Order Page
            </Typography>
            <Stepper activeStep={activeStep}>
                {
                    steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))
                }
            </Stepper>

            {
                getStepContent(activeStep)
            }

            <div className={classes.stepperButton} >
                {
                    activeStep === 0 ? (
                        <Button disabled onClick={handleBack}>
                            Back
                        </Button>
                    ) : (
                        <Button onClick={handleBack}>
                            Back
                        </Button>
                    )
                }

                {
                    activeStep === steps.length -1  ? (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmitOrder}
                        >
                            Finish
                        </Button>
                        
                    ) : (
                        
                            activeStep === 0 ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={cart.length ? false : true}
                                    onClick={handleNext}
                                >
                                    Next
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={addressData.length ? false : true}
                                    onClick={handleNext}
                                >
                                    Next
                                </Button>
                            )
                        
                    )
                }
            </div>
            
        </Container>
    )
}

export default Order
