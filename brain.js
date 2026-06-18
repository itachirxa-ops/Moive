// Grab the modal interface elements
const modal = document.getElementById("movieModal");
const closeBtn = document.querySelector(".close-btn");

const modalTitle = document.getElementById("modalTitle");
const modalRating = document.getElementById("modalRating");
const modalDesc = document.getElementById("modalDesc");

// Grab video container elements
const videoContainer = document.getElementById("videoContainer");
const modalVideo = document.getElementById("modalVideo");
const btnWatchNow = document.getElementById("btnWatchNow");

let currentVideoUrl = ""; // Stores the raw link from your card

// HELPER FUNCTION: Extracts the 11-character ID from a full YouTube Link
// REPLACE your old getYouTubeId function with this one:
// Search Bar Filter Feature
const searchInput = document.getElementById("movieSearch");

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const searchText = e.target.value.toLowerCase().trim();
    const movieCards = document.querySelectorAll(".movie-card");

    movieCards.forEach((card) => {
      // Get the title text from the data-title attribute
      const title = card.getAttribute("data-title").toLowerCase();

      if (title.includes(searchText)) {
        card.style.display = "block"; // Show matching movie
      } else {
        card.style.display = "none"; // Hide non-matching movie
      }
    });
  });
}
function getYouTubeId(url) {
  if (!url) return null;

  // This updated version safely reads hyphens (-) and underscores (_) inside video IDs
  let regExp =
    /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11})/;
  let match = url.match(regExp);

  return match && match[1] ? match[1] : null;
}

// Add event click listeners to all movie cards
document.querySelectorAll(".movie-card").forEach((card) => {
  card.addEventListener("click", () => {
    // Get the movie details from the data attributes
    const title = card.getAttribute("data-title");
    const rating = card.getAttribute("data-rating");
    const desc = card.getAttribute("data-desc");
    currentVideoUrl = card.getAttribute("data-video"); // Saves the video URL string

    // Reset the modal back to text details mode
    videoContainer.style.display = "none";
    modalVideo.src = "";
    modalDesc.style.display = "block";
    btnWatchNow.style.display = "block";

    // Insert the text content into the modal elements
    modalTitle.innerText = title;
    modalRating.innerText = rating;
    modalDesc.innerText = desc;

    // Show the pop-up modal
    modal.style.display = "flex";
  });
});

// Click action on the "Watch Now" button
btnWatchNow.addEventListener("click", (e) => {
  e.stopPropagation(); // Stop modal from closing accidentally

  // Convert the full URL into a clean ID code string
  const videoId = getYouTubeId(currentVideoUrl);

  if (videoId) {
    // Load the YouTube link into our iframe using the clean ID code
    modalVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    // Hide text info and reveal the video container frame
    videoContainer.style.display = "block";
    modalDesc.style.display = "none";
    btnWatchNow.style.display = "none";
  } else {
    alert("Invalid or missing video link for this card.");
  }
});

// Function to close modal safely and stop the video sound
function closeModal() {
  modal.style.display = "none";
  modalVideo.src = ""; // Clears video stream to stop background audio playback
}

// Close listeners
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});
// =========================================
// USER LOGIN POP-UP FEATURE
// =========================================
const loginModal = document.getElementById("loginModal");
const btnSignIn = document.getElementById("btnSignIn");
const closeLogin = document.getElementById("closeLogin");
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("usernameInput");

// Open Login Modal Box
btnSignIn.addEventListener("click", () => {
  if (btnSignIn.innerText === "Sign In") {
    loginModal.style.display = "flex";
  } else {
    // If already logged in, click acts as "Sign Out"
    btnSignIn.innerText = "Sign In";
    btnSignIn.style.backgroundColor = "#e50914";
    alert("You have successfully signed out.");
  }
});

// Close Login Modal Box
closeLogin.addEventListener("click", () => {
  loginModal.style.display = "none";
});

// Handle Login Submission Form
loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Stop page refresh

  const userValue = usernameInput.value.trim();

  if (userValue) {
    // Hide modal box
    loginModal.style.display = "none";
    // Change navbar login button text to show the active user's avatar profile name!
    btnSignIn.innerText = `Hi, ${userValue} 👤`;
    btnSignIn.style.backgroundColor = "#333"; // Dim down badge style

    // Reset form inputs inside
    loginForm.reset();
  }
});
// =========================================
// AUTOMATIC FEATURED HERO CAROUSEL INDEX
// =========================================
let currentSlideIndex = 0;
const slides = document.querySelectorAll(".hero-slide");

function advanceHeroSlider() {
  if (slides.length === 0) return;

  // Remove active state classification from current frame element
  slides[currentSlideIndex].classList.remove("active");

  // Compute next targeted step sequence circle index safely
  currentSlideIndex = (currentSlideIndex + 1) % slides.length;

  // Apply active transition rules onto next selected slide node element
  slides[currentSlideIndex].classList.add("active");
}

// Automatically change banner panels slide every 5000 milliseconds (5 seconds)
if (slides.length > 0) {
  setInterval(advanceHeroSlider, 5000);
}

// Global click handler helper function for Hero Slider play buttons
function openSliderTrailer(videoId) {
  const modal = document.getElementById("movieModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const videoContainer = document.getElementById("videoContainer");
  const modalVideo = document.getElementById("modalVideo");
  const btnWatchNow = document.getElementById("btnWatchNow");

  if (modal && videoId) {
    // Set placeholder data
    modalTitle.innerText = "Featured Trailer Playback";
    modalDesc.style.display = "none";
    btnWatchNow.style.display = "none";

    // Inject YouTube code track instantly inside hidden container
    modalVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    videoContainer.style.display = "block";

    // Present Modal
    modal.style.display = "flex";
  }
}
// =========================================
// LIGHT / DARK MODE THEME TOGGLE
// =========================================
const themeCheckbox = document.getElementById("themeCheckbox");
const themeLabel = document.getElementById("themeLabel");

if (themeCheckbox) {
  themeCheckbox.addEventListener("change", () => {
    // Toggle the 'light-theme' class modifier on the body tag element
    document.body.classList.toggle("light-theme");

    // Dynamically update the text label feedback string
    if (document.body.classList.contains("light-theme")) {
      themeLabel.innerText = "☀️ Light";
    } else {
      themeLabel.innerText = "🌙 Dark";
    }
  });
}
// =========================================
// WATCHLIST "MY LIST" FEATURE
// =============================
