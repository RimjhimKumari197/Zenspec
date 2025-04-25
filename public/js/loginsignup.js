const but1 = document.getElementById("but1");
const but2 = document.getElementById("but2");
const hiddenDiv_up = document.getElementById("hiddenDiv_up");
const hiddenDiv_down = document.getElementById("hiddenDiv_down");

but1.addEventListener("mouseenter", () => {
    but1.style.backgroundColor = "#FFF";
    but1.style.color =  "#000";
    but1.style.transition= "all 0.3s ease-in-out";
    but2.style.backgroundColor = "#4A4A4A";
    but2.style.color =  "#FFF";


    hiddenDiv_up.style.opacity = "1";
});

but1.addEventListener("mouseleave", () => {
    but1.style.backgroundColor = "#07F";
    but1.style.color =  "#FFF";
    but2.style.backgroundColor = "#FFF";
    but2.style.color =  "#000";
    hiddenDiv_up.style.opacity = "0";

});

but2.addEventListener("mouseenter", () => {
    
    but2.style.border ="5px solid #000";
    but2.style.transition= "all 0.3s ease-in-out";
    but1.style.backgroundColor = "#4A4A4A";
    hiddenDiv_down.style.opacity = "1";
});

but2.addEventListener("mouseleave", () => {
    but1.style.backgroundColor = "#07F";
    but1.style.color =  "#FFF";
     but2.style.animation= "dissolve";
    but2.style.border ="0px";
    but2.style.animation = "reverse";
    hiddenDiv_down.style.opacity = "0";
    
});
