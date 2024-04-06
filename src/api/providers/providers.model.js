import { Schema, model } from 'mongoose';

const providersSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  services: {
    type: [String],
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  rating: {
    type: Number,
  },
  contactPerson: {
    type: String,
  },
});

const ProviderModel = model('Provider', providersSchema);

export default ProviderModel;
