
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js"
 //import { analytics  } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-analytics.js"
   import { auth } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js"
   import { firestore } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-storage.js"
let file = 'new.jpg'

const firebaseConfig = {
  apiKey: "AIzaSyAG4K9rR4HyLzPBcvh9rPfPdm8kmA6PsOE",
  authDomain: "project9-4f058.firebaseapp.com",
  projectId: "project9-4f058",
  storageBucket: "project9-4f058.appspot.com",
  messagingSenderId: "908366468736",
  appId: "1:908366468736:web:1a5624c9a97d8b78cdf865",
  measurementId: "G-4YT9120WMB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const storage = getStorage();
const storageRef = ref(storage, 'new.jpg');

const btn = document.getElementById("butt");

      btn.addEventListener("click", function () {

        uploadBytes(storageRef, file).then((snapshot) => {
          console.log('Uploaded a blob or file!');
        });
 });
