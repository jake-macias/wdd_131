const recipes = [
    {
      id: 1,
      name: "Tacos al Pastor",
      image: "images/tacos.jpg",
      tags: ["street food", "pork"],
      description: "Tacos de cerdo marinados con piña, cebolla y cilantro."
    },
    {
      id: 2,
      name: "Guacamole",
      image: "images/guacamole.jpg",
      tags: ["vegetarian"],
      description: "Aguacate con limón, cebolla, jitomate y chile."
    },
    {
      id: 3,
      name: "Enchiladas Verdes",
      image: "images/enchiladas.jpg",
      tags: ["chicken"],
      description: "Tortillas rellenas de pollo bañadas en salsa verde."
    },
    {
      id: 4,
      name: "Pozole Rojo",
      image: "images/pozole.jpg",
      tags: ["pork"],
      description: "Caldo tradicional con maíz y carne de cerdo."
    },
    {
      id: 5,
      name: "Elotes Asados",
      image: "images/elotes.jpg",
      tags: ["street food", "vegetarian"],
      description: "Elotes asados con mayonesa, queso y chile en polvo."
    },
    {
      id: 6,
      name: "Chiles Rellenos",
      image: "images/chiles.jpg",
      tags: ["vegetarian"],
      description: "Chiles poblanos rellenos de queso y bañados en salsa."
    },
    {
      id: 7,
      name: "Tamales",
      image: "images/tamales.jpg",
      tags: ["pork", "street food"],
      description: "Masa rellena de carne o frijoles envuelta en hoja de maíz."
    },
    {
      id: 8,
      name: "Quesadillas",
      image: "images/quesadillas.jpg",
      tags: ["vegetarian", "street food"],
      description: "Tortillas doradas rellenas de queso o champiñones."
    },
    {
      id: 9,
      name: "Mole Poblano",
      image: "images/mole.jpg",
      tags: ["chicken"],
      description: "Pollo con una rica salsa de chocolate y chiles."
    },
    {
      id: 10,
      name: "Sopa de Lima",
      image: "images/sopa_lima.jpg",
      tags: ["chicken"],
      description: "Sopa ligera con lima, pollo y tiras de tortilla."
    }
  ];
  const getFavorites = () => JSON.parse(localStorage.getItem("favorites")) || [];
  const setFavorites = (fav) => localStorage.setItem("favorites", JSON.stringify(fav));
  
  const grid = document.getElementById("recipeGrid");
  const search = document.getElementById("search");
  const toast = document.getElementById("toast");
  const favoritesToggle = document.getElementById("favoritesToggle");
  let showFavorites = false;
  
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
  }
  
  function renderRecipes(list) {
    grid.innerHTML = "";
    if (list.length === 0) {
      grid.innerHTML = "<p class='center'>No se encontraron recetas.</p>";
      return;
    }
  
    const favorites = getFavorites();
    list.forEach(recipe => {
      const isFav = favorites.includes(recipe.id);
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}">
        <div class="card-content">
          <div class="card-title">
            ${recipe.name}
            <button class="favorite-btn ${isFav ? "active" : ""}" data-id="${recipe.id}">❤</button>
          </div>
          <p>${recipe.description}</p>
          <div class="tag-row">
            ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }
  
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("favorite-btn")) {
      const id = Number(e.target.dataset.id);
      let favorites = getFavorites();
      if (favorites.includes(id)) {
        favorites = favorites.filter(f => f !== id);
        showToast("Eliminado de favoritos");
      } else {
        favorites.push(id);
        showToast("Agregado a favoritos");
      }
      setFavorites(favorites);
      renderRecipes(showFavorites ? getFavoriteRecipes() : recipes);
    }
  });
  
  function getFavoriteRecipes() {
    const favorites = getFavorites();
    return recipes.filter(r => favorites.includes(r.id));
  }
  
  favoritesToggle.addEventListener("click", () => {
    showFavorites = !showFavorites;
    favoritesToggle.textContent = showFavorites ? "Ver Todo" : "Ver Favoritos";
    renderRecipes(showFavorites ? getFavoriteRecipes() : recipes);
  });
  
  document.getElementById("searchBtn").addEventListener("click", () => {
    const term = search.value.toLowerCase();
    const filtered = recipes.filter(r => r.name.toLowerCase().includes(term));
    renderRecipes(filtered);
  });
  
  document.querySelectorAll(".category-btn[data-tag]").forEach(btn => {
    btn.addEventListener("click", () => {
      const tag = btn.dataset.tag;
      const filtered = recipes.filter(r => r.tags.includes(tag));
      renderRecipes(filtered);
    });
  });
  
  function showRecipeOfDay() {
    const dailyRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    const container = document.getElementById("dailyRecipe");
    container.innerHTML = `
      <img src="${dailyRecipe.image}" alt="${dailyRecipe.name}">
      <h3>${dailyRecipe.name}</h3>
      <p>${dailyRecipe.description}</p>
    `;
  }
  
  document.getElementById("year").textContent = new Date().getFullYear();
  
  showRecipeOfDay();
  renderRecipes(recipes);