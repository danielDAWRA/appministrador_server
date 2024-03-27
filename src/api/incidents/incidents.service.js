import * as incidentsRepository from './incidents.repository.js';

async function getById({ id }) {
  const incidents = await incidentsRepository.getById({ id });
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
