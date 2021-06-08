
// 함수 만들기 //
// 1. 게임 필드 만들기 - 벌래, 당근 랜덤 배치 o
// 2. 게임 시작하기 o
// 3. 게임 타이머 시작하기
// 4. 아이템 클릭 로직
// 5. 게임 종료
// 6. 팝업 
// 7. 사운드 추가
// 8. 마무리하기

// 리팩토링 //
// 음악 파일 만들기
// gameclass 빌더 만들어주기
// 텍스트들 변수 만들어주기
import *as sound from  './sound.js';
import {GameBuilder, Reason } from './game.js'
const game = new GameBuilder()
    .gameDuration(5)
    .carrotCount(5)
    .bugCount(5)
    .build();

import PopUp from './popup.js';
const gameFinishBanner = new PopUp();

gameFinishBanner.setClickListener(game.start); 
game.setGameStopListener((reason)=> { 
    // 함수를 있는 그대로 실행시킬거면 주소만 보내도 되지만
    // 인수를 넣거나 해서 실행시켜야 하면 + 전해주려는 함수에 대한 조건의 코드를 더 추가하려면
    // 함수실행 코드와 그 외의 코드들을 익명함수 안에 넣어서 보내야한다
    let message;
    switch (reason) {
        case Reason.cancel:
            message = 'Replay?';
            sound.playAlert();
            break;
        case Reason.win:
            message =  'YOU WON';
            sound.playWin();
            break;
        case Reason.lose:
            message = 'YOU LOST';
            sound.playBug();
            break;
            default:
                throw new Error('not valid reason'); // 모든 경우 다 아니면
    }
    gameFinishBanner.popupWithText(message);
});
// 팝업창에 대한 코드를 보내줄 때 애초에 조건에 따라 해당하는 코드가 전달되도록 했다



// import를 해준 곳에서만 해당 클래스를 쓸 수 있기 때문에
// main.js에서 각 클래스를 import해주고 
// 각각의 setListner함수를 통해 교환해준다






