// Initialize the quotes array
let quotes = [];

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Load quotes from local storage
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

// Display a random quote
function displayRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");

  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available. Add a new one!";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Save the last viewed quote to session storage
  sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));

  // Update the DOM
  quoteDisplay.innerHTML = "";

  const quoteTextElement = document.createElement("strong");
  quoteTextElement.textContent = randomQuote.text;

  const categoryElement = document.createElement("em");
  categoryElement.textContent = ` — ${randomQuote.category}`;

  quoteDisplay.appendChild(quoteTextElement);
  quoteDisplay.appendChild(document.createElement("br"));
  quoteDisplay.appendChild(categoryElement);
}

// Add a new quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (!newQuoteText || !newQuoteCategory) {
    alert("Please fill in both the quote and category fields.");
    return;
  }

  // Add the new quote
  quotes.push({ text: newQuoteText, category: newQuoteCategory });

  // Save to local storage
  saveQuotes();

  // Update the DOM
  alert("New quote added successfully!");
  displayRandomQuote();

  // Clear input fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// Export quotes to a JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2); // Format the JSON with indentation
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "quotes.json";
  downloadLink.click();

  URL.revokeObjectURL(url); // Clean up the URL object
}

// Import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);

      // Validate the structure of imported data
      if (Array.isArray(importedQuotes) && importedQuotes.every(q => q.text && q.category)) {
        quotes.push(...importedQuotes); // Add imported quotes to existing array
        saveQuotes(); // Update local storage
        alert("Quotes imported successfully!");
        displayRandomQuote();
      } else {
        alert("Invalid JSON format. Please ensure the file contains a valid array of quotes.");
      }
    } catch (error) {
      alert("Error reading JSON file.");
    }
  };

  fileReader.readAsText(event.target.files[0]);
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  loadQuotes();
  displayRandomQuote(); // Show a random quote when the page loads

  document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
  document.getElementById("exportJson").addEventListener("click", exportToJsonFile);
});

// Example HTML structure for import button
// <input type="file" id="importFile" accept=".json" onchange="importFromJsonFile(event)" />
