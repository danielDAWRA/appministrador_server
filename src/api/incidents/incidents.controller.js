/* eslint-disable camelcase */
import multer from 'multer';
import path from 'path';
import * as incidentsService from './incidents.service.js';

// esto esta mal salta directamente al model sin pasar ni por service ni por repo
// import incidentModel from './incidents.model.js';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

async function getById(req, res) {
  const { _id } = req.params;
  const incidents = await incidentsService.getById({ _id });
  res.json(incidents);
}

async function getAll(req, res) {
  const incidents = await incidentsService.getAll();
  res.json(incidents);
}

async function getByUserId(req, res) {
  const { community_id } = req.user;
  const incidents = await incidentsService.getByUserId({ communityId: community_id });
  res.json(incidents);
}

async function create(req, res) {
  upload.array('image')(req, res, async (err) => {
    if (err) {
      res.status(500).json({ msg: `Error: ${err}` });
      return;
    }

    if (!req.body || !Object.keys(req.body).length) {
      res.status(400).json({ msg: 'Error: body cannot be empty' });
      return;
    }

    // Add the photos to the incident data
    const newIncident = {
      ...req.body,
      photos: req.files.map((file) => file.path),
    };

    const createdIncident = await incidentsService.create({ newIncident, owner: req.user });
    res.json(createdIncident);
  });
}

async function updateStatus(req, res) {
  try {
    const { _id } = req.body;
    if (!_id) {
      res
        .status(400)
        .send({ message: 'Por favor, introduce un id de incidencia válido' });
      return;
    }
    const updatedIncident = await incidentsService.updateStatus({ body: req.body });
    res.status(200).json(updatedIncident);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al modificar el estado de la incidencencia' });
  }
}

async function editNotifyList(req, res) {
  const { _id, subscribe } = req.body;
  const { email } = req.user;
  const updatedIncident = await incidentsService.editNotifyList({ _id, email, subscribe });
  return res.json(updatedIncident);
}

async function getByCategory(req, res) {
  const { category } = req.params;
  const incidents = await incidentsService.getByCategory({ category });
  res.json(incidents);
}

export {
  getById,
  getAll,
  getByUserId,
  create,
  updateStatus,
  editNotifyList,
  getByCategory,
};
