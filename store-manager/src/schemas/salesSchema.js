const { getOneSale } = require('../models/salesModel');

const productValidation = (sale) => {
    const productId = sale.map((s) => {
        if (!s.product_id) {
            return { code: 400, message: '"product_id" is required' };
        }
        return { message: '' };
    });
    return productId;
};

const quantityValidation = (sale) => {
    const quantityVal = sale.map(({ quantity }) => {
        if (!quantity && quantity !== 0) {
            return { code: 400, message: '"quantity" is required' };
        }

        if (typeof quantity !== 'number' || quantity < 1) {
            return { code: 422, message: '"quantity" must be a number larger than or equal to 1' };
        }
        return { message: '' };
    });
    return quantityVal;
};

const validateSaleById = async (id) => {
    const checkingSale = await getOneSale(id);
    if (checkingSale.length === 0) return { code: 404, message: 'Sale not found' };
    return checkingSale;
};

module.exports = { validateSaleById,
    productValidation,
    quantityValidation };