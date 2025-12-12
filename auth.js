// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3weLGoWNm0iD5Og5BN2PR9ZNoU9a4NI8",
  authDomain: "quylia.firebaseapp.com",
  projectId: "quylia",
  storageBucket: "quylia.firebasestorage.app",
  messagingSenderId: "1037772687644",
  appId: "1:1037772687644:web:04fe6c2f20100d471912d9",
  measurementId: "G-QQ4K6ZKJVM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export async function sendLink(email) {
    const actionCodeSettings = {
        url: 'https://quylia.github.io/finishSignUp.html', 
        handleCodeInApp: true,
    };
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email);
}

export async function completeSignIn(url) {
    if (isSignInWithEmailLink(auth, url)) {
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
            email = window.prompt('Please provide your email for confirmation');
        }
        const result = await signInWithEmailLink(auth, email, url);
        window.localStorage.removeItem('emailForSignIn');
        return result.user;
    } else {
        throw new Error("This is not a valid sign-in link.");
    }
}