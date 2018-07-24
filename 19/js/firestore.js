const FirestoreInit = (function () {
  var instance;
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAYaDEnjO9yOfh3yV0zrD4K9gTTDztZpN0",
    authDomain: "news-app-b1189.firebaseapp.com",
    databaseURL: "https://news-app-b1189.firebaseio.com",
    projectId: "news-app-b1189",
    storageBucket: "news-app-b1189.appspot.com",
    messagingSenderId: "416382000269"
  };
  firebase.initializeApp(config);

  // Initialize Cloud Firestore through Firebase
  var db = firebase.firestore();

  function getDb() {
    return db;
  }

  function createInstance() {
    return {
      getDb
    }
  }

  return {
    getInstance() {
      return instance || (instance = createInstance());
    }
  }

})();