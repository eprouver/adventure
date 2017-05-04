'use strict';

/**
 * @ngdoc service
 * @name adventureApp.user
 * @description
 * # user
 * Service in the adventureApp.
 */
angular.module('adventureApp')
    .service('user', ['$rootScope', function($rootScope) {

        var myUser = {
            loaded: false
        };

        // FirebaseUI config.
        var uiConfig = {
            signInSuccessUrl: 'http://localhost:9000/#!/library',
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                firebase.auth.GithubAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            signInFlow: 'popup',
            // Terms of service url.
            tosUrl: '<your-tos-url>',
            callbacks: {
                signInSuccess: function(currentUser, credential, redirectUrl) {
                    document.getElementById('firebaseui-auth-container').style.display = 'none';
                    return true;
                }
            }
        };

        var ui;

        return {
            start: function() {

                // Initialize the FirebaseUI Widget using Firebase.
                try {
                	var auth = firebase.auth();
                	auth.onAuthStateChanged(function(user) {
                        if (user) {
                            // User is signed in.
                            var displayName = user.displayName;
                            var email = user.email;
                            var emailVerified = user.emailVerified;
                            var photoURL = user.photoURL;
                            var uid = user.uid;
                            var providerData = user.providerData;
                            user.getToken().then(function(accessToken) {
                                myUser = {
                                    displayName: displayName,
                                    email: email,
                                    emailVerified: emailVerified,
                                    photoURL: photoURL,
                                    uid: uid,
                                    accessToken: accessToken,
                                    providerData: providerData,
                                    loaded: true
                                }

                                $rootScope.$broadcast('user:updated');
                            });
                            
                        } else {
                            // User is signed out.
                            // document.getElementById('sign-in-status').textContent = 'Signed out';
                            // document.getElementById('sign-in').textContent = 'Sign in';
                            // document.getElementById('account-details').textContent = 'null';

                            // The start method will wait until the DOM is loaded.
                            

                        }
                    }, function(error) {
                        console.log(error);
                    })
                    ui = new firebaseui.auth.AuthUI(auth);

                    
                } catch (e) {

                }
            },
            getData: function() {
                return myUser;
            },
            showButtons: function(){
                ui.start('#firebaseui-auth-container', uiConfig);
            }
        }
    }]);
