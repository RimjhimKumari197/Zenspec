let newImageSelected = false; // Flag to track if the user has selected a new image

// Enable form fields (remove readonly and disabled attributes)
function enableForm() {
  const form = document.getElementById("cont-form");
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    input.removeAttribute("readonly");
    input.removeAttribute("disabled");
  });
}

// Trigger the file input when the profile image is clicked
function triggerFileInput() {
  const fileInput = document.getElementById("fileInput");
  if (!fileInput.disabled) {
    fileInput.click();
  }
}

// Preview image when the user selects a new one
function convertToBase64(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("preview").src = e.target.result;
      document.getElementById("base64Image").value = e.target.result; // Save base64 in hidden input
    };
    reader.readAsDataURL(file);
  }
}

// Save button handler
document.querySelector(".change-btn").addEventListener("click", function (e) {
  e.preventDefault(); // Prevent form submission

  // If a new image was selected, update the image in the header
  if (newImageSelected) {
    const newImgSrc = document.getElementById("preview").src;
    const headerImg = document.querySelector(".user img");
    headerImg.src = newImgSrc;
    newImageSelected = false; // Reset the flag
  }

  // Re-enable the form fields for submission
  const form = document.getElementById("cont-form");
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    input.setAttribute("readonly", true);
    if (input.type === "file") {
      input.setAttribute("disabled", true);
    }
  });

  // Trigger the form submission manually
  form.submit();
}); 