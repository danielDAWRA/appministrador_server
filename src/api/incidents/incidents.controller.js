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

    const createdIncident = await incidentsService.create({ newIncident });
    res.json(createdIncident);
  });
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
