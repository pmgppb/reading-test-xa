const firebaseConfig = {
  apiKey: "AIzaSyAaDGUYV3QaGAK8AuuDKGlkMj0SRMIipng",
  authDomain: "reading-mid-ibt.firebaseapp.com",
  projectId: "reading-mid-ibt",
  storageBucket: "reading-mid-ibt.firebasestorage.app",
  messagingSenderId: "1009303015201",
  appId: "1:1009303015201:web:2482ba8b086e0d0f9ab860"
};

window.firebaseConfig = firebaseConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

window.db = firebase.firestore();
