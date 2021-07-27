const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartItemSchema = new Schema({
    name: {
        type: String,
        minlength: [3, 'panjang nama makanan minimal 3 karakter'],
        required: [true, 'nama harus diisi'],
    },
    qty: {
        type: Number,
        min: [1, 'qty minimal 1'],
        required: [true, 'qty min 1'],
    },
    price: {
        type: Number,
        default: 0,
    },
    image_url: String,

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

    menu: {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
    },
}, { timestamps: true });

const CartItem = mongoose.model('CartItem', cartItemSchema);
module.exports = CartItem;
