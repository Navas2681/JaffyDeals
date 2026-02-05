import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

window.handleAuth = async () => {
  const auth = getAuth();

  if (auth.currentUser) {
    // 🔴 LOGOUT
    await signOut(auth);
  } else {
    // 🟢 LOGIN
    const modal = document.getElementById("loginModal");
    if (modal) modal.style.display = "flex";
    else window.location.href = "login.html";
  }
};

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
    const modal = document.getElementById("loginModal");
if (modal) modal.style.display = "none";
  } catch (err) {
    alert(err.message);
  }
};

// 🔹 Auth State Listener (MOST IMPORTANT)
onAuthStateChanged(auth, (user) => {
  const menuName = document.getElementById("menuUserName");
  const menuAvatar = document.getElementById("userAvatar");
  const topAvatar = document.getElementById("topUserAvatar");
  const authBtn = document.getElementById("authBtn");

  if (user) {
    // ✅ LOGGED IN
    if (menuName) menuName.innerText = "Hello, " + (user.displayName || "User");
    if (menuAvatar && user.photoURL) menuAvatar.src = user.photoURL;
    if (topAvatar && user.photoURL) topAvatar.src = user.photoURL;
    if (authBtn) authBtn.innerText = "Logout";
  } else {
    // ❌ LOGGED OUT
    if (menuName) menuName.innerText = "Hello, Guest";
    if (menuAvatar) menuAvatar.src = "default-avatar.png";
    if (topAvatar) topAvatar.src = "default-avatar.png";
    if (authBtn) authBtn.innerText = "Login";
  }
});

