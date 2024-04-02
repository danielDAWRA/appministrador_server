import * as incidentsRepository from './incidents.repository.js';

async function getById({ _id }) {
  const incidents = await incidentsRepository.getById({ _id });
  return incidents;
}

async function getAll() {
  const incidents = await incidentsRepository.getAll();
  return incidents;
}

export {
  getById,
  getAll,
};
