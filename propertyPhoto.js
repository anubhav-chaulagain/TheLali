const imageList = document.querySelector(".image-list");
const inputFile = document.getElementById("upload");
const button = document.querySelector("button");
const label = document.querySelector("label");

var arrayOfImage = new Array();

inputFile.onchange = function () {
  const files = Array.from(inputFile.files);

  button.style.display = "block";
  // Iterate through all selected files
  files.forEach((file) => {
    const uploadedImg = URL.createObjectURL(file);
    const img = document.createElement("img");
    img.src = uploadedImg;
    img.alt = "Uploaded Image";
    img.style.width = "150px";
    img.style.margin = "10px";
    imageList.appendChild(img);

    arrayOfImage.push(file);
  });

  console.log(arrayOfImage);
};

button.addEventListener("click", () => {
  const thumb = arrayOfImage[0];
  console.log(thumb);
  const thumbUrl = URL.createObjectURL(thumb); // Create a URL for the image
  label.style.backgroundImage = `url(${thumbUrl})`;
  label.style.backgroundSize = "cover"; // Optional: Make the image cover the entire background
  label.style.backgroundRepeat = "no-repeat"; // Optional: Prevent tiling
  label.style.backgroundPosition = "center"; // Optional: Center the image
  console.log(`Background changed to: ${thumb}`);
    });