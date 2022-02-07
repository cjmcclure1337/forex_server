let serverStart = new Date();
let delay = 7200000;
let defaultTime = serverStart.getTime() - delay;

module.exports = {
//    USD: new Date(),
    EUR: defaultTime,
    JPY: defaultTime,
    GBP: defaultTime,
    AUD: defaultTime,
    CAD: defaultTime,
    CHF: defaultTime,
    CNY: defaultTime,
    HKD: defaultTime,
    NZD: defaultTime
}