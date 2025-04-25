function scrollToSection() {
    const target = document.getElementById("benchmark-box");
    const targetY = target.offsetTop;

    gsap.to(window, {
      
        scrollTo: { y: targetY, autoKill: false }, // Scroll to the target element
        // ease: "power2.out", // Start fast, slow end
        // overwrite: true,
        onComplete: applySpringEffect // Run spring animation after scrolling
    });
}

// Apply Figma-like spring effect on arrival
function applySpringEffect() {
    gsap.fromTo("#benchmark-box", 
        { y: -50 },  // Start position (slightly above)
        {
            y: 0, 
            duration: 1.5, // Slightly longer for smooth transition
            ease: "elastic.out(1, 2)" // Figma-style spring bounce
        }
    );
}
window.addEventListener("beforeunload", () => {
    localStorage.setItem("scrollPosition", window.scrollY);
  });

  // Scroll to saved position after page load
  window.addEventListener("load", () => {
    const scrollY = localStorage.getItem("scrollPosition");
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY));
    }
  });