async function getQuestions(e){
    document.getElementById('answerList').setAttribute('class', '');
    const shuffled = quizData.results.slice().sort(() => Math.random() - 0.5);
    questionsJSON = { results: shuffled.slice(0, totalQuestions) };
    nextQuestion();
    return 0;
}

async function nextQuestion(e){
    document.getElementById('answerList').setAttribute('class', '');
    if(questionNum < totalQuestions-1){
        message.innerHTML = "";
        btnEnable('confirm');
        questionNum = updateQuestionNumber(questionNum);
        questionStartTime = Date.now();

        document.getElementById("vprasanje").innerHTML = questionsJSON.results[questionNum].question;
        const ansList = document.getElementById("answerList");
        while(ansList.firstChild){ 
            ansList.removeChild(ansList.firstChild);
        }        
        answers.length = 0;

        const boolMap = { 'True': 'Benar', 'False': 'Salah' };
        function displayAnswer(val) { return boolMap[val] || val; }

        function addNewAnswer(id){
            let answer = displayAnswer(answers[id]);
            let listItem = document.createElement("li");
            listItem.innerHTML = 
            `<input type="radio" id="answer-${id}" class="radioInput" name="option" value="${id}">
                <label for="answer-${id}" class="ans-label big bold">${answer}</label>
            </input>`;
            listItem.setAttribute('id', `li-${id}`);
            listItem.addEventListener("change", () => {btnEnable('confirm')});    
            ansList.appendChild(listItem);
        }
        answers[0] = questionsJSON.results[questionNum].correct_answer;
        for(let i = 0; i < questionsJSON.results[questionNum].incorrect_answers.length; i++){
            answers[i+1] = questionsJSON.results[questionNum].incorrect_answers[i];
        }

        function shuffle(array) {
            let currentIndex = array.length;
            while (currentIndex != 0) {
                let randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                let temp = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temp;
            }
        }

        if(questionsJSON.results[questionNum].type == 'multiple'){
            shuffle(answers);
        }
        else{
            if(answers[0] == 'False'){
                let temp = answers[0];
                answers[0] = answers[1];
                answers[1] = temp;
            }
        }

        for(let i = 0; i < answers.length; i++){
            addNewAnswer(i);
        }

        btnHide();
    }
    else{
        window.location.replace(`result.html?score=${score}&elapsed=${Math.floor((Date.now()-startTime)/1000)}&${new URLSearchParams(window.location.search).toString()}`);
    }
    return 0;
}

async function confirmAnswer(e){
    let options = document.getElementsByName("option");
    let i;
    chosen = -1;
    for(i = 0; i < options.length; i++){
        if(options[i].checked){
            chosen = i;
        }
    }

    if(answers[chosen] == questionsJSON.results[questionNum].correct_answer){
        document.getElementById('noTimeLeft').style.display = 'none';
        const diffMap = { easy: 60, medium: 45, hard: 30 };
        const diff = new URLSearchParams(window.location.search).get('difficulty') || 'medium';
        const timeLimit = diffMap[diff];
        const timeTaken = (Date.now() - questionStartTime) / 1000;
        const bonus = Math.round(50 * Math.max(0, 1 - timeTaken / timeLimit));
        const newScore = 50 + bonus;
        message.innerHTML = `<span class="big bold">Anda benar! +${newScore} poin (50 dasar + ${bonus} bonus)<span>`;
        document.getElementById(`li-${chosen}`).classList.add('correct');
        score += newScore;
        document.getElementById("scoreNum").innerHTML = score;
        messageBox.style.color = "var(--blue)";
    }
    else{
        wrongAnsDisp();
    }
    disableAnswers();
    return 0;
}
