const db = require("../models");
const handleValidationError = require('../custom_modules/handleValidationError');
const User = db.users;
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

function randomString(length) {
  let result = '';
  let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

// Create and Save a new User
exports.create = (req, res) => {
  let inputData = req.body;
  inputData.Uid = randomString(13);
  userData = new User(inputData);
  userData
  .save(userData)
  .then(data => {
    res.status(200).send({status:1,message:"New record created successfully",data:data});
  })
  .catch(async err => {
    let error = await handleValidationError(err);
    res.status(500).send({status:0,message:error.message || "Some error occurred while creating the User.",error:error});
  });
};

exports.login = (req, res) => {
  let { Email, Password } = req.body; 
  User.find({Email, Password})
    .then(data => {
      if(data.length == 0){
         res.status(200).send({status:1,message:"Invalid email and Password."});
      }else if(data[0].Status == 0){
        res.status(200).send({status:1,message:"Inactive User Account."});
      }else{
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ userId: data[0].id }, jwtSecretKey, {
          expiresIn: '2h',
        });
        let { Name } = data[0];
        res.status(200).send({status:1,message:"login successfully",data:{ Name,token }});
      }
  })
  .catch(async err => {
    console.log(err);
    let error = await handleValidationError(err);
    res.status(500).send({status:0,message:error.message || "Some error occurred while creating the User.",error:error});
  });

};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const Name = req.query.Name;
  var condition = Name ? { Name: { $regex: new RegExp(Name), $options: "i" } } : {};
  User.find(condition)
    .then(data => {
      res.status(200).send({status:1,message:"Done",data:data});
  })
  .catch(async err => {
    let error = await handleValidationError(err);
    res.status(500).send({status:0,message:error.message || "Some error occurred while creating the User.",error:error});
  });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({status:0, message: "Not found User with id " + id });
      else  res.status(200).send({status:1,message:"Done",data:data});
    })
    .catch(async err => {
      let error = await handleValidationError(err);
      res.status(500).send({status:0,message:error.message || "Some error occurred while creating the User.",error:error});  
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({status:0, message: "Data to update can not be empty!" });
  }

  const id = req.params.id;

  req.body.Update_Date = new Date();
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({status:0, message: `Cannot update User with id=${id}. Maybe User was not found!` });
      } else res.send({ status:1,message: "User was updated successfully.", data:data});
    })
    .catch(async err => {
      let error = await handleValidationError(err);
      res.status(500).send({status:0,message:error.message || "Some error occurred while creating the User.",error:error}); 
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          status:0,
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      } else {
        res.send({
          status:1,
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(async err => {
      let error = await handleValidationError(err);
      res.status(500).send({status:0,message:error.message || "Some error occurred while creating the User.",error:error});
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then(data => {
      res.send({
        status:1,
        message: `${data.deletedCount} Users were deleted successfully!`
      });
    })
    .catch(async err => {
      let error = await handleValidationError(err);
      res.status(500).send({status:0,message:error.message || "Some error occurred while creating the User.",error:error});
    });
};

// Find all published Users
exports.findAllPublished = (req, res) => {
  User.find({ Status: 1 })
    .then(data => {
      res.status(200).send({status:1,message:"Done",data:data});
    })
    .catch(async err => {
      let error = await handleValidationError(err);
      res.status(500).send({status:0,message:error.message || "Some error occurred while creating the User.",error:error});
    });
};
