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
  updateStatus,
};
