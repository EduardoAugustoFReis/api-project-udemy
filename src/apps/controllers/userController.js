const Users = require("../models/Users");

class UserController{

  async create(request, response){
    const verifyUser = await Users.findOne({
      where: {
        email: request.body.email,
      },
    });

    if(verifyUser){
      return response.status(400).json({message: "Users already exists"});
    }

    const user = await Users.create(request.body);

    return response.send({user});
  }
}

module.exports = new UserController();