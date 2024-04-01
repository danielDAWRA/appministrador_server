import IncidentModel from './incidents.model.js';

async function getById({ id }) {
  const Incident = await IncidentModel.findById(id);
  return Incident;
}

async function getAll() {
  const incidents = await IncidentModel.find();
  return incidents;
}

async function getByProductId({ IncidentId }) {
  const Incident = await IncidentModel.findById(IncidentId).lean();
  return Incident;
}

async function getByTitle(title) {
  const Incident = IncidentModel.findOne({ title });
  return Incident;
}

async function create({ newIncident }) {
  const createdIncident = new IncidentModel(newIncident);
  await createdIncident.save();
  return createdIncident;
}

export {
  getById,
  getAll,
  getByProductId,
  getByTitle,
  create,
};
