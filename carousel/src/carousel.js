export default class Carousel {
    constructor(images, duration = 2000) {
        this.images = images;
        this.activeSlide = 0;
        this.autoPlay = null;
        this.duration = duration;

        this.constructCarousel();
        this.initListeners();
    }

    constructCarousel(){
        const carouselWrapper = document.getElementById('carousel');
        this.images.forEach((img,id) => {
            const slide = document.getElementById('slide').content.cloneNode(true);
            slide.querySelector('.slide > img').src = img;
            slide.querySelector('.slide').style.left = `${id * 100}%`;
            carouselWrapper.querySelector('#slides').appendChild(slide);
        });
    }

    initListeners(){
        this.prevListener();
        this.nextListener();
        this.autoPlayListener();
        this.pauseListener();
    }
    
    slideImage() {
        const slides = document.querySelectorAll('.slide');
        slides.forEach((slide) => {
            slide.style.transform = `translateX(-${this.activeSlide * 100}%)`;
        })
    }

    prevListener() {
        const prev = document.getElementById('prev');
        prev.addEventListener('click', () => {
            if(this.activeSlide < 1) {
                this.activeSlide = document.querySelectorAll('.slide').length;
            }
            this.activeSlide--;
            this.slideImage();
        });
    }

    nextListener() {
        const next = document.getElementById('next');
        next.addEventListener('click', () => {
            if(this.activeSlide === document.querySelectorAll('.slide').length-1) {
                this.activeSlide = -1;
            }
            this.activeSlide++;
            this.slideImage();
        })
    }

    autoPlayListener() {
        const play = document.getElementById('play'); 
        play.addEventListener('click', () => {
            this.autoPlay = setInterval(() => {
                if(this.activeSlide === document.querySelectorAll('.slide').length-1) {
                    this.activeSlide = -1;
                }
                this.activeSlide++;
                this.slideImage();
            }, this.duration);
        })
    }

    pauseListener() {
        const pause = document.getElementById('pause');
        pause.addEventListener('click', () => {
            clearInterval(this.autoPlay);
        });
    }
}
