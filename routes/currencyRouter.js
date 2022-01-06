const currencyController = require('../controllers/currencyController.js')
const router = require('express').Router()

router.post('/', currencyController.addCurrency)

router.get('/', currencyController.getAllCurrencies)

router.get('/:id', currencyController.getOneCurrency)

router.put('/:id', currencyController.updateCurrency)

router.delete('/:id', currencyController.deleteCurrency)

module.exports = router