class User {

    constructor(id, nickname, email, password, rating=null) {
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.rating = rating;
    }
  }
  
  module.exports = User;