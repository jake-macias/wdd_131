const missionParagraph = document.createElement("p");
missionParagraph.innerText =
  "BYU–Idaho provides a high-quality education that fosters faith, integrity, and excellence, preparing students for lifelong learning, leadership, and service.";
document.body.appendChild(missionParagraph);

const newImage = document.createElement("img");
newImage.setAttribute("alt", "BYU–Idaho Logo");
newImage.src = "logo.png";
document.body.appendChild(newImage);

const values = ["Faith", "Integrity", "Excellence"];

const valuesDiv = document.createElement("div");
valuesDiv.innerHTML = `
  <h3>Our Values</h3>
  <ul>
    <li>${values[0]}</li>
    <li>${values[1]}</li>
    <li>${values[2]}</li>
  </ul>
`;
document.body.appendChild(valuesDiv);

const themeSelector = document.querySelector("#theme"); 

function changeTheme() {
  if (themeSelector.value === "dark") {
    document.body.classList.add("dark");
    newImage.src = "logo.png";
  } else {
    document.body.classList.remove("dark");
    newImage.src = "logo.png";
  }
}

themeSelector.addEventListener("change", changeTheme);
