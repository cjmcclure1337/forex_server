const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require("cors");


//middlewares
app.use(cors())
app.use(express.json());


//routers
const currencyRouter= require("./routes/currencyRouter.js")
app.use("/currency", currencyRouter);

app.get('/', (req, res) => {
res.send('Hello World!');
})


app.listen(port, () => {
console.log(`Example app listening at port:${port}`)
})