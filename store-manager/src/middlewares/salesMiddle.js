const { validateSaleById,
    productValidation, quantityValidation } = require('../schemas/salesSchema');

const validateNewSale = async (req, res, next) => {
    const productId = await productValidation(req.body);
    const findInvalidPId = productId.find((nv) => nv.code);
    if (findInvalidPId) {
        const { code, message } = findInvalidPId;
        return res.status(code).json({ message });
    }
    next();
};

const validateQuantityOfSale = async (req, res, next) => {
    const quantity = await quantityValidation(req.body);
    const findWrong = quantity.find((nv) => nv.code);
    if (findWrong) {
        const { message } = findWrong;
        return res.status(findWrong.code).json({ message });
    }
    next();
};

const validateSaleExistenceById = async (req, res, next) => {
    const { id } = req.params;
    const validSale = await validateSaleById(id);
    if (validSale.code === 404) {
        return res.status(validSale.code)
            .json({ message: validSale.message });
    }
    next();
};

module.exports = {
    validateNewSale,
    validateQuantityOfSale,
    validateSaleExistenceById,
};