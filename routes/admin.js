// import fetch from 'node-fetch';
'use strict'
const { strict } = require('assert')
const express = require('express')
const path = require('path')
const app = new express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))
app.set('view options', { layout: false })

app.get('/', async (req, res) => {
  const axios = require('axios')
  axios.get('http://localhost:3000/api/books')
    .then(function (response) {
      res.render('index.ejs', {books : response.data});
    })
    .catch(function (error) {
      res.send(error)
    })

})

app.get("/addbook", (req, res)=>{
  res.render("addForm")
})


module.exports = app
