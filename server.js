const express = require('express')
const app = express()
const port = process.env.PORT || 3000


//middlewares
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