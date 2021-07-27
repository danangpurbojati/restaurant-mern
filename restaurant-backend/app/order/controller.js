const mongoose = require('mongoose');
const Order = require('./model');
const OrderItem = require('../order-item/model');
const CartItem = require('../cart-item/model');
const { policyFor } = require('../policy');

const store = async (req, res, next) => {
    const policy = policyFor(req.user);

    if (!policy.can('create', 'Order')) {
        res.json({
            error: 1,
            message: 'You are not allowed to perform this action',
        });
    }

    try {
        const { deliveryFee, deliveryAddress } = req.body;

        const items = await CartItem
            .find({ user: req.user._id })
            .populate('menu');

        if (!items.length) {
            res.json({
                error: 1,
                message: 'Can not create order because you have no items in cart',
            });
        }

        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            status: 'waiting_payment',
            deliveryFee,
            deliveryAddress,
            user: req.user._id,
        });

        // create order items too
        const orderItems = await OrderItem.insertMany(items.map((item) => (
            {
                ...item,
                name: item.menu.name,
                qty: parseInt(item.qty, 10),
                price: parseInt(item.menu.price, 10),
                order: order._id,
                menu: item.menu._id,
            }
        )));

        orderItems.forEach((item) => order.order_items.push(item));

        await order.save();

        await CartItem.deleteMany({ user: req.user._id });

        res.json(order);
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            res.json({
                error: 1,
                message: err.message,
                fields: err.errors,
            });
        }

        next(err);
    }
};

const index = async (req, res, next) => {
    const policy = policyFor(req.user);

    if (!policy.can('view', 'Order')) {
        res.json({
            error: 1,
            message: 'You are not allowed to perform this action',
        });
    }

    try {
        const { limit = 10, skip = 0 } = req.query;

        const count = await Order
            .find({ user: req.user._id })
            .countDocuments();

        const orders = await Order
            .find({ user: req.user._id })
            .limit(parseInt(limit, 10))
            .skip(parseInt(skip, 10))
            .populate('order_items')
            .sort('-createdAt');

        res.json({
            data: orders.map((order) => order.toJSON({ virtuals: true })),
            count,
        });
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            res.json({
                error: 1,
                message: err.message,
                fields: err.errors,
            });
        }

        next(err);
    }
};

module.exports = {
    store,
    index,
};
