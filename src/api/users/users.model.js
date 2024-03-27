import { Schema, model } from 'mongoose';

const usersSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  validated: {
    type: Boolean,
    default: false,
  },
  credit: {
    type: Number,
    default: 500,
  },
  points: {
    type: Number,
  },
});

const userModel = model('User', usersSchema, 'users');
export default userModel;
