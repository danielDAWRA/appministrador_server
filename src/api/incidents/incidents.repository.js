import IncidentModel from './incidents.model.js';

async function getById({ _id }) {
  const incident = await IncidentModel
    .findById(_id)
    .populate({ path: 'community' })
    .populate({ path: 'owner' })
    .populate({ path: 'provider' })
    .lean();
  return incident;
}

async function getAll() {
  const incidents = await IncidentModel.find({});
  return incidents;
}

async function getByUserId({ communityId }) {
  const incidents = await IncidentModel
    .find({ community: { $in: communityId } })
    .populate({ path: 'community' })
    .populate({ path: 'provider' })
    .lean();
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

async function create({ newIncident }) {
  console.log('newIncident: ', newIncident);
  const createdIncident = new IncidentModel(newIncident);
  await createdIncident.save();
  console.log('createdIncident: ', createdIncident);
  return createdIncident;
}

async function updateStatus({ _id, updatedBody }) {
  const updatedIncident = await
  IncidentModel.findByIdAndUpdate(
    { _id },
    updatedBody,
    { new: true },
  ).populate({ path: 'community', select: 'address' });
  return updatedIncident;
}

export {
  getById,
  getAll,
  getByUserId,
  getByProductId,
  getByTitle,
  create,
  updateStatus,
};
