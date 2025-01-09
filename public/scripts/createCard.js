
function createCard() { // add details of the property

    const propertyCardContainer = document.querySelector(".property-card-container");
    
    // Create the card element
    const card = document.createElement("div");
    card.classList.add("card");
    
    // Create the card-image container
    const cardImage = document.createElement("div");
    cardImage.classList.add("card-image");
    
    const img = document.createElement("img");
    img.src = "/assets/images/house1.jpg"; //house photo
    img.alt = "House Image";
    
    cardImage.appendChild(img);
    
    // Create the card-description container
    const cardDescription = document.createElement("div");
    cardDescription.classList.add("card-description");
    
    const price = document.createElement("p");
    price.id = "price";
    price.textContent = "1 Lakh";
    
    const propertyDescription = document.createElement("p");
    propertyDescription.id = "property-description";
    propertyDescription.textContent = "aldkfldjaflasdjkflj";
    
    const propertyId = document.createElement("p");
    propertyId.textContent = "Property ID: 123456";
    
    const propertyLocation = document.createElement("p");
    propertyLocation.id = "property-location";
    propertyLocation.textContent = "Bhanesword | KTM";
    
    const additionalDetails = document.createElement("div");
    additionalDetails.classList.add("additional-details");
    
    const detailsList = document.createElement("ul");
    
    // Create details items
    const detailsData = [
        {
        iconSrc: "/assets/icons/land-area.png", //fixed image
        value: "6.5",
        unit: "Aana",
        },
        {
        iconSrc: "/assets/icons/road-area.png", //fixed image
        value: "20",
        unit: "Feet",
        },
        {
        iconSrc: "/assets/icons/bedroom-icon.png", //fixed image
        value: "2",
        unit: "",
        },
    ];
    
    detailsData.forEach((detail) => {
        const listItem = document.createElement("li");
    
        const iconSpan = document.createElement("span");
        iconSpan.classList.add("icon");
    
        const iconImg = document.createElement("img");
        iconImg.src = detail.iconSrc;
        iconImg.alt = detail.unit;
    
        iconSpan.appendChild(iconImg);
    
        const valueSpan = document.createElement("span");
        valueSpan.textContent = `${detail.value} `;
    
        if (detail.unit) {
        const small = document.createElement("small");
        small.textContent = detail.unit;
        valueSpan.appendChild(small);
        }
    
        listItem.appendChild(iconSpan);
        listItem.appendChild(valueSpan);
    
        detailsList.appendChild(listItem);
    });
    
    additionalDetails.appendChild(detailsList);
    
    // Append all elements to cardDescription
    cardDescription.appendChild(price);
    cardDescription.appendChild(propertyDescription);
    cardDescription.appendChild(propertyId);
    cardDescription.appendChild(propertyLocation);
    cardDescription.appendChild(additionalDetails);
    
    // Append cardImage and cardDescription to card
    card.appendChild(cardImage);
    card.appendChild(cardDescription);
    
    // Append the card to the container
    propertyCardContainer.appendChild(card);
}