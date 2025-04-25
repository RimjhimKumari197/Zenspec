const button = document.querySelector('.btn');
  const imageContainer = document.querySelector('#main-img-container');

  // Add hover event listeners to the button
  button.addEventListener('mouseenter', function() {
    imageContainer.classList.add('opacity');
    console.log("mouse enter");
  });

  button.addEventListener('mouseleave', function() {
    imageContainer.classList.remove('opacity');
    console.log("mouse leave");
    

  });