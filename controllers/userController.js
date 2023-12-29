const User = require("../models/userModels");
const bcrypt = require('bcrypt');
const validateToken =require("../middleware/tokens")
// const token = require("../middleware/token");
const jwt = require("jsonwebtoken");
//create register
const registerUser = async (req, res) => {
  const { email, password } = req.body;
  if ( !email || !password) {
    res.status(400).json({message:"All fields are mandatory!"});
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400).json({message:"User already registered!"});
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email, password:hashedPassword });
  } else {
    res.status(400).json({message:"User data is not valid"});
  }
  // res.json({ message: "Register the user" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({message: "All fields are mandatory!"});
  }
  const user = await User.findOne({ email });
  const token = jwt.sign(
    {
      user: {
        // username: user.username,
        id: user.id,
        // email: user.email
      },
    },
    process.env.sk,
    { expiresIn: "50m" }
  );
  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({ token });
  } else {
    res.status(401).json({message: "email or password is not valid"});
  }
};

const forgetpassword = async(req,res)=>{
  const {email} = req.body;
  if (!email) {
    res.status(400).json({message: "email fields req for forgetpassword"});
  }
  const user = await User.findOne({email});
  const token = jwt.sign(
    {
      user: {
        // username: user.username,
        id: user.id,
        // email: user.email
      },
    },
    process.env.sk,
    { expiresIn: "50m" }
  );
  if (!user) {
    res.status(401).json({message: "this email is not vaild"});
  }else{
    res.status(201).json({token})
  }
} 


// const emp = async(req, res)=> {
//   // const user = decoded.user;
//   const { email, password } = req.body;
//   try {
//     const users = User.findById(email);

//     if (!users) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     users.email = email;
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     users.password = hashedPassword;
//     users.save();
//     const newToken = jwt.sign({ Id: User._id }, process.env.sk, { expiresIn: '1h' });
//     res.status(200).json({ message: 'Email and password updated', token: newToken });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }

const update=  async (req, res) => {
  if (req.body.password) {
    req.body.password = User.hashedPassword;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      // {
      //   $set: req.body,
      // },
      // { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};


module.exports = {registerUser, loginUser,forgetpassword,update,validateToken};