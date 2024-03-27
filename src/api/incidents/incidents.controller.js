// import * as incidentsService from './incidents.service.js';
// esto esta mal salta directamente al model sin pasar ni por service ni por repo
import incidentModel from './incidents.model.js';

async function getById(req, res) {
  const { id } = req.params;
  const incidents = await incidentModel.getById({ id });
  res.json(incidents);
}

async function getAll(req, res) {
  const incidents = await incidentModel.getAll();
  res.json(incidents);
}

async function create(req, res) {
  const newTitleAndGenreRelation = await incidentModel.create(req.body);
  res.json(newTitleAndGenreRelation);
}

export {
  getById,
  getAll,
  create,
};
