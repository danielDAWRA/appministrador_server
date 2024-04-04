import { Schema, model } from 'mongoose';

const incidentsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  community: {
    type: Schema.Types.ObjectId,
    ref: 'Community',
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  progress: {
    title: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: false,
    },
    note: {
      type: String,
      required: false,
    },
  },
  image: {
    type: [String],
    required: false,
  },
  status: {
    type: String,
    required: true,
  },
});

const incidentModel = model('Incident', incidentsSchema);

export default incidentModel;
