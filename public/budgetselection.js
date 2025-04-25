const dropdown = document.querySelector(".dropdown");
const button = document.querySelector(".dropdown-btn");
const btnText = document.querySelector(".btn-text");
const items = document.querySelectorAll(".dropdown-item");
const hr_text = document.querySelector(".text");

let previousText = btnText.textContent; // Store previous text
let selectedText = null; // Track currently selected item

// Toggle dropdown visibility
button.addEventListener("click", function () {
  dropdown.classList.toggle("active");

  if (dropdown.classList.contains("active")) {
    previousText = btnText.textContent; // Save current text before changing
    btnText.textContent = "What’s your preference ?";
    hr_text.style.display = "none";
  } else {
    btnText.textContent = "Just experimenting !";

    hr_text.style.display = "block";
  }
});

// Handle item selection
items.forEach((item) => {
  item.addEventListener("click", function () {
    let currentText = btnText.textContent.trim();

    if (currentText === this.textContent.trim()) {
      // If the clicked item is already selected, revert to previous text
      btnText.textContent = "What’s your preference ?";
      selectedText = null;
    } else {
      // Store selected item and update button text
      // selectedText = this.textContent;
      btnText.textContent = this.textContent;
    }

    dropdown.classList.remove("active"); // Hide dropdown after selection
    hr_text.style.display = "block";
  });
});
let key = "";
items.forEach((item) => {
  item.addEventListener("click", () => {
    key = item.getAttribute("data-key");
  });
});
function submitForm(e) {
  e.preventDefault();
  const url = new URL(window.location.href);
const pathWithQuery = url.pathname ;
// console.log(pathWithQuery);
if(pathWithQuery==="/category/phone/form"){
  if (
    document.querySelector(".min").value != "" &&
    document.querySelector(".max").value != "" &&
    ["Gaming", "Studying", "Working", "General use"].includes(key)
  ) {
    const queryString = `/category/phone?min=${
      document.querySelector(".min").value
    }&max=${document.querySelector(
      ".max"
    ).value}&Filter_key_preference=${encodeURIComponent(key)}`;

    window.location.href = queryString;
  }else if(document.querySelector(".min").value == "" &&
  document.querySelector(".max").value == "" &&
  ["Gaming", "Studying", "Working", "General use"].includes(key)){
    const queryString = `/category/phone?Filter_key_preference=${encodeURIComponent(key)}`;
  
      window.location.href = queryString;
  }else if(document.querySelector(".min").value != "" &&
  document.querySelector(".max").value != "" &&
  !["Gaming", "Studying", "Working", "General use"].includes(key)){
    const queryString = `/category/phone?min=${
      document.querySelector(".min").value
    }&max=${document.querySelector(
      ".max"
    ).value}`;
  
      window.location.href = queryString;
  }
}
if(pathWithQuery==="/category/laptop/form"){
  if (
    document.querySelector(".min").value != "" &&
    document.querySelector(".max").value != "" &&
    ["Gaming", "Studying", "Working", "General use"].includes(key)
  ) {
    const queryString = `/category/laptop?min=${
      document.querySelector(".min").value
    }&max=${document.querySelector(
      ".max"
    ).value}&Filter_key_preference=${encodeURIComponent(key)}`;

    window.location.href = queryString;
  }else if(document.querySelector(".min").value == "" &&
  document.querySelector(".max").value == "" &&
  ["Gaming", "Studying", "Working", "General use"].includes(key)){
    const queryString = `/category/laptop?Filter_key_preference=${encodeURIComponent(key)}`;
  
      window.location.href = queryString;
  }else if(document.querySelector(".min").value != "" &&
  document.querySelector(".max").value != "" &&
  !["Gaming", "Studying", "Working", "General use"].includes(key)){
    const queryString = `/category/laptop?min=${
      document.querySelector(".min").value
    }&max=${document.querySelector(
      ".max"
    ).value}`;
  
      window.location.href = queryString;
  }
}
}
function skip(e){
  e.preventDefault();
  const url = new URL(window.location.href);
const pathWithQuery = url.pathname ;
if(pathWithQuery==="/category/phone/form"){
  window.location.href="/category/phone"
}
if(pathWithQuery==="/category/laptop/form"){
  window.location.href="/category/laptop"
}
}