import { type ServiceAccount, getApps } from "firebase-admin/app";

import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json";

/* const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
); */

if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });
}

const adminDb = admin.firestore();
export { adminDb };
