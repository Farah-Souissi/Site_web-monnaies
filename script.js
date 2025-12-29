// =====================
// Déclaration des Éléments HTML
// =====================
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const resultDisplay = document.getElementById("result");
const loading = document.getElementById("loading");
const darkToggle = document.getElementById("darkToggle");

// On sélectionne les drapeaux pour pouvoir les cacher
const fromFlag = document.getElementById("fromFlag");
const toFlag = document.getElementById("toFlag");

let rates = {};

// =====================
// Chargement des taux et remplissage des listes
// =====================
function loadCurrenciesAndRates() {
    loading.classList.remove("hidden");
    
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
        .then(res => {
            if (!res.ok) throw new Error("Erreur API");
            return res.json();
        })
        .then(data => {
            rates = data.rates;
            const currencies = Object.keys(rates);

            fromCurrency.innerHTML = "";
            toCurrency.innerHTML = "";

            currencies.forEach(currency => {
                fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
                toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
            });

            // Valeurs par défaut
            fromCurrency.value = "USD";
            toCurrency.value = "EUR";

            // ON CACHE LES DRAPEAUX COMME DEMANDÉ
            if(fromFlag) fromFlag.style.display = "none";
            if(toFlag) toFlag.style.display = "none";

            loading.classList.add("hidden");
        })
        .catch(error => {
            console.error("Erreur :", error);
            resultDisplay.innerText = "Erreur de connexion aux taux.";
            loading.classList.add("hidden");
        });
}

document.addEventListener("DOMContentLoaded", loadCurrenciesAndRates);

// =====================
// Fonction de conversion
// =====================
function convert() {
    const amount = amountInput.value;
    resultDisplay.classList.remove("show"); 
    
    if (Object.keys(rates).length === 0) return;
    
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        resultDisplay.innerText = "Entrez un montant valide !";
        return;
    }

    loading.classList.remove("hidden");
    
    setTimeout(() => {
        const from = fromCurrency.value;
        const to = toCurrency.value;
        const result = (parseFloat(amount) * (rates[to] / rates[from])).toFixed(2);

        loading.classList.add("hidden");
        resultDisplay.innerText = `${amount} ${from} = ${result} ${to}`;
        resultDisplay.classList.add("show"); 
    }, 500);
}

// =====================
// Événements
// =====================

// On lance la conversion dès qu'on change de pays
fromCurrency.addEventListener("change", convert);
toCurrency.addEventListener("change", convert);

// Mode Sombre
if (darkToggle) {
    darkToggle.addEventListener("change", () => {
        document.body.classList.toggle("dark");
    });
}

