// Show with delay
const observerOptions = {
    root: null, // Set view window as a base
    threshold: 0.15 // Appearing after 15% of the section is showed on screen
};

document.querySelectorAll('.reveal').forEach(el => console.log(el.classList.add('transition-all', 'duration-1000', 'ease-in-out')));


const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // As the element enters - returns it's appearence
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            entry.target.classList.add('opacity-100', 'translate-y-0');
            // Stop tracking it so that the animation will happenes only once
            // observer.unobserve(entry.target);
        } else {
            // Dissapear the element after getting out of view
            entry.target.classList.remove('opacity-100', 'translate-y-0');
            entry.target.classList.add('opacity-0', 'translate-y-10');
        }
    });
}, observerOptions);

// reveal says to the observer to track all the elements with this class
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


//Random agent image
window.addEventListener('DOMContentLoaded', (event) => {
    // Choose number between 1 to 3
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    const anotherNumber = randomNumber == 3 ? 1 : randomNumber + 1;

    // Update images (sa1, sa2, sa3)
    const shimonImg = document.getElementById('shimon-img');
    if (shimonImg) {
        shimonImg.src = `assets/images/sa${randomNumber}.jpeg`;
    }

    // Update images (ga1, ga2, ga3)
    const galImg = document.getElementById('gal-img');
    if (galImg) {
        galImg.src = `assets/images/gs${anotherNumber}.jpeg`;
    }
});