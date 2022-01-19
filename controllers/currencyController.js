const db = require('../models/index')
const Currency = db.Currency;

const addCurrency = (req, res) => {
    let input_data = {
        name: req.body.name,
        code: req.body.code,
        symbol: req.body.symbol,
        lastPrice: req.body.lastPrice
    }
    Currency.create(input_data)
    .then((currency) => {
        res.status(200).send(currency)
    })
    .catch(err => {
        res.status(400);
        res.send(err);
    });
}  

const getAllCurrencies = (req, res) => {
    Currency.findAll({})
    .then((currency) => {
        res.status(200).send(currency)
    })
    .catch(err => {
        res.status(400);
        res.send(err);
    });
} 

const getOneCurrency = (req, res) => {
    let id = req.params.id
    
    Currency.findOne({where: {code: id}})
    .then((currency) => {
        res.status(200).send(currency)
    })
    .catch(err => {
        res.status(400);
        res.send(err);
    });
}

const updateCurrency = (req, res) => {
    let id = req.params.id

    Currency.update(req.body, { where: {code: id}})
    .then((currency) => {
        res.status(200).send(currency)
    })
    .catch(err => {
        res.status(400);
        res.send(err);
    });
    
}

const deleteCurrency = (req, res) => {
    let id = req.params.id

    Currency.destroy({where :{code: id}})
    .then(() => {
        res.status(200).send(`currency with id: ${id} is deleted`)
    })
    .catch(err => {
        res.status(400);
        res.send(err);
    });
    
}   

module.exports = {
    addCurrency,
    getAllCurrencies,
    getOneCurrency,
    updateCurrency,
    deleteCurrency
}
       