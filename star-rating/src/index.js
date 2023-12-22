import '../styles.css';

const starsContainer = document.getElementById('stars-container');

function loadRatingWidget(maxRating){
    for(let i = 0; i < maxRating; i++){
        const star = document.getElementById('star').content.cloneNode(true);
        star.querySelector('.star').id = `star-${i+1}`;
        starsContainer.appendChild(star);
    }
}

starsContainer.addEventListener('click', (e) => {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star) => {
        star.style.color = 'grey';
    });
    const rating = Math.abs(e.target.id.split('-')[1] - stars.length) + 1;
    console.log(rating);
    const reversedStars = Array.from(stars).reverse();
    console.log(reversedStars);
    for(let i = 0; i < rating; i++){
        reversedStars[i].style.color = 'gold';
    }

    document.getElementById('rating').textContent = `Rating: ${rating}/${stars.length}`;
})

loadRatingWidget(5);
