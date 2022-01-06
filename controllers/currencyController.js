const db = require('../models/index')
const Currency = db.Currency;

const addCurrency = async (req, res) => {
    let input_data = {
        name: req.body.name,
        code: req.body.code,
        symbol: req.body.symbol,
        lastPrice: req.body.lastPrice
    }
    const currency = await Currency.create(input_data)
    
    res.status(200).send(currency)
}  

const getAllCurrencies = async (req, res) => {
    let currency = await Currency.findAll({})
    res.status(200).send(currency)
} 

const getOneCurrency = async (req, res) => {
    let id = req.params.id
    
    let currency = await Currency.findOne({where: {code: id}})
    res.status(200).send(currency)
}

const updateCurrency = async (req, res) => {
    let id = req.params.id

    const currency = await Currency.update(req.body, { where: {code: id}})
    res.status(200).send(currency)
}

const deleteCurrency = async (req, res) => {
    let id = req.params.id

    await Currency.destroy({where :{code: id}})
    res.status(200).send(`currency with id: ${id} is deleted`)
}   

module.exports = {
    addCurrency,
    getAllCurrencies,
    getOneCurrency,
    updateCurrency,
    deleteCurrency
}
       