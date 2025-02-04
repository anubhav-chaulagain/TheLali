const imageList = document.querySelector(".image-list");
const inputFile = document.getElementById("upload");

var arrayOfImage = new Array();

inputFile.onchange = function () {
  if(arrayOfImage.length > 6){
    // alert("You can only upload 6 images");
  }
  const files = Array.from(inputFile.files);
  
  files.forEach((file) => {
    const uploadedImg = URL.createObjectURL(file);
    const li = document.createElement("li");
    li.innerHTML = file.name;
    // const img = document.createElement("img");
    // img.src = uploadedImg;
    // img.alt = "Uploaded Image";
    // img.style.width = "150px";
    // img.style.margin = "10px";
    imageList.appendChild(li);
    
    arrayOfImage.push(file.name);
    // arrayOfImage.push(file);
  });

  console.log(arrayOfImage);
  // console.log(arrayOfImage);
  // const thumbnail = arrayOfImage[0]
  // console.log(`Thumbnail element: ${thumbnail.name}`);
};
