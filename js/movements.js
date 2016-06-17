var userOption = undefined;
var userWin;
var computerWin;
var draw;

function playWith(option) {
    // first, we deselect the previous selected element (if exist)
    if (userOption != undefined) {
        userSelectionElement = document.getElementById(userOption);
        // we remove border
        userSelectionElement.style.border = "5px #000000 solid";
    }
    // then, we select the user option and we add 
    // a purple border
    userOption = option;
    userSelectionElement = document.getElementById(option);
    userSelectionElement.style.border = "5px #990066 solid";
}

function play() {
    var computerOption = Math.random();
    if (computerOption < 0.34) {
        computerOption = "rock";
    } else if (computerOption <= 0.67) {
        computerOption = "paper";
    } else {
        computerOption = "scissor";
    }

    resultMessage = compare(userOption, computerOption);

    document.getElementById("result").innerHTML =
        "<p>User select: " + userOption + " - Computer select:" + computerOption + "</p> <p>" + resultMessage + "</p>";

}


function compare(userSelection, computerSelection) {
    if (userSelection == undefined) {
        return "Please, select an option before play"
    }

    if (userSelection == computerSelection) {
        return "It is a draw!";
        draw += 1;
    }

    if (userSelection == "rock") {
        if (computerSelection == "scissor") {
            return "You win.";
            userWin += 1;
        } else {
            return "The computer win. Try again.";
            computerWin += 1;
        }

    } else if (userSelection == "paper") {

        if (computerSelection == "rock") {
            return "You win.";
            userWin += 1;

        } else if ("scissor") {
            return "The computer win. Try again.";
            computerWin += 1;

        }

    } else if (userSelection == "scissor") {

        if (computerSelection == "rock") {
            return "The computer win. Try again.";
            computerWin += 1;

        } else {
            return "You win.";
            userWin += 1;

        }
    }
}