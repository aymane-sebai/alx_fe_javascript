// Initialize the quotes array
let quotes = [];
let categories = new Set();

// Save quotes and categories to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
  localStorage.setItem("categories", JSON.stringify([...categories]));
}

// Load quotes and categories from local storage
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  const storedCategories = localStorage.getItem("categories");

  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }

  if (storedCategories) {
    categories = new Set(JSON.parse(storedCategories));
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

  quoteDisplay.innerHTML = `<strong>${randomQuote.text}</strong><br><em>— ${randomQuote.category}</em>`;
}

// Add a new quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (!newQuoteText || !newQuoteCategory) {
    alert("Please fill in both the quote and category fields.");
    return;
  }

  quotes.push({ text: newQuoteText, category: newQuoteCategory });
  categories.add(newQuoteCategory);
  saveQuotes();
  populateCategories();
  alert("New quote added successfully!");
  filterQuotes();

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// Populate categories dynamically
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");

  // Clear existing options
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  // Add categories
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore last selected category
  const lastSelectedCategory = localStorage.getItem("lastSelectedCategory");
  if (lastSelectedCategory) {
    categoryFilter.value = lastSelectedCategory;
  }
}

// Filter quotes based on selected category
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("lastSelectedCategory", selectedCategory);

  const quoteDisplay = document.getElementById("quoteDisplay");

  if (selectedCategory === "all") {
    displayRandomQuote();
    return;
  }

  const filteredQuotes = quotes.filter((quote) => quote.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = `No quotes available for the "${selectedCategory}" category.`;
  } else {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];

    quoteDisplay.innerHTML = `<strong>${randomQuote.text}</strong><br><em>— ${randomQuote.category}</em>`;
  }
}

// Export quotes to a JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "quotes.json";
  downloadLink.click();

  URL.revokeObjectURL(url);
}

// Import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes) && importedQuotes.every(q => q.text && q.category)) {
        quotes.push(...importedQuotes);
        importedQuotes.forEach((quote) => categories.add(quote.category));
        saveQuotes();
        populateCategories();
        alert("Quotes imported successfully!");
        filterQuotes();
      } else {
        alert("Invalid JSON format. Please ensure the file contains an array of quotes.");
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
  populateCategories();
  filterQuotes();

  document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
  document.getElementById("exportJson").addEventListener("click", exportToJsonFile);
});
