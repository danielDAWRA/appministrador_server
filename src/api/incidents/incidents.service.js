import fs from 'fs';
import uploadToGoogleDrive from '../../hooks/uploadToGoogleDrive.js';
import uploadToFirebaseStorage from '../../hooks/uploadToFirebaseStorage.js';
import * as communitiesRepository from '../communities/communities.repository.js';
import * as incidentsRepository from './incidents.repository.js';
import * as usersRepository from '../users/users.repository.js';
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

async function sendEmailNotification({ incident, isNew }) {
  const lastupdate = incident.progressSteps.pop();
  let subject;
  let html;
  const link = `https://tuappministrador.vercel.app/incidencias/detalle/${incident._id}`;
  if (isNew) {
    subject = `Nueva incidencia en ${incident.community.address}`;
    html = `<h4>Se ha registrado una incidencia en su comunidad a través de Tu Appministrador:</h4>
    <strong>${incident.title}</strong><br><br>
    Esta incidencia está pendiente de aprobación por parte del administrador/a.<br><br>
    Para ver más detalles sobre esta incidencia y seguir su progreso, haz clic en el siguiente enlace:<br>
    <a href=${link}>${incident.title} en ${incident.community.address}</a><br><br>
    Gracias por tu atención y colaboración.<br><br><br>
    Tu Appministrador<br><br>
    `;
  } else {
    subject = `Cambio de estado de la incidencia: ${incident.title}`;
    html = `<h4>${incident.title} en ${incident.community.address} ha pasado a la siguiente etapa:</h4>
    <strong>${lastupdate.title}</strong><br><br>
    ${!!lastupdate.note && 'El adminstrador/a ha adjuntado la siguiente nota informativa:<br>'}
    ${!!lastupdate.note && `"${lastupdate.note}"`}<br><br>
    Para ver más detalles sobre esta incidencia y seguir su progreso, haz clic en el siguiente enlace:<br>
    <a href=${link}>${incident.title} en ${incident.community.address}</a><br><br>
    Gracias por tu atención y colaboración.<br><br><br>
    Tu Appministrador<br><br>
    `;
  }

  await transporter.sendMail({
    bcc: incident.notifyUsers,
    subject,
    html,
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

async function create({ newIncident, owner }) {
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
    // console.log(firebaseDownloadUrls);
  }
  // As formData cannot send objects progress added in backend
  incidentCopy.progressSteps = { title: 'Registro de incidencia', date: incidentCopy.date };
  const communityUsers = await usersRepository.getByCommunityId({ _id: incidentCopy.community });
  const notifyList = communityUsers
    .filter((user) => !!user.notifications)
    .map((user) => user.email);
  incidentCopy.notifyUsers = notifyList;
  const { email } = owner;
  const communitiesInfo = await communitiesRepository.getById({ ids: incidentCopy.community });
  const administratorEmail = communitiesInfo[0].administrator.email;
  const checkList = [email, administratorEmail];
  checkList
    .filter((mail) => !incidentCopy.notifyUsers.includes(mail))
    .map((mail) => incidentCopy.notifyList.push(mail));
  // Pass the incident data (with photo URLs instead of files) to the repository
  const createdIncident = await incidentsRepository.create({ newIncident: incidentCopy });
  const createdIncidentDetails = await incidentsRepository.getById({ _id: createdIncident._id });
  sendEmailNotification({ incident: createdIncidentDetails, isNew: true });
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
const stepNames = ['Registro de incidencia', 'Apertura de reclamación', 'Inspección', 'Trabajando en la reparación', 'Finalización'];

async function updateStatus({ body }) {
  const { _id, step } = body;
  if (!step) {
    const updatedIncident = await incidentsRepository.updateStatus({ _id, updatedBody: body });
    return updatedIncident;
  }
  const currentIncident = await incidentsRepository.getById({ _id });
  const { progressSteps } = currentIncident;
  const newDate = getUtcDateTime();
  while (progressSteps.length !== stepNames.indexOf(step.title)) {
    const newStep = {
      title: stepNames[progressSteps.length],
      date: newDate,
    };
    progressSteps.push(newStep);
  }
  step.date = newDate;
  progressSteps.push(step);
  let status = '';
  if (step.title === 'Apertura de reclamación' || step.title === 'Trabajando en la reparación' || step.title === 'Inspección') {
    status = 'Activa';
  } else {
    status = 'Resuelta';
  }
  const updatedBody = { progressSteps, status };
  const updatedIncident = await
  incidentsRepository.updateStatus({ _id, updatedBody });
  sendEmailNotification({ incident: updatedIncident, isNew: false });
  return updatedIncident;
}

async function editNotifyList({ _id, email, subscribe }) {
  const updatedIncident = await incidentsRepository.editNotifyList({ _id, email, subscribe });
  return updatedIncident;
}

export {
  getById,
  getAll,
  getByUserId,
  createGoogleDriveFile,
  create,
  updateStatus,
  editNotifyList,
};
