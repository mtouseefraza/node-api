module.exports = app => {
  const users = require("../controllers/user.controller.js");
  const verifyToken = require("../middleware/verifyToken.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/", users.create);

  // Create a  User login
  router.post("/login", users.login);

  // Retrieve all Users
  router.get("/", verifyToken, users.findAll);

  // Retrieve all active Users
  router.get("/published", verifyToken,users.findAllPublished);

  // Retrieve a single User with id
  router.get("/:id", verifyToken, users.findOne);

  // Update a User with id
  router.put("/:id", verifyToken,users.update);

  // Delete a User with id
  router.delete("/:id", verifyToken,users.delete);

  // Create a new User
  router.delete("/", verifyToken,users.deleteAll);
  
  app.use("/api/user", router);
};
