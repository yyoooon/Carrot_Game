'use strict';

// 필드 아이템 배치, 클릭 시 동작 관련 
const CARROT_SIZE = 80;

export const ItemType = Object.freeze({
    carrot: 'carrot',
    bug: 'bug',
  });

export class Field {
    constructor(carrotCount, bugCount) {
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game_field');
        this.fieldRect = this.field.getBoundingClientRect();
        this.field.addEventListener('click', this.onClick);
    }
    
    // 외부 코드 담는 함수
    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }

    // 게임 시작 시 필요 - 외부에 필요
    init() {
        this.field.innerHTML = '';
        this._addItem('carrot', this.carrotCount, './img/carrot.png');
        this._addItem('bug', this.bugCount, './img/bug.png');
    }

    // init() 실행 시에만 필요
    _addItem(className, count, imgPath) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - CARROT_SIZE;
        const y2 = this.fieldRect.height - CARROT_SIZE;
        for (let i = 0; i < count; i++) {
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';
            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
    }

    // field 클릭 이벤트 시 필요
    onClick = event => {
        const target = event.target;
        if(target.matches('.carrot')) {
            let gameEnd = this.onItemClick && this.onItemClick(ItemType.carrot);
            if(gameEnd) return;
            target.remove();
            // 나머지 기능은 외부에서 받아옴 
            // 인수를 넣어 인수가 무엇인지에 따라(조건) 가져오는 코드가 달라지게 함
        } else if (target.matches('.bug')) {
            this.onItemClick && this.onItemClick(ItemType.bug); 
            // 나머지 기능은 외부에서 받아옴
            // 인수를 넣어 인수가 무엇인지에 따라(조건) 가져오는 코드가 달라지게 함
        } 
    }
}

// field와 무관한 다용도 함수 -> 클래스 밖에다 써준다
function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}
