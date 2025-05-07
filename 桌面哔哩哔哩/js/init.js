//初始化 计算图片位置

class Wallpaper {
    constructor() {
        if (Wallpaper.instance) return Wallpaper.instance
        this.img = null;    //图片对象
        this.bgLeft = document.querySelector('.bgLeft')
        this.bgRight = document.querySelector('.bgRight')
        this.bgWrap = document.querySelector('.bgWrap')
        this.init()
        Wallpaper.instance = this;
    }

    init() {
        this.img = new Image()
        this.img.src = './assets/bg.jpg'
        this.img.onload = () => {
            // 如果图片比例>=屏幕，不用处理
            if (this.bgWrap.clientHeight / this.bgWrap.clientWidth >= this.img.height / this.img.width) {
                // 两个图片水平的和是屏幕的一半即可对齐
                let offset = (this.img.height * this.bgWrap.clientHeight / this.bgWrap.clientWidth - this.bgWrap.clientWidth) / 2
                console.log(this.img.height * this.bgWrap.clientHeight / this.bgWrap.clientWidth ,this.bgWrap.clientWidth)
                offset=0
                this.bgLeft.style.backgroundPosition = `${offset}px center `
                this.bgRight.style.backgroundPosition = `${offset - this.bgLeft.clientWidth}px center `
                this.bgLeft.style.backgroundSize = this.bgRight.style.backgroundSize = "auto 100%"

            } else {
                // 如果图片比例<屏幕，则图片宽度应该是两倍屏幕宽
                this.bgLeft.style.backgroundSize = this.bgRight.style.backgroundSize = "200% auto"
                this.bgLeft.style.backgroundPosition = `left center `
                this.bgRight.style.backgroundPosition = `right center `
            }

        }
        this.img.onerror = function (err) {
            console.log(err, '图片加载出错')
        }

    }
}
let wallpaper = new Wallpaper()
window.addEventListener('resize', () => wallpaper.init())