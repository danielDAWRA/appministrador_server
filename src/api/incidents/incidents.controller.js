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

async function updateStatus(req, res) {
  try {
    const { body } = req;
    if (!body._id) {
      res
        .status(400)
        .send({ message: 'Por favor, introduce un id de incidencia válido' });
      return;
    }
    if (!body.step) {
      res
        .status(400)
        .send({ message: 'Por favor, introduce un estado para la incidencia' });
      return;
    }
    const updatedIncidence = await incidentsService.updateStatus({ body });
    res.status(200).json(updatedIncidence);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al modificar el estado de la incidencencia' });
  }
}

export {
  getById,
  getAll,
  create,
  updateStatus,
};
