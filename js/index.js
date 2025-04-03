// JavaScript (index.js)
const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");
const navList = document.getElementById("nav-list");
const hamburger = document.getElementById("hamburger");

searchBtn.addEventListener("click", () => {
  searchBar.classList.toggle("hidden");
  navList.classList.toggle("hidden");
});

hamburger.addEventListener("click", () => {
  navList.classList.toggle("nav-open");
});

var acc = document.getElementsByClassName("faq-accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

// Product Image Handling

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

  // Store the original image at index 0, then add the thumbnails
  let images = [mainImage.src, ...Array.from(thumbnails).map((img) => img.src)];
  let currentIndex = 0;

  function updateImage(index) {
    mainImage.src = images[index];

    // Update active dot
    dots.forEach((dot) => (dot.style.backgroundColor = "transparent"));
    dots[index].style.backgroundColor = "#000";

    currentIndex = index;
  }

  rightArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage(currentIndex);
  });

  leftArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage(currentIndex);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => updateImage(index));
  });

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => updateImage(index + 1)); // Offset by 1 since index 0 is original
  });

  updateImage(0); // Start with the original image
});

// Update Add to Card Button
document.addEventListener("DOMContentLoaded", function () {
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

  // Initialize the cart link on page load
  updateCartLink();
});

// Percentage Increase on View

document.addEventListener("DOMContentLoaded", function () {
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
    const rect = section.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      animateCounter("energy-percentage", 84);
      animateCounter("focused-percentage", 78);
      animateCounter("calmness-percentage", 89);
      animateCounter("wellness-percentage", 90);
      window.removeEventListener("scroll", checkVisibility);
    }
  }

  window.addEventListener("scroll", checkVisibility);
  checkVisibility();
});

// Reviews

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".review-carousel");
  const leftArrow = document.querySelector(
    ".review-header img[alt='Left Carousel']"
  );
  const rightArrow = document.querySelector(
    ".review-header img[alt='Right Carousel']"
  );

  function scrollCarousel(direction) {
    const scrollAmount = 300; // Adjust this based on card width
    carousel.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  }

  leftArrow.addEventListener("click", () => scrollCarousel(-1));
  rightArrow.addEventListener("click", () => scrollCarousel(1));

  // Enable horizontal scrolling with mouse wheel
  carousel.addEventListener("wheel", (event) => {
    event.preventDefault();
    carousel.scrollBy({ left: event.deltaY, behavior: "smooth" });
  });

  // Make the carousel scrollable
  carousel.style.display = "flex";
  carousel.style.overflowX = "auto";
  carousel.style.scrollSnapType = "x mandatory";
});
