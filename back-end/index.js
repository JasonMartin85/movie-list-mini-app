const express = require('express')
const app = require('./app');
require("dotenv").config();

const port = process.env.SERVER_PORT || 3001;

app.use(express.json());

app.listen(port, () => console.log(`Express server listening on port ${port}`))