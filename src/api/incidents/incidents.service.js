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
    const googleDownloadUrls = await Promise.all(incidentCopy.photos.map(uploadToGoogleDrive));

    const photoUrls = googleDownloadUrls.map((url) => {
      const urlObj = new URL(url);
      urlObj.searchParams.delete('export');
      return urlObj.toString();
    });

    incidentCopy.image = photoUrls;
    console.log('service: ', photoUrls);
  }

  console.log('incidentCopy: ', incidentCopy);

  // Pass the incident data (with photo URLs instead of files) to the repository
  const createdIncident = await incidentsRepository.create({ newIncident: incidentCopy });
  return createdIncident;
}

export {
  getById,
  getAll,
  create,
};
