import UserModel from './users.model.js';

async function getById({ id }) {
  const user = await UserModel.findById(id).lean();
  return user;
}

async function getByEmail({ email }) {
  const user = await UserModel.findOne({ email }).lean();
  return user;
}

async function register({ user }) {
  const createdUser = await UserModel.create(user);
  return createdUser;
}

async function validate({ email, validated = true }) {
  const user = await UserModel.findOneAndUpdate({ email }, { validated });
  return user;
}

async function modifySensitiveData({ _id, dataType, sensitiveData }) {
  const user = await UserModel.findOneAndUpdate(
    { _id },
    { [dataType]: sensitiveData },
    { new: true },
  );
  return user;
}

async function patch({ _id, newProps }) {
  const updatedUser = await UserModel.findOneAndUpdate({ _id }, newProps, { new: true });
  return updatedUser;
}

async function getByCommunityId({ _id }) {
  const communityUsers = await UserModel
    .find({ community_id: _id })
    .lean();
  return communityUsers;
}

export {
  getById,
  getByEmail,
  register,
  validate,
  patch,
  modifySensitiveData,
  getByCommunityId,
};
