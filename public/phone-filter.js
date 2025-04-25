const sliderThumb = document.getElementById("sliderThumb");
const movingCircle = document.getElementById("movingCircle");
const sliderTrack = document.querySelector(".slider-track");
const sliderLabels = document.querySelectorAll(".price-tag");
const rangeButtons = document.querySelectorAll(".range-btn");
const minInput = document.querySelector(".min-input");
const maxInput = document.querySelector(".max-input");
const clearButton = document.getElementById("clearButton");
const tickBox = document.querySelector(".tick-box");
const fullContainer=document.querySelector(".full-container");
let sliderActive = false;
let inputActive = false;

// Function to reset both the slider and input fields
function resetAll() {
  sliderThumb.style.left = "0%";
  movingCircle.style.left = "0%";
  // movingCircle.textContent = "0";
  sliderTrack.style.width = "0%";
  sliderLabels.forEach((label) => label.classList.remove("active"));
  document.getElementById("min-label").classList.add("active");

  minInput.value = "";
  maxInput.value = "";

  sliderActive = false;
  inputActive = false;
}

// Function to update slider
function updateSlider(value) {
  let percentage = (value / 50000) * 100;
  sliderThumb.style.left = percentage + "%";
  movingCircle.style.left = percentage + "%";
  sliderTrack.style.width = percentage + "%";
  
  // movingCircle.textContent = value.toLocaleString();
}

// Slider Functionality
rangeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    if (inputActive) return;

    sliderActive = true;
    minInput.value = "";
    maxInput.value = "";

    let value = parseInt(this.getAttribute("data-value"));
    updateSlider(0);
    sliderLabels.forEach((label) => label.classList.remove("active"));
    if (value === 0)
      document.getElementById("min-label").classList.add("active");
    else if (value === 25000)
      document.getElementById("mid-label").classList.add("active");
    else if (value === 50000)
      document.getElementById("max-label").classList.add("active");
    
  });
});

// Min/Max Input Functionality
minInput.addEventListener("click", function () {
  if (!inputActive) {
    resetSlider(); // Reset only slider, not input fields
  }
  inputActive = true;
});

maxInput.addEventListener("click", function () {
  if (!inputActive) {
    resetSlider(); // Reset only slider, not input fields
  }
  inputActive = true;
});

function resetSlider() {
  sliderThumb.style.left = "0%";
  movingCircle.style.left = "0%";
  // movingCircle.textContent = "0";
  sliderTrack.style.width = "0%";
  sliderLabels.forEach((label) => label.classList.remove("active"));
  document.getElementById("min-label").classList.add("active");
  sliderActive = false;
}

// Detect when user leaves input fields and allow slider again
function resetInputFocus() {
  inputActive = false;
}

minInput.addEventListener("blur", resetInputFocus);
maxInput.addEventListener("blur", resetInputFocus);

// Clear button functionality
clearButton.addEventListener("click", resetAll);

// Ensure everything resets to minimum value on page load
resetAll();





//filter-sorting
let selectedFilters = JSON.parse(localStorage.getItem("selectedFilters")) || {}; // Store selections
let firstLoad = true;
// Load selected filters from URL
function syncFiltersWithURL() {
  let urlParams = new URLSearchParams(window.location.search);
  let updatedFilters = {};

  // Update selectedFilters based on URL parameters
  urlParams.forEach((value, key) => {
    updatedFilters[key] = value.split(","); // Convert comma-separated values to an array
  });

  // Check for removed filters and update localStorage
  Object.keys(selectedFilters).forEach((key) => {
    if (!updatedFilters[key]) {
      delete selectedFilters[key]; // Remove deselected filters
    }
  });

  // Set selectedFilters to the updated values
  selectedFilters = updatedFilters;

  // Save updated filters in localStorage
  localStorage.setItem("selectedFilters", JSON.stringify(selectedFilters));

  // Update UI for checkmarks and transitions
  setTimeout(() => {
    updateFilterUI(firstLoad);
    firstLoad = false; // Now allow animations after first load
  }, 80);
}

// Function to toggle a filter on click
function toggleFilter(type, value) {
  if (!selectedFilters[type]) {
    selectedFilters[type] = []; // Ensure it's an array
  }

  const index = selectedFilters[type].indexOf(value);

  if (index > -1) {
    selectedFilters[type].splice(index, 1); // Remove if already selected
    if (selectedFilters[type].length === 0) {
      delete selectedFilters[type]; // Remove empty arrays
    }
  } else {
    selectedFilters[type].push(value); // Add if not selected
  }

  // Save to local storage
  localStorage.setItem("selectedFilters", JSON.stringify(selectedFilters));
  updateFilterUI(false);

  // ✅ Update URL without causing extra transitions
  setTimeout(() => {
    let queryParams = new URLSearchParams(selectedFilters).toString();
    window.location.replace(window.location.pathname + "?" + queryParams);
  }, 80);
}

function updateFilters() {
  let queryParams = new URLSearchParams();

  Object.keys(selectedFilters).forEach((key) => {
    if (
      Array.isArray(selectedFilters[key]) &&
      selectedFilters[key].length > 0
    ) {
      queryParams.append(key, selectedFilters[key].join(",")); // Join multiple values with ","
    }
  });
// Save scroll position only when filters are updated
sessionStorage.setItem("scrollPosition", window.scrollY);

  window.location.search = queryParams.toString();

  // syncFiltersWithURL();// Ensure filters stay updated
}

// Function to update UI based on filters
function updateFilterUI(firstloadani) {
  document.querySelectorAll(".filter1").forEach((filter) => {
    let brandName = filter.querySelector("span").textContent.trim();

    if (selectedFilters.Filter_brand && selectedFilters.Filter_brand.includes(brandName)&&firstloadani) {
      // ✅ Add highlight with GSAP transition
      gsap.to(filter, { backgroundColor: "#f59c42", color: "black", duration: 0.6 });
      gsap.to(filter.querySelector(".check"), { opacity: 1, scale: 1, duration: 0.6 });
      gsap.to(filter.querySelector("span"), { x: 5, duration: 0.6 });
      filter.classList.add("highlight");
    } else {
      // ❌ Smoothly remove highlight
      let tl = gsap.timeline();
      
      tl.to(filter, { backgroundColor: "#B0B0B0", color: "#000", duration: 0.4 ,ease: "power2.out"}) // Animate background and text color
        .to(filter.querySelector(".check"), { opacity: 0, scale: 0, duration: 0.4,ease: "power2.out" }, "-=0.3") // Animate checkmark disappearance
        .to(filter.querySelector("span"), { x: -5, duration: 0.3,ease: "power2.out" }, "-=0.3") // Animate text back
        .add(() => { filter.classList.remove("highlight"); }); // Remove highlight after animations
    }
  });
  document.querySelectorAll(".filter2").forEach((filter) => {
    let brandName = filter.querySelector("span").textContent.trim();

    if (selectedFilters.Filter_processor && selectedFilters.Filter_processor.includes(brandName)&&firstloadani) {
      // ✅ Add highlight with GSAP transition
      gsap.to(filter, { backgroundColor: "#f59c42", color: "black", duration: 0.6 });
      gsap.to(filter.querySelector(".check"), { opacity: 1, scale: 1, duration: 0.6 });
      gsap.to(filter.querySelector("span"), { x: 5, duration: 0.6 });
      filter.classList.add("highlight");
    } else {
      // ❌ Smoothly remove highlight
      let tl = gsap.timeline();
      
      tl.to(filter, { backgroundColor: "#B0B0B0", color: "#000", duration: 0.3 }) // Animate background and text color
        .to(filter.querySelector(".check"), { opacity: 0, scale: 0, duration: 0.3 }, "-=0.3") // Animate checkmark disappearance
        .to(filter.querySelector("span"), { x: -5, duration: 0.3 }, "-=0.3") // Animate text back
        .add(() => { filter.classList.remove("highlight"); }); // Remove highlight after animations
    }
  });
  document.querySelectorAll(".filter3").forEach((filter) => {
    let brandName = filter.querySelector("span").textContent.trim();

    if (selectedFilters.Filter_display && selectedFilters.Filter_display.includes(brandName)&&firstloadani) {
      // ✅ Add highlight with GSAP transition
      gsap.to(filter, { backgroundColor: "#f59c42", color: "black", duration: 0.6 });
      gsap.to(filter.querySelector(".check"), { opacity: 1, scale: 1, duration: 0.6 });
      gsap.to(filter.querySelector("span"), { x: 5, duration: 0.6 });
      filter.classList.add("highlight");
    } else {
      // ❌ Smoothly remove highlight
      let tl = gsap.timeline();
      
      tl.to(filter, { backgroundColor: "#B0B0B0", color: "#000", duration: 0.3 }) // Animate background and text color
        .to(filter.querySelector(".check"), { opacity: 0, scale: 0, duration: 0.3 }, "-=0.3") // Animate checkmark disappearance
        .to(filter.querySelector("span"), { x: -5, duration: 0.3 }, "-=0.3") // Animate text back
        .add(() => { filter.classList.remove("highlight"); }); // Remove highlight after animations
    }
    
  });
  document.querySelectorAll(".filter4").forEach((filter) => {
    let brandName = filter.querySelector("span").textContent.trim();

    if (selectedFilters.Filter_os && selectedFilters.Filter_os.includes(brandName)&&firstloadani) {
      // ✅ Add highlight with GSAP transition
      gsap.to(filter, { backgroundColor: "#f59c42", color: "black", duration: 0.6 });
      gsap.to(filter.querySelector(".check"), { opacity: 1, scale: 1, duration: 0.6 });
      gsap.to(filter.querySelector("span"), { x: 5, duration: 0.6 });
      filter.classList.add("highlight");
    } else {
      // ❌ Smoothly remove highlight
      let tl = gsap.timeline();
      
      tl.to(filter, { backgroundColor: "#B0B0B0", color: "#000", duration: 0.3 }) // Animate background and text color
        .to(filter.querySelector(".check"), { opacity: 0, scale: 0, duration: 0.3 }, "-=0.3") // Animate checkmark disappearance
        .to(filter.querySelector("span"), { x: -5, duration: 0.3 }, "-=0.3") // Animate text back
        .add(() => { filter.classList.remove("highlight"); }); // Remove highlight after animations
    }
  });
  document.querySelectorAll(".filter5").forEach((filter) => {
    let brandName = filter.querySelector("span").textContent.trim();

    if (selectedFilters.Filter_network && selectedFilters.Filter_network.includes(brandName)&&firstloadani) {
      // ✅ Add highlight with GSAP transition
      gsap.to(filter, { backgroundColor: "#f59c42", color: "black", duration: 0.6 });
      gsap.to(filter.querySelector(".check"), { opacity: 1, scale: 1, duration: 0.6 });
      gsap.to(filter.querySelector("span"), { x: 5, duration: 0.6 });
      filter.classList.add("highlight");
    } else {
      // ❌ Smoothly remove highlight
      let tl = gsap.timeline();
      
      tl.to(filter, { backgroundColor: "#B0B0B0", color: "#000", duration: 0.3 }) // Animate background and text color
        .to(filter.querySelector(".check"), { opacity: 0, scale: 0, duration: 0.3 }, "-=0.3") // Animate checkmark disappearance
        .to(filter.querySelector("span"), { x: -5, duration: 0.3 }, "-=0.3") // Animate text back
        .add(() => { filter.classList.remove("highlight"); }); // Remove highlight after animations
    }
  });
}

// Run sync on page load
syncFiltersWithURL();

function clearToggleFilters() {
  const url = new URL(window.location);
    
    // Remove only filter parameters from the URL
    ['Filter_brand', 'Filter_network', 'Filter_processor', 'Filter_display', 'Filter_os'].forEach(param => {
        url.searchParams.delete(param);
    });

    // Update the URL without reloading the page
    window.history.pushState({}, '', url);

    // Remove highlights from filters
    document.querySelectorAll('.filter').forEach(el => el.classList.remove('highlight'));

    // Reload to fetch updated results
    location.reload();
}
document.addEventListener("DOMContentLoaded", function () {
  const url = new URL(window.location.href);
  const selectedValue = url.searchParams.get("Filter_key_preference");
  const selectedValue2 = url.searchParams.get("Filter_profession_tag");
  const selectedValue3 = url.searchParams.get("sort");

  const dropbtn = document.querySelector(".dropbtn");
  const dropbtn2 = document.querySelector(".dropbtn2");
  const dropbtn3= document.querySelector(".dropbtn3");


  if (selectedValue) {
    setTimeout(() => {
      dropbtn.classList.add("selected"); // Add color if selected
    }, 80); // Change color if a value is selected
  }
  if (selectedValue2) {
    setTimeout(() => {
      dropbtn2.classList.add("selected"); // Add color if selected
    }, 80); // Change color if a value is selected
  }
  if (selectedValue3) {
    setTimeout(() => {
      dropbtn3.classList.add("selected"); // Add color if selected
    }, 80); // Change color if a value is selected
  }
  if (localStorage.getItem("dropdownOpen") == 1) {
    setTimeout(() => {
      document.querySelectorAll(".dropdown-item").forEach((element) => {
        element.classList.toggle("show");
      }, 80);
      document.getElementById("dropdown-icon").classList.toggle("rotate");
    });

    // Remove dropdownOpen from URL so that subsequent refreshes don’t keep it open
    localStorage.removeItem("dropdownOpen");
    window.history.replaceState({}, "", url.toString());
  }
  if (localStorage.getItem("dropdownOpen2") == 1) {
    setTimeout(() => {
      document.querySelectorAll(".dropdown-item2").forEach((element) => {
        element.classList.toggle("show");
      }, 80);
      document.getElementById("dropdown-icon2").classList.toggle("rotate");
    });

    // Remove dropdownOpen from URL so that subsequent refreshes don’t keep it open
    localStorage.removeItem("dropdownOpen2");
    window.history.replaceState({}, "", url.toString());
  }
  if (localStorage.getItem("dropdownOpen3") == 1) {
    setTimeout(() => {
      document.querySelectorAll(".dropdown-item3").forEach((element) => {
        element.classList.toggle("show");
      }, 80);
      document.getElementById("dropdown-icon3").classList.toggle("rotate");
    });

    // Remove dropdownOpen from URL so that subsequent refreshes don’t keep it open
    localStorage.removeItem("dropdownOpen3");
    window.history.replaceState({}, "", url.toString());
  }
  
  
    
});
//key preference
function applyFilter(type, value) {
  const url = new URL(window.location.href);
  const dropbtn = document.querySelector(".dropbtn");
  const currentValue = url.searchParams.get(type);

  if (currentValue === value) {
    url.searchParams.delete(type);
    let tl = gsap.timeline();
    tl.to(dropbtn, { backgroundColor: "#B0B0B0", color: "#000", duration: 0.3 }) // Animate background and text color
    .add(() => { 
      dropbtn.classList.remove("selected"); // Remove highlight after animation
      window.location.href = url.toString(); // Reload *after* animation
    });

    
     // Remove color if deselected
  } else {
    url.searchParams.set(type, value);
    setTimeout(() => {
      dropbtn.classList.add("selected"); // Add color if selected
    }, 80);
  window.location.href = url.toString();

  }

}

function toggleDropdown(Class, id) {
  // If there's a selected value, remove it when dropdown is clicked
  const url = new URL(window.location.href);
  if (url.searchParams.has("Filter_key_preference")) {
    url.searchParams.delete("Filter_key_preference");
    document.querySelector(".dropbtn").classList.remove("selected");
    localStorage.setItem("dropdownOpen", "1");
    window.location.href = url.toString();
  }
  setTimeout(() => {
    document.querySelectorAll(".dropdown-item").forEach((element) => {
      element.classList.toggle("show");
    }, 80);
    document.getElementById("dropdown-icon").classList.toggle("rotate");
  });
}

//profession
function applyFilter2(type, value) {
  const url = new URL(window.location.href);
  const dropbtn2 = document.querySelector(".dropbtn2");
  const currentValue = url.searchParams.get(type);

  if (currentValue === value) {
    url.searchParams.delete(type);

    dropbtn2.classList.remove("selected"); // Remove color if deselected
  } else {
    url.searchParams.set(type, value);
    setTimeout(() => {
      dropbtn2.classList.add("selected"); // Add color if selected
    }, 50);
  }

  window.location.href = url.toString();
}

function toggleDropdown2(Class, id) {
  // If there's a selected value, remove it when dropdown is clicked
  const url = new URL(window.location.href);
  if (url.searchParams.has("Filter_profession_tag")) {
    url.searchParams.delete("Filter_profession_tag");
    document.querySelector(".dropbtn2").classList.remove("selected");
    localStorage.setItem("dropdownOpen2", "1");
    window.location.href = url.toString();
  }
  setTimeout(() => {
    document.querySelectorAll(".dropdown-item2").forEach((element) => {
      element.classList.toggle("show");
    }, 50);
    document.getElementById("dropdown-icon2").classList.toggle("rotate");
  });
}
//sort
function applySort(type, value) {
  const url = new URL(window.location.href);
  const dropbtn3 = document.querySelector(".dropbtn3");
  const currentValue = url.searchParams.get(type);

  if (currentValue === value) {
    url.searchParams.delete(type);
    dropbtn3.classList.remove("selected"); // Remove color if deselected
  } else {
    url.searchParams.set(type, value);
    setTimeout(() => {
      dropbtn3.classList.add("selected"); // Add color if selected
    }, 50);
  }

  window.location.href = url.toString();
}
function toggleDropdown3(Class, id) {
  // If there's a selected value, remove it when dropdown is clicked
  const url = new URL(window.location.href);
  if (url.searchParams.has("sort")) {
    url.searchParams.delete("sort");
    document.querySelector(".dropbtn3").classList.remove("selected");
    localStorage.setItem("dropdownOpen3", "1");
    window.location.href = url.toString();
  }
  setTimeout(() => {
    document.querySelectorAll(".dropdown-item3").forEach((element) => {
      element.classList.toggle("show");
    }, 50);
    document.getElementById("dropdown-icon3").classList.toggle("rotate");
  });
}


//price
let activeFilter = null; // "slider" or "input"

function updateURL(param, value) {
  let url = new URL(window.location.href);
  if (value !== "") {
    url.searchParams.set(param, value);
  } else {
    url.searchParams.delete(param);
  }
  window.location.href = url.toString();
  window.history.replaceState({}, "", url);
  fetchFilteredProducts();
}

function fetchFilteredProducts() {
  let url = new URL(window.location.href);
  fetch(url.pathname + url.search, { method: "GET" })
    .then((response) => response.text())
    .then((html) => {
      let parser = new DOMParser();
      let doc = parser.parseFromString(html, "text/html");
      document.querySelector("ol").innerHTML =
        doc.querySelector("ol").innerHTML;
    });
}

// Handle Slider Click
rangeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    if (activeFilter === "slider") {
      updateURL("sliderMin", "");
      updateURL("sliderMax", "");
      localStorage.removeItem("sliderMin");
      localStorage.removeItem("sliderMax");
    }
    activeFilter = "slider";
    minInput.value = "";
    maxInput.value = "";

    let value = this.getAttribute("data-value");

    if (value == 0) {
      updateURL("sliderMin", value);
      localStorage.setItem("sliderMin", value);
    } else if (value == 50000) {
      updateURL("sliderMin", value);
      localStorage.setItem("sliderMin", value);
    } else if (value == 25000) {
      updateURL("sliderMin", 0);
      updateURL("sliderMax", value);
      localStorage.setItem("sliderMin", 0);
      localStorage.setItem("sliderMax", value);
    }

    updateURL("min", "");
    updateURL("max", "");
    localStorage.removeItem("min");
    localStorage.removeItem("max");
  });
});

// Handle Input Box Submission
tickBox.addEventListener("click", function () {
  let minVal = minInput.value.trim();
  let maxVal = maxInput.value.trim();

  if (!minVal && !maxVal) return;

  activeFilter = "input";
  updateURL("min", minVal);
  localStorage.setItem("min", minVal);
  updateURL("max", maxVal);
  localStorage.setItem("max", maxVal);

  updateURL("sliderMin", "");
  updateURL("sliderMax", "");
  localStorage.removeItem("sliderMin");
  localStorage.removeItem("sliderMax");
});

// Clear Button
clearButton.addEventListener("click", function () {
  activeFilter = null;
  updateURL("sliderMin", "");
  updateURL("sliderMax", "");
  localStorage.removeItem("sliderMin");
  localStorage.removeItem("sliderMax");

  updateURL("min", "");
  updateURL("max", "");
  localStorage.removeItem("min");
  localStorage.removeItem("max");
});
function clearPriceFilters() {
  activeFilter = null;
  updateURL("sliderMin", "");
  updateURL("sliderMax", "");
  localStorage.removeItem("sliderMin");
  localStorage.removeItem("sliderMax");

  updateURL("min", "");
  updateURL("max", "");
  localStorage.removeItem("min");
  localStorage.removeItem("max");
}

function onLoadPriceFilter(){
  //price
  const url = new URL(window.location.href);

   // Retrieve stored values from localStorage
   let storedSliderMin = localStorage.getItem("sliderMin");
   let storedSliderMax = localStorage.getItem("sliderMax");
   let storedMin = localStorage.getItem("min");
   let storedMax = localStorage.getItem("max");
 
   // Ensure sliderMin and sliderMax appear when selecting 25000
   if (storedSliderMin && storedSliderMax && storedSliderMax === "25000") {
     if (!storedMin || !storedMax) {
       url.searchParams.set("sliderMin", storedSliderMin);
       url.searchParams.set("sliderMax", storedSliderMax);
       
     } else {
       localStorage.removeItem("sliderMin");
       localStorage.removeItem("sliderMax");
     }
   } else {
     if (!storedMin || !storedMax) {
       if (storedSliderMin && !url.searchParams.get("sliderMin")) {
         url.searchParams.set("sliderMin", storedSliderMin);
         
       }
     } else {
       localStorage.removeItem("sliderMin");
       localStorage.removeItem("sliderMax");
     }
   }
 
   // Update browser URL without reloading
   window.history.replaceState({}, "", url);
 
   // Set activeFilter based on URL parameters
   if (url.searchParams.get("min") || url.searchParams.get("max")) {
     activeFilter = "input";
     minInput.value = url.searchParams.get("min") || "";
     maxInput.value = url.searchParams.get("max") || "";
   }
   setTimeout(()=>{
    if (url.searchParams.get("sliderMin") || url.searchParams.get("sliderMax")) {
      activeFilter = "slider";
      if(url.searchParams.get("sliderMax")==25000){
        updateSlider(parseInt(url.searchParams.get("sliderMax")));
        
      }else{
        updateSlider(parseInt(url.searchParams.get("sliderMin")));
  
      }
    }
   },80)
     
     
    
    
 
  
    
   
}

// Ensure filters persist across page reloads
window.addEventListener("load",onLoadPriceFilter);
// window.addEventListener("load",onloadfilterchange);
window.addEventListener("beforeunload", clearPriceFilters);
// Run this when the DOM is ready
// Function to handle page transition
document.addEventListener("DOMContentLoaded", function () {
  const scrollPos = sessionStorage.getItem("scrollPosition");
  if (scrollPos !== null) {
    window.scrollTo(0, parseInt(scrollPos));
    sessionStorage.removeItem("scrollPosition"); // Clear after restoring
  }
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
  sessionStorage.removeItem("scrollPosition");

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
  
function handleClick(event, id) {
  const selection = window.getSelection();
  const isTextSelected = selection && selection.toString().length > 0;

  if (!isTextSelected) {
    // You can pass the product ID as a query param or store it for later
    window.location.href = `http://localhost:5000/category/phone/productdetail?id=${id}`;
  }
}

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

