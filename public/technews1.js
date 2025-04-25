
const info = document.querySelectorAll('.dot-3');


const apiKey3 = "pub_73352b97f01d3a9f88c4317c446c9abf20034"; // API Key
const newsContainer3 = document.getElementById("swiper-wrapper");
const prevButton3 = document.querySelector(".swiper-prev3");
const nextButton3 = document.querySelector(".swiper-next3");

let articles = [];
let visibleIndex = 0; // Controls which set of articles is shown
const maxArticles = 9; // Limit to 9 articles
const articlesPerPage = 3; // Show 3 articles at a time

async function fetchTechNews() {
    const apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey3}&q=tech%20launch&language=en&category=technology`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        articles = data.results.slice(0, maxArticles);
        createNewsCards();
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

// Function to truncate text after 35 words
function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
    //     return words.slice(0, wordLimit).join(" ") +'<p class="dot-3" >..read more</p>';

    info.innerHtml=words.slice(0, wordLimit).join(" ") +'<span class="dot-3" >...read more</span>';



     }
    return text;
}





function createNewsCards() {
    newsContainer3.innerHTML = ""; // Clear previous content

    articles.forEach((article) => {
        const newsItem = document.createElement("div");
        newsItem.classList.add("news-card3");

        const truncatedTitle = truncateText(article.title, 12); // Apply truncation
        newsItem.innerHTML = `
           <a> <p>${truncatedTitle}</p>  </a>
        `;




        // Make the entire card clickable
        newsItem.addEventListener("click", () => {
            window.open(article.link, "_blank");
        });

        newsContainer3.appendChild(newsItem);
    });

    updateCarousel3(); // Ensure the initial position is correct
}



function updateCarousel3() {
    const translateValue = -(visibleIndex / articlesPerPage) * 100 + "%";
    newsContainer3.style.transform = `translateX(${translateValue})`;

    // Disable Prev button at first slide
    prevButton3.disabled = visibleIndex === 0;

    // Disable Next button if at the last set of 3 articles
    nextButton3.disabled = visibleIndex + articlesPerPage >= articles.length;
}

// Handle Next button click
nextButton3.addEventListener("click", () => {
    if (visibleIndex + articlesPerPage < articles.length) {
        visibleIndex += articlesPerPage;
        updateCarousel3();
    }
});

// Handle Previous button click
prevButton3.addEventListener("click", () => {
    if (visibleIndex > 0) {
        visibleIndex -= articlesPerPage;
        updateCarousel3();
    }
});

// Fetch news on page load
fetchTechNews();