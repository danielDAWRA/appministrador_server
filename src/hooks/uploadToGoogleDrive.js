import 'dotenv/config'; // must be on top
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

function authorize() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

  console.log(oAuth2Client);

  // Check if we have previously stored a token.
  const tokenPath = 'token.json';
  if (fs.existsSync(tokenPath)) {
    const token = fs.readFileSync(tokenPath);
    oAuth2Client.setCredentials(JSON.parse(token));
  }

  return oAuth2Client;
}

const auth = authorize();

async function uploadToGoogleDrive(filePath) {
  const drive = google.drive({ version: 'v3', auth });
  const response = await drive.files.create({
    requestBody: {
      name: path.basename(filePath),
    },
    media: {
      mimeType: 'image/jpeg',
      body: fs.createReadStream(filePath),
    },
  });

  return response.data.webContentLink;
}

export default uploadToGoogleDrive;
