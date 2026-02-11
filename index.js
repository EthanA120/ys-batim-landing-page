// Show with delay
const observerOptions = {
    root: null, // Set view window as a base
    threshold: 0.15 // Appearing after 15% of the section is showed on screen
};

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

/** Form POST Redirect Function
    Handle Netlify Form submission via AJAX
    And Send data to Google Sheets for documentation
    This function works for all forms on the page
*/
const handleSubmit = (event) => {
    // Prevent the default form submission (page refresh)
    event.preventDefault();

    const myForm = event.target;
    const formData = new FormData(myForm);

    // The data to send to Google Sheets
    const dataForSheets = Object.fromEntries(formData.entries());
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxYabTQhGyf8oG3KDzI1VZy-pYYQLnAodyjRp_mHlSRsHk-mjwmJPxHmDPPwwEtysv0Qg/exec';

    // 1. Send the data to Netlify
    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
    })
        .then(() => {
            // 2. Send the data to Google Sheets
            // There is no need to wait for success message from netlify
            fetch(scriptURL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataForSheets)
            }).then(() => {
                console.log("Data sent to Google Sheets successfully");
            })
                .catch(err => console.error("Sheets Error:", err));

            // Display success message inside the specific form that was submitted
            myForm.innerHTML = `
        <div class="text-center p-6 bg-green-100 rounded-lg text-green-800 border border-green-200 animate-pulse">
          <h3 class="font-bold text-xl">תודה רבה!</h3>
          <p>הפרטים התקבלו בהצלחה, נחזור אליך בהקדם.</p>
        </div>`;

            myForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
        .catch((error) => {
            console.error("Form submission error:", error);
            alert("אופס! נראה שיש תקלה. נסה שוב או צור קשר בוואטסאפ.");
        });
};

document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", handleSubmit);
});
