import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://gymdaily-3fb9e-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const snapshot = await get(child(ref(db), `users/${username}`));
    if (snapshot.exists() && snapshot.val().password === password) {
      localStorage.setItem("user", JSON.stringify({ username }));
      document.getElementById("loginMsg").innerText = "Login Successful! Redirecting...";
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500);
    } else {
      document.getElementById("loginMsg").innerText = "Invalid credentials.";
    }
  } catch (err) {
    console.error(err);
    document.getElementById("loginMsg").innerText = "Login failed.";
  }
});
