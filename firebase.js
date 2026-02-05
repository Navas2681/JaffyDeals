import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// 🔹 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCeHKGW3zO1pkZceXISiaffjt_aarsKgAc",
  authDomain: "jaffydeals-2681.firebaseapp.com",
  projectId: "jaffydeals-2681",
  storageBucket: "jaffydeals-2681.firebasestorage.app",
  messagingSenderId: "691073871278",
  appId: "1:691073871278:web:9996fe6fa87d0618756c3f"
};

// 🔹 Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 🔹 Google Login
window.googleLogin = async () => {
  try {
    await signInWithPopup(auth, provider);
    document.getElementById("loginModal").style.display = "none";
  } catch (err) {
    alert(err.message);
  }
};

// 🔹 Auth State Listener (MOST IMPORTANT)
onAuthStateChanged(auth, (user) => {
  const nameEl = document.getElementById("menuUserName");
  const avatarEl = document.getElementById("userAvatar");
  const topAvatar = document.getElementById("topUserAvatar");

  if (user) {
    if (nameEl) nameEl.innerText = "Hello, " + user.displayName;

    if (avatarEl) {
      avatarEl.src = user.photoURL || "default-avatar.png";
    }
  } else {
    if (nameEl) nameEl.innerText = "Hello, Guest";
    if (avatarEl) avatarEl.src = "default-avatar.png";
  }

  if (user) {
  if (topAvatar && user.photoURL) {
    topAvatar.src = user.photoURL;
  }
} else {
  if (topAvatar) {
    topAvatar.src = "icons/user.png";
  }
}

});
