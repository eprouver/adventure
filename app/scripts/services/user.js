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
        var database = firebase.database();
        var myUser = {
            loaded: false,
            hearts: []
        };

        // FirebaseUI config.
        var uiConfig = {
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                firebase.auth.GithubAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            // signInFlow: 'popup',
            // Terms of service url.
            tosUrl: '<your-tos-url>',
            callbacks: {
                signInSuccess: function(currentUser, credential, redirectUrl) {
                    document.getElementById('firebaseui-auth-container').style.display = 'none';
                    setTimeout(function() {
                        $rootScope.$broadcast('user:updated');
                    }, 3000);
                    return true;
                }
            }
        };

        var ui;

        var self = {
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

                                database.ref('userData/' + myUser.uid).on('value', function(res) {
                                    var userData = res.val();
                                    if (!userData) {

                                        database.ref('userData/' + myUser.uid).set({
                                            hearts: ['no hearts']
                                        })
                                    } else {
                                        myUser.hearts = _(userData.hearts).without('no hearts');
                                    }
                                    $rootScope.$broadcast('user:updated');
                                })


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
            showButtons: function() {
                ui.start('#firebaseui-auth-container', uiConfig);
            },
            getHearts: function() {
                return myUser.hearts || [];
            },
            setHeart: function(id) {
                if (myUser.hearts.indexOf(id) > -1) {
                    myUser.hearts = _(myUser.hearts).without(id);
                } else {
                    myUser.hearts.push(id);
                }
                if (myUser.loaded) {
                    database.ref('userData/' + myUser.uid + '/hearts').set(myUser.hearts);
                }
            }
        }

        return self;
    }]);
