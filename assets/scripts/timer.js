const diffMap = { easy: 60, medium: 45, hard: 30 };
const diff = new URLSearchParams(window.location.search).get('difficulty');
let timeLeft = diffMap[diff] ?? 20;
var questionTimer = null;

function startTimer() {
    updateTimer();
}

function updateTimer() {
    document.getElementById('timer').innerHTML = timeLeft + 's';
    if (timeLeft <= 0) {
        clearTimeout(questionTimer);
        window.location.replace(`result.html?score=${score}&${new URLSearchParams(window.location.search).toString()}`);
        return;
    }
    timeLeft -= 1;
    questionTimer = setTimeout(updateTimer, 1000);
}
