// /app.js ---- tech news

const apiKey = "dfe4830b-b35a-43fe-8980-78bd1e5d2961";  // Replace with your API key
let allNews = [];  
let currentIndex = 0;  
const newsContainer = document.getElementById("news-container");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");

async function fetchNews() {
    const apiUrl = `https://content.guardianapis.com/search?section=technology&page-size=15&api-key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        allNews = data.response.results;
        displayNews(); 
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}


// Function to truncate text after 35 words
function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(" ") + "...read more";
    }
    return text;
}


function displayNews() {
    newsContainer.innerHTML = "";

    allNews.forEach(article => {
        const newsItem = document.createElement("div");
        newsItem.classList.add("news-card");

        const truncatedTitle = truncateText(article.webTitle, 15); // Truncate title

        newsItem.innerHTML = `<a><p>${truncatedTitle}</p></a>`;

        // Make the whole card clickable
        newsItem.addEventListener("click", () => {
            window.open(article.webUrl, "_blank");
        });

        newsContainer.appendChild(newsItem);
    });

    updateCarousel();
}




function updateCarousel() {
    const translateValue = -currentIndex * (100 / 3) + "%";
    newsContainer.style.transform = `translateX(${translateValue})`;

    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex + 3 >= allNews.length;
}

// Handle Next button click
nextButton.addEventListener("click", () => {
    if (currentIndex + 3 < allNews.length) {
        currentIndex += 3;
        updateCarousel();
    }
});

// Handle Previous button click
prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex -= 3;
        updateCarousel();
    }
});

// Fetch news on page load
fetchNews();






