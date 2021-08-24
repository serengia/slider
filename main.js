"use strict";

const slider = document.querySelector(".slider");
const slides = Array.from(document.querySelectorAll(".slide")); //Gives us an array  instead of nodelist
const buttons = document.querySelectorAll(".scroll-btn");

const getNextPrevSlide = function () {
  const currentSlide = document.querySelector(".slide.active");
  const currentSlideIndex = slides.indexOf(currentSlide);
  let nextSlide, prevSlide;

  if (currentSlideIndex === slides.length - 1) {
    nextSlide = slides[0];
  } else {
    nextSlide = slides[currentSlideIndex + 1];
  }

  if (currentSlide === slides[0]) {
    prevSlide = slides[slides.length - 1];
  } else {
    prevSlide = slides[currentSlideIndex - 1];
  }
  return [prevSlide, nextSlide];
};

const positionSlides = function () {
  const currentSlide = document.querySelector(".slide.active");
  const [prevSlide, nextSlide] = getNextPrevSlide();

  slides.forEach((slide) => {
    if (slide === currentSlide) {
      slide.style.transform = "translateX(0%)";
    } else if (slide === prevSlide) {
      slide.style.transform = "translateX(-100%)";
    } else if (slide === nextSlide) {
      slide.style.transform = "translateX(100%)";
    } else {
      slide.style.transform = "translateX(100%)";
    }
    slide.addEventListener("transitionend", () => {
      slide.classList.remove("top-slide");
    });
  });
};

positionSlides();

const getNextSlide = function () {
  //console.log("Getting next slide...");
  const currentSlide = document.querySelector(".slide.active");
  const [prevSlide, nextSlide] = getNextPrevSlide();
  currentSlide.style.transform = "translateX(-100%)";
  currentSlide.classList.add("top-slide");
  nextSlide.classList.add("top-slide");
  currentSlide.classList.remove("active");
  nextSlide.style.transform = "translateX(0)";
  nextSlide.classList.add("active");
};

const getPrevSlide = function () {
  //console.log("Getting previous slide...");
  const currentSlide = document.querySelector(".slide.active");
  const [prevSlide, nextSlide] = getNextPrevSlide();
  currentSlide.style.transform = "translateX(100%)";
  currentSlide.classList.remove("active");
  prevSlide.style.transform = "translateX(0)";
  prevSlide.classList.add("active");
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (button.classList.contains("scroll-btn-r")) getNextSlide();
    if (button.classList.contains("scroll-btn-l")) getPrevSlide();
  });
});
