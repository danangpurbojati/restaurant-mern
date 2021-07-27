const fs = require('fs');
const path = require('path');
const config = require('../config');
const Menu = require('./model');
const Category = require('../categories/model');

const index = async (req, res, next) => {
    try {
        let {
            limit = 10,
            skip = 0,
            q = '',
            category = '',
        } = req.query;

        let criteria = {};

        if (q.length) {
            criteria = {
                ...criteria,
                name: { $regex: `${q}`, $options: 'i' },
            };
        }

        if (category.length) {
            category = await Category.findOne({
                name: { $regex: `${category}`, $options: 'i' },
            });

            if (category) {
                criteria = {
                    ...criteria,
                    category: category._id,
                };
            }
        }

        const count = await Menu.find(criteria).countDocuments();

        const menu = await Menu.find(criteria).limit(parseInt(limit, 10)).skip(parseInt(skip, 10)).populate('category');

        res.json({
            count,
            data: menu,
        });
    } catch (error) {
        next(error);
    }
};

const store = async (req, res, next) => {
    try {

        let payload = req.body;

        if (payload.category) {
            const category = await Category.findOne({ name: { $regex: payload.category, $options: 'i' } });

            if (category) {
                payload = { ...payload, category: category._id };
            } else {
                delete payload.category;
            }
        }

        // cek apakah punya file atau tidak
        if (req.file) {
            const temporaryPath = req.file.path;
            const originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            const filename = `${req.file.filename}.${originalExt}`;
            const targetPath = path.resolve(config.rootPath, `public/upload/${filename}`);

            const src = fs.createReadStream(temporaryPath);
            const dest = fs.createWriteStream(targetPath);
            src.pipe(dest);

            // mengirimkan hasil simpanan file ke client (product dan gambar)
            src.on('end', async () => {
                const menu = new Menu({ ...payload, image_url: filename });
                await menu.save();
                res.json(menu);
            });

            // ini jika penyimpanan file gagal
            src.on('error', async () => {
                next();
            });
        } else {
            // jika tanpa file image
            const menu = new Menu(payload);
            await menu.save();
            res.json(menu);
        }
    } catch (error) {
        if (error && error.name === 'ValidationError') {
            res.json({
                error: 1,
                message: error.message,
                fields: error.errors,
            });
        }

        next(error);
    }
};

const update = async (req, res, next) => {
    try {

        let payload = req.body;

        if (payload.category) {
            const category = await Category.findOne({ name: { $regex: payload.category, $options: 'i' } });

            if (category) {
                payload = { ...payload, category: category._id };
            } else {
                delete payload.category;
            }
        }

        // cek apakah punya file atau tidak
        if (req.file) {
            const temporaryPath = req.file.path;
            const originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            const filename = `${req.file.filename}.${originalExt}`;
            const targetPath = path.resolve(config.rootPath, `public/upload/${filename}`);

            const src = fs.createReadStream(temporaryPath);
            const dest = fs.createWriteStream(targetPath);
            src.pipe(dest);

            // menghapus gambar lama dan mengganti gambar baru
            // mengirimkan hasil update file ke client (product dan gambar)
            src.on('end', async () => {
                const menu = await Menu.findById(req.params.id);
                const currentImage = `${config.rootPath}/public/upload/${menu.image_url}`;

                // jika ada file, hapus
                if (fs.existsSync(currentImage)) {
                    fs.unlinkSync(currentImage);
                }

                const updatedMenu = await Menu.findByIdAndUpdate(
                    req.params.id,
                    { ...payload, image_url: filename },
                    { new: true, runValidators: true },
                );

                res.json({
                    status: 'data has been updated',
                    data: updatedMenu,
                });
            });

            // ini jika penyimpanan file gagal
            src.on('error', async () => {
                next();
            });
        } else {
            // jika tanpa file image
            const updatedMenu = await Menu.findByIdAndUpdate(
                req.params.id,
                { ...payload },
                { new: true, runValidators: true },
            );

            res.json(updatedMenu);
        }
    } catch (error) {
        if (error && error.name === 'ValidationError') {
            res.json({
                error: 1,
                message: error.message,
                fields: error.errors,
            });
        }

        next(error);
    }
};

const destroy = async (req, res, next) => {
    try {

        const menu = await Menu.findByIdAndDelete(req.params.id);

        // find image location
        const currentImage = `${config.rootPath}/public/upload/${menu.image_url}`;

        // delete image
        if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
        }

        res.json({
            status: 'menu has been deleted',
            data: menu,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    index,
    store,
    update,
    destroy,
};
