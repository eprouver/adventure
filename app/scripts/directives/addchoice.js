'use strict';

/**
 * @ngdoc directive
 * @name adventureApp.directive:addChoice
 * @description
 * # addChoice
 */
angular.module('adventureApp')
    .directive('addChoice', ['$rootScope', 'pages', 'user', function($rootScope, pages, user) {
        return {
            templateUrl: 'views/addchoice.html',
            replace: true,
            restrict: 'E',
            controllerAs: 'acCtrl',
            controller: ['$scope', '$attrs', function($scope, $attrs) {
                var self = this;
                $scope.story = $attrs.story;
                $scope.user = user.getData();
                self.memes = ["001 - Regret bear",
                    "002 - Confession bear",
                    "003 - quotHow about noquot",
                    "004 - Socially awesomeawkward",
                    "005 - Socially awkwardawesome",
                    "006 - Socially awkward penguin",
                    "007 - Socially awesome penguin",
                    "008 - Unpopular opinion puffin",
                    "009 - Popular opinion pangolin ",
                    "010 - Facepalm Picard",
                    "011 - quotWhy the fuckquot",
                    "012 - Success Picard",
                    "013 - Scumbag Steve",
                    "014 - Scumbag brain",
                    "015 - Good guy greg",
                    "016 - Bad teacher",
                    "017 - quotOne does not simplyquot",
                    "018 - Brace yourselves",
                    "019 - Most interesting man in the world",
                    "020 - quotAliensquot",
                    "021 - quot___ ___ everywherequot",
                    "022 - First world problems",
                    "023 - 90s problems",
                    "024 - quotBut that039s none of my businessquot",
                    "025 - Bad luck Brian",
                    "026 - Condescending Wonka",
                    "027 - quotThat039d be greatquot",
                    "028 - Success kid",
                    "029 - 3rd world success kid",
                    "030 - Skeptical kid",
                    "031 - Embarassing things you thoughtdid as a kid",
                    "032 - Getting yourself into an awkard situation",
                    "033 - First day on internet kid",
                    "034 - quotAm I the only one around herequot",
                    "035 - quotToo Damn Highquot",
                    "036 - quotNot sure ifquot",
                    "037 - quotShut up and take my moneyquot",
                    "038 - Why not Zoidberg",
                    "039 - quotYour____is bad and you should feel badquot",
                    "040 - Blackjack and hookers",
                    "041 - Foul bachelor frog",
                    "042 - Foul bachelorette frog",
                    "043 - Fact frog",
                    "044 - Actual advice mallard",
                    "045 - Malicious advice mallard",
                    "046 - Insanity wolf",
                    "047 - Courage wolf",
                    "048 - Awkward situation seal",
                    "049 - Seal of approval",
                    "050 - Grumpy cat",
                    "051 - quotI should buy aquot",
                    "052 - Business cat",
                    "053 - Chemistry joke cat",
                    "054 - Heavy Breathing",
                    "055 - Doge",
                    "056 - Phteven",
                    "057 - quotJenkinsquot",
                    "058 - Chemistry dog",
                    "059 - Lawyer dog",
                    "060 - Redneck dog",
                    "061 - Weird things you do",
                    "062 - Paranoid parrot",
                    "063 - quotJust rightquot",
                    "064 - Interrupting Batman",
                    "065 - quotWhat if I told youquot",
                    "066 - Caveman spongebob",
                    "067 - Pondering spongebob",
                    "068 - I don039t actually know what this one is but I like it so here it is",
                    "069 - quotI039ll have you knowquot",
                    "070 - quotIs____ a _____quot",
                    "071 - quotNo one bats an eyeeveryone loses their mindquot",
                    "072 - quotYo dawgquot",
                    "073 - Keanu",
                    "074 - Overly attached girlfriend",
                    "075 - Sudden clarity Clarence",
                    "076 - quotI will find you and I will kill youquot",
                    "077 - Pepperidge farm remembers",
                    "078 - quotYou wanna know what grids my gearsquot",
                    "079 - Angry Gordon Ramsay",
                    "080 - quotquot",
                    "081 - quotYou get a meme template you get a meme template everybody gets a meme templatequot",
                    "082 - Grandma uses the computer",
                    "083 - That one high dude",
                    "084 - Ermahgerd",
                    "085 - quotSo I039ve got that going for me which is nicequot",
                    "086 - quotI too like to live dangerouslyquot",
                    "087 - quotWRONGquot",
                    "088 - quotSee no one caresquot",
                    "089 - quotCooorrrralllllquot",
                    "090 - quotThis is where I039d put ____ IF I HAD ONEquot",
                    "091 - Inception",
                    "092 - Sad spiderman",
                    "093 - quotThings are getting pretty seriousquot",
                    "094 - Ducreux",
                    "095 - Hypocrite Hippy ",
                    "096 - quotAaaaand it039s gonequot",
                    "097 - quotYou039re gonna have a bad timequot",
                    "098 - Captain hindsight",
                    "099 - Bad joke eel",
                    "100 - quotI039m just sitting herequot"
                ]
                $scope.params = {
                    maxTitle: 100,
                    maxPage: 520
                }

                $scope.$on('user:updated', function() {
                    $scope.user = user.getData();
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                })

                if (!$scope.user.loaded) {
                    setTimeout(user.showButtons, 100);
                }

                $scope.pending;
                $scope.memeTextStyle = function() {
                    console.log(arguments);
                };

                self.loadBackground = function(bkg) {
                    self.background = 'images/loading.svg';
                    $scope.pending = bkg;

                    var img = new Image();

                    img.onerror = function() {
                        $rootScope.$broadcast('feedback:memeUnavailable');
                        self.memes = _(self.memes).without(bkg);
                        self.background = undefined;
                        $scope.pending = undefined;

                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    }

                    img.onload = function() {
                        if ($scope.pending == bkg) {
                            self.background = "images/memes/" + bkg + ".jpg";
                            $scope.pending = undefined;
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        }
                    }

                    img.src = "images/memes/" + bkg + ".jpg"


                }

                function submitPage(story, parent) {
                    return pages.submitPage(story, parent, {
                        action: self.action,
                        text: self.text,
                        endMeme: self.endMeme,
                        memeBackground: self.background,
                        topMeme: self.topMeme,
                        bottomMeme: self.bottomMeme
                    }).then(function(res) {
                        if ($scope.rCtrl) {
                            $scope.rCtrl.adding = false;
                        }

                        self.action = undefined;
                        self.text = undefined;
                        self.endMeme = undefined;
                        self.background = undefined;
                        self.topMeme = undefined;
                        self.bottomMem = undefined;

                        $scope.sending = false;
                    })
                }

                $scope.addChoice = function() {
                    $scope.sending = true;
                    if ($scope.main) {
                        var parent = $scope.main.page;
                    } else {
                        var parent = null;
                    }

                    var choiceSuccess = function() {
                        $rootScope.$broadcast('addChoice:success')
                    }

                    if ($scope.story) {
                        pages.newStory(self.action).then(function(story) {
                            submitPage(story, parent).then(choiceSuccess);
                        })
                    } else {
                        submitPage($scope.page.story, parent).then(choiceSuccess);
                    }

                }
            }]
        };
    }]);
