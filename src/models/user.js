class User{
    constructor(id_user, name, last_name, email, photo, password){
        this.id_user = id_user;
        this.name = name;
        this.last_name = last_name;
        this.email = email;
        this.photo = photo;
        this.password = password;
    }
}

module.exports = User; 