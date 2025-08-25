import express from 'express';

const userSchema = new express.Schema({
    name:{type:String},
    email:{type: String, unique:true},
    password:{type:String}
})

const User = express.model("User", userSchema);
export default User;
