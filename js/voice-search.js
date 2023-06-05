const searchInput = document.querySelector(".form-control");
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var grammar = "#JSGF V1.0;";
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = "en-US";
recognition.interimResults = false;

recognition.onresult = function (event) {
  var last = event.results.length - 1;
  var command = event.results[last][0].transcript;
  if (command == "dark") {
    document.body.classList.toggle("dark");
  } else {
    search = command;
    searchInput.value = command;
    handleSearch();
  }
  
};

recognition.onspeechend = function () {
  recognition.stop();
};

searchInput.addEventListener("click", function () {
  console.log("working");
});
// document.querySelector('#btnGiveCommand').addEventListener('click', function() {
//   recognition.start();
// });

const btnGiveCommand = document.querySelector("#voice-search");
let isListening = false;

btnGiveCommand.addEventListener("click", function () {
  if (isListening) {
    stopListening();
  } else {
    startListening();
  }
});

function startListening() {
  recognition.start();
  isListening = true;
  btnGiveCommand.classList.add("button-active");
}

function stopListening() {
  recognition.stop();
  isListening = false;
  btnGiveCommand.classList.remove("button-active");
}

recognition.onstart = function () {
  console.log("Speech recognition started");
};

recognition.onend = function () {
  console.log("Speech recognition ended");
  stopListening();
};
