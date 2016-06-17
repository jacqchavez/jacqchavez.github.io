(function () {
    var questions = [{
        question: "Who is Nathan Drake's main partner in Uncharted?",
        choices: ['Elena', 'Chloe', 'Sully'],
        correctAnswer: 2
  }, {
        question: "What is my favorite console?",
        choices: ['Playstation', 'Xbox', 'Nintendo'],
        correctAnswer: 0
  }, {
        question: "Who created The Last of Us?",
        choices: ['Ubisoft', 'EA', 'Naughty Dog', 'Sony Santa Monica'],
        correctAnswer: 2
  }, {
        question: "What year did Game Cube came out?",
        choices: [2001, 2002, 2003, 2000],
        correctAnswer: 0
  }, {
        question: "What console came out first?",
        choices: ['NES', 'Magnavox Odyssey', 'Sega Genesis', 'Playstation 1'],
        correctAnswer: 1
  }, {
        question: "Which character has died",
        choices: ['Kratos - God of War', 'Chris Redfield - Resident Evil', 'Zack Fair - FF7', ],
        correctAnswer: 2
  }, {
        question: "What movie is based on a video game?",
        choices: ['Ride Along', 'Resident Evil', 'The Conjuring', 'Captain America'],
        correctAnswer: 1
  }, {
        question: "How many Playsation 2 have been sold?",
        choices: ['1.7 billion', '80 million', '155 million', '230.8 million'],
        correctAnswer: 2
  }, {
        question: "Who owns Xbox?",
        choices: ['Sony', 'Apple', 'Microsoft'],
        correctAnswer: 2
  }, {
        question: "Which game won the 'Game of the Year 2013' award?",
        choices: ['Grand Theft Auto V', 'The Last of Us', 'Bioshock Infinite', 'flower'],
        correctAnswer: 0
  }, {
        question: "What generation of video games are we on now?",
        choices: [3, 9, 5, 8],
        correctAnswer: 3
  }, {
        question: "In E3 2016, Playstation announced they are going to remaster an old game. What game are they going to remaster?",
        choices: ['Ratchet and Clank', 'Jax and Daxter', 'Crash Bandicoot', 'The Last of Us'],
        correctAnswer: 2
  }, {
        question: "How long was the infamous Atari Game ET in development before being rushed to the shelves?",
        choices: ['5 weeks', '1 month', '6 weeks', '7 weeks'],
        correctAnswer: 2
  }];

    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $('#quiz'); //Quiz div object

    // Display initial question
    displayNext();

    // Click handler for the 'next' button
    $('#next').on('click', function (e) {
        e.preventDefault();

        // Suspend click listener during fade animation
        if (quiz.is(':animated')) {
            return false;
        }
        choose();

        // If no user selection, progress is stopped
        if (isNaN(selections[questionCounter])) {
            alert('Please make a selection!');
        } else {
            questionCounter++;
            displayNext();
        }
    });

    // Click handler for the 'prev' button
    $('#prev').on('click', function (e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        choose();
        questionCounter--;
        displayNext();
    });

    // Click handler for the 'Start Over' button
    $('#start').on('click', function (e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        questionCounter = 0;
        selections = [];
        displayNext();
        $('#start').hide();
    });

    // Animates buttons on hover
    $('.button').on('mouseenter', function () {
        $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
        $(this).removeClass('active');
    });

    // Creates and returns the div that contains the questions and 
    // the answer selections
    function createQuestionElement(index) {
        var qElement = $('<div>', {
            id: 'question'
        });

        var header = $('<h2>Question ' + (index + 1) + ':</h2>');
        qElement.append(header);

        var question = $('<p>').append(questions[index].question);
        qElement.append(question);

        var radioButtons = createRadios(index);
        qElement.append(radioButtons);

        return qElement;
    }

    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {
        var radioList = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < questions[index].choices.length; i++) {
            item = $('<li>');
            input = '<input type="radio" name="answer" value=' + i + ' />';
            input += questions[index].choices[i];
            item.append(input);
            radioList.append(item);
        }
        return radioList;
    }

    // Reads the user selection and pushes the value to an array
    function choose() {
        selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }

    // Displays next requested element
    function displayNext() {
        quiz.fadeOut(function () {
            $('#question').remove();

            if (questionCounter < questions.length) {
                var nextQuestion = createQuestionElement(questionCounter);
                quiz.append(nextQuestion).fadeIn();
                if (!(isNaN(selections[questionCounter]))) {
                    $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
                }

                // Controls display of 'prev' button
                if (questionCounter === 1) {
                    $('#prev').show();
                } else if (questionCounter === 0) {

                    $('#prev').hide();
                    $('#next').show();
                }
            } else {
                var scoreElem = displayScore();
                quiz.append(scoreElem).fadeIn();
                $('#next').hide();
                $('#prev').hide();
                $('#start').show();
            }
        });
    }

    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
        var score = $('<p>', {
            id: 'question'
        });

        var numCorrect = 0;
        for (var i = 0; i < selections.length; i++) {
            if (selections[i] === questions[i].correctAnswer) {
                numCorrect++;
            }
        }

        score.append('You got ' + numCorrect + ' questions out of ' +
            questions.length + ' right!!!');
        return score;
    }
})();