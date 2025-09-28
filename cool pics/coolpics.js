const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");

menuButton.addEventListener("click", () => {
  menu.classList.toggle("hide");
});

function handleResize() {
  if (window.innerWidth > 1000) {
    menu.classList.remove("hide");
  } else {
    menu.classList.add("hide");
  }
}

window.addEventListener("resize", handleResize);
window.addEventListener("load", handleResize);


function popupTemplate(src, alt) {
  return `
    <div class="popup" style="display:flex">
      <button class="close-popup">X</button>
      <img src="${src}" alt="${alt}">
    </div>
  `;
}


function viewHandler(event) {
  if (event.target.tagName === "IMG") {
    let src = event.target.getAttribute("src");
    let alt = event.target.getAttribute("alt");

    document.body.insertAdjacentHTML("afterbegin", popupTemplate(src, alt));

    
    document.querySelector(".close-popup")
      .addEventListener("click", closePopup);

 
    document.querySelector(".popup")
      .addEventListener("click", function(e) {
        if (e.target.classList.contains("popup")) {
          closePopup();
        }
      });
  }
}

function closePopup() {
  document.querySelector(".popup").remove();
}

document.querySelector(".gallery").addEventListener("click", viewHandler);
