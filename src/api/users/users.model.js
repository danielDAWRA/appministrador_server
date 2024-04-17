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
    validate: {
      // eslint-disable-next-line func-names, object-shorthand
      validator: function (v) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{:;'?/.,`~])(?!.*\s).{8}$/.test(v);
      },
      message: (props) => `${props.value} no es una contraseña válida. Asegúrate de que tenga al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.`
    },
  },
  validated: {
    type: Boolean,
    default: false,
  },
  door: String,
  floor: String,
  phone: {
    type: String,
    match: /^\+?[0-9]+$/, // Regex for phone number validation
    required: true,
  },
  isOwner: {
    type: Boolean,
    default: false,
  },
  communicationAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
  },
  community_id: {
    type: [Schema.Types.ObjectId],
    ref: 'Community',
    required: true,
  },
  notifications: {
    type: Boolean,
    default: false,
  },
  enableMediaAccess: {
    type: Boolean,
    default: false,
  },
  associateNumber: String,
  image: String,
  companyName: String,
});

const userModel = model('User', usersSchema, 'users');
export default userModel;
