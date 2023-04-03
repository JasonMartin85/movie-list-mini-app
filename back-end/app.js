const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const app = express();
const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);

app.use(morgan('tiny'))
app.use(cors());
app.use(express.json())

app.get("/movies", (req,res) => {
  knex
    .select('*')
    .from('movies')
    .then(data => { res.status(200).send(data)})
    .catch((err) => {
      res.status(404).send('Unable to access requested resources, please try again later')
    })
})

app.get("/movies/:title", (req,res) => {
  const title = req.params.title;
  console.log(title)
  knex
    .select('*')
    .from('movies')
    .whereILike('title',`%${title}%`)
    .then(data => { res.status(200).send(data)})
    .catch((err) => {
      res.status(404).send('Unable to access requested resources, please try again later')
    })
})

app.post("/movies", (req,res) => {
  results = knex('movies').insert({
    'title':req.body.title,
    'hardcoded':false,
  }, "*")
  .then(data => res.status(201).json(data))
  .catch((err) => {
    res.status(404).send(err)
  })
})

app.delete("/movies/:id", (req,res) => {
  const id = req.params.id
  
  knex('movies').where("id","=",id).del()
  .then(data => res.status(204))
})


module.exports = app;