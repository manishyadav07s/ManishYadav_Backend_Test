import express from 'express';

const userSchema = new express.Schema({
    name:{type:String},
    email:{type: String, unique:true},
    password:{type:String}
})

export default express.model("User", userSchema);
