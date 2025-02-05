document.addEventListener("DOMContentLoaded", () => {
  const slidesContainer = document.querySelector(".carousel__slides");
  const slides = document.querySelectorAll(".carousel__slide");
  const prevBtn = document.querySelector(".carousel__prev");
  const nextBtn = document.querySelector(".carousel__next");
  const thumbnails = document.querySelectorAll(
    ".carousel__thumbnails img"
  );
  let currentIndex = 0;

  updateCarousel();
  function updateCarousel() {
    slidesContainer.style.transform = `translateX(-${
      currentIndex * 100
    }%)`;
    thumbnails.forEach((thumb) => thumb.classList.remove("active"));
    thumbnails[currentIndex].classList.add("active");
  }

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      currentIndex = parseInt(thumb.dataset.index);
      updateCarousel();
    });
  });
});