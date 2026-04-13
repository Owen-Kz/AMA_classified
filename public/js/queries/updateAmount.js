
  async function getCountryData() {
    const res = await fetch(`/getCountryData`, { method: "POST" });
    const data = await res.json();

    return data ? data.country : null;
  }

  async function updateAmounts() {
    const currentExchangeRate = await getCountryData();
    let Currency = "USD";
    let ExchangeRate = 1;

    if (currentExchangeRate) {
      Currency = currentExchangeRate.currency;
      ExchangeRate = parseFloat(currentExchangeRate.current_rate || 1);
    } else {
      console.log("Failed to get rate");
    }

    const amountElements = document.querySelectorAll('.amount');
    amountElements.forEach(el => {
      const rawText = el.textContent.trim(); // e.g. "$3"
      const numericValue = parseFloat(rawText.replace(/[^0-9.]/g, '')); // strip non-numeric

      if (!isNaN(numericValue)) {
        const converted = (numericValue * ExchangeRate).toLocaleString(undefined, {
          style: 'currency',
          currency: Currency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
        el.textContent = converted;
      }
    });
  }

  // Run on page load
  document.addEventListener('DOMContentLoaded', updateAmounts);
