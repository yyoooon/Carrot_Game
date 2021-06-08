'use strict';

export default class PopUp {
    constructor() {
        this.popUp = document.querySelector('.pop-up');
        this.popUpRefresh = document.querySelector('.pop-up_refresh');
        this.popUpText = document.querySelector('.pop-up_massage');
        this.popUpRefresh.addEventListener('click', () => {
            //  변수 onClick에 담긴 함수를 이벤트 리스너 함수 안에서 실행한다
            this.onClick && this.onClick();  //  **이거는 내가 할 수 있는 게 아니야 외부에서 가져올게
            this.hide();
        });
    }

    // 인수 onClick을 통해 들어온 외부 함수의 참조 값을 변수 onClick에 저장하는 함수
    // 외부 함수 받아오는 함수
    setClickListener(onClick) {
        this.onClick = onClick;
    }

    // 인수를 받아 팝업창 보여주는 함수
    showWithText(text) {
        this.popUpText.innerText = text;
        this.popUp.classList.remove('pop-up_hide');
    }
    
    // 팝업창 숨기는 함수
    hide() {
        this.popUp.classList.add('pop-up_hide');
    }
}