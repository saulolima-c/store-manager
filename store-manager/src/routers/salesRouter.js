const { Router } = require('express');
const {
    validateSaleExistenceById,
    validateNewSale,
    validateQuantityOfSale,
} = require('../middlewares/salesMiddle');

const { validQuantityInSale } = require('../middlewares/productsMiddle');

const router = Router();

const {
    registerSale,
    showAllSales,
    showOneOfTheSales,
    updateSale,
    removeSale,
} = require('../controllers/salesController');

router.post('/', validateNewSale, validateQuantityOfSale, validQuantityInSale, registerSale);
router.get('/', showAllSales);
router.get('/:id', validateSaleExistenceById, showOneOfTheSales);
router.put('/:id', validateNewSale, validateQuantityOfSale, updateSale);
router.delete('/:id', validateSaleExistenceById, removeSale);

module.exports = router;