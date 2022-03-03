const {
    create,
    getAllProducts,
    getOneProduct,
    editProduct,
    deleteProduct,
} = require('../services/productService');

const createNewProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const service = await create(name, quantity);
    if (service.message) {
        return res.status(service.code).json({
            message:
                service.message,
        });
    }
    const { code, product } = service;
    return res.status(code).json(product);
};

const showProducts = async (req, res) => {
    const list = await getAllProducts();
    res.status(list.code).json(list.allProds);
};

const showOneProduct = async (req, res) => {
    const { id } = req.params;
    const item = await getOneProduct(id);
    if (item.code === 404) {
        return res.status(item.code)
            .json({
                message: item.message,
            });
    }
    res.status(item.code).json(...item.product);
};

const deleteOneProduct = async (req, res) => {
    const { id } = req.params;
    const validateProduct = await getOneProduct(id);
    const removal = await deleteProduct(id);

    if (validateProduct.code === 404) {
        return res.status(validateProduct.code)
            .json({ message: validateProduct.message });
    }

    const { code, product } = removal;
    res.status(code).json(...product);
};

const editOneProduct = async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const validateProduct = await getOneProduct(id);
    const insert = await editProduct(id, name, quantity);

    if (validateProduct.code === 404) {
        return res.status(validateProduct.code)
            .json({ message: validateProduct.message });
    }

    if (insert.message) {
        return res.status(insert.code).json({ message: insert.message });
    }

    return res.status(insert.code).json(insert.product);
};

module.exports = {
    createNewProduct,
    showProducts,
    showOneProduct,
    editOneProduct,
    deleteOneProduct,
};