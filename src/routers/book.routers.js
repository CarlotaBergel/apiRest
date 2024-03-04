const {Router} = require("express");
const router = Router();
const bookCtrl = require("../controller/book.controller"); 

router.get("/book", bookCtrl.mostrarLibro);
router.get("/books", bookCtrl.mostrarLibros);
router.post("/books", bookCtrl.addBook);
router.put("/books/:id", bookCtrl.updateBook);
router.delete("/books/:id", bookCtrl.deleteBook);

module.exports = router; 