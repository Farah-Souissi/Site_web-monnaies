const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const fromFlag = document.getElementById("fromFlag");
const toFlag = document.getElementById("toFlag");
const loading = document.getElementById("loading");
const darkToggle = document.getElementById("darkToggle");

let rates = {};

const countryFlags = {
    "USD": "us",
    "EUR": "eu",
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

// Load currency list
fetch("https://api.exchangerate-api.com/v4/latest/USD")
    .then(res => res.json())
    .then(data => {
        rates = data.rates;
        const currencies = Object.keys(rates);

        currencies.forEach(currency => {
            fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
            toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
        });

        fromCurrency.value = "USD";
        toCurrency.value = "EUR";

        updateFlags();
    });

// Flag update
function updateFlags() {
    let from = fromCurrency.value;
    let to = toCurrency.value;

    fromFlag.src = `https://flagcdn.com/48x36/${(countryFlags[from] || "us")}.png`;
    toFlag.src = `https://flagcdn.com/48x36/${(countryFlags[to] || "eu")}.png`;
}

fromCurrency.addEventListener("change", updateFlags);
toCurrency.addEventListener("change", updateFlags);

// Convert function
function convert() {
    const amount = document.getElementById("amount").value;
    if (!amount || amount <= 0) {
        document.getElementById("result").innerText = "Enter a valid amount!";
        return;
    }

    loading.classList.remove("hidden");
    document.getElementById("result").innerText = "";

    setTimeout(() => {
        const from = fromCurrency.value;
        const to = toCurrency.value;

        const result = (amount * (rates[to] / rates[from])).toFixed(2);

        loading.classList.add("hidden");
        document.getElementById("result").innerText = `${amount} ${from} = ${result} ${to}`;
    }, 700);
}

// Dark mode toggle
darkToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
});
