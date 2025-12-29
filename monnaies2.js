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
// Variable pour suivre l'état du tri (ascendant ou descendant)
let isAscending = true; 

// =====================
// Fonction d'affichage de la galerie
// =====================
function displayGallery(list) {
    // Utilisation de .map().join('') est plus performant que += dans une boucle
    const galleryContent = list.map(item => `
        <div class="gallery-item">
            <img src="${item.img}" alt="Monnaie de ${item.country}">
            <p>${item.country}</p>
        </div>
    `).join('');
    gallery.innerHTML = galleryContent;
}

// =====================
// Changement du continent (Filtrage)
// =====================
function filterAndDisplay() {
    const continent = select.value;
    gallery.innerHTML = "";

    if (!continent) {
        // Option : Afficher toutes les monnaies si rien n'est sélectionné
        currentList = Object.values(data).flat(); 
    } else {
        // Copie de la liste du continent sélectionné
        currentList = [...data[continent]];
    }

    // Réinitialiser l'état du tri lors d'un nouveau filtre
    isAscending = true;
    sortBtn.textContent = "Trier A → Z"; 

    displayGallery(currentList);
}

select.addEventListener("change", filterAndDisplay);

// =====================
// Tri A ↔ Z
// =====================
sortBtn.addEventListener("click", () => {
    if (currentList.length === 0) return;

    // Tri de la liste actuelle
    currentList.sort((a, b) => {
        const comparison = a.country.localeCompare(b.country);
        // Utilise la comparaison standard si c'est ascendant (A→Z), sinon l'inverse (Z→A)
        return isAscending ? comparison : comparison * -1;
    });

    // Inverse l'état du tri pour le prochain clic
    isAscending = !isAscending;

    // Mise à jour du texte du bouton pour indiquer la prochaine action
    sortBtn.textContent = isAscending ? "Trier Z → A" : "Trier A → Z";

    displayGallery(currentList);
});

// =====================
// Initialisation (Affichage par défaut au chargement de la page)
// =====================
document.addEventListener("DOMContentLoaded", () => {
    // Initialiser en affichant toutes les monnaies ou celles d'un continent par défaut
    // Ici, nous affichons toutes les monnaies (continent vide)
    filterAndDisplay(); 
});
