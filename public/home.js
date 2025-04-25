const fc = document.querySelector("#full-container");
const header=document.querySelector(".header");
window.addEventListener("load", () => {
  
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      gsap.from(fc,{
        y: "10vh",
        duration: 1.5,
        visiblity:"visible",
        ease: "elastic.out(1, 0.5)",
        onComplete: () => {
          gsap.set(fc, { clearProps: "transform" });
         
        },
      });
    });
  });
   });
document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector(".letsgo");
    const text = document.querySelector(".letsgo-txt");
    const gif = document.querySelector(".wheel");
    const orggif="wheel.gif";
    const newgif="colorwheel.gif"
    button.addEventListener("mouseenter", () => {
      // gsap.to(button, { backgroundColor: "#ff5733", duration: 0.6, ease: "power2.out" });
      gsap.to(text, { x: 50, duration: 0.1, ease: "power2.out" }); // Moves text to the right
      gsap.to(gif, { x: -90, opacity: 1, duration: 0.1, ease: "power2.out" ,
        onComplete: () => gsap.to(gif, { opacity: 1, duration: 0.3 }) // After movement, opacity back to 1
      });
    });

    button.addEventListener("mouseleave", () => {
      gsap.to(text, { x: 0, duration: 0.1, ease: "power2.out" }); // Reset text position
      // gsap.to(gif, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }); // Reset GIF position & opacity
      gsap.to(gif, { x: 0, opacity: 1, duration: 0.1, ease: "power2.out" ,
        onComplete: () => gsap.to(gif, { opacity: 1, duration: 0.3 }) // After movement, opacity back to 1
      });
    });
  });
 document.querySelector(".letsgo").addEventListener("click",()=>{
  localStorage.setItem("letsgo","true");
 })
 let index = 0;
const slidesToShow = 3;
const slideWidthPercentage = 100 / slidesToShow;
const totalSlides = document.querySelectorAll('.slide').length;
const maxIndex = Math.floor((totalSlides - slidesToShow) / slidesToShow); 
const carousel = document.getElementById('carousel-box-phone');

const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

function updateCarousel() {
    carousel.style.transform = `translateX(-${index * slideWidthPercentage * slidesToShow}%)`;

    // Update button colors based on current index
    if (index <= 0) {
        prevButton.style.color = 'gray';
    } else {
        prevButton.style.color = 'white';
    }

    if (index >= maxIndex) {
        nextButton.style.color = 'gray';
    } else {
        nextButton.style.color = 'white';
    }
}

function nextSlide() {
    if (index < maxIndex) {
        index += 1;
        updateCarousel();
    }
}

function prevSlide() {
    if (index > 0) {
        index -= 1;
        updateCarousel();
    }
}

// Call it initially to set correct button colors on page load
updateCarousel();

































let indexLaptop = 0;
const slidesToShowLaptop = 2;
const slideWidthPercentageLaptop = 100 / slidesToShowLaptop;
const totalSlidesLaptop = document.querySelectorAll('.slide-lap').length;
const maxIndexLaptop = Math.floor((totalSlidesLaptop - slidesToShowLaptop) / slidesToShowLaptop); 
const carouselLaptop = document.getElementById('carousel-box-laptop');

const prevButtonLaptop = document.getElementById('prev-button-laptop');
const nextButtonLaptop = document.getElementById('next-button-laptop');

function updateCarouselLaptop() {
    carouselLaptop.style.transform = `translateX(-${indexLaptop * slideWidthPercentageLaptop * slidesToShowLaptop}%)`;

    // Update button colors based on current index
    if (indexLaptop <= 0) {
        prevButtonLaptop.style.color = 'gray';
    } else {
        prevButtonLaptop.style.color = 'white';
    }

    if (indexLaptop >= maxIndexLaptop) {
        nextButtonLaptop.style.color = 'gray';
    } else {
        nextButtonLaptop.style.color = 'white';
    }
}

function nextSlideLaptop() {
    if (indexLaptop < maxIndexLaptop) {
        indexLaptop += 1;
        updateCarouselLaptop();
    }
}

function prevSlideLaptop() {
    if (indexLaptop > 0) {
        indexLaptop -= 1;
        updateCarouselLaptop();
    }
}

// Initial check for button states on load
updateCarouselLaptop();
function handleLaptopClick(event, id) {
    const selection = window.getSelection();
    const isTextSelected = selection && selection.toString().length > 0;
  
    if (!isTextSelected) {
      // You can pass the product ID as a query param or store it for later
      window.location.href = `/category/laptop/productdetail?id=${id}`;
    }
  }
  function handlePhoneClick(event, id) {
    const selection = window.getSelection();
    const isTextSelected = selection && selection.toString().length > 0;
  
    if (!isTextSelected) {
      // You can pass the product ID as a query param or store it for later
      window.location.href = `/category/phone/productdetail?id=${id}`;
    }
  }