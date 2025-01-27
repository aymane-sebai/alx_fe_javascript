// Array to store quotes
const quotes = [
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" },
];

// Function to display a random quote
function displayRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');

  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "No quotes available. Add a new one!";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  quoteDisplay.innerHTML = `
    <strong>${randomQuote.text}</strong><br>
    <em>— ${randomQuote.category}</em>
  `;
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value.trim();
  const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

  if (!newQuoteText || !newQuoteCategory) {
    alert("Both quote and category fields are required.");
    return;
  }

  // Add the new quote to the array
  quotes.push({ text: newQuoteText, category: newQuoteCategory });

  // Clear the input fields
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';

  // Confirm the addition
  alert("New quote added successfully!");
}

// Add event listener to the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', displayRandomQuote);

// Add event listener to the "Add Quote" button
document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
