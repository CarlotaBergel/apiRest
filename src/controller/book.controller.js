const {pool} = require("../../database");
const Book = require("../models/book");
const Response = require("../models/response");

const mostrarLibros = async (req, res) =>{
    let resp;

    try{
        let sql = "SELECT * FROM book WHERE id_user = '" + req.query.id_user + "'";
        let [result] = await pool.query(sql);
        console.log(result);
        console.log(sql);
        if(result.length == 0){
            resp = new Response (true, 400, "No se han encontrado libros", null);
            res.send(resp);
        }else{
            resp = new Response (false, 200, "Libro encontrado", result);
            res.send(resp);
        }
    }
    catch(err){
        resp = new Response (true, 400, "Error al crear usuario", null);
        res.send(resp);
        console.log(err);
    }
}

const mostrarLibro = async (req, res) =>{
    let resp;

    try{
        let sql = "SELECT * FROM book WHERE id_user = '" + req.query.id_user + "'"+ "AND id_book = '" + req.query.id_book + "'";
        let [result] = await pool.query(sql);
        console.log(result);
        if(result.length == 0){
            resp = new Response (true, 400, "No se han encontrado libros", null);
            res.send(resp);
        }else{
            let book = new Book(result[0].id_book, null, result[0].title, result[0].type, result[0].auhtor, result[0].price, result[0].photo);
            resp = new Response (false, 200, "Libro encontrado", book);
            res.send(resp);
        }
    }
    catch(err){
        resp = new Response (true, 400, "Error al crear usuario", null);
        res.send(resp);
        console.log(err);
    }
}

const addBook = async (req, res) =>{
    let resp;
    let book = new Book(null, req.body.id_user, req.body.title, req.body.type, req.body.auhtor, req.body.price, req.body.photo);
    try{
        //console.log(req.body);
        let title = "SELECT title FROM book WHERE title = '" + book.title + "'";
        let [exists] = await pool.query(title);
        // console.log(exists);

        if(exists.length == 0){
            let sql= "INSERT INTO book (title, id_user, type, author, price, photo) VALUES ('" + book.title +"', '" + book.id_user +"', '" + book.type +"','" + book.author +"', '" + book.price +"', '" + book.photo +"')" ;
            console.log(sql);

            let [result] = await pool.query(sql);
            console.log(result);

            resp = new Response (false, 200, "Libro insertado correctamente", null);
            res.send(resp);
        }else{
            resp = new Response (true, 400, "El libro existe", null);
            res.send(resp);
        }
    }
    catch(err){
        resp = new Response (true, 400, "Error al crear libro", null);
        res.send(resp);
        console.log(err);
    }
}

const updateBook = async (req, res) =>{
    let resp;
    let book = new Book(req.params.id, req.body.id_user, req.body.title, req.body.type, req.body.auhtor, req.body.price, req.body.photo);

    try{
        let id_book = "SELECT id_book FROM book WHERE id_book = '" + book.id_book + "'";
        let [exists] = await pool.query(id_book);
        console.log(exists);

        if(exists.length == 0){
            resp = new Response (true, 400, "El libro no existe", null);
            res.send(resp);
            
        }else{
            let params = [book.title, book.type, book.author, book.price, book.photo, book.id_book, book.id_user];

            let sql = "UPDATE book SET title = COALESCE(?, title) , " + "type = COALESCE(?, type) , " + "author = COALESCE(?, author) , " + "price = COALESCE(?, price) , " + "photo = COALESCE(?, photo) " + "WHERE id_book =? AND id_user = ?";
            console.log(sql);

            let [result] = await pool.query(sql, params);
            console.log(result);

            resp = new Response (false, 200, "Libro actualizado correctamente", book);
            res.send(resp);
        }
    }
    catch(err){
        resp = new Response (true, 400, "Error al actualizar el libro", null);
        res.send(resp);
        console.log(err);
    }
}

const deleteBook = async (req, res) =>
{
    let resp;

    try{
        let id_book = "SELECT id_book FROM book WHERE id_book = '" + req.params.id + "'";
        let [exists] = await pool.query(id_book);
        console.log(exists);

        if(exists.length == 0){
            resp = new Response (true, 400, "El libro no existe", null);
            res.send(resp);
            
        }else{
            let params = [req.params.id, req.query.id_user];

            let sql = "DELETE FROM book WHERE id_book = ? AND id_user = ?"
            console.log(sql);

           //let [result] = await pool.query(sql, req.params.id);
           let [result] = await pool.query(sql, params);
            console.log(result);

            resp = new Response (false, 200, "Libro eliminado correctamente", null);
            res.send(resp);
        }
    }
    catch(err){
        resp = new Response (true, 400, "Error al eliminar el libro", null);
        res.send(resp);
        console.log(err);
    }
}

module.exports = {mostrarLibro, mostrarLibros, addBook, updateBook, deleteBook};