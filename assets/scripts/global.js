let data, questionNum = -1, score = 0, chosen, questionsJSON;
const startTime = Date.now();

const message = document.getElementById("message");
const messageBox = document.getElementById("messageBox");
const newBox = document.getElementById('newBox');
const mainButton = document.getElementById('mainButton');
const answers = [];

const totalQuestions = 10;
let questionStartTime = null;
