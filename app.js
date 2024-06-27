const express = require("express")
const books = require("./db");

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
    const id = new Date().getTime
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
})

app.listen(2700,()=>{
    console.log("Servidor activo");
})