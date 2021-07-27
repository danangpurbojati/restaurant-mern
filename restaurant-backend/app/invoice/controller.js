const { subject } = require('@casl/ability');
const Invoice = require('./model');
const { policyFor } = require('../policy');

const show = async (req, res) => {
    try {
        const { orderId } = req.params;

        const invoice = await Invoice
            .findOne({ order: orderId })
            .populate('order')
            .populate('user');

        // (1) deklarasikan `policy` untuk `user`
        const policy = policyFor(req.user);

        // (2) buat `subjectInvoice`
        const subjectInvoice = subject('Invoice', { ...invoice, user_id: invoice.user._id });

        // (3) cek policy `read` menggunakan `subjectInvoice`
        if (!policy.can('read', subjectInvoice)) {
            res.json({
                error: 1,
                message: 'Anda tidak memiliki akses untuk melihat invoice ini.',
            });
        }

        res.json(invoice);
    } catch (err) {
        res.json({
            error: 1,
            message: 'Error when getting invoice.',
        });
    }
};

module.exports = {
    show,
};
