document.querySelectorAll('input').forEach((inp)=>{
    inp.addEventListener('input', function() {
  if (inp.value.trim() !== '') {
    inp.style.backgroundColor = '#fff';  // Light green background
    inp.style.color = '#616161';  // Green text color
  } else {
    inp.style.backgroundColor = ' #000';  // Reset background color
    inp.style.color = '#616161';  // Reset text color
  }
  })});