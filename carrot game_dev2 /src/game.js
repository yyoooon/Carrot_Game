
import Field from './field.js';
import *as sound from  './sound.js'; // export한 함수들만 모두 import됨

export const Reason = Object.freeze({
    win : 'win',
    lose : 'lose',
    cancel : 'cancel',
})

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
    constructor(carrotNumber,bugNumber,gameDuration) {
        this.CARROT_NUMBER = carrotNumber;
        this.BUG_NUMBER = bugNumber;
        this.GAME_DURATION_SEC = gameDuration;

        this.gameTimer = document.querySelector('.game_timer');
        this.gameScore = document.querySelector('.game_score');
        this.gameBtn = document.querySelector('.game_button');
        this.gameBtn.addEventListener('click', (e) => {
            if(this.started) { 
            // 초기값 상관 없이 조건문은 true일 때만 실행되니 
            //비교 연산자는 생략해도 된다
                this.finish(Reason.cancel);
            } else {
                this.start();
            }
        })

        this.started = false; // *게임이 진행 중인지의 여부 - 처음엔 진행중이 아니어서 false
        this.score = 0;
        this.timer = undefined;

        this.field = new Field(this.CARROT_NUMBER, this.BUG_NUMBER);
        // 아이템 갯수 같은 것은 게임에 직접적으로 영향을 끼치니까 gameclass에 넣어주고
        // 다른 클래스에 필요할 때 인수로 받아서 넘겨주는 것이 더 적절하다
        this.field.setClickListener(this.onItemClick); // 나 얘 좀 가져갈게~
        // 함수 이름으로 전달해줘도 됨 -> 어짜피 실행은 전해진 클래스에서 되니까
        // main.js에 있을 때와 달리 클래스로 만들어줬을 때, 함수를 인수로 전해주게되면
        // 해당 함수 안의 this가 불러준 요소에게 할당된다 = 화살표 함수로 만들어주기
    }

     setGameStopListener(onGameStop) {
         this.onGameStop = onGameStop;
     }
 
     start = () => {
        this.started = true;
        this.initGame();
        this.showStopBtn();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBg();
    }
    
     finish(reason) {
        this.started = false;
        this.stopGameTimer();
        this.hideGameButton();
        this.onGameStop && this.onGameStop(reason);
        sound.stopBg();
        }
        // 조건을 걸어 가져오는 것을 아예 처음부터 조건에 맞는 것만
        // 가져오게 할 수 있다 => setListner(인수)

    // 필요한 코드 묶음을 보내주는 것
    // 인자를 보내주면 한 함수 안에서 조건에 맞는 코드만 골라갈 수 있다
    onItemClick = (item) => {
        if (!this.started) {
            return false;
        }
        if (item === 'carrot') { // 요소에 해당 클래스가 있는지 판별해 줌
            sound.playCarrot();
            this.score++;
            this.gameScore.innerText = this.CARROT_NUMBER - this.score;
            if(this.CARROT_NUMBER === this.score) {
                this.finish(Reason.win);
            }
        } else if  (item === 'bug') {
            this.finish(Reason.lose);
        }
    }
    
     showStopBtn() {
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
        let TimeRemaining = this.GAME_DURATION_SEC;
        this.showTimeRemaining(TimeRemaining);
        this.timer = setInterval( () => {
            if(TimeRemaining <= 0) {
                clearInterval(this.timer);
                if(this.CARROT_NUMBER != this.score) {
                    this.finish(Reason.lose);
                }
                return;
            }
            this.showTimeRemaining(--TimeRemaining); 
            // --의 위치 중요* 뒤에 놓을 경우 값이 빠지고나서 함수가 실행되는 것이 아니라(5,4,3...)
            // 함수가 실행되고나서 값이 빠진다(5,5,4,3...)
        }, 1000);
    }
    
     stopGameTimer() {
        clearInterval(this.timer);
    }
    
     showTimeRemaining(time) {
        const minute = Math.floor(time / 60);
        const sec = time % 60;
        this.gameTimer.innerText = `${minute}:${sec}`;
    }
    
    initGame() {
        this.setScore();
        this.field.init();
    };
    
     setScore() {
        this.score = 0;
        this.gameScore.textContent = this.CARROT_NUMBER;
    }
    
}