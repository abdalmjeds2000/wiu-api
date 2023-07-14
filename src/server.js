const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require("./router");

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);


const username = process.env.USERNAME,
      password = process.env.PASSWORD,
      dbname = process.env.DB_NAME,
      port = process.env.PORT;
const uri = `mongodb+srv://${username}:${password}@main-cluster.umonv3j.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log(`Server is Run at ${new Date().toLocaleString()}, at port: ${port}!`);
  app.listen(port);
});