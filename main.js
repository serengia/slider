"use strict";

const slider = document.querySelector(".slider");
const slides = Array.from(document.querySelectorAll(".slide")); //Gives us an array  instead of nodelist
const buttons = document.querySelectorAll(".btn");
const dotsContainer = document.querySelector(".dots");
 const sliderHeading = document.querySelector(".slider-heading");
        const sliderSubHeading = document.querySelector(".slider-sub-heading");
let timeoutId;

const textSlide = function (){
 
   slides.forEach(slide =>{
    sliderHeading.classList.remove("text-slide");
    sliderSubHeading.classList.remove("text-slide")
    slide.addEventListener("transitionend", (e)=>{
      if(slide.classList.contains("active")) {
          e.target.querySelector(".slider-heading").classList.add("text-slide");
       e.target.querySelector(".slider-sub-heading").classList.add("text-slide");
        console.log("This is the current slide.....");
      }
          
    })
  
   }) 
}





const getPrevNextSlides = function () {
  const currentSlide = document.querySelector(".slide.active");
  const currentSlideIndex = slides.indexOf(currentSlide);

  let prevSlide = slides[currentSlideIndex - 1];
  let nextSlide = slides[currentSlideIndex + 1];

  if (currentSlideIndex === slides.length - 1) {
    nextSlide = slides[0];
  }

  if (currentSlideIndex === 0) {
    prevSlide = slides[slides.length - 1];
  }

  return [prevSlide, nextSlide];
};


const setPositions = function () {
  const currentSlide = document.querySelector(".slide.active");
  const [prevSlide, nextSlide] = getPrevNextSlides();

  slides.forEach((slide) => {
    if (slide === currentSlide) {
      slide.style.transform = "translateX(0)";
    } else if (slide === prevSlide) {
      slide.style.transform = "translateX(-100%)";
    } else if (slide === nextSlide) {
      slide.style.transform = "translateX(100%)";
    } else {
      slide.style.transform = "translateX(100%)";
    }

    // Removing top-slide class and adding text effects after transition

    slide.addEventListener("transitionend", () => {
      slide.classList.remove("top-slide");

    });
 
  });

  textSlide()
};

// Initialization
setPositions();

const getNextSlide = function () {
  clearTimeout(timeoutId);

  const currentSlide = document.querySelector(".slide.active");
  const [prevSlide, nextSlide] = getPrevNextSlides();

  if (currentSlide.classList.contains("top-slide")) return;

  currentSlide.classList.remove("active");
  currentSlide.classList.add("top-slide");
  currentSlide.style.transform = "translateX(-100%)";

  nextSlide.classList.add("active");
  nextSlide.classList.add("top-slide");
  nextSlide.style.transform = "translateX(0%)";

  //Setting positions after transition
  setPositions();
  textSlide()
  getActiveDot();
  autoloop();

};

const getPrevSlide = function () {
  clearTimeout(timeoutId);
  const currentSlide = document.querySelector(".slide.active");
  const [prevSlide, nextSlide] = getPrevNextSlides();

  if (currentSlide.classList.contains("top-slide")) return;

  currentSlide.classList.remove("active");
  currentSlide.classList.add("top-slide");
  currentSlide.style.transform = "translateX(100%)";

  prevSlide.classList.add("active");
  prevSlide.classList.add("top-slide");
  prevSlide.style.transform = "translateX(0%)";

  //Setting positions after transition
  setPositions();
  getActiveDot();
  autoloop();
};

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (btn.classList.contains("btn-right")) getNextSlide();
    if (btn.classList.contains("btn-left")) getPrevSlide();
  });
});

const createDots = function () {
  slides.forEach((slide) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dotsContainer.appendChild(dot);
  });
};

createDots();

function getActiveDot() {
  const currentSlide = document.querySelector(".slide.active");
  const currentSlideIndex = slides.indexOf(currentSlide);
  const allDots = document.querySelectorAll(".dots .dot");

  //adding active class to active dot
  const activeDot = allDots[currentSlideIndex];
  //remove active dot class from all dots and only add it to the active dot
  allDots.forEach((dot) => {
    dot.classList.remove("active");
  });
  activeDot.classList.add("active");
}
getActiveDot();

function functionalDots() {
  const allDots = document.querySelectorAll(".dots .dot");
  allDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      getDotSlide(index);
    });
  });
}

function getDotSlide(index) {
  clearTimeout(timeoutId);

  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  slides[index].classList.add("active");
  setPositions();
  getActiveDot();
  autoloop();
}

functionalDots();

// AUTO LOOP
function autoloop() {
  timeoutId = setTimeout(() => {
    getNextSlide();


  }, 3000);
}

autoloop();
