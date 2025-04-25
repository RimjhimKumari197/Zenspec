document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.querySelector(".dropdown");
    const button = document.querySelector(".dropdown-btn");
    const btnText = document.querySelector(".btn-text");
    const items = document.querySelectorAll(".dropdown-item");
    const submit=document.querySelector(".dropdown-submit");
    const torch=document.querySelector(".torch")
    // Toggle dropdown visibility
    button.addEventListener("click", function () {
        dropdown.classList.toggle("active");
        if(dropdown.classList.contains("active")){
            submit.classList.remove("change");
            btnText.textContent = "Who are you ?";
            submit.addAttribute("disabled");
            
           

        }
        

    });

    // Handle option selection
    items.forEach(item => {
        item.addEventListener("click", function () {
            btnText.textContent = this.textContent; // Update button text

            dropdown.classList.remove("active"); // Hide dropdown after selection
            submit.classList.add("change");
            


            
        });
    });
    submit.addEventListener("mouseenter",function(){
        if(submit.classList.contains("change")){
            torch.classList.add("glow");
            submit.removeAttribute("disabled");

        }
    });
   submit.addEventListener("mouseleave",function(){

    torch.classList.remove("glow");
   });
});
