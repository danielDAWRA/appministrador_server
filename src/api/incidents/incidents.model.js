import { Schema, model } from 'mongoose';

const { ObjectId } = Schema.Types;

const incidentsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  community: {
    type: ObjectId,
    ref: 'Community',
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: ObjectId,
    ref: 'User',
  },
  provider: {
    type: ObjectId,
    ref: 'Provider',
  },
  progress: [{
    title: String,
    date: Date,
    note: String,
  }],
  date: {
    type: Date,
  },
  image: {
    type: [String],
    required: false,
  },
  status: {
    type: String,
    required: true,
  },
  notifyUsers: [String],
});

const incidentModel = model('Incident', incidentsSchema);

export default incidentModel;
