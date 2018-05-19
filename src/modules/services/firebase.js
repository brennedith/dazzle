import firebase from 'firebase/app'
import 'firebase/database'

let config = {
    apiKey: "AIzaSyB6D7uc312QzRVrH9O8samtTXa3XQxcn4c",
    authDomain: "go-dazzle-me.firebaseapp.com",
    databaseURL: "https://go-dazzle-me.firebaseio.com",
    projectId: "go-dazzle-me",
    storageBucket: "go-dazzle-me.appspot.com",
    messagingSenderId: "191708767693"
  }
  
  export default firebase.initializeApp(config)
