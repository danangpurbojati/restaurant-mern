const { AbilityBuilder, Ability } = require('@casl/ability');

const policies = {
    guest(user, { can }) {
        can('read', 'Menu');
        can('read', 'Category');
    },

    user(user, { can }) {
        // membaca daftar `Order`
        can('view', 'Order');

        // membuat `Order`
        can('create', 'Order');

        // membaca `Order` miliknya
        can('read', 'Order', { user_id: user._id });

        // mengupdate data dirinya sendiri (`User`)
        can('update', 'User', { _id: user._id });

        // membaca `Cart` miliknya
        can('read', 'Cart', { user_id: user._id });

        // mengupdate `Cart` miliknya
        can('update', 'Cart', { user_id: user.id });

        // membaca `Invoice` miliknya
        can('read', 'Invoice', { user_id: user._id });
    },

    admin(user, { can }) {
        can('manage', 'all');
    },
};

const policyFor = (user) => {
    const builder = new AbilityBuilder();

    if (user && typeof policies[user.role] === 'function') {
        policies[user.role](user, builder);
    } else {
        policies.guest(user, builder);
    }

    return new Ability(builder.rules);
};

module.exports = {
    policyFor,
};
