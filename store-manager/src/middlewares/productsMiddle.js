const { searchProduct, getOne } = require('../models/productModel');

const { validateQuantityInSale } = require('../schemas/productsSchema');

const validateNameProd = (name) => {
    if (!name) return { code: 400, message: '"name" is required' };
    if (name.length < 5) {
        return { code: 422, message: '"name" length must be at least 5 characters long' };
    }
    return false;
};

const validateQuantity = (quantity) => {
    if (!quantity && quantity !== 0) return { code: 400, message: '"quantity" is required' };
    if (typeof quantity !== 'number' || quantity < 1) {
        return { code: 422, message: '"quantity" must be a number larger than or equal to 1' };
    }
    return false;
};

const checkProductByName = async (name) => {
    const checkingDB = await searchProduct(name);
    if (checkingDB.length > 0) {
        return {
            code: 409,
            message: 'Product already exists',
        };
    }
    return false;
};

const findProductById = async (id) => {
    const prod = await getOne(id);
    if (prod.length === 0) return { code: 404, message: 'Product not found' };
    return prod;
};

const validateProductById = async (req, res, next) => {
    const { id } = req.params;
    const product = await findProductById(id);
    if (product.code === 404) {
        return res.status(product.code)
        .json({
            message: product.message,
        });
    }
    next();
};

const validateInsertion = async (name, quantity) => {
    const msgName = '"name" length must be at least 5 characters long';
    const msgQuant = '"quantity" must be a number larger than or equal to 1';
    if (name.length < 5) return { code: 422, message: msgName };
    if (typeof quantity !== 'number' || quantity <= 0) {
        return { code: 422, message: msgQuant };
    }
    return false;
};

const validQuantityInSale = async (req, res, next) => {
    const valid = await validateQuantityInSale(req.body);
    if (valid) {
        return res.status(valid.code)
        .json({
            message: valid.message,
        });
    }
    next();
};

module.exports = {
    validateQuantity,
    validateNameProd,
    checkProductByName,
    findProductById,
    validateInsertion,
    validateProductById,
    validQuantityInSale,
};