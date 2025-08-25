// Placeholder JS for adding ideas dynamically later
console.log("Kidpreneur Hub loaded ✅");

// Example: Add new idea cards dynamically
const ideaGrid = document.getElementById("idea-grid");

function addIdea(title) {
  const card = document.createElement("div");
  card.className = "idea-card";
  card.textContent = title;
  ideaGrid.appendChild(card);
}

// Example usage
addIdea("AI-powered Homework Helper");
addIdea("Eco-friendly Packaging Startup");
