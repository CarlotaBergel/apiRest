const {pool} = require("../../database");
const Response = require("../models/response");
const User = require("../models/user");



const register = async (req, res) =>{
    let resp;
    let user = new User(null, req.body.name, req.body.last_name, req.body.email, req.body.photo, req.body.password);
    try{
        //console.log(req.body);
        let email = "SELECT email FROM user WHERE email = '" + user.email + "'";
        let [exists] = await pool.query(email);
        // console.log(exists);

        if(exists.length == 0){
            let sql= "INSERT INTO user (name, last_name, email, photo, password) VALUES ('" + user.name +"', '" + user.last_name +"','" + user.email +"', '" + user.photo +"', '" + user.password +"')" ;
            console.log(sql);

            let [result] = await pool.query(sql);
            console.log(result);

            resp = new Response (false, 200, "Creado correctamente", result);
            res.send(resp);
        }else{
            resp = new Response (true, 400, "El usuario existe", null);
            res.send(resp);
        }
    }
    catch(err){
        resp = new Response (true, 400, "Error al crear usuario", null);
        res.send(resp);
        console.log(err);
    }
}

const login = async (req, res) =>{
    let resp;
    try{
        // console.log(req.body);

        let dataUser = "SELECT id_user, name, last_name, email, photo FROM user WHERE email = '" + req.body.email + "'" + "AND password = '" + req.body.password + "'";
        // console.log(dataUser);

        let [result] = await pool.query(dataUser);
        console.log(result);

        if(result.length == 0){
            resp = new Response (true, 400, "El usuario no existe", null);
            res.send(resp);
        }else{
            // aqui recogemos los datos de la busqueda para almacenarlos y poder pintarlo en front
            let user = new User(result[0].id_user, result[0].name, result[0].last_name, result[0].email, result[0].photo);
            resp = new Response (false, 200, "El usuario existe", user);
            res.send(resp);
        }
    }
    catch(err){
        resp = new Response (true, 200, "Error al crear usuario", null);
        res.send(resp);
        console.log(err);
    }
}

const updateUser = async (req, res) =>{
    let resp;
    let user = new User (req.body.id, req.body.name, req.body.last_name, req.body.email, req.body.photo,  req.body.password);

    try{
        let id_user = "SELECT id_user FROM user WHERE id_user = '" + user.id_user + "'";
        let [exists] = await pool.query(id_user);
        console.log(exists);

        if(exists.length == 0){
            resp = new Response (true, 400, "El usuario no existe", null);
            res.send(resp);
            
        }else{
            let params = [user.name, user.last_name, user.email, user.photo, user.password, user.id_user];

            let sql = "UPDATE user SET name = COALESCE(?, name) , last_name = COALESCE(?, last_name) , email = COALESCE(?, email) , photo = COALESCE(?, photo) , password = COALESCE(?, password) WHERE id_user = ?";
            console.log(sql);

            let [result] = await pool.query(sql, params);
            console.log(result);

            resp = new Response (false, 200, "Usuario actualizado correctamente", null);
            res.send(resp);
        }
    }
    catch(err){
        resp = new Response (true, 400, "Error al actualizar el Usuario", null);
        res.send(resp);
        console.log(err);
    }
}


module.exports = {register, login, updateUser};