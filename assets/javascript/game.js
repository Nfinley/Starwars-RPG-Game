// Author: Nigel Finley. August 2016. UT BOOTCAMP HW Assignment



// 4. add the 'No enemy here' text when attack button is clicked
// 6. figure out how to implement the  'wounded' piece
// -Look at changing the font to more readable
// Add bootstrap class to change the hover state of characters
// makeimg bigger to strecth entire character and make text white





// Improvements to make
// Update the images to not show the background colors and spread across entire div
// change text color to white and bold and then overlay over the image
// change the positioning so that it flows better


// Overall game is stored in object
// game play object houses all functions  and additional variables of the game
function reset() {
	window.gameObj = {
		// intializing the attack button to false. will set it to true later on
		attackOccurred: false,
		winOccurred: false,
		lossOccurred: false,
		wounded: false,
		gameOver: false,
		jediMaster: false,
		characterArrayList: [
	    // 1.  An array or object of possible characters properties would incldue 
	    // name, picture, Health Points, Attack Power and counter attack power

	    {
	        name: 'Luke SkyWalker',
	        visual: 'assets/images/luke.jpg',
	        healthPoints: 160, 
	        attackPower: 10,
	        counterAttackPower: 20,
	    },
	    {
	        name: 'Yoda',
	        visual: 'assets/images/yoda.jpg', 
	        healthPoints: 130,
	        attackPower: 15,
	        counterAttackPower: 30,
	    },
	    {
	        name: 'Less Ray',
	        visual: 'assets/images/lessray.jpg',
	        healthPoints: 180, 
	        attackPower: 7,
	        counterAttackPower: 15,
	    },
	    {
	        name: 'Darth Vader',
	        visual: 'assets/images/darth.jpg',
	        healthPoints: 180,
	        attackPower: 15,
	        counterAttackPower: 25,
	    },
	    {
	        name: 'Kylo Wren',
	        visual: 'assets/images/kylowren.jpg',
	        healthPoints: 110,
	        attackPower: 12,
	        counterAttackPower: 20,
	    },
	   	{
	        name: 'Darth Maul',
	        visual: 'assets/images/darthmaul.jpg',
	        healthPoints: 100,
	        attackPower: 12,
	        counterAttackPower: 24,
	    }
	    //    {
	    //     name: 'Obi-Wan Kanobi',
	    //     visual: 'assets/images/obiwan.jpg',
	    //     healthPoints: 120, 
	    //     attackPower: 10, 
	    //     counterAttackPower: 24,
	    // 	},
	    //  {
	    //     name: 'Boba Fett',
	    //     visual: 'assets/images/bobafett.jpg',
	    //     healthPoints: 90,
	    //     attackPower: 25,
	    //     counterAttackPower: 26,
	    // }
		],
		// Initializes game start true
		gameStart: true,
		// initializes your character to nothing
		yourCharacter: null,
		// initializes enemy selection to nothing
		currentEnemy: null,
		// initializs your blank array of previously fought enemies. might just remove all together
		previouslyFought: [],
		// sets current attack power to null
		yourCurrentAttackPower: null,
		winOccurred: false,

	// create an array of battle sounds
		battleSoundsArray: ['assets/audio/saberclash.mp3', 'assets/audio/saberclash1.mp3', 'assets/audio/saberclash2.mp3', 'assets/audio/saberclash3.mp3', 'assets/audio/saberclash4.mp3', 'assets/audio/saberclash5.mp3', 'assets/audio/saberclash6.mp3', 'assets/audio/spin1.mp3', 'assets/audio/spin2.mp3','assets/audio/spin3.mp3','assets/audio/spin4.mp3','assets/audio/spin5.mp3','assets/audio/spin6.mp3', 'assets/audio/swing1.mp3','assets/audio/swing2.mp3', ],
		characherSelectSound: 'assets/audio/saberon.mp3',

	// picks at random battle sound when the attack button is pressed
		battleSoundPick: function() {
	        return this.battleSoundsArray[Math.floor(Math.random() * this.battleSoundsArray.length)];
	    },

	}
};


// STAGE 1: Initial Setup/ Display
$(document).ready(function() {
	reset();
	// gets the link for the theme song to be played in the background
	 var audioElement = document.createElement('audio');
	 audioElement.autoplay = true;
	 audioElement.loop = true;
     audioElement.setAttribute('src', 'assets/audio/starwars.m4a');

     // displays the modal
  	$('#myModal').modal('show');

	function render() {
		// setting variables set to id tags with html elements for easy reference later
		// using the $ before variables indicates that they are jQuery objects, it doesn't affect perfermance of the variables
		var $charList = $('#characterList');
		var $enemyList = $('#enemyList');
		var $yourCharacter = $('#yourCharacter');
		var $attackText = $('#attackText');
		var $yourEnemy = $('#yourEnemy');
		var $winText = $('#attackText');
		var $lossText = $('#attackText');
		// var $wounded = $('#attackText');
		var $gameOver = $('#gameOver');
		var $jediText = $('#attackText');
		
		// using underscore.js to create templates that are dynamically updated
		var $charTemplate = _.template($('#characterTmpl').html());
		var $attackTemplate = _.template($('#attackTmpl').html());
		var $winTemplate = _.template($('#winTmpl').html());
		var $lossTemplate = _.template($('#lossTmpl').html());
		var $jediTemplate = _.template($('#jediTmpl').html());
		// var $woundTemplate = 

		// Haven't selected Character
		var charHtml = "";
		$yourCharacter.html("");
		$yourEnemy.html("");
		$attackText.html("");
		$gameOver.html("");

		// using a ternary operator to give true or false to the background color choice
		var listBg = gameObj.yourCharacter ? "bg-black" : "bg-white";
		// Sets the initial screen with characters to select from
		gameObj.characterArrayList.forEach(function(character, index) {
			charHtml = charHtml + $charTemplate({index: index, background: listBg, character: character});
		});
		if (gameObj.yourCharacter) {
			$yourCharacter.html($charTemplate({index: 0, background: 'bg-white', character: gameObj.yourCharacter}));
			// re-write in jQuery
			$enemyList.html(charHtml);
			$charList.html("");

		} else {
			$charList.html(charHtml);
			$enemyList.html("");
		}
		if (gameObj.currentEnemy) {
			$yourEnemy.html($charTemplate({index: 0, background: 'bg-red', character: gameObj.currentEnemy}));
		}
		if (gameObj.attackOccurred) {
			$attackText.html($attackTemplate({gameObj: gameObj}));
		}
		// added
		if (gameObj.winOccurred) {
			
		   	// Displays the win text 
			$winText.html($winTemplate({lastOpponent: gameObj.lastOpponent}));
			// Removes the enemy character after you win.
			$('#yourEnemy').empty(gameObj.currentEnemy);
		}

		if (gameObj.lossOccurred) {
			// Displays loss text
			$lossText.html($lossTemplate({gameObj: gameObj}));
		}
		// This runs when the enemy is wounded (hp less than zero)
		if (gameObj.wounded){
			$('#attackText').html("You are seriously wounded. GAME OVER!");
		}
		// This runs if the user losses
		if (gameObj.gameOver) {
			// creates the reset button to start the game over
			var b = $('<button>');
			b.addClass('btn-primary waves-effect waves-light btn-lg');
			b.html('Battle Again!');
			reset();

			b.click(render);
			$('#gameOver').append(b);

		}
		if (gameObj.jediMaster) {
			// Displays final text 
			$jediText.html($jediTemplate({lastOpponent: gameObj.lastOpponent}));
			$('#yourEnemy').empty(gameObj.currentEnemy);
			// creates the reset button to start the game over
			var b = $('<button>');
			b.addClass('btn-primary waves-effect waves-light btn-lg');
			b.html('Battle Again!');
			reset();

			b.click(render);
			$('#gameOver').append(b);
			
		}

    }

    //STAGE 2: Selecting your character 
    $('#characterList').on('click', '.characterContainer', function(e) {
    	// pause current audio to allow for battle sounds
    	audioElement.pause();
		// TODO: set the AUDIO to saberon.mp3

    	// references the characterList
    	var element = $(this);
    	var charIndex = element.data('character-index');
    	// your character was initially set as null so when your character != null this if runs
    	if (!gameObj.yourCharacter) {
    		// pushes your object selection into yourCharacter array
    		gameObj.yourCharacter = gameObj.characterArrayList.splice(charIndex, 1)[0];
    		// setting initial attack power to the value within the master object
    		gameObj.yourCurrentAttackPower = gameObj.yourCharacter.attackPower;
    	}   
    	// This renders and updates all of the html elements 
    	render();
    	// adds a sound to selecting character
    	var $audioCharacter = document.createElement('audio');
                    $audioCharacter.setAttribute('src', gameObj.characherSelectSound);
                    $audioCharacter.play();
    });

    // STAGE 3: select your enemy
    $('#enemyList').on('click', '.characterContainer', function(e) {
    	var element = $(this);
    	var charIndex = element.data('character-index');
    	// current enemy was initially set as null so when your enemy != this if runs 
		if (!gameObj.currentEnemy) {
			// creates an array that houses the enemy character
			gameObj.winOccurred = false;
			// sets the attack button to false ensuring the attack text is not displayed when selecting a new character and only after 
			// ...click attack
			gameObj.attackOccurred = false;
    		gameObj.currentEnemy = gameObj.characterArrayList.splice(charIndex, 1)[0];
    	}
    	// This renders and updates all of the html elements 
    	render();
    	// adds a sound to selecting character
    	var $audioCharacter = document.createElement('audio');
                    $audioCharacter.setAttribute('src', gameObj.characherSelectSound);
                    $audioCharacter.play();
    });

    // STAGE 4: GAME PLAY. Click on ATTACK

    $('#attackBtn').on('click', function(e) {
    	// this ensure you cannot click any other characters again
    	if (!gameObj.yourCharacter || !gameObj.currentEnemy) {
    		$('#attackText').html('No enemy here, select an emeny to fight.')
    		return;
    	}
    	
    	gameObj.attackOccurred = true;
    	
    	// declaring new variables
    	var yourCharacter = gameObj.yourCharacter;
    	var currentEnemy = gameObj.currentEnemy;
    	//increment yourAttackPower by yourCharacter.attackPower
    	gameObj.yourCurrentAttackPower  = gameObj.yourCurrentAttackPower + yourCharacter.attackPower;
		//decrease enemy health points by yourAttackPower state
    	currentEnemy.healthPoints = currentEnemy.healthPoints - gameObj.yourCurrentAttackPower; 
    	//decrease your health points by enemy's counterAttackPower
    	yourCharacter.healthPoints = yourCharacter.healthPoints - currentEnemy.counterAttackPower;
    	console.log ("enenemy health points: " + currentEnemy.healthPoints + ' your health: ' + yourCharacter.healthPoints);

    	var $audioBattle = document.createElement('audio');
                    $audioBattle.setAttribute('src', gameObj.battleSoundPick());
                    $audioBattle.play();
                    


    	
    	// Win scenario
    	// set win variable  and loss in order to consolidate win ifs. 
    	var win = (currentEnemy.healthPoints < 1 && yourCharacter.healthPoints > 1 || 
    				((yourCharacter.healthPoints < 1 && currentEnemy.healthPoints < 1) && 
    				(yourCharacter.healthPoints > currentEnemy.healthPoints))
    			  ) ? true : false;

    	var loss = (yourCharacter.healthPoints < 1 && currentEnemy.healthPoints > 1 || 
    				((yourCharacter.healthPoints < 1 && currentEnemy.healthPoints < 1) && 
    					(yourCharacter.healthPoints < currentEnemy.healthPoints))
    			   ) ? true: false;


    
    	// First if is only if user has defeated all of the enemies    	
    	if (win) { 
    		
    		console.log('healthPoints of enemy should be equal great than or eqaul to 0: ' + currentEnemy.healthPoints);
			if (gameObj.characterArrayList.length > 0){
				console.log(gameObj.characterArrayList.length);
				gameObj.winOccurred = true;

				// need to be able to select another enemy
				gameObj.lastOpponent = gameObj.currentEnemy;
				gameObj.currentEnemy = null;
				// need to figure out how to show another error when your character points are less 0. Show error "you are seriously wounded. GAME OVER"
					// if (yourCharacter.healthPoints =< 0) {
					// 	gameObj.wounded = true;
					// 	// gameObj.winOccurred = false;

					// }
	 		
			}  
			// scenario when you have defeated all characters
			else if (gameObj.characterArrayList.length == 0){

				console.log('Final Jedi Portion ' + gameObj.characterArrayList.length);
				gameObj.lastOpponent = gameObj.currentEnemy;
				gameObj.attackOccurred = false; 
				gameObj.jediMaster = true;

			}  
				
	    	
    	}
    	 // Loss Scenario

    	else if (loss) {
    		gameObj.lossOccurred = true;
    		console.log('Entered the loss occurred section');
    		gameObj.attackOccurred = false; 
    		gameObj.gameOver = true; 
    		
    	}
    	render();

    });

			

    render();

});




