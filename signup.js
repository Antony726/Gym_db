// Firebase setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://gymdaily-3fb9e-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;

  const newUser = { username, password };
  localStorage.setItem("user", JSON.stringify(newUser)); // still store locally for session

  // Save to Firebase
  set(ref(db, 'users/' + username), {
    password,
    workoutPlan: {},
    workoutHistory: []
  });

  document.getElementById("signupMsg").innerText = "Signup successful! Redirecting...";
  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000);
});
