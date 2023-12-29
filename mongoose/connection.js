const mongoose = require('mongoose');

mongoose.connect(process.env.connection,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("connection sucessed");
}).catch((error)=>{
    console.log("error connection", error);
})

module.exports = mongoose;

