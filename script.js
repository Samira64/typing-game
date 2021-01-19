const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementsByClassName('settings-btn')[0];
const settings = document.getElementById('settings');
const difficultySelectBox = document.getElementById('difficulty');

// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
]

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Difficulty
let difficulty = localStorage.getItem('difficulty') !== null ? 
localStorage.getItem('difficulty') : 'medium';

// Set difficulty select  value
difficultySelectBox.value = difficulty;

// Focus on text input
text.focus();

// Update time every second
const timeInterval = setInterval(function(){
  time--;
  timeEl.innerHTML = time + 's';
  if (time === 0) {
    gameOver();
  }  
}, 1000);

// Handle game over
function gameOver() {
  clearInterval(timeInterval);

  timeEl.innerHTML = 10 + "s";

  endgameEl.innerHTML = `
    <h1>You have lost!</h1>
    <p>Your final score is ${score}.</p>
    <button onclick="location.reload()">Play again</button>`;

  endgameEl.style.display = "flex";
}

// Generate random word from array
function getRandomWord() {
	return words[Math.floor(Math.random() * words.length)];
}

// Add the word to DOM
function addWordToDOM() {
	randomWord = getRandomWord();
	word.innerHTML = randomWord;
}

// Update score
function updateScore() {
	score++;
	scoreEl.innerHTML = score;
}

addWordToDOM();

// Event listeners
text.addEventListener('input', e => {
	const insertedText = e.target.value;
	console.log(insertedText);
	if (insertedText === randomWord) {
		addWordToDOM();

		updateScore();

		// Clear
		e.target.value = "";

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3
    } else {
      time += 5;
    }
	}
})

// Settings btn click  
settingsBtn.addEventListener('click', () => {
  console.log(event.target);
  settings.classList.toggle('hide');
});

// Settings select
settings.addEventListener('change', (e) => {
  difficulty = e.target.value;

  localStorage.setItem("difficulty", difficulty);
} )











