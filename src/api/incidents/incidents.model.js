import { Schema, model } from 'mongoose';

const incidentsSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },

});

const incidentModel = model('Incident', incidentsSchema);

export default incidentModel;
