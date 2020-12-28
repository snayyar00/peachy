import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD3MEBG6JkNZCblGb8X77r5VNNmTS4VQ7Y",
    authDomain: "peachy-f2ba5.firebaseapp.com",
    projectId: "peachy-f2ba5",
    storageBucket: "peachy-f2ba5.appspot.com",
    messagingSenderId: "650735387702",
    appId: "1:650735387702:web:06bb059184b5c64d490497",
    measurementId: "G-LPHRGK71JF"
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
            })

        } catch (error) {
            console.log('error creating user', error.message)
        }
    }
    return userRef;

}

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
