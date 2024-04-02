import IncidentModel from './incidents.model.js';

async function getById({ _id }) {
  const incident = await IncidentModel.findById(_id);
  return incident;
}

async function getAll() {
  const incidents = await IncidentModel.find({});
  return incidents;
}

async function getByProductId({ IncidentId }) {
  const incident = await IncidentModel.findById(IncidentId).lean();
  return incident;
}

async function getByTitle(title) {
  const incident = IncidentModel.findOne({ title });
  return incident;
}

async function create(newTitleData) {
  const newTitle = new IncidentModel(newTitleData);
  await newTitle.save();
  return newTitle;
}

export {
  getById,
  getAll,
  getByProductId,
  getByTitle,
  create,
};
