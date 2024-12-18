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

// Event Listener
passwordField.addEventListener("keydown", function() {addToggleIcon(this)});
confirmPasswordField.addEventListener("keydown", function() {addToggleIcon(this)});


function validCredential(){
  for (const input of formInputs) {
    if (input.value === "") {
      alert("All input fields must be filled");
      break; // Exit the loop
    }
  }

  

}

signUpBtn.addEventListener("click", (event) => {
    console.log("Account created successfully")
    validCredential();
    // console.log(`Username : ${usernameField.value}`)
    // console.log(`Contact No : ${contactField.value}`)
    // console.log(`Email: ${emailField.value}`)
    // console.log(`Password: ${passwordField.value}`)
    // console.log(`Confirm Password: ${confirmPasswordField.value}`)
    // console.log(`Recovery Email: ${recoveryEmailField.value}`)
    event.preventDefault()
})