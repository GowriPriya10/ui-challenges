import '../styles.css';

const images = [
    'https://plus.unsplash.com/premium_photo-1669324357471-e33e71e3f3d8?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1673480195911-3075a87738b0?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1672997189753-ae8f3f7a0fa9?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=3543&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1605496036006-fa36378ca4ab?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

let counter = 0;

function addCarouselImages(images) {
    const carouselWrapper = document.getElementById('carousel');
    images.forEach((img,id) => {
        const slide = document.getElementById('slide').content.cloneNode(true);
        slide.querySelector('.slide > img').src = img;
        slide.querySelector('.slide').style.left = `${id * 100}%`;
        carouselWrapper.querySelector('#slides').appendChild(slide);
    });
    hideArrows();
}

document.getElementById('next').addEventListener('click', () => {
    counter++;
    slideImage();
})

document.getElementById('prev').addEventListener('click', () => {
    counter--;
    slideImage();
})

function slideImage() {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide) => {
        slide.style.transform = `translateX(-${counter * 100}%)`;
    })
    hideArrows();
}

function hideArrows(){
    if(c === 0){
        document.getElementById('prev').hidden = true;
    }
    else if(c === document.querySelectorAll('.slide').length-1){
        document.getElementById('next').hidden = true;
    }else{
        document.getElementById('prev').hidden = false;
        document.getElementById('next').hidden = false;
    }
}

addCarouselImages(images);