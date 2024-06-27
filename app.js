const express = require("express");
const books = require("./db");

const app = express();

app.use(express.text);
app.use(express.json);

app.get("/", (req, res) => {
  res.send(`<h1> HOME </h1>`);
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const getTitle = books.find((title) => title.id === id);
  if (getTitle) {
    console.log("Se encontró el libro");
  } else {
    console.log("No se encontró el libro buscado");
  }
});

app.post("/books", (req, res) => {
  const id = new Date().getTime();
  const { title, author, year } = req.body;
  const newBook = books.push({id:id,title:title,author:author,year:year});
  res.json({ message: "Se subio el nuevo libro" });
});

app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author, year } = req.body;
  const getBook = books.find((title) => title.id === id);
  getBook.title = title;
  getBook.author = author;
  getBook.year = year;
  res.json({ message: "La actualización resulto exitosa" });
});

app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const getBook = books.find(title);
  const getIndex = books.indexOf(getBook);
  const deleteBook = books.splice(getIndex, 1);
  res.json({ message: "Se eliminó con éxito el libro" });
});

app.listen(2700, () => {
  console.log("Servidor activo");
});
