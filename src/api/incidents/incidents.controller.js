import * as incidentsService from './incidents.service.js';

async function getById(req, res) {
  const { _id } = req.params;
  const incidents = await incidentsService.getById({ _id });
  res.json(incidents);
}

async function getAll(req, res) {
  const incidents = await incidentsService.getAll();
  res.json(incidents);
}

async function create(req, res) {
  const newTitleAndGenreRelation = await incidentsService.create(req.body);
  res.json(newTitleAndGenreRelation);
}

export {
  getById,
  getAll,
  create,
};
