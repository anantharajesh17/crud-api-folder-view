const mongoose = require('mongoose');

const schema = mongoose.Schema({
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    }
    },
  {
    timestamps: true,
  });

const user = mongoose.model('user',schema);
module.exports = user;