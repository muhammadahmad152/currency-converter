const currencyFirstEl = document.getElementById('currency-first');
const worthFirstEl = document.getElementById('worth-first');
const currencySecondEl = document.getElementById('currency-second');
const worthSecondEl = document.getElementById('worth-second');
const exchangeRateEl = document.getElementById('exchange-rate');

function updateRate() {
    const currencyFirst = currencyFirstEl.value;
    const currencySecond = currencySecondEl.value;

    // ExchangeRate-API fetch call
    fetch(`https://v6.exchangerate-api.com/v6/fd0724adf853d2226ba2e2d1/latest/${currencyFirst}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error("API call failed");
            }
            return res.json();
        })
        .then((data) => {
            const rate = data.conversion_rates[currencySecond];

            if (rate) {
                exchangeRateEl.innerText = `1 ${currencyFirst} = ${rate.toFixed(4)} ${currencySecond}`;
                worthSecondEl.value = (worthFirstEl.value * rate).toFixed(2);
            } else {
                exchangeRateEl.innerText = "Exchange rate unavailable";
                worthSecondEl.value = "";
            }
        })
        .catch((error) => {
            console.error("Error fetching rate:", error);
            exchangeRateEl.innerText = "Error loading exchange rate";
        });
}

// Event Listeners
currencyFirstEl.addEventListener("change", updateRate);
currencySecondEl.addEventListener("change", updateRate);
worthFirstEl.addEventListener("input", updateRate);

// Page load hone par initial calculation run karne ke liye
updateRate();