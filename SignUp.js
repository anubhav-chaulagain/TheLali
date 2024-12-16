const passwordField = document.getElementById("password");
const confirmPasswordField = document.getElementById("confirmPassword");
const form = document.getElementById("signupForm");
const signUpBtn = document.querySelector("button")


// Function to create and add the toggle icon
function addToggleIcon(field) {
  console.log(`Function is running for ${field}`)

  // Check if the icon already exists to avoid duplicates
  if (field.parentNode.querySelector(".togglePassword")) return;

//   // Create the <i> element
  const toggleIcon = document.createElement("i");
  toggleIcon.classList.add("togglePassword");

  // Add an <img> inside the <i> element
  const lbl = document.createElement("label")
  const img = document.createElement("img");
  img.src = "icons/see.png"; 
  img.alt = "Toggle Password Visibility";

  // Append the image to the <i> element
  toggleIcon.appendChild(img);

  // Add the click event listener to toggle password visibility
  toggleIcon.addEventListener("click", function() {togglePasswordVisibility(field,this)});

  // Insert the icon after the password field
  field.parentNode.insertBefore(toggleIcon, field.nextElementSibling)
}

// Function to toggle password visibility
function togglePasswordVisibility(field, tg) {
  if (field.type === "password") {
    field.type = "text";
    console.log(tg.querySelector('img'))
    tg.querySelector("img").src = "icons/closed-eye.png" 
  } else {
    field.type = "password";
    tg.querySelector("img").src = "icons/see.png" 
  }
}

// Add focus event listener to the password field
passwordField.addEventListener("focus", function() {addToggleIcon(this)}) // Using arrow function so that function doesn't execute immediately
confirmPasswordField.addEventListener("focus", function() {addToggleIcon(this)});


signUpBtn.addEventListener("click", (event) => {
    console.log("Account created successfully")
    event.preventDefault()
})