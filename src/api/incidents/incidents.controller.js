import multer from 'multer';
import path from 'path';
import * as incidentsService from './incidents.service.js';

// esto esta mal salta directamente al model sin pasar ni por service ni por repo
import incidentModel from './incidents.model.js';

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
  const { id } = req.params;
  const incidents = await incidentModel.getById({ id });
  res.json(incidents);
}

async function getAll(req, res) {
  const incidents = await incidentModel.getAll();
  res.json(incidents);
}

async function create(req, res) {
  console.log('this is req: ', req);
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

export {
  getById,
  getAll,
  create,
};
