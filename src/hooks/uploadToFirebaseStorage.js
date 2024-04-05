import 'dotenv/config';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import fs from 'fs';
import path from 'path';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASURMENT_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

async function uploadToFirebaseStorage(filePath) {
  try {
    const file = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);
    const fileRef = ref(storage, fileName);

    await uploadBytes(fileRef, file);

    const url = await getDownloadURL(fileRef);

    // Delete the file from the local filesystem
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Failed to delete file: ${err}`);
      } else {
        console.log(`File deleted: ${filePath}`);
      }
    });

    return url;
  } catch (error) {
    console.error(`Failed to upload file: ${error}`);
    throw error;
  }
}

export default uploadToFirebaseStorage;
