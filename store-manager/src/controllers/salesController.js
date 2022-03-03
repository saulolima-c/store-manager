const {
    createNewSale, showSales,
    showOneSale, modificateSale,
    deleteSaleById } = require('../services/salesService');

const registerSale = async (req, res) => {
    const sale = req.body;
    const newSale = await createNewSale(sale);
    return res.status(newSale.code).json({ id: newSale.id, itemsSold: sale });
};

const showAllSales = async (_req, res) => {
    const allSales = await showSales();
    res.status(allSales.code).json(allSales.sales);
};

const showOneOfTheSales = async (req, res) => {
    const { id } = req.params;
    const specificSale = await showOneSale(id);
    res.status(specificSale.code).json(specificSale.oneSale);
};

const updateSale = async (req, res) => {
    const { id } = req.params;
    const updatingSale = await modificateSale(id, req.body);

    return res.status(updatingSale.code)
        .json({ saleId: updatingSale.saleId, itemUpdated: updatingSale.saleDetails });
};

const removeSale = async (req, res) => {
    const { id } = req.params;
    const deleting = await deleteSaleById(id);
    const { code, sale } = deleting;
    return res.status(code).json(sale);
};

module.exports = {
    registerSale,
    showAllSales,
    showOneOfTheSales,
    updateSale,
    removeSale,
};