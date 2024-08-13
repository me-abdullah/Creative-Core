// Select elements
let circle = document.querySelector('.circle-patch');
let slider = document.querySelector('.slider-patch');
let list = document.querySelector('.list-patch');
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let items = document.querySelectorAll('.list-patch .item-patch');
let count = items.length; // This will be 9
let active = 0; // Start with the first item
let interval = 3000; // Change slide every 3 seconds

// Function to run the carousel
function runCarousel() {
    // Show or hide navigation buttons based on the active item
    prev.style.display = (active === 0) ? 'none' : 'block';
    next.style.display = (active === count - 1) ? 'none' : 'block';

    // Remove active class from old item and add to new item
    let old_active = document.querySelector('.item-patch.active');
    if (old_active) old_active.classList.remove('active');
    items[active].classList.add('active');

    // Calculate the transform value
    let width_item = items[0].offsetWidth; // Use a fixed item width to ensure consistency
    let leftTransform = width_item * active * -1;
    list.style.transform = `translateX(${leftTransform}px)`;
}

// Function to go to the next item
function goToNext() {
    active = (active >= count - 1) ? 0 : active + 1;
    runCarousel();
}

// Function to go to the previous item
function goToPrev() {
    active = (active <= 0) ? count - 1 : active - 1;
    runCarousel();
}

// Set up interval for auto-slide
let autoSlide = setInterval(goToNext, interval);

// Event listeners for prev and next buttons
next.addEventListener('click', () => {
    clearInterval(autoSlide); // Stop auto-slide on manual interaction
    goToNext();
    autoSlide = setInterval(goToNext, interval); // Restart auto-slide
});

prev.addEventListener('click', () => {
    clearInterval(autoSlide); // Stop auto-slide on manual interaction
    goToPrev();
    autoSlide = setInterval(goToNext, interval); // Restart auto-slide
});

// Initialize carousel
runCarousel();

// Set Text on a Circle
let textCircle = circle.innerText.split('');
circle.innerText = '';
textCircle.forEach((value, key) => {
    let newSpan = document.createElement("span");
    newSpan.innerText = value;
    let rotateThisSpan = (360 / textCircle.length) * key;
    newSpan.style.setProperty('--rotate', rotateThisSpan + 'deg');
    circle.appendChild(newSpan); 
});
