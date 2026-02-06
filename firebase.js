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

  // WELCOME elements
  const welcomeBox = document.getElementById("welcomeBox");
  const welcomeName = document.getElementById("welcomeName");

  if (user) {
    // ✅ LOGGED IN
    const name = user.displayName || "Friend";
    const photo = user.photoURL || "default-avatar.png";

    if (menuName) menuName.innerText = `Hello, ${name}`;
    if (menuAvatar) menuAvatar.src = photo;
    if (topAvatar) topAvatar.src = photo;

    if (authBtn) {
      authBtn.innerText = "Logout";
      authBtn.onclick = logoutUser;
    }

    /* 👋 WELCOME MESSAGE (once per day) */
    const today = new Date().toDateString();
    const lastShown = localStorage.getItem("welcomeShown");

    if (welcomeBox && welcomeName && lastShown !== today) {
      welcomeName.innerText = name;
      welcomeBox.style.display = "block";
      localStorage.setItem("welcomeShown", today);

      setTimeout(() => {
        welcomeBox.style.display = "none";
      }, 5000);
    }

  } else {
    // ❌ LOGGED OUT
    if (menuName) menuName.innerText = "Hello, Guest";
    if (menuAvatar) menuAvatar.src = "default-avatar.png";
    if (topAvatar) topAvatar.src = "default-avatar.png";

    if (authBtn) {
      authBtn.innerText = "Login";
      authBtn.onclick = () => {
        window.location.href = "login.html";
      };
    }

    // hide welcome if logged out
    if (welcomeBox) welcomeBox.style.display = "none";
  }
});

function showNotification(message) {
  const box = document.getElementById("notifyBox");
  const text = document.getElementById("notifyText");

  if (!box || !text) return;

  text.innerText = message;
  box.style.display = "flex";

  // auto-hide after 6 seconds
  setTimeout(() => {
    box.style.display = "none";
  }, 6000);
}

function closeNotify() {
  document.getElementById("notifyBox").style.display = "none";
}

showNotification("🔥 New deals added today!");


