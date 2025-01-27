// Simulated server URL (use JSONPlaceholder or another API for real implementation)
const serverUrl = "https://jsonplaceholder.typicode.com/posts";

// Array of quotes
let quotes = [];

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

    // Sync with the server
    syncDataToServer();
  } else {
    alert("Please fill out both fields.");
  }
}

// Function to fetch data from the server
async function fetchDataFromServer() {
  try {
    const response = await fetch(serverUrl);
    const serverData = await response.json();

    // Simulate server data structure
    const serverQuotes = serverData.map(item => ({
      text: item.title,
      category: "Server"
    }));

    // Merge server data with local data (server takes precedence)
    const uniqueServerQuotes = serverQuotes.filter(
      serverQuote => !quotes.some(localQuote => localQuote.text === serverQuote.text)
    );
    quotes = [...quotes, ...uniqueServerQuotes];

    populateCategories();
    filterQuotes();
    document.getElementById("syncStatus").textContent = "Data synced with the server.";
  } catch (error) {
    console.error("Error fetching data from server:", error);
    document.getElementById("syncStatus").textContent = "Failed to sync data with the server.";
  }
}

// Function to sync data to the server
async function syncDataToServer() {
  try {
    const newQuotes = quotes.map(quote => ({
      title: quote.text,
      body: quote.category,
      userId: 1
    }));

    await fetch(serverUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuotes)
    });

    document.getElementById("syncStatus").textContent = "Data successfully synced to the server.";
  } catch (error) {
    console.error("Error syncing data to server:", error);
    document.getElementById("syncStatus").textContent = "Failed to sync data to the server.";
  }
}

// Initialize the application
window.addEventListener("DOMContentLoaded", async () => {
  // Load initial quotes
  quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Inspirational" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" }
  ];

  // Fetch data from the server
  await fetchDataFromServer();

  // Populate categories and display initial quotes
  populateCategories();
  filterQuotes();
});
