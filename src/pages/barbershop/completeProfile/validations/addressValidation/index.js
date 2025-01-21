mapboxgl.accessToken =
  "pk.eyJ1IjoiYmFyYmVybWF0ZSIsImEiOiJjbTYxejBsZWQwdmh2MnFzYjB2cnBkaDU2In0.C1wsnCHgwl-wSUwZFpCDYw";

const addressInput = document.getElementById("address");
const suggestionsList = document.getElementById("suggestionsID");

addressInput.addEventListener("input", function () {
  const inputValue = addressInput.value;
  if (!inputValue) {
    suggestionsList.innerHTML = "";
    suggestionsList.style.display = "none";
    return;
  }

  // Call a function to update suggestions based on the address.
  updateSuggestions(inputValue);
});

// Close suggestions when the address input loses focus
addressInput.addEventListener("blur", function () {
  // Use a timeout to allow the click event on the suggestions to register before hiding
  setTimeout(() => {
    suggestionsList.innerHTML = "";
    suggestionsList.style.display = "none";
  }, 200);
});

// Show suggestions again when the address input gains focus
addressInput.addEventListener("focus", function () {
  if (addressInput.value) {
    updateSuggestions(addressInput.value);
  }
});

// Function to update suggestions
function updateSuggestions(address) {
  fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=${mapboxgl.accessToken}`
  )
    .then((response) => response.json())
    .then((data) => {
      suggestionsList.innerHTML = "";

      if (data.features.length > 0) {
        data.features.forEach((feature) => {
          const suggestionItem = document.createElement("li");

          const streetNameSpan = document.createElement("span");
          streetNameSpan.className = "street-name";
          streetNameSpan.textContent = feature.place_name.split(",")[0];

          const restOfTextSpan = document.createElement("span");
          restOfTextSpan.className = "rest-of-text";
          restOfTextSpan.textContent = feature.place_name.substring(
            feature.place_name.indexOf(",") + 1
          );

          suggestionItem.appendChild(streetNameSpan);
          suggestionItem.appendChild(document.createTextNode(", "));
          suggestionItem.appendChild(restOfTextSpan);

          suggestionItem.addEventListener("click", function () {
            addressInput.value = feature.place_name;
            suggestionsList.innerHTML = "";
            suggestionsList.style.display = "none";
          });

          suggestionsList.appendChild(suggestionItem);
        });

        suggestionsList.style.display = "block";
      } else {
        suggestionsList.style.display = "none";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
