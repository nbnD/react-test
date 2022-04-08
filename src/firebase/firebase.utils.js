// import firebase from 'firebase/app';

// // import  'firebase/firestore';
// import { getFirestore, doc, getDoc, setDoc, collection, } from "firebase/firestore";

// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"



const config = {
  apiKey: "AIzaSyDiXoYOZlQR8mvtrGCOyeEG4u6FWccA288",
  authDomain: "thegadgetsnepal-db.firebaseapp.com",
  projectId: "thegadgetsnepal-db",
  storageBucket: "thegadgetsnepal-db.appspot.com",
  messagingSenderId: "718709191559",
  appId: "1:718709191559:web:b11c22da68dcef8cfb1922",
  measurementId: "G-8EEC8VM47Q"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);


  const snapShot = await userRef.get();


  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj)
  })
  return await batch.commit();
}

export const convertCollectionsSnapShotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items

    }
  });
  return transformedCollection.reduce((accmulator, collection) => {
    accmulator[collection.title.toLowerCase()] = collection;

    return accmulator
  }, {});
}

firebase.initializeApp(config);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;


// export const firestore = getFirestore();

// export const createUserProfileDocument = async (userAuth, additionalData) => {

//     if (!userAuth) return;

//     const userRef = doc(collection(firestore, "users"));
//     const snapShot = await getDoc(userRef,);

//     if (snapShot._userDataWriter.firestore._authCredentials.currentUser.uid !== userAuth.uid) {
//         try {
//             const { displayName, email } = userAuth;
//             const createdAt = new Date();
//             await setDoc(userRef, {
//                 displayName,
//                 email,
//                 createdAt,
//                 ...additionalData
//             });


//         } catch (error) {
//             console.log('error creating user', error.message);
//         }
//     }


//     return userRef;
// }

// export const auth = getAuth();


// const provider = new GoogleAuthProvider();
// export const signInWithGoogle = () => signInWithPopup(auth, provider);


// export default firebase;
