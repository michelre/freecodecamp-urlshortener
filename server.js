'use strict';

const express = require('express');
const utils = require('./utils');
const mongoUtils = require('./mongo-utils');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser());

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send({status: 'OK'});
});

app.get('/shorten', (req, res) => {
  const id = utils.generateId();
  const baseUrl = req.query.url || 'http://www.google.com';
  const re = /^(ftp|http|https):\/\/[^ "]+$/;
  if(!re.test(baseUrl)) {
    res.send({ error: 'Your url is not valid' });
  }
  else {
    mongoUtils
      .insert({url: baseUrl, id})
      .then(() => res.send({ url: baseUrl, short_url: `http://${req.get('host')}/${id}` }))
      .catch(err => res.status(500).send(err));
  }
});

app.get('/:id', (req, res) => {
  mongoUtils
    .get(req.params.id)
    .then((d) => res.redirect(d.url))
    .catch(err => res.status(500).send(err));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
