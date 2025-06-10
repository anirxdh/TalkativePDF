import { initializeApp, getApps, App, getApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

let serviceKey;
try {
  const serviceKeyString = process.env.FIREBASE_SERVICE_KEY;
  if (!serviceKeyString) {
    throw new Error("FIREBASE_SERVICE_KEY environment variable is not set");
  }
  serviceKey = JSON.parse(serviceKeyString);
  
  // Fix private key formatting if needed
  if (serviceKey.private_key) {
    serviceKey.private_key = serviceKey.private_key.replace(/\\n/g, '\n');
  }
} catch (error) {
  console.error("Failed to parse Firebase service key:", error);
  throw error;
}

let app: App;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(serviceKey),
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);
const adminStorage = getStorage(app);

export { app as adminApp, adminDb, adminStorage };