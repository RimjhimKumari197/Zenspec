document.addEventListener("DOMContentLoaded", function () {
    const userIcon = document.querySelector(".user img"); // Profile image (logo)
    const dropdownProfile = document.getElementById("dropdown-content-profile");
    const dropdownprofile2=document.querySelector(".dropdown-profile");

    if (!userIcon || !dropdownProfile) {
        console.error("User icon or dropdown profile not found!");
        return;
    }

    userIcon.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevents the event from bubbling up

        // Toggle dropdown visibility
        if (dropdownProfile.style.display === "block") {
            dropdownProfile.style.display = "none"; // Close dropdown
            dropdownprofile2.style.display="none";

        } else {
            dropdownProfile.style.display = "block"; // Open dropdown
            dropdownprofile2.style.display="block";
        }
    });

   
});