let allGridItems = [...document.getElementsByClassName("grid-item")];
let popupBg = document.getElementById("popup-bg");
let popupImg = document.getElementById("popup-img");
let popupContent = document.getElementById("popup-content");
let popupClose = document.getElementById("popup-close");
let popupTitle = document.getElementById("popup-title");
let popupPrev = document.getElementById("popup-prev");
let popupNext = document.getElementById("popup-next");
let currentImageIndex = -1;

const showImageAtIndex = (index) => {
  if (!popupImg || !popupTitle || allGridItems.length === 0) return;

  const totalImages = allGridItems.length;
  const normalizedIndex = (index + totalImages) % totalImages;
  const imageId = allGridItems[normalizedIndex].id.replace(/\\/g, "/");
  const imageFileName = imageId.split("/").pop();

  currentImageIndex = normalizedIndex;
  popupImg.src = `images/${imageId}.webp`;
  popupTitle.textContent = `${imageFileName}.jpg`;
};

const openPopup = (e) => {
  let gridItemClicked = e.target.closest(".grid-item");
  if (!gridItemClicked || !popupBg || !popupImg) return;
  let clickedIndex = allGridItems.indexOf(gridItemClicked);
  if (clickedIndex < 0) return;

  popupBg.classList.add("active");
  showImageAtIndex(clickedIndex);
};

const closePopup = () => {
  if (!popupBg || !popupImg) return;
  popupBg.classList.remove("active");
  popupImg.src = "#";
  currentImageIndex = -1;
  if (popupTitle) {
    popupTitle.textContent = "image.jpg";
  }
};

const showPreviousImage = () => {
  if (!popupBg || !popupBg.classList.contains("active") || currentImageIndex < 0) return;
  showImageAtIndex(currentImageIndex - 1);
};

const showNextImage = () => {
  if (!popupBg || !popupBg.classList.contains("active") || currentImageIndex < 0) return;
  showImageAtIndex(currentImageIndex + 1);
};

allGridItems.forEach((el) => el.addEventListener("click", openPopup));

if (popupImg) {
  popupImg.addEventListener("click", (e) => e.stopPropagation());
}

if (popupContent) {
  popupContent.addEventListener("click", (e) => e.stopPropagation());
}

if (popupClose) {
  popupClose.addEventListener("click", closePopup);
}

if (popupPrev) {
  popupPrev.addEventListener("click", showPreviousImage);
}

if (popupNext) {
  popupNext.addEventListener("click", showNextImage);
}

if (popupBg) {
  popupBg.addEventListener("click", closePopup);
}

// Close popup with the Escape key
document.addEventListener("keydown", (e) => {
  if (popupBg && popupBg.classList.contains("active") && e.key === "ArrowLeft") {
    showPreviousImage();
    return;
  }

  if (popupBg && popupBg.classList.contains("active") && e.key === "ArrowRight") {
    showNextImage();
    return;
  }

  if (popupBg && e.key === "Escape" && popupBg.classList.contains("active")) {
    closePopup();
  }
});