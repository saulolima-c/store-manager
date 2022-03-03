const { Router } = require('express');
const {
    showProducts,
    showOneProduct,
    createNewProduct,
    editOneProduct,
    deleteOneProduct } = require('../controllers/productController');

const { validateProductById } = require('../middlewares/productsMiddle');

const router = Router();

router.post('/', createNewProduct);
router.get('/', showProducts);
router.get('/:id', validateProductById, showOneProduct);
router.put('/:id', validateProductById, editOneProduct);
router.delete('/:id', deleteOneProduct);

module.exports = router;