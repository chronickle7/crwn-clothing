import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection, ///to put data on firebase
  writeBatch, ///to put data on firebase
  query, // to pull data from firebase
  getDocs  //to pull data from firebase

} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKJ-r6vjdvu1a64g6FHXNCdOiPg4lb9BY",
  authDomain: "crwn-clothing-db-b3936.firebaseapp.com",
  projectId: "crwn-clothing-db-b3936",
  storageBucket: "crwn-clothing-db-b3936.appspot.com",
  messagingSenderId: "240008080112",
  appId: "1:240008080112:web:786d018200f4dd0efff035",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

////////////Putting Data on FireBase DB///////////////////////
export const addCollectionAndDcouments =async(collectionKey, objectsToAdd) =>{
  const collectionRef = collection(db,collectionKey  )
  const batch= writeBatch(db);

  objectsToAdd.forEach((object) =>{
    const docRef= doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef,object);
})

  await batch.commit();
  console.log('Done');
  
} 


///////DOUBT ////////////////////////////////////
///////////////////////////Pulling Out data from Databse////////////////
export const getCategoriesAndDocuments = async() =>{
  const collectionRef = collection(db,'categories')
  const q =query(collectionRef); //give us an object
  const querySnapshot = await getDocs(q); // To fetch the documents
  
//accessing data in db
  const categoryMap=querySnapshot.docs.reduce((acc,docSnapshot)=>{
    const {title,items} = docSnapshot.data();
    acc[title.toLowerCase()]= items;
    return acc;
},{})

  return categoryMap;
}


export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation
) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  ///////////////IF User data does not exist////////////////
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating a user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const singInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
