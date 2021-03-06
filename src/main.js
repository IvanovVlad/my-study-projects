class Swipe {
    constructor(element) {
        this.xDown = null;
        this.yDown = null;
        this.element = element;

        this.element.addEventListener('touchstart', function (evt) {
            this.xDown = evt.touches[0].clientX;
            this.yDown = evt.touches[0].clientY;
        }.bind(this), false);
    }

    onLeft(callback) {
        this.onLeft = callback;
        return this;
    }

    onRight(callback) {
        this.onRight = callback;
        return this;
    }

    handleTouchMove(evt) {
        if (!this.xDown || !this.yDown) {
            return;
        }

        let xUp = evt.touches[0].clientX;
        let yUp = evt.touches[0].clientY;

        this.xDiff = this.xDown - xUp;
        this.yDiff = this.yDown - yUp;

        if (Math.abs(this.xDiff) > Math.abs(this.yDiff)) {
            if (this.xDiff > 0) {
                this.onLeft();
            } else {
                this.onRight();
            }
        } 

        this.xDown = null;
        this.yDown = null;
    }

    run() {
        this.element.addEventListener('touchmove', function (evt) {
            this.handleTouchMove(evt).bind(this);
        }.bind(this), false);
    }
}

class ProjectsHolder {
    constructor(node) {
        this.node = node;
        this.tiles = node.querySelectorAll('.tile');
        this.displayNodeId = 0;
        this.initButtons();
        this.initSwipes();
        this.clearContent();
        this.displayNode();
    }

    initSwipes() {
        this.Swipe = new Swipe(this.node.querySelector('.content'));
        this.Swipe.onLeft = () => this.node.lastElementChild.click();
        this.Swipe.onRight = () => this.node.firstElementChild.click();
        this.Swipe.run();
    }

    initButtons() {
        this.node.firstElementChild.onclick = () => {
            this.displayNodeId === 0 ?
                this.displayNodeId = this.tiles.length - 1 : this.displayNodeId -= 1;
            this.clearContent();
            this.displayNode();
        }

        this.node.lastElementChild.onclick = () => {
            this.displayNodeId === this.tiles.length - 1 ?
                this.displayNodeId = 0 : this.displayNodeId += 1;
            this.clearContent();
            this.displayNode();
        }
    }

    clearContent() {
        this.tiles.forEach(tile => tile.style.display = 'none');
    }

    displayNode() {
        this.tiles[this.displayNodeId].style.display = 'grid';
    }
}

const htmlHolder = new ProjectsHolder(document.querySelector('#html-css'));
const jsHolder = new ProjectsHolder(document.querySelector('#js'));

function showIFrame(link, mobileWidth) {
    document.querySelector('.wrapper').style.display = 'none';

    const frameWrapper = document.querySelector('.iframe-wrapper');
    frameWrapper.style.display = 'block';
    frameWrapper.style.width = '1320px';
    document.querySelector('#iframe').src = link;

    document.querySelector('#mode-button').onclick = (e) => {
        const text = e.target.innerText;
        if (text.toUpperCase() === 'MOBILE') {
            frameWrapper.style.width = mobileWidth + 'px';
            e.target.innerText = 'Desktop';
        } else {
            frameWrapper.style.width = '1320px';
            e.target.innerText = 'Mobile';
        }
        
    }

    document.querySelector('#back-button').onclick = () => {
        document.querySelector('.wrapper').style.display = 'block';
        document.querySelector('.iframe-wrapper').style.display = 'none';
    }
}

document.querySelector('#html-css #theyalow').onclick = () => {
    showIFrame('https://my-theyalow.netlify.com', 640);
}

document.querySelector('#html-css #repair').onclick = () => {
    showIFrame('https://my-repair-design-project.netlify.com', 375);
}
