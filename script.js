
// Toggle Login Form
function toggleLoginForm() {
  const loginModal = document.getElementById("login-modal");
  loginModal.classList.toggle("active");
  // Clear any previous error messages
  document.getElementById("login-error").innerText = "";
  // Clear input fields when opening
  if (loginModal.classList.contains("active")) {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  }
}

// Close login modal when clicking outside
document.addEventListener("DOMContentLoaded", function () {
  const loginModal = document.getElementById("login-modal");
  loginModal.addEventListener("click", function (e) {
    if (e.target === loginModal) {
      toggleLoginForm();
    }
  });

  // Close game modal when clicking outside
  const gameModal = document.getElementById("game-modal");
  gameModal.addEventListener("click", function (e) {
    if (e.target === gameModal) {
      closeGameModal();
    }
  });
});

// Initialize game function
function initializeGame() {
  // Get DOM elements
  const gameContainer = document.querySelector(".container"),
    userResult = document.querySelector(".user_result img"),
    cpuResult = document.querySelector(".cpu_result img"),
    result = document.querySelector(".result"),
    optionImages = document.querySelectorAll(".option_image");

  // Loop through each option image element
  optionImages.forEach((image, index) => {
    image.addEventListener("click", (e) => {
      image.classList.add("active");

      userResult.src = cpuResult.src = "rock.png";
      result.textContent = "Wait...";

      // Loop through each option image again
      optionImages.forEach((image2, index2) => {
        // If the current index doesn't match the clicked index
        // Remove the "active" class from the other option images
        index !== index2 && image2.classList.remove("active");
      });

      gameContainer.classList.add("start");

      // Set a timeout to delay the result calculation
      let time = setTimeout(() => {
        gameContainer.classList.remove("start");

        // Get the source of the clicked option image
        let imageSrc = e.target.querySelector("img").src;
        // Set the user image to the clicked option image
        userResult.src = imageSrc;

        // Generate a random number between 0 and 2
        let randomNumber = Math.floor(Math.random() * 3);
        // Create an array of CPU image options
        let cpuImages = ["rock.png", "paper.png", "scissors.png"];
        // Set the CPU image to a random option from the array
        cpuResult.src = cpuImages[randomNumber];

        // Assign a letter value to the CPU option (R for rock, P for paper, S for scissors)
        let cpuValue = ["R", "P", "S"][randomNumber];
        // Assign a letter value to the clicked option (based on index)
        let userValue = ["R", "P", "S"][index];

        // Create an object with all possible outcomes
        let outcomes = {
          RR: "Draw",
          RP: "Cpu",
          RS: "You",
          PP: "Draw",
          PR: "You",
          PS: "Cpu",
          SS: "Draw",
          SR: "Cpu",
          SP: "You",
        };

        // Look up the outcome value based on user and CPU options
        let outComeValue = outcomes[userValue + cpuValue];

        // Display the result
        result.textContent = userValue === cpuValue ? "Match Draw" : `${outComeValue} Won!!`;
      }, 2500);
    });
  });
}
// login.js
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  // Dummy credentials (replace with real auth in production)
  const validUser = "player1";
  const validPass = "rps123";

  if (username === validUser && password === validPass) {
    localStorage.setItem("loggedInUser", username);
    // Close login modal
    toggleLoginForm();
    showGame();
  } else {
    document.getElementById("login-error").innerText = "Invalid credentials!";
  }
}

function showGame() {
  const user = localStorage.getItem("loggedInUser");
  if (user) {
    // Remove active class from login modal (hide it without display: none)
    document.getElementById("login-modal").classList.remove("active");
    
    // Hide navbar and landing page
    document.querySelector(".navbar").style.display = "none";
    document.querySelector(".landing-page").style.display = "none";
    
    // Show game modal
    document.getElementById("game-modal").classList.add("active");
    document.getElementById("user-display").innerText = user;
    
    // Initialize game after showing the game modal
    initializeGame();
  }
}

// Close game modal function
function closeGameModal() {
  // Hide game modal
  document.getElementById("game-modal").classList.remove("active");
  
  // Show navbar and landing page
  document.querySelector(".navbar").style.display = "flex";
  document.querySelector(".landing-page").style.display = "flex";
}

// Auto-login if already logged in
window.addEventListener("load", showGame);

function logout() {
  localStorage.removeItem("loggedInUser");
  // Close game modal and restore landing page
  closeGameModal();
}