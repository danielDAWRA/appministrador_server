import ProviderModel from './providers.model.js';

async function getAll() {
  const providers = await ProviderModel.find({}).lean();
  return providers;
}

async function getById({ _id }) {
  const provider = await ProviderModel.findById(_id).lean();
  return provider;
}

export {
  getAll,
  getById,
};
