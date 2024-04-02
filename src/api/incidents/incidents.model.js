import { Schema, model } from 'mongoose';

const { ObjectId } = Schema.Types;

const incidentsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  community: {
    type: ObjectId,
    ref: 'Incidence',
  },
  description: {
    type: String,
  },
  owner: {
    type: ObjectId,
    ref: 'Provider',
  },
  provider: {
    type: ObjectId,
    ref: 'User',
  },
  progress: [{
    state: String,
    date: Date,
    note: String,
  }],
  date: {
    type: Date,
  },
  image: {
    type: String,
  },
  status: {
    state: String,
    date: Date,
    note: String,
  },
  notifyUsers: [{ type: ObjectId, ref: 'User' }],
});

const incidentModel = model('Incident', incidentsSchema);

export default incidentModel;
