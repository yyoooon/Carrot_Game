'use strict';
import PopUp from './popup.js';
import {GameBuilder,  Reason } from './game.js';
import * as sound from './sound.js';

// popup / game(+field)

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
    .gameDuration(10)
    .carrotCount(10)
    .bugCount(10)
    .build();
game.setGameStopListener((reason) =>{
    let message;
    switch (reason) {
        case Reason.cancel:
            message = 'Replay?';
            sound.playAlert();
            break;
        case Reason.win:
            message = 'YOU WON';
            sound.playWin();
            break;
        case Reason.lose:
            message = 'YOU LOST';
            sound.playBug();
            break;
            default:
                throw new Error('not valid reason');
    }
    gameFinishBanner.showWithText(message);
});
// 들어오는 인수에 따라 팝업창을 맞춰 띄워주는 함수

gameFinishBanner.setClickListener( ()=>{
    game.start();
})








