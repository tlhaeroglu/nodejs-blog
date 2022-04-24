class User{
    constructor(id, username, _name, _surname, createdAt){
        this.id = id;
        this.username = username;
        this._name = _name;
        this._surname = _surname;
        this.createdAt = createdAt;
    }
}

module.exports = User;
