const db = require('../models/index')
const lastUpdate = require("./updates.js")
const requestify = require("requestify")
const Currency = db.Currency;
const delay = 3600000;
const apiUrl1 = "https://api.getgeoapi.com/v2/currency/convert?from=";
const apiUrl2 = "&to=USD&amount=1&api_key=284e875929acc9718e9af7d4e2ccc1187e05de1f";

const checkOneUpdate = (req, res, next) => {
    let now = new Date();
    if (now.getTime() > lastUpdate[req.params.id].getTime() + delay) {
        requestify.get(apiUrl1 + req.params.id + apiUrl2)
        .then((response) => {
            console.log("Response USD rate: ", response.getBody().rates["USD"].rate)
            let price = response.getBody().rates["USD"].rate;
            lastUpdate[req.params.id] = new Date();
            return Currency.update({lastPrice: price}, { where: {code: req.params.id}})
        })
        .then(() => {
            next();
        })
        .catch(err => {
            res.status(400)
            res.send(err);
        });
    } else {
        next();
    }
}

const checkAllUpdates = (req, res, next) => {
    console.log("Checkng all currencies for updates")
    let now = new Date();
    let ids = Object.keys(lastUpdate);
    console.log("Update keys: ", ids)
    let requests = ids.reduce((prev, curr) => {
        if(now.getTime() > lastUpdate[curr].getTime() + delay) {
            return prev.concat([requestify.get(apiUrl1 + curr + apiUrl2)]);
        } else {
            return prev;
        }
    }, [])
    console.log("Requests: ", requests)
    Promise.all(requests)
    .then((responses) => {
        let promiseArray = responses.map((val) => {
            console.log("Results: ", val.getBody());
            let id = val.getBody().base_currency_code;
            console.log("ID: ", id)
            lastUpdate[id] = new Date();
            return Currency.update({lastPrice: val.getBody().rates["USD"].rate}, {where: {code: id}})
        })
        return Promise.all(promiseArray);
    })
    .then(() => {
        next();
    })
    .catch(err => {
        console.log("Update all error: ", err)
        res.status(400);
        res.send(err);
    });
}

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
    console.log("Retrieving all currencies")
    Currency.findAll({})
    .then((currency) => {
        res.status(200).send(currency)
    })
    .catch(err => {
        console.log("Get all error: ", err)
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
    checkOneUpdate,
    checkAllUpdates,
    addCurrency,
    getAllCurrencies,
    getOneCurrency,
    updateCurrency,
    deleteCurrency
}
       