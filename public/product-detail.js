function updateAllWishlistIcons(productId, category, isClicked) {
  document.querySelectorAll(`.wishlist-wrapper[data-id="${productId}"][data-category="${category}"]`).forEach(el => {
    const icon = el.querySelector(".wishlist-icon");
    el.classList.toggle("clicked", isClicked);
    icon.src = isClicked ? "/detail-wishlist3.png" : "/detail-wishlist1.png";
  });
}

document.querySelectorAll(".wishlist-wrapper").forEach((group) => {
  group.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const productId = group.dataset.id;
    const category = group.dataset.category;

    const res = await fetch("/wishlist/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, category })
    });

    const data = await res.json();
    const isClicked = data.action === "added";
    updateAllWishlistIcons(productId, category, isClicked);
  });
});
