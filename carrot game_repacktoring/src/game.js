import {Field, ItemType} from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
    win : 'win',
    lose : 'lose',
    cancel : 'cancel',
});

export class GameBuilder {
    gameDuration(duration) {
        this.gameDuration = duration;
        return this;
    }
    carrotCount(num) {
        this.carrotCount = num;
        return this;
    }
    bugCount(num) {
        this.bugCount = num;
        return this;
    }

    build() {
        return new Game(
            this.gameDuration,
            this.carrotCount,
            this.bugCount
        );
    }
}

class Game {
    constructor(gameDuration, carrotCount, bugCount) {
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.started = false;
        this.score = 0;
        this.timer = undefined;

        this.gameTimer = document.querySelector('.game_timer');
        this.gameScore = document.querySelector('.game_score');
        this.gameBtn = document.querySelector('.game_button');
        this.gameBtn.addEventListener('click', (e) => {
            if(this.started) {
                this.stop(Reason.cancel);
            } else {
                this.start();
            }
        });
        
        // 함수를 전달해주기 위해  gameField 클래스를 생성함
        this.gameField = new Field(carrotCount, bugCount);
        this.gameField.setClickListener(this.onItemClick);
    }

    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;  // 외부의 함수 선언을 받아오는 함수
    }

    start() {
        this.started = true;
        this.initGame();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBackground();
    }
    
    stop(reason) {
        this.started = false;
        this.hideGameButton();
        this.stopGameTimer();
        this.onGameStop && this.onGameStop(reason); 
        sound.stopBackground();
        // win이 true일 때 전자, false일 때 후자가 인자가 됨
    }

    // field 클릭 이벤트로 보내줘야 하는 함수
    
    onItemClick = item => {
        let gameEnd;
        if(!this.started) {
            gameEnd = !this.started;
            return gameEnd;
        } 
        if(item === ItemType.carrot) {
            sound.playCarrot();
            this.score++;
            this.updateScoreBoard();
            if(this.score === this.carrotCount) {
                this.stop(Reason.win);
            }
        } else if (item === ItemType.bug) {
            this.stop(Reason.lose);
        } 
    }

     showStopButton() {
        const icon = this.gameBtn.querySelector('.fas');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameBtn.style.visibility = 'visible';
    }
    
     hideGameButton() {
        this.gameBtn.style.visibility = 'hidden';
    }
    
    
     showTimerAndScore() {
        this.gameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }
    
     startGameTimer() {
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);
        this.timer = setInterval(() => {
            if (remainingTimeSec <= 0) {
                clearInterval(this.timer);
                this.stop(this.carrotCount === this.score? Reason.win : Reason.lose); 
                return;
            }
            this.updateTimerText(--remainingTimeSec);
        }, 1000);
    }
    
      stopGameTimer() {
        clearInterval(this.timer);
    }
    
     updateTimerText(time) {
        const minute = Math.floor(time / 60);
        const secound = time % 60;
        this.gameTimer.innerText = `${minute}:${secound}`;
    }
    
     initGame() {
        this.score = 0;
        this.gameScore.innerText = this.carrotCount;
        this.gameField.init(); // gameField를 초기화 해주기 위해 gameField의 함수를 사용
    }
    
      updateScoreBoard() {
        this.gameScore.innerText = this.carrotCount - this.score;
    }
    
}