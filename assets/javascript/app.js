// Questions, answers, correct answers and images variable object.  Made using jQuery, so we can call
// specific sections of the variable, this is the way to correlate an answer to a question
var questions = [{
	question: "What does Valar Morghulius mean?",
	answers: ["All Men Must Serve", "All Men Must Die", "All Men Must Be Dragon Food", "All Men Must Sing"],
	correct: "All Men Must Die",
	image: "assets/images/NoOne.jpg"
}, {
	question: "What American Metal Band is featured as Wildlings in the episode HardHome from Season 6?",
	answers: ["Pantera", "Lamb of God", "Mastodon", "All That Remains"],
	correct: "Mastodon",
	image: "assets/images/Mastodon.jpg"
}, {
	question: "Who Knows Nothing?",
	answers: ["Jon Snow", "Arya Stark", "Drogon", "Khal Drogo"],
	correct: "Jon Snow",
	image: "assets/images/KnowNothing.png"
}, {
	question: "What is Ser Gregor Clegane's nickname?",
	answers: ["The Hound", "The Tree", "The Mountain", "The Ocean"],
	correct: "The Mountain",
	image: "assets/images/TheMountain.jpg"
}, {
	question: "What is the name of Jon Snow's DireWolf?",
	answers: ["Grey-Wind", "Lady", "Summer", "Ghost"],
	correct: "Ghost",
	image: "assets/images/Ghost.jpg"
}, {
	question: "Who or what created the White Walkers?",
	answers: ["The Lannisters", "Benjen Stark", "The Children of the Forest", "The Three-Eyed Raven"],
	correct: "The Children of the Forest",
	image: "assets/images/WhiteWalkers.jpg"
}, {
	question: "What happens to the Red Woman, (Melisandre), when she removes her choker necklace?",
	answers: ["She is revealed to be Cersi Lannister in Disguise", "She is revealed to be a very old woman", "She is revealed to be a DireWolf in Disguise", "She turns to dust"],
	correct: "She is revealed to be a very old woman",
	image: "assets/images/RedWoman.png"
}, {
	question: "Who is Robert Baratheon's bastard son?",
	answers: ["Podrick Payne", "Gendry", "Joffery", "Ramsay"],
	correct: "Gendry",
	image: "assets/images/Gendry.jpg"
}, {
	question: "What is Jamie Lannister's nickname?",
	answers: ["LadySlayer", "BastardSlayer", "KingSlayer", "TargaryenSlayer"],
	correct: "KingSlayer",
	image: "assets/images/Jamie.jpg"
}, {
	question: "Who killed Balon Greyjoy?",
	answers: ["Euron Greyjoy", "Theon Greyjoy", "A WhiteWalker", "Yara Greyjoy"],
	correct: "Euron Greyjoy",
	image: "assets/images/Euron.jpg"
}];

// Variables to define timer function, new question function, next question function, time up function
// results function, correct and incorrect answers, and function that defines what happens when button is clicked
var timer;
//Uses jQuery to insert things created in this JavaScript page into the div created in the HTML code called gameArea
var gameView = $("#gameArea");
// The initial value for the counter
var counterStart = 30;

var trivia = {
	questions: questions,
	currentQuestion: 0,
	counter: counterStart,
	correct: 0,
	wrong: 0,


	// Timer countdown function, starts at 30 seconds and counts down to 0
	countdown: function() {
		// calls the counter section from the trivia variable then counts down using the '--'
		trivia.counter--;
		// Creates a div called "counter-start" and inserts it into the inner HTML, this could have been done using
		// just JavaScript by using the document.createElement('div')
		$("#beginTimer").html(trivia.counter);
		// If statement that tells the page what to do when the timer reaches 0, it runs the timeUp function
		if (trivia.counter === 0) {
			trivia.timeUp();
		}
	},


	// Current question function
	newQuestion: function() {
		//jQuery function to set interval time to 1 second (1000 miliseconds), before next question displays
		timer = setInterval(trivia.countdown, 1000);  
		//Shows the question in the main html of the game area in an h2 section, it could have also been a p section or a div section
		gameView.html("<h2>" + questions[this.currentQuestion].question + "</h2>");
		//For loop so the answers act as individual buttons that can be selected
		for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
			gameView.append("<button class='answerButton' id='button' data-name='" +
			 questions[this.currentQuestion].answers[i] + "'>" + questions[this.currentQuestion].answers[i]
			  + "</button>");
			}
		},

	// Function to define what happens when the timer has run out
	timeUp: function() {
	//Clears the timer for the next question
		clearInterval(timer); 
		//Adds to the div created for the timer
		$("#beginTimer").html(trivia.counter);
		//Alerts player that they have run out of time and displays the correct answer
		gameView.html("<h2>You Have Run Out of Time!!!");
		// Alerts player of the correct answer
		gameView.append("<h3>The Correct Answer is: " + questions[this.currentQuestion].correct);
		//Image associated with the correct answer
		gameView.append("<img src='" + questions[this.currentQuestion].image + "' />"); 
		// Unlike the answeredWrong and answeredCorrect functions that are written further down, notice that there
		// isn't a trivia.unanswered++;, this is because it appears that the JavaScript will already add a 1 to the
		// unanswered tally on the results page
		// If the trivia question is equal to the current question - 1, show trivia results or else go to the next question
		if (trivia.currentQuestion === questions.length - 1) {
			//If there are no more questions remaining, this waits 3 seconds and goes to the results page
			setTimeout(trivia.results, 3 * 1000);
			// If there are questions remaining, this loop  waits 3 seconds and goes to the next question
		} else {
			setTimeout(trivia.nextQuestion, 3 * 1000);
		}
	},
	// Function for the next question, after an answer has been selected on the current question, or the time has run out
	nextQuestion: function() {
		// Resets the countdown timer to the starting number, 30
		trivia.counter = counterStart;
		// Creates a div to hold the countdown timer in
		$("#beginTimer").html(trivia.counter);
		// tells the trivia variable to advance the question to the next one in held in the variable
		trivia.currentQuestion++;
		// runs the newQuestion function, which is just basically the current question.
		trivia.newQuestion();
	},

	// This function displays the results of the entire game
	results: function() {
		// clearInterval is a built in function that does exactly what its called, it clears the interval of, in 
		// this case the timer
		clearInterval(timer);  
		// This appends the gameView div to the HTML, later in the code we have to prepend this h2 section to the HTML
		gameView.html("<h2>Send a Raven, here are your results!</h2>");
		// Creates a div to hold the countdown timer in
		$("#beginTimer").html(trivia.counter);
		//Displays correct answers possible from 0 to 10
		gameView.append("<h3>Correct Answers: " + trivia.correct + "</h3>");
		//Displays the incorrect answers from 0 to 10
		gameView.append("<h3>Wrong Answers: " + trivia.wrong + "</h3>");
		//Displays number of unanswered questions from 0 to 10
		gameView.append("<h3>Unanswered: " + (questions.length - (trivia.wrong + trivia.correct)) + "</h3>");
		//Gives the player the option to restart the game
		gameView.append("<br><button id='tryAgain'>Try Again?</button>");
	},
	// This is the event function, since this function is called when the event of a mouse click occurs
	click: function(e) {
		// It clears the timer interval
		clearInterval(timer);
		// and runs through a loop where it determines if the answer clicked on is the correct answer
		if ($(e.target).attr("data-name") === questions[this.currentQuestion].correct) {
			// This loop calls the answeredCorrect() function if the button clicked is the correct one
			this.answeredCorrect();
			// or if the answer is wrong, this loop calls the function answeredWrong() if the button clicked is wrong
		} else {
			this.answeredWrong();
		}
	},
		// This is the function for the correct answer
	answeredCorrect: function() {
		// As with most of the other functions in this script, we have to start by clearing the timer interval
		clearInterval(timer);
		// Alert the user that they have selected the correct answer
		gameView.html("<h2>Correct!</h2>");
		// Show an image that relates to the correct answer
		gameView.append("<img src='" + questions[trivia.currentQuestion].image + "' />");
		// Add 1 to the correct answer tally
		trivia.correct++;
		// run through a loop that checks to see if there are any remaining questions
		if (trivia.currentQuestion === questions.length - 1) {
			// if there are no more questions remaining, it waits 3 seconds and moves on to the results page
			setTimeout(trivia.results, 3 * 1000);
			// if there are questions remaining, it waits 3 seconds and moves on to the next question
		} else {
			setTimeout(trivia.nextQuestion, 3 * 1000);
		}
	},
	//This is the function for a wrong answer
	answeredWrong: function() {
		// It clears the timer Interval
		clearInterval(timer);
		
		// It alerts the user in the innerHTML that the answer is incorrect
		gameView.html("<h2>Wrong Answer!</h2>");
		// Tells the user what the correct answer is
		gameView.append("<h3>The Correct Answer was: " + questions[trivia.currentQuestion].correct + "</h3>");
		// and shows a picture that relates to the correct answer, that is sourced from the images folder
		gameView.append("<img src='" + questions[trivia.currentQuestion].image + "' />");
		// It adds 1 to the wrong answer tally
		trivia.wrong++;
		// This loop waits 3 seconds before moving on to the next question, to give the user a chance to see what
		// the correct answer is
		if (trivia.currentQuestion === questions.length - 1) {
			// This part of the loop waits 3 seconds and moves on to the results page if the game is complete
			setTimeout(trivia.results, 3 * 1000);
			// If there are remaining questions, this loop waits 3 seconds then moves on to the next question
		} else {
			setTimeout(trivia.nextQuestion, 3 * 1000);
		}
	},
	
	// After the game completes, there is a "Try Again" button, when pushed it restarts the game, and this function
	// and this function resets all the initial conditions so the new player can test their own knowledge!
	reset: function() {
		trivia.currentQuestion = 0;
		trivia.counter = counterStart;
		trivia.correct = 0;
		trivia.wrong = 0
		trivia.newQuestion();
	}	
};

// This prepends all the innerHTML that was created earlier in the form of the <h2> sections
$(document).on("click", "#Begin", function(){
	$("#main").prepend("<h2>Time Remaining: <span id='beginTimer'>30</span> Seconds</h2>");
	trivia.newQuestion();
});
// finally this section tells the JavaScript what to do when different buttons are clicked on
// for onClick, Start Over, it tells the code to run the reset function when the "Try Again" button is clicked
$(document).on("click", "#tryAgain", function() {
	trivia.reset();
});
// Since we made each answer into its own button, this onClick answer button, detects the click event for the 
// answer selected by the user
$(document).on("click", ".answerButton", function(e) {
	trivia.click(e);
});
