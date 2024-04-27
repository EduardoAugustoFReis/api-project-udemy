const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

const {encrypt} = require("../../utils/crypt");

class AuthenticationController{
  
  async authenticate(request, response){
    const {email, user_name, password} = request.body
    
    let whereClause = {};

    if(email){
      whereClause.email = email;
    }else if (user_name){
      whereClause.user_name = user_name;
    }else{
      return response.status(400).json({error: "We need a e-mail or password"});
    }

    const user = await Users.findOne({
      where: whereClause,
    })

    if(!user){
      return response.status(400).json({error: "User not found"});
    }

    if(!await user.checkPassword(password)){
      return response.status(401).json({error: "Password does not match."});
    }

    const {id, user_name: userName} = user;

    const {iv, content} = encrypt(id);

    const newId = `${iv}:${content}`;

    const token = jwt.sign({ userId: newId }, process.env.HASH_BCRYPT, {
      expiresIn: process.env.EXPIRE_IN,
    })

    return response.status(200).json({user: {id, userName: userName}, token: token});
  }
}

module.exports = new AuthenticationController();