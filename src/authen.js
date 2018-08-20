import React, { Component } from 'react';
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyC-d8tWGWpqJ3MUkHdgC0kf_FHKYqX0hRU",
    authDomain: "auth-9bdd0.firebaseapp.com",
    databaseURL: "https://auth-9bdd0.firebaseio.com",
    projectId: "React-Project",
    storageBucket: "",
    messagingSenderId: "131485680922"
  };
  firebase.initializeApp(config);

class Authen extends Component {

  login(event){
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email,password);

    const auth = firebase.auth();

    const promise =auth.signInWithEmailAndPassword(email,password);

    promise
    .then(user => {
      var err = 'Welcome back ' + email;
      var lout = document.getElementById('logout');
      lout.classList.remove('hide');
      this.setState({err: err});
    })
    promise.catch(e => {
      var err = e.message;
      console.log(err);
      this.setState({err: err});
    })

  }

 signup(){
   const email = this.refs.email.value;
   const password = this.refs.password.value;
   console.log(email,password);

   const auth = firebase.auth();

   const promise = auth.createUserWithEmailAndPassword(email,password);

   promise
.then(user => {
     var err = "Welcome " + email;
     firebase.database().ref('users/'+user.user.uid).set({
       email: email
     });
    console.log(user);
    this.setState({err: err});
  });
  promise
  .catch(e => {
    var err =e.message;
    console.log(err);
    this.setState({err: err});
  });
 }

 logout(){

   var lout = document.getElementById('logout');
   lout.classList.add('hide');
   const auth = firebase.auth();
   const promise = auth.signOut();
   promise
.then(user => {
     var err = "Thank u  " + this.refs.email.value;
    console.log(user);
    this.setState({err: err});
  });
 }

 google(){
   var provider = new firebase.auth.GoogleAuthProvider();
   var promise = firebase.auth().signInWithPopup(provider);

   promise
   .then( result => {
     if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // ...
  }
     var user = result.user;
     console.log(result);
     firebase.database().ref('users/'+result.user.uid).set({
       email : result.user.email,
       name : result.user.displayName
     })
   }).catch(e => {
     var err = e.message;
     console.log(err);
   });
 }

  constructor(props){
    super(props);

    this.state = {
      err: ''
    };

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.google = this.google.bind(this);
  }

  render(){
    return(
      <div>
          <input id="email" type="email" ref="email" placeholder="Enter Your Email" /><br />
          <input id="pass" type="password" ref="password" placeholder="Enter Your Password" /><br />
          <p>{this.state.err}</p>
          <button onClick={this.login}>Log in</button>
          <button onClick={this.signup}>Sign Up</button>
          <button id="logout" className="hide" onClick={this.logout}>Log Out</button><br />
          <button id="google" className="" onClick={this.google}>Sign In With Google</button>
      </div>
    );
  }
}

export default Authen;
