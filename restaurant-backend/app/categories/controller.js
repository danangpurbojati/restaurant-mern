const fs = require('fs');
const path = require('path');
const config = require('../config');
const Category = require('./model');

const index = async (req, res, next) => {
    try {
        const categories = await Category.find();

        res.json({
            status: 'category index api',
            data: categories,
        });
    } catch (error) {
        next(error);
    }
};

const store = async (req, res, next) => {
    try {
        const payload = req.body;

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
                const category = new Category({ ...payload, image_url: filename });
                await category.save();
                res.json(category);
            });

            // ini jika penyimpanan file gagal
            src.on('error', async () => {
                next();
            });
        } else {
            const category = new Category({ ...payload });
            await category.save();
            res.json(category);
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

        const payload = req.body;

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
                const category = await Category.findById(req.params.id);
                const currentImage = `${config.rootPath}/public/upload/${category.image_url}`;

                // jika ada file, hapus
                if (fs.existsSync(currentImage)) {
                    fs.unlinkSync(currentImage);
                }

                const updatedCategory = await Category.findByIdAndUpdate(
                    req.params.id,
                    { ...payload, image_url: filename },
                    { new: true, runValidators: true },
                );

                res.json({
                    status: 'category has been updated',
                    data: updatedCategory,
                });
            });

            // ini jika penyimpanan file gagal
            src.on('error', async () => {
                next();
            });
        } else {
            const updatedCategory = await Category.findByIdAndUpdate(
                req.params.id,
                { ...payload },
                { new: true, runValidators: true },
            );

            res.json(updatedCategory);
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

        const category = await Category.findByIdAndDelete(req.params.id);

        // find image location
        const currentImage = `${config.rootPath}/public/upload/${category.image_url}`;

        // delete image
        if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
        }

        res.json({
            status: 'category has been deleted',
            data: category,
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
