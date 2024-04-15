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
  const createdIncident = await IncidentModel.create(newIncident);
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

async function editNotifyList({ _id, email, subscribe }) {
  const update = subscribe
    ? { $push: { notifyUsers: email } }
    : { $pull: { notifyUsers: email } };
  const updatedIncident = await
  IncidentModel.findByIdAndUpdate(
    { _id },
    update,
    { new: true },
  );
  return updatedIncident;
}

async function getByCategory({ category }) {
  const incidents = await IncidentModel
    .find({ category, status: { $ne: 'Resuelta' } })
    .sort({ date: -1 })
    .lean();
  return incidents;
}

export {
  getById,
  getAll,
  getByUserId,
  getByProductId,
  getByTitle,
  create,
  updateStatus,
  editNotifyList,
  getByCategory,
};
