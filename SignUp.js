// Getting HTML element
const form = document.getElementById("signupForm");
const signUpBtn = document.querySelector("button")

const usernameField = document.getElementById("username");
const contactField = document.getElementById("contactNo");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const confirmPasswordField = document.getElementById("confirmPassword");
const recoveryEmailField = document.getElementById("RecoveryEmail");
const formInputs = document.querySelectorAll("input")

// Function to create and add the toggle icon
function addToggleIcon(field) {
  console.log(`Function is running for ${field}`)

  // Check if the icon already exists to avoid duplicates
  if (field.parentNode.querySelector(".togglePassword")) return;

  const toggleIcon = document.createElement("i");
  toggleIcon.classList.add("togglePassword");

  const lbl = document.createElement("label")
  const img = document.createElement("img");
  img.src = "icons/see.png"; 
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
      img.src = "icons/closed-eye.png";
    } else {
      field.type = "password";
      img.src = "icons/see.png";
    }
    // Fade in the new image
    img.style.opacity = 1;
  }, 200); 
}

// Event Listener
passwordField.addEventListener("keydown", function() {addToggleIcon(this)});
confirmPasswordField.addEventListener("keydown", function() {addToggleIcon(this)});


function validCredential(){
  // Check for empty fields
  for (const input of formInputs) {
    if (input.value === "") {
      alert("All input fields must be filled");
      return; 
    }
  }

  // Check for valid email
  if (!emailField.value.includes("@gmail.com")) {
    alert("Email is not valid")
    return
  }

  // Check for valid recovery email
  if (!recoveryEmailField.value.includes("@gmail.com")) {
    alert("Recovery Email is not valid")
    return
  }

  // Check if email and recovery email are same
  if (recoveryEmailField.value == emailField.value) {
    alert("Email and Recovery email cannot be same")
    return
  }

  // Check if password and confirm password are same
  if (passwordField.value != confirmPasswordField.value) {
    alert("Password and Confirm password field are not same")
    return
  }  

}

signUpBtn.addEventListener("click", (event) => {
    console.log("Account created successfully")
    validCredential();
    event.preventDefault()
})