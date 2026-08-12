function copyEmail() {
    
    const myEmail = "reynaldo3sioson.com";
    
    // Copies the email to the clipboard
    navigator.clipboard.writeText(myEmail).then(() => {
        // Grab the button element
        const emailBtn = document.getElementById("email-btn");
        
        // Change the text to give feedback
        emailBtn.innerText = "Copied!";
        
        // Change it back to "Email" after 2 seconds (2000 milliseconds)
        setTimeout(() => {
            emailBtn.innerText = "Email";
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy email: ', err);
    });
}

window.addEventListener("scroll", () => {
    // Check how many pixels the user has scrolled down
    const scrollPosition = window.scrollY;
    
    // Grab the elements we want to animate
    const heroBox = document.querySelector(".hero-content");
    const aboutContent = document.querySelector(".about-content");

    // If the elements don't exist on the current page, stop the script from throwing an error
    if (!heroBox || !aboutContent) return;

    // The threshold (100 pixels) where the animation triggers
    if (scrollPosition > 100) {
        heroBox.classList.add("scrolled-down");
        aboutContent.classList.add("visible");
    } else {
        // If they scroll back to the absolute top, reverse the animation
        heroBox.classList.remove("scrolled-down");
        aboutContent.classList.remove("visible");
    }
});