const express = require('express');
const cors = require('cors');
const router = require('./router')

const app = express();
app.use(express.json());

const port = 6969;

let settings = {
  origin: '*',
  methods: 'POST, GET, OPTIONS',
  allowedHeaders: 'Authorization, Content-Type, Accept, x, funcTime, pass',
  exposedHeaders: 'WTF, funcTime',
  optionsSuccessStatus: 202
};

app.use(cors(settings));
app.use(router);

app.listen(port, () => {
  console.log(`Server run on port: ${port}`)
});