const express = require("express");
const books = require("./db");

const app = express();

app.use(express.text());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`<h1> HOME </h1>`);
});

app.get("/books", (req, res) => {
  if (books.length === 0) {
    res.status(204);
  }
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const getTitle = books.find((title) => title.id === id);
  if (!getTitle) {
    res.status(204);
  }
  res.json(getTitle);
});

app.post("/books", (req, res) => {
  const id = new Date().getTime();
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res.status(400).send("Datos faltantes.");
  }
  const titleRep = books.find((books) => books.title === title);
  if (titleRep) {
    return res.status(401).send("Ya existe el libro que desea agregar.");
  }
  books.push({
    id: id,
    title: title,
    author: author,
    year: year,
  });
  res.send("Se agrego con éxito el nuevo libro");
});

// app.put("/books/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const { title, author, year } = req.body;
//   const getBook = books.find((title) => title.id === +id);
//   getBook.title = title;
//   getBook.author = author;
//   getBook.year = year;
//   res.json({ message: "La actualización resulto exitosa" });
// });

app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res.status(400).send("Hay un error en su petición.");
  }
  const bookIndex = books.find((title) => title.id === id);
  if (!bookIndex) {
    return res.status(400).send("No existe el libro que desea editar.");
  }
  bookIndex.id = id;
  bookIndex.title = title;
  bookIndex.author = author;
  bookIndex.year = year;
  res.send("Se editó la entrada con éxito");
});

app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const getBook = books.find((title) => title.id === id);
  if (!getBook) {
    return res.status(404).send("No existe el libro que desea eliminar");
  }
  const getIndex = books.indexOf(getBook);
  const deleteBook = books.splice(getIndex, 1);
  res.send("Éxito al eliminar el libro.");
});

app.listen(2700, () => {
  console.log("Servidor activo");
});
