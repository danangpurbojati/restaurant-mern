const mongoose = require('mongoose');

const { Schema } = mongoose;

const menuSchema = new Schema({
    name: {
        type: String,
        minLength: [3, 'minimal characters for menu name are 3'],
        required: [true, 'name menu is required'],
    },
    description: {
        type: String,
        maxLength: [1000, 'maximum character description is 1000'],
    },
    price: {
        type: Number,
        default: 0,
    },
    image_url: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
}, { timestamps: true });

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
