const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderItemSchema = new Schema({
    name: {
        type: String,
        minlength: [3, 'Panjang nama makanan minimal 5 karakter'],
        required: [true, 'name must be filled'],
    },

    price: {
        type: Number,
        required: [true, 'Harga item harus diisi'],
    },

    qty: {
        type: Number,
        required: [true, 'Kuantitas harus diisi'],
        min: [1, 'Kuantitas minimal 1'],
    },

    menu: {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
    },

    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
    },
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);
module.exports = OrderItem;
