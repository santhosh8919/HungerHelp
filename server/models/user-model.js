const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const  jwt  = require("jsonwebtoken");

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

// During Password Hashing:  The pre middleware is defined within the userSchema before creating the User model. This ensures that the middleware is properly applied to user documents before they are saved to the database.

//? secure the password with the bcrypt
// userSchema.pre("save", async function () {
//   const user = this;
//   console.log("actual data ", this);

//   if (!user.isModified) {
//     return next();
//   }

//   try {
//     const saltRound = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(user.password, saltRound);
//     user.password = hashedPassword;
//   } catch (error) {
//     return next(error);
//   }
// });

// ? Why not to use the arrow functions when creating an instance methods in mongoose.
// The key difference is that the function is defined as a regular function with the *function* keyword, not as an arrow function. This is important because when defining instance methods in Mongoose, you should use regular functions (not arrow functions) to ensure that *this* refers to the instance of the document being operated on.

//? Generate JSON Web Token

userSchema.methods.generateToken = async function () {
  console.log("I am token");
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error("Token Error: ", error);
  }
};
//  userSchema.methods.comparePassword = async function (password) {
//    return bcrypt.compare(password, this.password);
//  };
//? define the model or the collection name


// Compare password method (for login)
userSchema.methods.comparePassword = async function (password) {
  // In this case, we do not need to hash the password for comparison as we're storing plain text passwords
  return password === this.password;  // Compare plain-text password
};
const User = new mongoose.model("USER", userSchema);

module.exports = User;