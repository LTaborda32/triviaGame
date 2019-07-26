$(document).ready(function(){
    var triviaQuestions = [{
        question: "The Fantastic Four have their headquarters in which building?",
        answerList: ["Stark Tower", "Fantastic Headquerters", "Baxter Building", "off world"],
        answer: 2
    },{
        question: "Peter Parker works as a photographer for:",
        answerList: ["The Daily Planet", "The Daily Bugle", "The New York Times", "The Rolling Stone"],
        answer: 1
    },{
        question: "S.H.I.E.L.D.'s highest ranking agent is:",
        answerList: ["Nick Fury", "Steve Rogers", "Natasha Romanov", "Maria Hill"],
        answer: 0
    },{
        question: "Captain America was frozen in which war?",
        answerList: ["World War 1", "World War 2", "Cold War", "Civil War"],
        answer: 1
    },{
        question: "What did Dr. Pym discover that allowed him to change size?",
        answerList: ["Gamma radiation", "Pym Particles", "Alpha rays", "He could do it since birth"],
        answer: 1
    },{
        question: "Iceman is a member of which team?",
        answerList: ["The Invaders", "The Fantastic 4", "The Avengers", "The X-men"],
        answer: 3
    },{
        question: "Bucky was:",
        answerList: ["A member of the X-Men", "Captain America's sidekick", "A supervillain", "An assistant of Bruce Banner"],
        answer: 1
    },{
        question: "Ghost Rider is known as:",
        answerList: ["The Guardian Devil", "The Spirit of Hate", "The Spirit of Vengeance", "The Red Skull"],
        answer: 2
    },{
        question: "Deadpool joined the Weapon X program because:",
        answerList: ["He had incurable cancer", "He was forced to", "He thought it would be fun", "He wanted to fight for justice"],
        answer: 0
    },{
        question: "What is the name of Tony Stark's building that the team uses as head-quarters in Marvel: Ultimate Alliance?",
        answerList: ["Camp Hammond", "Iron Tower", "Stark Tower", "S.H.I.E.L.D. Headquarters"],
        answer: 3
    }];

    var currentQuestion; 
    var correctAnswer; 
    var incorrectAnswer; 
    var seconds; 
    var time;
    var answered;
    var unanswered;
    var userSelect;
    var messages = {
        correct: "Correct!",
        incorrect: "Incorrect!",
        endTime: "Out of time!",
        finished: "You're Done"
    }

    $("#startBtn").on('click',function(){
        $(this).hide()
        newGame()
    })

    $('#startOverBtn').on('click', function(){
        $(this).hide();
        newGame();
    });

    function newGame(){
        $("#finalMessage").empty()
        $('#correctAnswers').empty()
	    $('#incorrectAnswers').empty()
	    currentQuestion = 0
	    correctAnswer = 0
	    incorrectAnswer = 0
	    newQuestion()


    }

    function newQuestion(){
        $('#message').empty();
        $('#correctedAnswer').empty();
        answered= true
        $("#currentQuestion").html("Question #"+(currentQuestion+1)+'/'+triviaQuestions.length)
        $('.question').html('<h3>' + triviaQuestions[currentQuestion].question + '</h3>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
    }
    
    countdown();
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
    }

    function countdown(){
        seconds = 15;
        var timer = $('#timeLeft').html('<div>Time Remaining: ' + seconds + '<div>');
        timer.addClass("timer")
        answered = true;
        time = setInterval(showCountdown, 1000);
    }

    function showCountdown(){
        seconds--;
        $('#timeLeft').html('<div>Time Remaining: ' + seconds + '</div>');
        if(seconds < 1){
            clearInterval(time);
            answered = false;
            answerPage();
        }
    }

    function answerPage(){
        $('#currentQuestion').empty();
        $('.thisChoice').empty(); 
        $('.question').empty();
    
        var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
        var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
        if((userSelect == rightAnswerIndex) && (answered == true)){
            correctAnswer++;
            $('#message').text(messages.correct);
        } else if((userSelect != rightAnswerIndex) && (answered == true)){
            incorrectAnswer++;
            $('#message').text(messages.incorrect);
            $('#correctedAnswer').text('The correct answer was: ' + rightAnswerText);
        } else{
            unanswered++;
            $('#message').text(messages.endTime);
            $('#correctedAnswer').text('The correct answer was: ' + rightAnswerText);
            answered = true;
        }
        
        if(currentQuestion == (triviaQuestions.length-1)){
            setTimeout(scoreboard, 5000)
        } else{
            currentQuestion++;
            setTimeout(newQuestion, 5000);

        }	
    }


    function scoreboard(){
        $('#timeLeft').empty();
        $('#message').empty();
        $('#correctedAnswer').empty();
      
    
        $('#finalMessage').html(messages.finished);
        $('#correctAnswers').html("Correct Answers: " + correctAnswer);
        $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
        $('#unanswered').html("Unanswered: " + unanswered);
        $('#startOverBtn').addClass('reset');
        $('#startOverBtn').show();
        $('#startOverBtn').html('Start Over?');


}
})



