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
  getByProductId,
  getByTitle,
  create,
  updateStatus,
};
