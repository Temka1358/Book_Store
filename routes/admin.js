// import fetch from 'node-fetch';
'use strict'
const { strict } = require('assert')
const express = require('express')
const { fstat } = require('fs')
const path = require('path')
const app = new express()
const books_default = require('../book_default.json')
const fs = require('fs')

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
  res.render("Form")

})

app.get("/reset", async (req,res)=>{
    await fs.writeFile(path.join(__dirname, "../book.json"), JSON.stringify(books_default), async err =>{
    if(err){
      res.send("Error occured white updating booj.json.: " + err)
    }
     res.redirect('/')
  })
  
})

module.exports = app
