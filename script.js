document.addEventListener("DOMContentLoaded", function () {
    const amountInput = document.querySelector(".vatCalcTop input");
    const rateInput = document.getElementById("rate");
    const calculateBtn = document.getElementById("calculate");
    const vatResult = document.querySelector(".vatResult");
    const vatOptions = document.getElementsByName("vatOption");

    function updateResult(amount = 0, rate = "-", operation = "-", vat = 0, total = 0) {
        vatResult.innerHTML = `
            <p><strong>Amount :</strong> ${amount}</p>
            <p><strong>VAT % :</strong> ${rate}</p>
            <p><strong>Operation :</strong> ${operation}</p>
            <p><strong>VAT :</strong> ${vat}</p>
            <p><strong>Total :</strong> ${total}</p>
        `;
    }

    function calculateVAT() {
        const amount = parseFloat(amountInput.value);
        const rate = parseFloat(rateInput.value) / 100;
        let selectedOption = "";

        vatOptions.forEach(option => {
            if (option.checked) selectedOption = option.value;
        });

        if (isNaN(amount) || isNaN(rate)) {
            updateResult();
            return;
        }

        let vatAmount, totalAmount;

        if (selectedOption === "add") {
            vatAmount = amount * rate;
            totalAmount = amount + vatAmount;
            updateResult(amount.toFixed(2), (rate * 100).toFixed(2), "Add VAT", vatAmount.toFixed(2), totalAmount.toFixed(2));
        } else {
            totalAmount = amount;
            const netAmount = totalAmount / (1 + rate);
            vatAmount = totalAmount - netAmount;
            updateResult(totalAmount.toFixed(2), (rate * 100).toFixed(2), "Exclude VAT", vatAmount.toFixed(2), netAmount.toFixed(2));
        }
    }

    calculateBtn.addEventListener("click", calculateVAT);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            calculateVAT();
        }
    });

    // Afficher un résultat neutre au chargement
    updateResult();
});
