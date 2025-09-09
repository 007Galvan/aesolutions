import admin from 'firebase-admin';
// import { readFile } from 'fs/promises';


// const serviceAccount = JSON.parse(
//     await readFile(new URL('./serviceAccountKey.json', import.meta.url))
//   );
  //service for railway
  const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);

  if (!serviceAccount) {
  throw new Error("❌ Missing GOOGLE_APPLICATION_CREDENTIALS_JSON in Railway!");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://aesolutions-6bfb1.firebasestorage.app", // replace with your bucket
});

const bucket = admin.storage().bucket();

export { admin, bucket };
// module.exports = bucket;
