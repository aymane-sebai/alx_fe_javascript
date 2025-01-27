// Array of quotes
let quotes = [
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Inspirational" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Get busy living or get busy dying.", category: "Motivational" },
  { text: "You only live once, but if you do it right, once is enough.", category: "Life" }
];

// Function to populate the categories in the dropdown
function populateCategories() {
  const categories = [...new Set(quotes.map(quote => quote.category))];
  const categoryFilter = document.getElementById("categoryFilter");

  // Clear existing options
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  // Add unique categories to the dropdown
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore the last selected category from local storage
  const lastSelectedCategory = localStorage.getItem("selectedCategory");
  if (lastSelectedCategory) {
    categoryFilter.value = lastSelectedCategory;
  }
}

// Function to filter quotes based on the selected category
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;

  // Save the selected category to local storage
  localStorage.setItem("selectedCategory", selectedCategory);

  // Filter quotes
  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(quote => quote.category === selectedCategory);

  // Display a random quote or a message
  if (filteredQuotes.length > 0) {
    const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
    document.getElementById("quoteDisplay").textContent = `"${randomQuote.text}" - (${randomQuote.category})`;
  } else {
    document.getElementById("quoteDisplay").textContent = "No quotes available in this category.";
  }
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newQuoteText && newQuoteCategory) {
    // Add the new quote to the array
    quotes.push({ text: newQuoteText, category: newQuoteCategory });

    // Clear the input fields
    document.getElementById("newQuoteText").value = '';
    document.getElementById("newQuoteCategory").value = '';

    // Update the categories in the dropdown
    populateCategories();

    // Inform the user
    alert("New quote added successfully!");
  } else {
    alert("Please fill out both fields.");
  }
}

// Initialize the application
window.addEventListener("DOMContentLoaded", () => {
  populateCategories();
  filterQuotes();
});
