const {Router} = require("express");

const routes = Router();

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