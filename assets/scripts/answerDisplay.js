function disableAnswers(){
    let options = document.getElementsByName("option");
    let labels = document.getElementsByClassName(`ans-label`);
    for(let x = 0; x < options.length; x++){
        document.getElementById(`answer-${x}`).disabled = true;
        labels[x].style.cursor = 'not-allowed';
    }
    btnEnable('next');
}

function tooSlow(){
    messageBox.style.color = "var(--red)";
    chosen = 'none';
    wrongAnsDisp();
    document.getElementById('noTimeLeft').style.display = 'block';
    document.getElementById('answerList').setAttribute('class', 'outOfTimeTrans');
    disableAnswers();
}

function updateQuestionNumber(x){
    x++;
    document.getElementById("questionNum").innerHTML = x + 1; 
    return x;
}

function wrongAnsDisp(){
    if(chosen != 'none'){
        document.getElementById(`li-${chosen}`).classList.add('wrong');
    }
    document.getElementById('noTimeLeft').style.display = 'none';
    const boolMap = { 'True': 'Benar', 'False': 'Salah' };
    const correctDisplay = boolMap[questionsJSON.results[questionNum].correct_answer] || questionsJSON.results[questionNum].correct_answer;
    message.innerHTML = `Jawaban yang benar adalah <span class="big extraBold">${correctDisplay}</span>`;
    messageBox.style.color = "var(--red)";
}
