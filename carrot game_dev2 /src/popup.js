
export default class popUp {
    constructor() {
        this.popUp = document.querySelector('.pop-up');
        this.popUpRefresh = document.querySelector('.pop-up_refresh');
        this.popUpMessage = document.querySelector('.pop-up_massage');
        this.popUpRefresh.addEventListener('click', () => {
            this.onClick && this.onClick();
            this.hide();
        })
    }

    setClickListener(onClick) {
        this.onClick = onClick;
    }

    popupWithText=(text) => {
        this.popUp.classList.remove('pop-up_hide');
        this.popUpMessage.innerText = text;
    }

    hide() {
        this.popUp.classList.add('pop-up_hide');
    }
}