import { Schema, model } from 'mongoose';

const providersSchema = new Schema({
  companyName: {
    type: String,
    required: true,
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
