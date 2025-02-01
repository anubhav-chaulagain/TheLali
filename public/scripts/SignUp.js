// Getting HTML element
const form = document.getElementById("signupForm");
const passwordField = document.getElementById("password");
const confirmPasswordField = document.getElementById("confirmPassword");



// Function to create and add the toggle icon
function addToggleIcon(field) {
  console.log(`Function is running for ${field}`)

  // Check if the icon already exists to avoid duplicates
  if (field.parentNode.querySelector(".togglePassword")) return;

  const toggleIcon = document.createElement("i");
  toggleIcon.classList.add("togglePassword");

  const lbl = document.createElement("label")
  const img = document.createElement("img");
  img.src = "/assets/icons/see.png"; 
  img.alt = "Toggle Password Visibility";

  toggleIcon.appendChild(img);

  // Add the click event listener to toggle password visibility
  toggleIcon.addEventListener("click", function() {togglePasswordVisibility(field,this)});
  field.parentNode.insertBefore(toggleIcon, field.nextElementSibling)
}

// Function to toggle password visibility
function togglePasswordVisibility(field, tg) {
  const img = tg.querySelector("img");
  img.style.transition = "opacity 0.5s";
  img.style.opacity = 0.5;

  // Wait for the fade-out to complete, then change the image source
  setTimeout(() => {
    if (field.type === "password") {
      field.type = "text";
      img.src = "/assets/icons/closed-eye.png";
    } else {
      field.type = "password";
      img.src = "/assets/icons/see.png";
    }
    // Fade in the new image
    img.style.opacity = 1;
  }, 200); 
}

// Event Listener
passwordField.addEventListener("keydown", function() {addToggleIcon(this)});
confirmPasswordField.addEventListener("keydown", function() {addToggleIcon(this)});

