// =====================
// Données : continents -> pays + photos
// =====================
const data = {
    europe: [
        { country: "France", img: "images/france.jpg" },
        { country: "Allemagne", img: "images/germany.jpg" },
        { country: "Espagne", img: "images/spain.jpg" }
    ],
    asie: [
        { country: "Japon", img: "images/japan.jpg" },
        { country: "Chine", img: "images/china.jpg" },
        { country: "Inde", img: "images/india.jpg" }
    ],
    afrique: [
        { country: "Tunisie", img: "images/tunisia.jpg" },
        { country: "Égypte", img: "images/egypt.jpg" },
        { country: "Maroc", img: "images/morocco.jpg" }
    ],
    amerique: [
        { country: "USA", img: "images/usa.jpg" },
        { country: "Canada", img: "images/canada.jpg" },
        { country: "Brésil", img: "images/brazil.jpg" }
    ],
    oceanie: [
        { country: "Australie", img: "images/australia.jpg" }
    ]
};

// =====================
// Récupération des éléments HTML
// =====================
const select = document.getElementById("continent-select");
const gallery = document.getElementById("gallery");
const sortBtn = document.getElementById("sort-btn");

// Liste actuelle affichée (utile pour le tri)
let currentList = [];

// =====================
// Fonction d'affichage de la galerie
// =====================
function displayGallery(list) {
    gallery.innerHTML = "";
    list.forEach(item => {
        gallery.innerHTML += `
            <div class="gallery-item">
                <img src="${item.img}" alt="${item.country}">
                <p>${item.country}</p>
            </div>
        `;
    });
}

// =====================
// Changement du continent
// =====================
select.addEventListener("change", () => {
    const continent = select.value;
    gallery.innerHTML = "";

    if (!continent) return;

    // Copie de la liste du continent sélectionné
    currentList = [...data[continent]];

    displayGallery(currentList);
});

// =====================
// Tri A → Z
// =====================
sortBtn.addEventListener("click", () => {
    if (currentList.length === 0) return;

    currentList.sort((a, b) => a.country.localeCompare(b.country));
    displayGallery(currentList);
});
