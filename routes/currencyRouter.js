const currencyController = require('../controllers/currencyController.js')
const { isAdmin } = require("../controllers/authController")
const router = require('express').Router()


router.post('/', currencyController.addCurrency)

router.get('/', currencyController.checkAllUpdates, currencyController.getAllCurrencies)

router.get('/:id', currencyController.checkOneUpdate, currencyController.getOneCurrency)

router.put('/:id', isAdmin, currencyController.updateCurrency)

router.delete('/:id', isAdmin, currencyController.deleteCurrency)

module.exports = router