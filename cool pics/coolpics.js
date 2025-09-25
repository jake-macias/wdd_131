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

function viewerTemplate(src, alt) {
  return `
    <div class="viewer">
      <button class="close-viewer">X</button>
      <img src="${src}" alt="${alt}">
    </div>
  `;
}

function viewHandler(event) {
  if (event.target.tagName === "IMG") {
    let src = event.target.getAttribute("src");
    let alt = event.target.getAttribute("alt");

    document.body.insertAdjacentHTML("afterbegin", viewerTemplate(src, alt));

    document.querySelector(".close-viewer")
      .addEventListener("click", closeViewer);
  }
}

function closeViewer() {
  document.querySelector(".viewer").remove();
}

document.querySelector(".gallery").addEventListener("click", viewHandler);
