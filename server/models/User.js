import mongoose, { Schema, model, ObjectId } from "mongoose";

const User = new Schema({
    email: {type: String, required: true, unique: true},
    login: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    sname: {type: String, required: true},
    verify: {type: Number, default: 0},
    password: {type: String, required: true},
    diskSpace: {type: Number, default: 1000**3*5},
    usedSpace: {type: Number, default: 0},
    avatar: {type: String},
    files: [{type: ObjectId, ref: 'File'}]
});

export default mongoose.model('User', User);