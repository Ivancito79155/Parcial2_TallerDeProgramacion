const express = require("express")
const books = require("./db");
const { get } = require("http");

const app = express();

app.use(express.text);
app.use(express.json);

app.get("/",(req,res)=>{
    res.send(`<h1> HOME </h1>`)
})

app.get("/books",(req,res)=>{
    res.json(books)
})

app.get("/books/:id",(req,res) => {
    const id = parseInt(req.params.id)
    const getUser = books.find((title) => books.id === id)
    if (getUser) {
        console.log("Se encontró el libro");
    }
    else{
        console.log("No se encontró el libro buscado");
    }
})

app.post("/books",(req,res)=>{
    const id = new Date().getTime();
    const {title, author, year} = req.body;
    const newBook = books.push
    res.json({message:`Se subio el libro ${title}`})
})

app.put("/books/:id",(req,res) => {
    const id = parseInt(req.params.id);
    const {title,author,year} = req.body;
    const getBook = books.find((title) => books.id === id)
    getBook.title = title;
    getBook.author = author;
    getBook.year = year;
})

app.delete("/books/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const getBook = books.find(title);
    const getIndex = books.indexOf(getBook);
    const deleteBook = books.splice(getIndex,1)
})

app.listen(2700,()=>{
    console.log("Servidor activo");
})