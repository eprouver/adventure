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
                self.memes = ["the-most-interesting-man-in-the-world","pissed-off-obama","foul-bachelor-frog","hipster-ariel","socially-awkward-penguin","paranoid-parrot","lame-pun-raccoon","successful-black-man","business-cat-needs","philosoraptor","advice-god","insanity-wolf","musically-oblivious-8th-grader","forever-alone","scumbag-steve","courage-wolf","sexually-oblivious-rhino","y-u-no","ordinary-muslim-man","joseph-ducreux","butthurt-dweller","advice-dog","ronald-mcdonald-call","high-expectations-asian-father","scumbag-obama","xzibit-yo-dawg","thumbs-up-jesus-says","stoner-dog","hipster-kitty","art-student-owl","technologically-impaired-duck","cowboy-dos-equis","scumbag-lincoln","happy-jesus","xzibit-happy-and-sad","angry-samuel-l-jackson","troll","hawkward","empathetic-shark","crazy-girlfriend-praying-mantis","foul-bachelorette-frog","xzibit-funyuns","web-developer-walrus","ptsd-clarinet-boy","grandma-finds-the-internet","rasta-science-teacher","dating-site-murderer","geraldo-rivera","challenge-accepted","osama","hell-yeah-nixon","cockblock-cathy","annoying-facebook-girl","mogen-david-dos-equis-guy","the-old-spice-guy","redneck-randal","engineering-professor","admiral-ackbar-relationship-expert","the-most-interesting-cat-in-the-world","sheltering-suburban-mom","dwight-schrute","dramatic-soap-opera-cat","forever-alone-20","ronald-mcdonald-calling","toad-y-u-no","bowser-troll-face","donkey-kong-forever-alone","mario-fffffffuuuuuuuuuuuu","luigi-okay","me-gusta-princess-peach","captian-herpin-derpin","broly-says","operations-kittie","saint-macho-man-randy-savage","george-clooney","heyy","queen-of-england","7-out-of-10","bill-oreilly","krim","ancient-aliens-guy","futurama-fry","redditors-wife","you-shall-not-pass","bump","supa-troll","kanye-west","in-before-the-lock","smeagle","marty","angry-meatloaf","karate-kyle-dog","trololo","cartmaniaaaz","scoobydoodoodoo","bert","son-goku","weiner","sleep-at-work","socially-awesome-penguin","pushy-john-barrowman","birthday-mj","sad-frog","jackie-chan-whut","good-guy-greg","pickupline-panda","bear-grylls-survival-tactics","torrenting-turtle","sheltered-suburban-kid","longterm-relationship-lobster","emo-daddy","the-chuck-norris","chuck-norris","advice-wario","interrupting-kanye","the-rock-says","black-genetics","troll-cat","idiot-gaston","do-you-even-lift","jeter","al-bundy","casey-anthony","serious-owl","survival-sandy","promote-synergy","direct-workflows","conspiracy-keanu","peppy","kenny-powers","zoidberg-time","home-simpson-panic","professor-oak","liberal-douche-garofalo","but-mom","confucius-says","sleep-disorder-grizzly","never-alone","science-cat","advice-emofag","carlton","gay-guy-gabe","fuuuuuuuuuuuuwqqw","scumbag-jesus","duck-dodgers","men-who-stare-at-lulz","joseph-ducreux-yawning","john-marston","billy-mays","chris-hansen","jokerpool","the-rock","passive-cat","mr-t","hey-guy","gandolf","boba-fett","depression-dog","glamorous-grayson","overly-friendly-call-center-agent","installation-wizard","shoop-da-whoop","x-all-the-things","transformice-shaman","the-smart-dumb-guy","a-sharks-advice","brick-tamland","juno","comic-book-guy","misunderstood-douchebag","couchsurfing-mooch","rapist-freddy","ahmadinejad-troll","bender","hide-yo","red-foreman322","rich-texan","technical-wizard","customer-service-croc","rainbow-dash-excited","arnold-disgusting","chiaotzu","arnold-angry","friend-zone-fiona","push-it-patrick","tron-vader","barack-obama","farting-guard","lil-john","lil-jon","cookie-monnnnsssterrrrr","bundy","high-school-hyena","crossing-guard-gandalf","lafayette","sorority-slut","compliment-bender","internet-pervert","hungover-polar-bear","indiana-jones","black-ops-agent","retail-robin","know-it-all-indian-guy","steve-brule","success-kid","idiot-nerd-girl","chaotic-good-tyler-durden","starting-midlife-crisis-guy","all-the-things-psycho","marie-silverman","naruto-badass","drunk-superman","homer-with-beer","serial-killer-george","unhelpful-high-school-teacher","killer-kitty","alex-jones","south-florida-driver","bill-gates","disaster-girl","noob-explorer-dora","internet-addict-tarsier","exercise","anxiety-cat","donald-trump","troll-ketchup","overly-permissive-hippie-parents","slowpoke","shadow-lurker","tommy-pickles","business-dog","film-school-ferret","over-9000","socially-eccentric-penguin","facepalm-picard","internet-tuff-guy","friend-zone-phil","douche-bag-cat","mongolians","chuck-testa","traitor-brain","erkeljpg","brocat","literal-lassie","rebecca-black","hank-hill-yep","bargain-vader","college-crab","yoda-senses","religion-pigeon","ceiling-cat","insanity-puppy","bush","obama-isnt-happy","alf","atomic-rage","the-most-interesting-monster-in-the-world","debbie-downer","ice-cube","richard-dawkins","screaming-baby","freshman-couple","creepy-willy-wonka","disgusting-doggy","3fiddy","that-annoying-teen-couple","guido-jesus","slickback","good-dog-greg","antijoke-chicken","gadaffi","fancy-crab","scumbag-brain","pedobear","downvoting-roman","karate-kyle","reddit-alien","minecraft","oj-simpson","wanna-know-gay","creeper-canine","harmless-scout-leader","sad-guy","epic-pool-girl","fat-ninja","family-tech-support-guy","scumbag-blackboard","beavis-and-butthead-lol","birthing-pumpkin","beavis-and-butthead-having-5oclocktea","condescending-fox","cool-chick-carol","programmer","bad-advice-cat","captain-hindsight","why-2","facebook-aunt","privilege-denying-feminist","skyrim","success-nixon","rageopotamus","easily-distracted-gymnast","pepper-spray-cop","entitled-bicyclists","racist-dog","pawn-star","charizard-dad","10-guy","advice-snooki","unimpressed-slave","lazy-college-senior","megyn-kelly","ocd-otter","oh-no-dog","most-interesting-troll","ok-guy","badass-youth","leela-futurama","baby-godfather","afraid-of-a-basketball","the-most-forever-alone-in-the-world"];

                $scope.params = {
                    maxTitle: 100,
                    maxPage: 520
                }

                $scope.$on('user:updated', function(){
                    $scope.user = user.getData();
                    if(!$scope.$$phase){
                        $scope.$apply();
                    }
                })

                if(!$scope.user.loaded){
                    setTimeout(user.showButtons, 100);
                }

                function submitPage(story, parent){
                    return pages.submitPage(story, parent, self.action, self.text).then(function(res) {
                        if($scope.rCtrl){
                            $scope.rCtrl.adding = false;
                        }
                        self.action = self.text = undefined;
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

                    var choiceSuccess = function(){
                        $rootScope.$broadcast('addChoice:success')
                    }

                    if($scope.story){
                        pages.newStory(self.action).then(function(story){
                            submitPage(story, parent).then(choiceSuccess);
                        })
                    }else{
                        submitPage($scope.page.story, parent).then(choiceSuccess);
                    }

                }
            }]
        };
    }]);
