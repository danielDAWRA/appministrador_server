import * as providersRepository from './providers.repository.js';

async function getAll() {
  const providers = await providersRepository.getAll();
  return providers;
}

async function getById({ _id }) {
  const provider = await providersRepository.getById({ _id });
  return provider;
}

export {
  getAll,
  getById,
};
