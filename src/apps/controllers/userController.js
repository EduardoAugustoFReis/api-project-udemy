const Users = require("../models/Users");

class UserController{

  async create(request, response){
    
    // validação de usário pelo email
    const verifyUser = await Users.findOne({
      where: {
        email: request.body.email,
      },
    });

    if(verifyUser){
      return response.status(400).json({message: "Users already exists"});
    }

    const user = await Users.create(request.body); // criação de usuário

    if(!user){
      return response.status(400).json({message: "Failed to create user."});
    }

    return response.send({message: "User created!"});
  }
}

module.exports = new UserController();