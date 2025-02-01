document.getElementById("calculateButton").addEventListener("click", function() {
    // Get input values
    const amount = parseFloat(document.getElementById("amount").value);
    const interestRate = parseFloat(document.getElementById("interest").value);
    const loanTenure = parseInt(document.getElementById("loan").value);
  
    // Check if the input values are valid
    if (isNaN(amount) || isNaN(interestRate) || isNaN(loanTenure) || amount <= 0 || interestRate <= 0 || loanTenure <= 0) {
      alert("Please enter valid values for all fields.");
      return;
    }
  
    // Calculate monthly interest rate (annual interest rate / 12 / 100)
    const monthlyRate = interestRate / 12 / 100;
  
    // Calculate total months (loan tenure * 12)
    const totalMonths = loanTenure * 12;
  
    // EMI calculation formula
    const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
    // Calculate total interest payable and total payment
    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - amount;
  
    // Update the results on the page
    document.querySelector(".display-result .result-item:nth-child(1) h3").innerHTML = `रु ${emi.toFixed(2)}`;
    document.querySelector(".display-result .result-item:nth-child(2) h3").innerHTML = `रु ${totalInterest.toFixed(2)}`;
    document.querySelector(".display-result .result-item:nth-child(3) h3").innerHTML = `रु ${totalPayment.toFixed(2)}`;
  });
  