const express = require("express");
const router = new express.Router();
const data = require('../book.json'); 
const app = require("./admin");
const fs = require('fs')
const path = require('path')

//list of books  
books = data.books;

// 1. send 3 random books
router.get('/random', (req, res)=>{
    do {
        var first = Math.floor(Math.random() * books.length)
        var second = Math.floor(Math.random() * books.length)
        var third = Math.floor(Math.random() * books.length)
    }while (!(first !== second && first!==second && second !== third ))
    let random = []
    random.push(books[first])
    random.push(books[second])
    random.push(books[third])
    res.send(random)
})

//2. sort by publish date
router.get('/sort/:value', (req, res) =>{
    let sortBy = req.params.value
    sorted = books.sort(function(a,b){
        if (sortBy == "published"){
            return Date.parse(b.sortBy) - Date.parse(a.sortBy)
        }else{
            return b.sortBy - a.sortBy
        }
    })
    res.send(sorted)
})

// 3. send authors
router.get('/authors', (req, res)=>{
    authors = []
    books.forEach(book => {
        authors.push(book.author)
    });
    res.send(authors.sort())
})

// 4. send all books
router.get('/books', (req, res)=>{
    res.send(books)
})

// 5. send book by isbn 
router.get("/book/:isbn", (req, res)=>{
    isbn = req.params.isbn
    book = books.filter( book =>{
        return book.isbn === isbn
    })
    res.send(book)
})
// 6. send book by title using query parameter
router.get("/search", (req, res)=>{
    title = req.query.title
    result = books.filter(book=>{
        return book.title.includes(title);
    })
    res.send(result)
})

// 7. send thickest book
router.get("/thickBook", (req, res)=>{
    temp = {}
    max = 0
    books.forEach(book=>{
        if(max < book.pages){
            max = book.pages
            temp = book
        }
    })
    res.send(temp)
})
// 8. send thinnest book
router.get('/thinBook', (req, res)=>{
    temp = {}
    min = 10000;
    books.forEach(book=>{
        if(min > book.pages){
            min = book.pages
            temp = book
        }
    })
    res.send(temp)
})
// 9. list books of publishers
router.get("/publisherBooks", (req,res)=>{
    const map = new Map();
    books.map(book => {
        let counter = 0;     
        if(!map.has(book.publisher)) {
            map.set(book.publisher, 1);
        } else {
            counter = map.get(book.publisher);
            map.set(book.publisher, counter+1);
        }
        return book.publisher
    })
    res.send(Object.fromEntries(map))
})
module.exports = router;
//delete book
router.get("/deletebook/:isbn", (req,res)=>{
    let isbn = req.params.isbn
    updated_books = books.filter( book =>{
        return book.isbn !== isbn
    })
    let data = {"books": updated_books}
    fs.writeFileSync(path.join(__dirname, "../book.json"), JSON.stringify(data))
    res.send("Book deleted")
})
