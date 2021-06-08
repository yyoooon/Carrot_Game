// 상수
const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

// section1
const field = document.querySelector('.game_field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game_button');
const gameTimer = document.querySelector('.game_timer');
const gameScore = document.querySelector('.game_score');

// section2
const popUp = document.querySelector('.pop-up');
const popUpRefresh = document.querySelector('.pop-up_refresh');
const popUpText = document.querySelector('.pop-up_massage');

// sound
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

// 전역 변수 - 게임 전체를 관장하는 값들
let started = false;
let score = 0;
let timer = undefined;


// 이벤트 리스너 - 클릭되는 것들만
field.addEventListener('click', onFieldClick);
gameBtn.addEventListener('click', (e) => {
    if(started) {
        stopGame();
    } else {
        startGame();
    }
});
popUpRefresh.addEventListener('click', () => {
    startGame();
    hidePopup();
})

// 함수 - 큰 기능 ~ 작은 기능 순서
function startGame() {
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    playSound(bgSound);
}

function stopGame() {
    started = false;
    stopGameTimer();
    hideGameButton();
    showPopUpWithText('REPLAY?');
    playSound(alertSound);
    stopSound(bgSound);
}

function finishGame(win) {
    started = false;
    hideGameButton();
    if(win) {
        playSound(winSound);
    }else {
        playSound(bugSound);
    }
    stopGameTimer();
    stopSound(bgSound);
    showPopUpWithText(win ? 'YOU WON' : 'YOU LOST'); 
    // win이 true일 때 전자, false일 때 후자가 인자가 됨
}


function showStopButton() {
    const icon = gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    gameBtn.style.visibility = 'visible';
}

function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
}


function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(CARROT_COUNT === score); // 시간이 다 됐을 때 발동
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000);
}

//졌을 때1 - 벌래 클릭
// 졌을 때 2 - 시간이 다 되었을 때 기존 당근 수와 점수가  다를 때
// 이겼을 때 - 당근 다 클릭

function  stopGameTimer() {
    clearInterval(timer);
}

function updateTimerText(time) {
    const minute = Math.floor(time / 60);
    const secound = time % 60;
    gameTimer.innerText = `${minute}:${secound}`;
}

function showPopUpWithText(text) {
    popUpText.innerText = text;
    popUp.classList.remove('pop-up_hide');
}

function hidePopup() {
    popUp.classList.add('pop-up_hide');
}

function initGame() {
    score = 0;
    field.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;
    // 벌레와 당근을 생성한 뒤 field에 추가해줌
    addItem('carrot', CARROT_COUNT, './img/carrot.png');
    addItem('bug', BUG_COUNT, './img/bug.png');
}

function onFieldClick(event) {
    if(!started) {
        return;
    } // started가 false(시작 전)일 땐 참이되어 클릭되지 않고
      //  started가 true(시작 후)일 땐 거짓이 되어 밑의 코드를 실행한다 
    const target = event.target;
    if(target.matches('.carrot')) {
        target.remove();
        score++;
        playSound(carrotSound);
        updateScoreBoard();
        if(score === CARROT_COUNT) {
            finishGame(true); // 시간이 다 되지 않았을 때 발동
        }
    } else if (target.matches('.bug')) {
        finishGame(false);
    } 
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}

function  updateScoreBoard() {
    gameScore.innerText = CARROT_COUNT - score;
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

