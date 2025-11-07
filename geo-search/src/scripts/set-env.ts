import { writeFileSync, existsSync } from 'fs';
import dotenv from 'dotenv';

if (existsSync('.env')) {
  dotenv.config();
} else {
  console.warn('⚠️ .env file not found, skipping');
}

const firebaseConfig = `
export const environment = {
  production: false,
  firebase: {
    apiKey: '${process.env.FIREBASE_API_KEY ?? ''}',
    authDomain: '${process.env.FIREBASE_AUTH_DOMAIN ?? ''}',
    projectId: '${process.env.FIREBASE_PROJECT_ID ?? ''}',
    storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET ?? ''}',
    messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID ?? ''}',
    appId: '${process.env.FIREBASE_APP_ID ?? ''}',
    measurementId: '${process.env.FIREBASE_MEASUREMENT_ID ?? ''}'
  }
};
`;

const firebaseConfigProd = `
export const environment = {
  production: true,
  firebase: {
    apiKey: '${process.env.FIREBASE_API_KEY ?? ''}',
    authDomain: '${process.env.FIREBASE_AUTH_DOMAIN ?? ''}',
    projectId: '${process.env.FIREBASE_PROJECT_ID ?? ''}',
    storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET ?? ''}',
    messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID ?? ''}',
    appId: '${process.env.FIREBASE_APP_ID ?? ''}',
    measurementId: '${process.env.FIREBASE_MEASUREMENT_ID ?? ''}'
  }
};
`;

// Write both files
writeFileSync('./src/environments/environment.ts', firebaseConfig);0
writeFileSync('./src/environments/environment.prod.ts', firebaseConfigProd);
