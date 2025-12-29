// =====================
// Déclaration des Éléments HTML
// =====================
const amountInput = document.getElementById("amount"); // Renommé pour la clarté
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const fromFlag = document.getElementById("fromFlag");
const toFlag = document.getElementById("toFlag");
const resultDisplay = document.getElementById("result"); // Renommé pour la clarté
const loading = document.getElementById("loading");
const darkToggle = document.getElementById("darkToggle");

let rates = {};

// Mappage des codes de devise aux codes de drapeau (ISO 3166-1 alpha-2)
const countryFlags = {
    "USD": "us",
    "EUR": "eu", // Code UE pour l'Euro
    "GBP": "gb",
    "CAD": "ca",
    "AUD": "au",
    "TND": "tn",
    "JPY": "jp",
    "CNY": "cn",
    "MAD": "ma",
    "SAR": "sa",
    "AED": "ae"
};

// =====================
// Chargement de la liste des devises et des taux
// =====================
function loadCurrenciesAndRates() {
    // Affiche le loader pendant le chargement initial
    loading.classList.remove("hidden");
    
    // Utilisez un gestionnaire d'événements pour le bouton "Convertir" défini dans convertisseur.html
    // Assurez-vous que l'API est accessible et que la clé est correcte
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
        .then(res => {
            if (!res.ok) {
                throw new Error("Erreur de chargement de l'API des taux.");
            }
            return res.json();
        })
        .then(data => {
            rates = data.rates;
            const currencies = Object.keys(rates);

            // Vide les sélecteurs avant d'ajouter de nouvelles options (bonne pratique)
            fromCurrency.innerHTML = "";
            toCurrency.innerHTML = "";

            currencies.forEach(currency => {
                fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
                toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
            });

            // Valeurs par défaut
            fromCurrency.value = "USD";
            toCurrency.value = "EUR";

            updateFlags();
            loading.classList.add("hidden"); // Cache le loader une fois prêt
        })
        .catch(error => {
            console.error("Erreur de chargement des données :", error);
            resultDisplay.innerText = "Erreur: Impossible de charger les taux de change.";
            loading.classList.add("hidden");
        });
}

// Déclenche le chargement au démarrage
document.addEventListener("DOMContentLoaded", loadCurrenciesAndRates);


// =====================
// Mise à jour des drapeaux
// =====================
function updateFlags() {
    let from = fromCurrency.value;
    let to = toCurrency.value;

    const fromFlagCode = countryFlags[from] || 'us';
    const toFlagCode = countryFlags[to] || 'eu';

    // 1. Déclenche l'animation du drapeau source (From)
    fromFlag.classList.remove('flash');
    void fromFlag.offsetWidth; // Force le navigateur à redessiner avant d'ajouter à nouveau la classe
    fromFlag.classList.add('flash');

    // 2. Déclenche l'animation du drapeau destination (To)
    toFlag.classList.remove('flash');
    void toFlag.offsetWidth; // Force le navigateur à redessiner
    toFlag.classList.add('flash');

    fromFlag.src = `https://flagcdn.com/48x36/${fromFlagCode}.png`;
    toFlag.src = `https://flagcdn.com/48x36/${toFlagCode}.png`;
    
    fromFlag.alt = `Drapeau de la devise ${from}`;
    toFlag.alt = `Drapeau de la devise ${to}`;

    // Lancer une conversion automatique lorsque les devises changent
    convert();
}

fromCurrency.addEventListener("change", updateFlags);
toCurrency.addEventListener("change", updateFlags);

// =====================
// =====================
// Fonction de conversion
// =====================
function convert() {
    const amount = amountInput.value;
    
    // 1. (NOUVEAU) S'assure de retirer la classe d'animation au début du processus
    resultDisplay.classList.remove("show"); 
    
    if (Object.keys(rates).length === 0) {
        resultDisplay.innerText = "Taux de change non disponibles.";
        return;
    }
    
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        resultDisplay.innerText = "Entrez un montant valide !";
        // S'assure que le résultat reste invisible si la validation échoue
        resultDisplay.classList.remove("show"); 
        return;
    }

    loading.classList.remove("hidden");
    resultDisplay.innerText = "";
    
    // Simulation d'une latence pour le loader (gardé pour l'effet visuel)
    setTimeout(() => {
        const from = fromCurrency.value;
        const to = toCurrency.value;

        // Calcul de la conversion : Montant * (Taux_Vers / Taux_De)
        const result = (parseFloat(amount) * (rates[to] / rates[from])).toFixed(2);

        loading.classList.add("hidden");
        
        // Affichage du résultat
        resultDisplay.innerText = `${amount} ${from} = ${result} ${to}`;
        
        // 2. (NOUVEAU) Ajoute la classe pour déclencher l'animation CSS
        resultDisplay.classList.add("show"); 

    }, 700);
// =====================
// Mode Sombre
// =====================

darkToggle.addEventListener("change", () => {

    document.body.classList.toggle("dark");

});}
