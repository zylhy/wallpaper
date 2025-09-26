class Wallpaper {
    #img = null;
    #imgSrc = 'assets/bg.jpg';
    #bgLeft = null;
    #bgRight = null;
    #bgWrap = null;
    #triggerArea = null;
    #triggerAreaSize = 50;
    #resizeTimer = null;
    #contentWidth = 200;
    #content = null;
    static instance = null;

    constructor(option) {
        if (Wallpaper.instance) return Wallpaper.instance;
        this.#contentWidth = option?.contentWidth ?? this.#contentWidth;
        this.#imgSrc = option?.imgSrc ?? this.#imgSrc;
        this.#triggerAreaSize = option?.triggerAreaSize ?? this.#triggerAreaSize;
        this.#bgLeft = document.querySelector('.bgLeft');
        this.#bgRight = document.querySelector('.bgRight');
        this.#bgWrap = document.querySelector('.bgWrap');
        this.#triggerArea = document.querySelector('.triggerArea');
        this.#content = document.querySelector('.content');
        if (!this.#bgLeft || !this.#bgRight || !this.#bgWrap || !this.#triggerArea||!this.#content) {
            throw new Error('Wallpaper 初始化失败，DOM 元素缺失');
        }
        this.init();
        Wallpaper.instance = this;
    }
    #onResize = () => {
        clearTimeout(this.#resizeTimer);
        this.#resizeTimer = setTimeout(() => {
            this.#setImage();
        }, 100);
    }

    async init() {

        if (!this.#img) {
            try {
                await this.#loadImg();
            } catch (err) {
                console.warn('图片加载失败:', err);
                return;
            }
        }
        this.#setImage();
        window.addEventListener('resize', this.#onResize);
        this.#content.style.width = `${this.#contentWidth}px`;
        this.#expandContent();
    }

    #loadImg() {
        return new Promise((resolve, reject) => {
            this.#img = new Image();
            this.#img.src = this.#imgSrc;
            this.#img.onload = () => resolve();
            this.#img.onerror = reject;
        });
    }

    #setImage() {
        const wrapRatio = this.#bgWrap.clientHeight / this.#bgWrap.clientWidth;
        const imgRatio = this.#img.height / this.#img.width;

        if (wrapRatio >= imgRatio) {
            const scaledWidth = this.#bgWrap.clientHeight * this.#img.width / this.#img.height;
            const offset = -(scaledWidth - this.#bgWrap.clientWidth) / 2;
            this.#bgLeft.style.backgroundPosition = `${offset}px center`;
            this.#bgRight.style.backgroundPosition = `${offset - this.#bgLeft.clientWidth}px center`;
            this.#bgLeft.style.backgroundSize = this.#bgRight.style.backgroundSize = "auto 100%";
        } else {
            this.#bgLeft.style.backgroundSize = this.#bgRight.style.backgroundSize = "200% auto";
            this.#bgLeft.style.backgroundPosition = "left center";
            this.#bgRight.style.backgroundPosition = "right center";
        }
        this.#bgLeft.style.backgroundImage = `url('${this.#imgSrc}')`;
        this.#bgRight.style.backgroundImage = `url('${this.#imgSrc}')`;
    }
    #expandContent() {
        this.#triggerArea.addEventListener('mouseenter', (e) => {
            this.#bgLeft.style.transform = `translateX(-${this.#contentWidth / 2}px)`;
            this.#bgRight.style.transform = `translateX(${this.#contentWidth / 2}px)`;
            this.#triggerArea.style.width = `${this.#contentWidth}px`;
            this.#triggerArea.style.pointerEvents = `none`;

        })
        // this.#triggerArea.addEventListener('mouseleave', (e) => {
        //     this.#bgLeft.style.transform = `translateX(0)`;
        //     this.#bgRight.style.transform = `translateX(0)`;
        //     this.#triggerArea.style.width = `${this.#triggerAreaSize}px`;
        // })
    }
    destroy() {
        window.removeEventListener('resize', this.#onResize);
        Wallpaper.instance = null;
    }
}
let wallpaper = new Wallpaper()




