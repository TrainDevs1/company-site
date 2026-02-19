const slider = document.querySelector('.slider');
const prevButton = document.getElementById('left-btn');
const nextButton = document.getElementById('right-btn');
let currentIndex = 0;
const totalItems = document.querySelectorAll('.p').length;
let itemWidth; // each child div width in vw
function setItemWidth() {
  if (window.innerWidth <= 768) {
    itemWidth = 80; // Mobile
  } else {
    itemWidth = 40; // Laptop or larger
  }
}

// Call on load
setItemWidth();

// Listen for orientation change or resize
window.addEventListener("resize", setItemWidth);
window.addEventListener("orientationchange", setItemWidth);

// Function to move the slider to the left
function moveSliderLeft() {
  if (currentIndex > 0) {
    currentIndex--;
    updateSliderPosition();
  }
}

// Function to move the slider to the right
function moveSliderRight() {
  if (currentIndex < totalItems - 1) {
    currentIndex++;
    updateSliderPosition();
  }
}

// Update the position of the slider
function updateSliderPosition() {
  const offset = -(currentIndex * itemWidth);
  slider.style.transform = `translateX(${offset}vw)`;
}

// Event listeners for the buttons
prevButton.addEventListener('click', moveSliderLeft);
nextButton.addEventListener('click', moveSliderRight);


document.getElementById('menuopen').addEventListener("click", (event)=>{

    event.preventDefault();
    let menu = document.getElementById('menu');
    if (menu.style.display == "flex") {
        menu.style.display = "none"; 
    } else {
        menu.style.display = "flex"; 
    }
    menu.addEventListener("click",()=>{
        menu.style.display = "none";
    })  
})
