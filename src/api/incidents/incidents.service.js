import fs from 'fs';
import uploadToGoogleDrive from '../../hooks/uploadToGoogleDrive.js';
import uploadToFirebaseStorage from '../../hooks/uploadToFirebaseStorage.js';
import * as incidentsRepository from './incidents.repository.js';
import transporter from '../nodemailer.js';

function getUtcDateTime() {
  const currentDate = new Date();
  const year = currentDate.getUTCFullYear();
  const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(currentDate.getUTCDate()).padStart(2, '0');
  const hours = String(currentDate.getUTCHours()).padStart(2, '0');
  const minutes = String(currentDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getUTCSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} UTC`;
}

async function sendEmailNotification({ updatedIncident }) {
  const lastupdate = updatedIncident.progressSteps.pop();
  await transporter.sendMail({
    bcc: updatedIncident.notifyUsers,
    subject: `Incidencia ${updatedIncident.title}`,
    html: `<h3>Cambio de estado de la incidencia ${updatedIncident.title}</h3><br>
    La incidencia ${updatedIncident.title} de la comunidad ${updatedIncident.community.address} ha pasado a la siguiente etapa: ${lastupdate.title} <br>
    Estado: ${updatedIncident.status}
    ${updatedIncident.status.state === 'Registro de incidencia' ? `Decripción: ${updatedIncident.description}` : ''}  <br>
    ${lastupdate.note !== undefined ? `Nota adicional : ${lastupdate.note}` : ''}
    `,
  });
}

async function getById({ _id }) {
  const incidents = await incidentsRepository.getById({ _id });
  return incidents;
}

async function getAll() {
  const incidents = await incidentsRepository.getAll();
  return incidents;
}

async function getByUserId({ communityId }) {
  const incidents = await incidentsRepository.getByUserId({ communityId });
  return incidents;
}

async function create({ newIncident }) {
  const incidentCopy = { ...newIncident };

  if (incidentCopy.photos) {
    // Upload each photo to Firebase Storage and replace it with the returned URL
    const firebaseDownloadUrls = await Promise.all(incidentCopy.photos.map(async (photo) => {
      const url = await uploadToFirebaseStorage(photo);

      // Delete the file from the local filesystem
      fs.unlink(photo, (err) => {
        if (err) {
          console.error(`Failed to delete file: ${err}`);
        } else {
          console.log(`File deleted: ${photo}`);
        }
      });

      return url;
    }));

    incidentCopy.image = firebaseDownloadUrls;
    console.log(firebaseDownloadUrls);
  }
  // As formData cannot send objects progress added in backend
  incidentCopy.progressSteps = { title: 'Registro de incidencia', date: incidentCopy.date, note: 'Incidencia recibida' };

  // Pass the incident data (with photo URLs instead of files) to the repository
  const createdIncident = await incidentsRepository.create({ newIncident: incidentCopy });
  return createdIncident;
}

async function createGoogleDriveFile({ newIncident }) {
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
  incidentCopy.progressSteps = { title: 'Registro de incidencia', date: incidentCopy.date, note: 'Incidencia recibida' };

  // Pass the incident data (with photo URLs instead of files) to the repository
  const createdIncident = await incidentsRepository.create({ newIncident: incidentCopy });
  return createdIncident;
}

async function updateStatus({ body }) {
  const {
    _id, step, description, image, ...rest
  } = body;
  step.date = getUtcDateTime();
  let { status } = rest;
  if (step.title === 'Apertura de reclamación' || step.title === 'Trabajando en la reparación' || step.title === 'Inspección') {
    status = 'Activa';
  } else {
    status = 'Resuelta';
  }
  const updatedBody = { step, status };
  if (description !== undefined) {
    updatedBody.description = description;
  }
  if (image !== undefined) {
    updatedBody.image = image;
  }
  console.log(updatedBody);
  const updatedIncident = await
  incidentsRepository.updateStatus({ _id, updatedBody });
  sendEmailNotification({ updatedIncident });
  return updatedIncident;
}

export {
  getById,
  getAll,
  getByUserId,
  createGoogleDriveFile,
  create,
  updateStatus,
};
