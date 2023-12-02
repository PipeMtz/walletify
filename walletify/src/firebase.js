// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage,ref,uploadBytes,getDownloadURL } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuoBjKsa-ZOgrh0jiZVrQYuJEmoOexTsk",
  authDomain: "walletify-e4d36.firebaseapp.com",
  projectId: "walletify-e4d36",
  storageBucket: "walletify-e4d36.appspot.com",
  messagingSenderId: "716927289786",
  appId: "1:716927289786:web:6d462ab1a40912e5e17583",
  measurementId: "G-NJ7ELM9WLL"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);



export async function uploadImage ({file, folder}) {
  const storageDriversRef = ref(storage, `${folder}/` + file.name);
  const uploadBytesResponse = await uploadBytes(storageDriversRef, file);
  const downloadURL = await getDownloadURL(uploadBytesResponse.ref);
  return downloadURL;
}
