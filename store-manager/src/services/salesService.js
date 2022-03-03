const salesModel = require('../models/salesModel');

const { getOne, refreshProduct, getQuantityProd } = require('../models/productModel');

const createNewSale = async (vendas) => {
    const saleResponse = await salesModel.createSaleProducts(vendas);
    await Promise.all(vendas.map(async (venda) => {
        const prod = await getOne(venda.product_id);
        const quant = prod[0].quantity - venda.quantity;
        return refreshProduct(venda.product_id, quant);
    }));
    return { code: 201, id: saleResponse };
};

const showSales = async () => {
    const sales = await salesModel.getSales();
    return { code: 200, sales };
};

const showOneSale = async (id) => {
    const oneSale = await salesModel.getOneSale(id);
    return { code: 200, oneSale };
};

const modificateSale = async (saleId, saleDetails) => {
    await salesModel.editSale(saleId, saleDetails);
    return { code: 200, saleId, saleDetails };
};

const deleteSaleById = async (id) => {
    const sale = await salesModel.getOneSale(id);
    await Promise.all(sale.map(async (s) => {
        const productsQuant = await getQuantityProd(s.product_id);
        const salesQuant = await salesModel.getQuantitySales(s.product_id);
        const refreshQuantity = productsQuant[0].quantity + salesQuant;
        await refreshProduct(s.product_id, refreshQuantity);
    }));
    await salesModel.deleteSale(id);
    return { code: 200, sale };
};

module.exports = { createNewSale, showSales, showOneSale, modificateSale, deleteSaleById };