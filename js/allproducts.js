const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-image");
const enquireBtn = document.getElementById("enquire-btn");
const closeBtn = document.querySelector(".close");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const images = document.querySelectorAll(".gallery-image");

let currentIndex = 0;

// Open modal
images.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    showImage(index);
    modal.style.display = "block";
  });
});

// Show image in modal
function showImage(index) {
  const selectedImg = images[index];
  modalImg.src = selectedImg.src;
  enquireBtn.href = `https://wa.me/254722436270?text=Hello%20Steve%20and%20Robert,%20I'm%20interested%20in%20this%20product:%20${encodeURIComponent(selectedImg.src)}`;
}

// Close modal
closeBtn.onclick = () => {
  modal.style.display = "none";
};

// Next button
nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
};

// Previous button
prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
};

// Close modal when clicking outside image
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Show/hide the button on scroll
window.addEventListener("scroll", () => {
    const btn = document.getElementById("backToTop");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  });
  
  // Scroll smoothly to top on click
  document.getElementById("backToTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
