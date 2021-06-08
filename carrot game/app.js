const playBtn = document.querySelector('.play_btn');
const timer = document.querySelector('.timer');
let carrots = document.querySelector('.carrots');
let bugs = document.querySelector('.bugs');
let counter = document.querySelector('.counter');
let back = document.querySelector('.background');

const bug_pull = document.querySelector('#bug_pull');
const carrot_pull = document.querySelector('#carrot_pull');
const game_win = document.querySelector('#game_win');
const game_lose = document.querySelector('#game_lose');
const back_music = document.querySelector('#back_music');




//----------------function------------------//

// ----타이머 카운트 함수---- //
let timerInitNum = 10;
let timerCounter;
let time;
function timerFunc() {
    // 함수 실행 시 마다 1씩 줄어듦
    timerCounter -= 1;

    // 초가 바뀜에 따라 변화하는 것들
    if (timerCounter === 0) {
        // 졌을 때
        if(num_counter > 0) {
            clearInterval(time);
            createPopup(lost);
            game_lose.play();
        } 
    } else {
        // 이겼을 때
        if(num_counter === 0) {
            clearInterval(time);
            createPopup(won);
            game_win.play();
        } 
    }

    if (timerCounter >= 0) {
    timer.innerHTML = `<span>0:${timerCounter}</span>`;
        }
    // *변수가 바뀌는 곳에서 변화 사항을 정해야 함*//
}


// ----랜덤 함수---- //
function getRandomInt(min, max) { 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

// ----당근 생성 함수---- //
let id = 0;
function createCarrot() {
    // 생성
    const carrot = document.createElement('li');
    carrot.setAttribute('class','carrot');
    carrot.setAttribute('data-id',id);
    carrot.innerHTML = `<img src="./img/carrot.png" alt="" data-id = ${id}>`;
    carrots.appendChild(carrot);
    // 배치
    rendomX = getRandomInt(1, 670);
    rendomY = getRandomInt(1, 120);
    carrot.style.transform = `translateX(${rendomX}px) translateY(${rendomY}px)`;
    id++;
    return carrot;
}

// ----벌래 생성 함수---- //
function createBug() {
    // 생성
    const bug = document.createElement('li');
    bug.setAttribute('class','bug');
    bug.innerHTML = '<img src="./img/bug.png" alt="">';
    bugs.appendChild(bug);
    // 배치 
    rendomX = getRandomInt(1, 670);
    rendomY = getRandomInt(1, 120);
    bug.style.transform = `translateX(${rendomX}px) translateY(${rendomY}px)`;
    return bug;
}

// ----당근 벌래 배치 함수---- //
function randomPosition() {
    for( let i = 0; i < 10; i++ ) {
        createCarrot();
        createBug();
    }
}

// ----팝업 창 생성 함수---- //
const won = 'You Won';
const lost = 'You Lost';
const replay = 'Replay?';
function createPopup(text) {
    backMusicPalse();
    
    const popup = document.createElement('div');
    popup.setAttribute('class', 'popup');
    popup.innerHTML = `
    <button type="button"  class = "replay_btn"></button>
    <span>${text}</span>
    `;
    back.appendChild(popup);
    playBtn.style.opacity = '0';
 
    // 다시 시작 버튼 이벤트
    popup.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON'){
            // 게임시작
            gameStart();
            // 팝업창 지우기
            playBtn.style.opacity = '100%';
            popup.remove();
        };
    })
    return popup;
}

//----배경 음악 재생 함수----//
function backMusicPlay() {
    back_music.play();
    back_music.autoplay = true;
    back_music.loop = true;
};

//----배경 음악 중지 함수----//
function backMusicPalse() {
    back_music.pause();
    back_music.currentTime = 0;
}



//----게임 시작----//
function gameStart() {
    // 배경 음악
    backMusicPlay();

    // 타이머 시작
    timerCounter = timerInitNum;
    clearInterval(time);
    timer.innerHTML = `<span>0:${timerCounter}</span>`;
    time = setInterval('timerFunc()', 1000);

    // 카운트 리셋
    num_counter = 10;
    counter.innerHTML = `<span>10</span>`;
    
    // 기존 벌레, 당근 리셋 + 배치
    lostCarrots = document.querySelectorAll('.carrot');
    lostBugs = document.querySelectorAll('.bug');
    lostCarrots.forEach(function (carrot) {carrot.remove();});
    lostBugs.forEach(function (bug) {bug.remove();});
    randomPosition();
}

/*뭘 실행하기 전에 리셋을 먼저 해준다*/


//----------------event------------------//

// ----시작 버튼 누를 시----  //
let clickNum = 0;
playBtn.addEventListener('click', (e) => {
    // 버튼이 한 번 이상 눌렸을 시에는 팝업창
    if(clickNum > 0) {
        clearInterval(time);
        createPopup(replay);
        return;
    }
    clickNum++;
    // 버튼 이미지 바뀌기
    playBtn.classList.add('restart_btn');
    // 게임 시작
    gameStart();
})

// ----당근 클릭 시---- //
let num_counter = 10;
carrots.addEventListener('click', (e) => {
    // 효과음
    carrot_pull.play();
    //  당근 삭제
    const dataId = e.target.dataset.id;
    if (dataId) {
        const del_carrot = document.querySelector(`.carrot [data-id = "${dataId}"]`);
        del_carrot.remove();
    
    // 숫자 카운터
    num_counter--;
    counter.innerHTML = `<span>${num_counter}</span>`;
    
}});

// ---- 벌래 클릭 시---- // 
bugs.addEventListener('click', (e) => {
    bug_pull.play();
    clearInterval(time);
    const popup = document.querySelector('.popup');
    if(popup === null)  createPopup(lost);
});

