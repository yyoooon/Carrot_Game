
export default class Field {
    constructor(carrotNum, bugNum) {
        this.carrotNum = carrotNum; // 인수도 받아서 직접 넣어줘야 한다
        this.bugNum = bugNum;
        this.ITEM_SIZE = 80;

        this.field = document.querySelector('.game_field');
        this.fieldRect = this.field.getBoundingClientRect();  // *엘리먼트의 크기, 위치 값 알 수 있는 함수
        this.field.addEventListener('click', this.onClickField);
    }

    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }

    init() {
        this.field.innerHTML = "";
        this._addItem('carrot', this.carrotNum, './img/carrot.png');
        this._addItem('bug', this.bugNum, './img/bug.png');
    };
    
    _addItem(className, number, img) {
        this.x1 = 0;
        this.x2 = this.fieldRect.width - this.ITEM_SIZE;
        this.y1 = 0;
        this.y2 = this.fieldRect.height - this.ITEM_SIZE;
    
        for(let i = 0; i < number; i++) {
            this.item =  document.createElement('img');
            this.item.setAttribute('src',img);
            this.item.setAttribute('class', className);
            this.item.style.left = `${randomNumber(this.x1, this.x2)}px`;
            this.item.style.top = `${randomNumber(this.y1, this.y2)}px`; // *px꼭 붙여야 함 
            this.field.appendChild(this.item);
        }
    }

    onClickField = (e) => {
    let target = e.target;
    if (target.matches('.carrot')) { // 요소에 해당 클래스가 있는지 판별해 줌
        this.gameState = this.onItemClick && this.onItemClick('carrot');
        if(this.gameState === false) return;
        // 공통코드 + 인자가 carrot일 때의 코드들
        target.remove();
        } else if  (target.matches('.bug')) {
            this.onItemClick && this.onItemClick('bug');
        // 공통 코드 + 인자가 bug일 때의 코드들
        }
    }
}

function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

// 각 여러 클래스의 코드가 엮여저 있는 함수는 그 함수가 어떤 클래스에 더 주된지 생각해보고
// 주된 클래스의 함수에  타 클래스의 필요한 코드 묶음(함수)를 넣어준다