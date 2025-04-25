const forms = document.querySelectorAll('form');
forms.forEach(form=>{
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent form submission for now
        
        // Step 1: GSAP animation for dissolve effect
        gsap.to("#page", {
            opacity: 0,
            duration: 0.3,
            ease: "linear",
            onComplete: () => {
                // Step 2: Redirect after transition
                form.submit();
            }
        });
    });
    
   
});
const links = document.querySelectorAll('a');

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent immediate navigation
        
        const targetUrl = link.href; // Get the target URL
        
        // Step 1: GSAP animation for dissolve effect
        gsap.to("#page", {
            opacity: 0,
            duration: 0.3,
            ease: "linear",
            onComplete: () => {
                // Step 2: Redirect after transition
                window.location.href = targetUrl;
            }
        });
    });
});



window.addEventListener("pageshow", (event) => {
    if (event.persisted) { // True if user navigated back via Back button
        location.reload(); // Reloads the page automatically
    }
});
        