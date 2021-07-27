const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        minlength: [3, 'minimal category name characters is 3'],
        required: [true, 'category name is required'],
    },
    image_url: {
        type: String,
        required: [true, 'category has to be has image'],
    },
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
