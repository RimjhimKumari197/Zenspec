const products=["Motorola Moto G62 5G",
    "Xiaomi Redmi 13C 5G",
    "Realme Narzo N61",
    "Oppo A3x 5G",
    "Samsung Galaxy F06 5G",
    "vivo Y21",
    "Motorola Edge 50 Fusion",
    "vivo T4x",
    "CMF by Nothing Phone 1",
    "Samsung Galaxy M35 5G",
    "Realme P3 5G",
    "iQOO Z9 5G",
    "Nothing Phone 3a",
    "Motorola Edge 50 Neo",
    "iQOO Neo 10R",
    "OnePlus Nord 4",
    "Samsung Galaxy A35 5G",
    "Nothing Phone 3a Pro",
    "OnePlus 12R",
    "Samsung Galaxy S24 FE",
    "Samsung Galaxy S23",
    "Realme GT 6",
    "OnePlus 13R",
    "Motorola Edge 50 Ultra",
    "Samsung Galaxy S25",
    "Apple iPhone 16",
    "Samsung Galaxy S25 Ultra",
    "OnePlus 13",
    "Apple iPhone 16 Pro Max",
    "iQOO 13",
    "Samsung Galaxy Z Fold6",
    "Google Pixel 9 Pro XL",
    "Google Pixel 9",
    "Xiaomi 15",
    "Realme GT 7 Pro",
   "Samsung Galaxy Book 4 Pro",
    "Lenovo IdeaPad Slim 3",
    "Acer Predator Helios Neo 16",
    "Asus Vivobook 14 (X1402)",
    "Dell Inspiron 14 (5410)",
    "Asus Vivobook S 15 OLED",
    "Apple MacBook Air (M1)",
    "Samsung Galaxy Book 4",
    "Apple MacBook Air (M2)",
    "Asus Zenbook 14 (2025)",
    "Samsung Galaxy Book5 Pro",
    "Asus TUF Gaming F15 (2023)",
    "Dell Alienware m16 R2",
    "Apple MacBook Air (M4)",
    "Lenovo V110"
  ];
  const normalize = str =>
    str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, ' ').trim();
  
  function setupSuggestions(inputSelector, suggestionBoxId) {
    const input = document.querySelector(inputSelector);
    const suggestionBox = document.getElementById(suggestionBoxId);
  
    input.addEventListener('input', () => {
      const query = normalize(input.value);
      suggestionBox.innerHTML = '';
  
      if (query.length === 0) return;
  
      const filtered = products.filter(product =>
        normalize(product).includes(query)
      );
  
      filtered.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('suggestion-item');
        div.textContent = product;
        div.addEventListener('click', () => {
          input.value = product;
          suggestionBox.innerHTML = '';
        });
        suggestionBox.appendChild(div);
      });
    });
  
    document.addEventListener('click', (e) => {
      if (!e.target.closest(`#${suggestionBoxId}`) && !e.target.closest(inputSelector)) {
        suggestionBox.innerHTML = '';
      }
    });
  }
  
  // Set up both inputs
  setupSuggestions(".search-input", "suggestions1");
  const input = document.querySelector('.search-input');
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      const query = input.value;
      if (query) {
        window.location.href = `/search?searchquery=${encodeURIComponent(query)}`;
      }
    }
  });
  