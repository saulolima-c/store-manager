const productsModel = require('../models/productModel');

const productMiddle = require('../middlewares/productsMiddle');

const create = async (name, quantity) => {
    const IsProdNameValid = productMiddle.validateNameProd(name);
    if (IsProdNameValid) return IsProdNameValid;

    const IsProdQuantityValid = productMiddle.validateQuantity(quantity);
    if (IsProdQuantityValid) return IsProdQuantityValid;

    const checkingProduct = await productMiddle.checkProductByName(name);
    if (checkingProduct) return checkingProduct;

    const product = await productsModel.createProduct(name, quantity);
    return { code: 201, product };
};

const getAllProducts = async () => {
    const allProds = await productsModel.getAll();
    return { code: 200, allProds };
};

const getOneProduct = async (id) => {
    const productFound = await productMiddle.findProductById(id);
    if (productFound.code === 404) return productFound;
    return { code: 200, product: productFound };
};

const editProduct = async (id, name, quantity) => {
    const checkExistence = await productMiddle.findProductById(id);
    if (checkExistence.code === 404) return checkExistence;

    const validInsertion = await productMiddle.validateInsertion(name, quantity);
    if (validInsertion) return validInsertion;

    const insertion = await productsModel.editOne(id, name, quantity);
    return { code: 200, product: insertion };
};

const deleteProduct = async (id) => {
    const removalTarget = await productMiddle.findProductById(id);
    if (removalTarget.code === 404) return removalTarget;
    await productsModel.deleteOne(id);

    return { code: 200, product: removalTarget };
};

module.exports = { create, getAllProducts, getOneProduct, editProduct, deleteProduct };