// hamburger menu
const icon = document.getElementById("hamburger-icon");
const menu = document.getElementById("menu");

document.onclick = function (e) {
  if (e.target.id !== "menu" && e.target.id !== "hamburger-icon") {
    icon.classList.remove("active");
    menu.classList.remove("active");
  }
};

icon.onclick = function () {
  icon.classList.toggle("active");
  menu.classList.toggle("active");
};

// scroll nav
window.addEventListener("scroll", function () {
  let header = document.querySelector("header");
  let position = this.window.scrollY > 0;
  header.classList.toggle("scroll-active", position);
});

// filter
let indicator = document.querySelector(".category").children;
let item = document.querySelector(".items").children;

for (let i = 0; i < indicator.length; i++) {
  indicator[i].onclick = function () {
    for (let x = 0; x < indicator.length; x++) {
      indicator[x].classList.remove("active-li");
    }
    this.classList.add("active-li");
    const displayItem = this.getAttribute("data-filter");
    for (let z = 0; z < item.length; z++) {
      item[z].style.width = "0";
      setTimeout(() => {
        item[z].style.display = "none";
      }, 500);
      if (
        item[z].getAttribute("data-category") == displayItem ||
        displayItem == "all"
      ) {
        item[z].style.width = "100%";
        setTimeout(() => {
          item[z].style.display = "flex";
        }, 500);
      }
    }
  };
}

// slider
const sliderContainer = document.querySelector(".slider-container");
const slider = document.querySelector(".slider");

let clicked = false;
let xAxis;
let u;

sliderContainer.addEventListener("mouseup", () => {
  sliderContainer.style.cursor = `grab`;
});
sliderContainer.addEventListener("mousedown", (e) => {
  clicked = true;
  xAxis = e.offsetX - slider.offsetLeft;
  sliderContainer.style.cursor = `grabbing`;
});

window.addEventListener("mouseup", () => {
  clicked = false;
});

sliderContainer.addEventListener("mousemove", (e) => {
  if (!clicked) return;
  e.preventDefault();
  u = e.offsetX;
  slider.style.left = `${u - xAxis}px`;
  checkSize();
});

function checkSize() {
  let sliderContainerOut = sliderContainer.getBoundingClientRect();
  let sliderIn = slider.getBoundingClientRect();

  if (parseInt(slider.style.left) > 0) {
    slider.style.left = `0px`;
  } else if (sliderIn.width < sliderContainerOut.width) {
    slider.style.left = `0px`;
  } else if (sliderIn.right < sliderContainerOut.right) {
    slider.style.left = `-${sliderIn.width - sliderContainerOut.width}px`;
  }
}
