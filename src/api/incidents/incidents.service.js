import fs from 'fs';
import uploadToGoogleDrive from '../../hooks/uploadToGoogleDrive.js';
import * as incidentsRepository from './incidents.repository.js';

async function getById({ id }) {
  const incidents = await incidentsRepository.getById({ id });
  return incidents;
}

async function getAll() {
  const incidents = await incidentsRepository.getAll();
  return incidents;
}

async function create({ newIncident }) {
  const incidentCopy = { ...newIncident };

  if (incidentCopy.photos) {
    // Upload each photo to Google Drive and replace it with the returned URL
    const googleDownloadUrls = await Promise.all(incidentCopy.photos.map(async (photo) => {
      const url = await uploadToGoogleDrive(photo);

      // Delete the file from the local filesystem
      fs.unlink(photo, (err) => {
        if (err) {
          console.error(`Failed to delete file: ${err}`);
        } else {
          console.log(`File deleted: ${photo.path}`);
        }
      });

      return url;
    }));

    const photoUrls = googleDownloadUrls.map((url) => {
      const urlObj = new URL(url);
      urlObj.searchParams.delete('export');
      return urlObj.toString();
    });

    incidentCopy.image = photoUrls;
  }
  // As formData cannot send objects progress added in backend
  incidentCopy.progress = { title: 'Registro de incidencia', date: incidentCopy.date, note: 'Incidencia recibida' };
  console.log(incidentCopy);

  // Pass the incident data (with photo URLs instead of files) to the repository
  const createdIncident = await incidentsRepository.create({ newIncident: incidentCopy });
  return createdIncident;
}

export {
  getById,
  getAll,
  create,
};
