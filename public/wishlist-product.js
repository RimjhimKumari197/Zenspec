const fullContainer=document.querySelector(".full-container");
function updateAllWishlistIcons(productId, category, isClicked) {
    document.querySelectorAll(`.wishlist-wrapper[data-id="${productId}"][data-category="${category}"]`).forEach(el => {
      const icon = el.querySelector(".wishlist-icon");
      el.classList.toggle("clicked", isClicked);
      icon.src = isClicked ? "/filter-click-wishlist.png" : "/filter-wishlist-black.png";
    });
  }
  
  document.querySelectorAll(".wishlist-wrapper").forEach((group) => {
    group.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();
  
      const productId = group.dataset.id;
      const category = group.dataset.category;
  
      const res = await fetch("/wishlist/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, category })
      });
  
      const data = await res.json();
      const isClicked = data.action === "added";
      updateAllWishlistIcons(productId, category, isClicked);
    });
  });
  function refreshToNewPage(Page,direction) {
    const url = new URL(window.location.href);
    url.searchParams.set("page", Page);
  if(direction==="left"){
    gsap.to(fullContainer, {
      x: "-100vw",
      // opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        window.location.href = url.toString();
      }
    });
    sessionStorage.setItem("direction", "left");
  
  }
  else if(direction=="right"){
    gsap.to(fullContainer, {
      x: "100vw",
      // opacity: 0,
      duration: 0.7,
      ease: "power2.in",
      onComplete: () => {
        window.location.href = url.toString();
      }
    });
    sessionStorage.setItem("direction", "right");
  
  }
  else{
    window.location.href = url.toString();
  
  }
    // Set session flag to trigger animation on next page
    sessionStorage.setItem("playPageTransition", "true");
  
  
    // Navigate to new page
    // window.location.href = url.toString();
  }
  window.addEventListener("load", () => {
    const container = document.querySelector(".full-container");
    const playTransition = sessionStorage.getItem("playPageTransition");
    const direction = sessionStorage.getItem("direction");
  
    if (performance.getEntriesByType("navigation")[0].type !== "reload") {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!sessionStorage.getItem("pageVisited")) {
          gsap.from(container, {
            x: "20vw",
            duration: 1.5,
            backgroundColor:"#F3F1C1",
            ease: "elastic.out(1, 0.5)",
            onComplete: () => {
              gsap.set(container, { clearProps: "transform" });
             
            },
          });
          sessionStorage.setItem("pageVisited", "true");
        }
  
        if (playTransition === "true"&&direction==="left") {
          gsap.from(container, {
            x: "-5vw",
            duration: 0.3,
            backgroundColor:"#F3F1C1",
  
            ease: "power2.in",
            onComplete: () => {
              gsap.set(container, { clearProps: "transform" });
             
            },
  
          });
          sessionStorage.removeItem("playPageTransition");
          sessionStorage.removeItem("direction");
  
        }
        if (playTransition === "true"&&direction==="right") {
          gsap.from(container, {
            x: "5vw",
            duration: 0.3,
            backgroundColor:"#F3F1C1",
  
            ease: "power2.in",
            onComplete: () => {
              gsap.set(container, { clearProps: "transform" });
             
            },
  
          });
          sessionStorage.removeItem("playPageTransition");
          sessionStorage.removeItem("direction");
  
        }
      });
    });
  }else{
    window.addEventListener("beforeunload",()=>{
      sessionStorage.removeItem("pageVisited");
    })
  }
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".zenny-btn");
    
  buttons.forEach((button)=>{
  const text = button.querySelector(".ask-text");
  const gif = button.querySelector(".button-zenny");
  button.addEventListener("mouseenter", () => {
  
      gsap.to(text, { x: 60, duration: 0.1, ease: "power2.out" }); // Moves text to the right
      gsap.to(gif, { x: -150, opacity: 1, duration: 0.1, ease: "power2.out" ,
        
      });
    });
  
    button.addEventListener("mouseleave", () => {
      gsap.to(text, { x: 0, duration: 0.1, ease: "power2.out" }); // Reset text position
      // gsap.to(gif, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }); // Reset GIF position & opacity
      gsap.to(gif, { x: 0, opacity: 1, duration: 0.1, ease: "power2.out" ,
        
      });
    });
  });
  
  })
  function handleClick(event, id,category) {
    const selection = window.getSelection();
    const isTextSelected = selection && selection.toString().length > 0;
  
    if (!isTextSelected) {
      // You can pass the product ID as a query param or store it for later
      window.location.href = `/category/${category}/productdetail?id=${id}`;
    }
  }
      