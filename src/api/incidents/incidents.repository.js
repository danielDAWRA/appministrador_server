import IncidentModel from './incidents.model.js';

async function getById({ _id }) {
  const incident = await IncidentModel.findById(_id);
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
  const updatedProps = {
    $push: { progressSteps: updatedBody.step },
    $set: { status: updatedBody.status },
  };

  if (updatedBody.description !== undefined) {
    updatedProps.$set.description = updatedBody.description;
  }

  if (updatedBody.image !== undefined) {
    updatedProps.$set.image = updatedBody.image;
  }

  const updatedIncident = await
  IncidentModel.findByIdAndUpdate(
    { _id },
    updatedProps,
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
