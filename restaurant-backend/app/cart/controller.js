const { policyFor } = require('../policy');
const Menu = require('../menus/model');
const CartItem = require('../cart-item/model');

const update = async (req, res, next) => {
    const policy = policyFor(req.user);

    if (!policy.can('update', 'Cart')) {
        res.json({
            error: 1,
            message: 'You are not allowed to perform this action',
        });
    }

    try {
        const { items } = req.body;

        // untuk mendapatkan menu id dari setiap item
        const menuIds = items.map((itm) => itm._id);

        // untuk mendapatkan nama menu dari id yang didapatkan di menuIds
        const menus = await Menu.find({ _id: { $in: menuIds } });

        // menggabungkan properti dari item, tambah user, dan menu
        const cartItems = items.map((item) => {
            const relatedMenu = menus.find((menu) => menu._id.toString() === item._id);
            return {
                _id: relatedMenu._id,
                menu: relatedMenu._id,
                price: relatedMenu.price,
                image_url: relatedMenu.image_url,
                name: relatedMenu.name,
                user: req.user._id,
                qty: item.qty,
            };
        });

        res.json({
            items,
            menus,
            cartItems,
        });

        await CartItem.bulkWrite(cartItems.map((item) => (
            {
                updateOne: {
                    filter: { user: req.user._id, menu: item.menu },
                    update: item,
                    upsert: true,
                },
            }
        )));

        res.json(cartItems);
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

    if (!policy.can('read', 'Cart')) {
        res.json({
            error: 1,
            message: 'You are not allowed to perform this action',
        });
    }

    try {
        const items = await CartItem
            .find({ user: req.user._id })
            .populate('menu');

        res.json(items);
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
    update,
    index,
};
