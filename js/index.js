// Selecting DOM elements
const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");
const navList = document.getElementById("nav-list");
const hamburger = document.getElementById("hamburger");
const acc = document.getElementsByClassName("faq-accordion");

// Toggle search bar and navigation list visibility
searchBtn.addEventListener("click", () => {
  searchBar.classList.toggle("hidden");
  navList.classList.toggle("hidden");
});

// Toggle mobile navigation menu
hamburger.addEventListener("click", () => {
  navList.classList.toggle("nav-open");
});

// FAQ Accordion Functionality
Array.from(acc).forEach((accordion) => {
  accordion.addEventListener("click", function () {
    this.classList.toggle("active");
    const panel = this.nextElementSibling;
    panel.style.display = panel.style.display === "block" ? "none" : "block";
  });
});

// Product Image Carousel Functionality
document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.querySelector(".product-img");
  const thumbnails = document.querySelectorAll(".product-other-img img");
  const leftArrow = document.querySelector(
    ".carousel-options img:nth-child(2)"
  );
  const rightArrow = document.querySelector(
    ".carousel-options img:nth-child(4)"
  );
  const dots = document.querySelectorAll(".dot");

  let images = [mainImage.src, ...Array.from(thumbnails).map((img) => img.src)];
  let currentIndex = 0;

  function updateImage(index) {
    mainImage.src = images[index];
    dots.forEach((dot) => (dot.style.backgroundColor = "transparent"));
    dots[index].style.backgroundColor = "#000";
    currentIndex = index;
  }

  rightArrow.addEventListener("click", () =>
    updateImage((currentIndex + 1) % images.length)
  );
  leftArrow.addEventListener("click", () =>
    updateImage((currentIndex - 1 + images.length) % images.length)
  );

  dots.forEach((dot, index) =>
    dot.addEventListener("click", () => updateImage(index))
  );
  thumbnails.forEach((thumbnail, index) =>
    thumbnail.addEventListener("click", () => updateImage(index + 1))
  );

  updateImage(0);
});

// Update Add to Cart Button based on selected options
document.addEventListener("DOMContentLoaded", () => {
  const flavorOptions = document.querySelectorAll("input[name='flavor']");
  const subscriptionOptions = document.querySelectorAll(
    "input[name='subscription']"
  );
  const addToCartButton = document.querySelector(".add-to-cart");

  function updateCartLink() {
    const selectedFlavor = document.querySelector(
      "input[name='flavor']:checked"
    ).id;
    const selectedSubscription = document.querySelector(
      "input[name='subscription']:checked"
    ).id;
    const cartLink = `product.html?flavor=${selectedFlavor}&subscription=${selectedSubscription}`;
    addToCartButton.setAttribute(
      "onclick",
      `window.open('${cartLink}', '_blank')`
    );
  }

  flavorOptions.forEach((option) =>
    option.addEventListener("change", updateCartLink)
  );
  subscriptionOptions.forEach((option) =>
    option.addEventListener("change", updateCartLink)
  );
  updateCartLink();
});

// Percentage Counter Animation on Scroll
document.addEventListener("DOMContentLoaded", () => {
  function animateCounter(id, target) {
    let counter = 0;
    const element = document.getElementById(id);
    const increment = target / 100;

    const interval = setInterval(() => {
      counter += increment;
      element.textContent = Math.round(counter) + "%";
      if (counter >= target) {
        element.textContent = target + "%";
        clearInterval(interval);
      }
    }, 20);
  }

  function checkVisibility() {
    const section = document.querySelector(".percentage");
    if (section.getBoundingClientRect().top < window.innerHeight) {
      [
        { id: "energy-percentage", value: 84 },
        { id: "focused-percentage", value: 78 },
        { id: "calmness-percentage", value: 89 },
        { id: "wellness-percentage", value: 90 },
      ].forEach(({ id, value }) => animateCounter(id, value));

      window.removeEventListener("scroll", checkVisibility);
    }
  }

  window.addEventListener("scroll", checkVisibility);
  checkVisibility();
});

// Review Carousel Functionality
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".review-carousel");
  const leftArrow = document.querySelector(
    ".review-header img[alt='Left Carousel']"
  );
  const rightArrow = document.querySelector(
    ".review-header img[alt='Right Carousel']"
  );

  function scrollCarousel(direction) {
    const scrollAmount = 300;
    carousel.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  }

  leftArrow.addEventListener("click", () => scrollCarousel(-1));
  rightArrow.addEventListener("click", () => scrollCarousel(1));

  carousel.addEventListener("wheel", (event) => {
    event.preventDefault();
    carousel.scrollBy({ left: event.deltaY, behavior: "smooth" });
  });

  Object.assign(carousel.style, {
    display: "flex",
    overflowX: "auto",
    scrollSnapType: "x mandatory",
  });
});
