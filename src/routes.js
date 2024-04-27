const {Router} = require("express");

const schemaValidator = require("./apps/middlewares/schemaValidator");

const AuthenticationController = require("./apps/controllers/AuthenticationController");
const UserController = require("./apps/controllers/userController");

const userSchema = require("./schema/create.user.schema.json");
const authSchema = require("./schema/auth.schema.json");


const routes = Router();

routes.post("/users", schemaValidator(userSchema), UserController.create);

routes.post("/auth", schemaValidator(authSchema), AuthenticationController.authenticate);

routes.get("/health", (request, response) =>{

  return response.json({message: "Connected with success."});
})

module.exports = routes;

/* 

Sign-in (user-name, password)

Sign-up (user-name, email, password, confirm-password)

create-posts (author: {author_id}, image, description)

delete-post (id_post)

update-post (id-post, image, description)

list-posts (author = {name, avatar}, number-likes, image, description)

list-profile (user-name, avatar, number-posts, description, list-post: {images})

edit-profile (user-name, avatar, name, bio, email, gender)

upload (image)

*/