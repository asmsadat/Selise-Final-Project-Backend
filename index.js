const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');

const productRoutes = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://127.0.0.1:27017/finalProject')
.then(()=> console.log("Connection Successful"))
.catch((err)=>console.log(`Error: ${err}`))

app.use("/product", productRoutes);

app.use("/mycart", cartRoute);

app.listen(port, () => {
    console.log(`Running on port ${port}`);
  })