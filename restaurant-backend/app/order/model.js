/* eslint-disable no-return-assign */
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const { Schema } = mongoose;

const Invoice = require('../invoice/model');

const orderSchema = new Schema({
    status: {
        type: String,
        enum: ['waiting_payment', 'processing', 'in_delivery', 'delivered'],
        default: 'waiting_payment',
    },

    deliveryFee: {
        type: Number,
        default: 0,
    },

    deliveryAddress: {
        type: String,
        required: [true, 'address harus diisi.'],
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

    order_items: [{ type: Schema.Types.ObjectId, ref: 'OrderItem' }],
}, { timestamps: true });

orderSchema.plugin(AutoIncrement, { inc_field: 'order_number' });

orderSchema.virtual('items_count').get(function () {
    return this.order_items.reduce((total, item) => total + parseInt(item.qty, 10), 0);
});

orderSchema.post('save', async function () {
    // eslint-disable-next-line no-param-reassign
    const subTotal = this.order_items.reduce((sum, item) => sum += (item.price * item.qty), 0);

    // (1) buat objek `invoice` baru
    const invoice = new Invoice({
        user: this.user,
        order: this._id,
        sub_total: subTotal,
        deliveryFee: parseInt(this.deliveryFee, 10),
        total: parseInt(subTotal + this.deliveryFee, 10),
        deliveryAddress: this.deliveryAddress,
    });

    // (2) simpan ke MongoDB
    await invoice.save();
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
