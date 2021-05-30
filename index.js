const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const port = process.env.PORT || 8000;

const app = express();

const run = async () => {
  await mongoose.connect(config.getDbUrl(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  app.use(cors);
  app.listen(port, () => {
    console.log(`server start at http://localhost:${port}`);
  });
};

run().catch((e) => console.log(e));
