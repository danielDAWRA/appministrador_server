import * as providersRepository from './providers.repository.js';

async function getAll() {
  const providers = await providersRepository.getAll();
  return providers;
}

async function getById({ _id }) {
  const provider = await providersRepository.getById({ _id });
  return provider;
}

async function getByCategory({ category }) {
  const providers = await providersRepository.getByCategory({ category });
  return providers;
}

export {
  getAll,
  getById,
  getByCategory,
};
