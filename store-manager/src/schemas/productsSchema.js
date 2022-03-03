const productModel = require('../models/productModel');

const validateQuantityInSale = async (vendas) => {
    const quant = [];
    await Promise.all(vendas.map(async (venda) => {
        const quantProd = await productModel.getOne(venda.product_id);
        const salesQuant = quantProd[0].quantity - venda.quantity;
        quant.push(salesQuant);
    }));
    const inspection = quant.some((total) => total < 0);
    if (inspection) {
        return { code: 422, message: 'Such amount is not permitted to sell' };
    }
    return false;
};

module.exports = { validateQuantityInSale };