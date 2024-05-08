module.exports = mongoose => {
  var schema = mongoose.Schema({
    Uid: {
      type: String,
      required: [true, 'Uid is mandatory']
    },
    Name: {
      type: String,
      required: [true, 'Name is mandatory']
    },
    Mobile: {
      type: Number,
      trim: true,
      /*min: [8, 'Mobile should be between 8 and 15 characters'],
      max: [15, 'Mobile should be between 8 and 15 characters'],*/
      required: [true, 'Mobile is mandatory'],
      unique: [true, 'Mobile is already registered.']
    },
    Email: {
      type: String,
      trim: true,
      required: [true, 'Email is mandatory'],
      unique: [true, 'Email is already registered.'],
      match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
    },
    Password: {
      type: Number,
      trim: true,
      /*min: [6, 'Password should be between 6 and 15 characters'],
      max: [15, 'Password should be between 6 and 15 characters'],*/
      required: [true, 'Password is mandatory']
    },
    Status: {
      type: Number,
      enum: [0, 1],
      required: [true, 'Status is mandatory.(0,1)']
    },
    Create_Date: {
        type: Date,
        default: Date.now
    },
    Update_Date: {
        type: Date,
        default: Date.now
    }
  });

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("users", schema);
  return User;
};
