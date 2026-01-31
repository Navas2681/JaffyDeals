import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCeHKGW3zO1pkZceXISiaffjt_aarsKgAc",
  authDomain: "jaffydeals-2681.firebaseapp.com",
  projectId: "jaffydeals-2681",
  storageBucket: "jaffydeals-2681.firebasestorage.app",
  messagingSenderId: "691073871278",
  appId: "1:691073871278:web:9996fe6fa87d0618756c3f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

window.googleLogin = async () => {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  localStorage.setItem("jaffyUser", JSON.stringify({
    name: user.displayName,
    photo: user.photoURL
  }));

  document.getElementById("loginModal").style.display = "none";
  showUser();
};