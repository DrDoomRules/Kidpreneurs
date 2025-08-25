// Unique user ID per student
let userId = localStorage.getItem("userId");
if (!userId) {
  userId = "user-" + Date.now();
  localStorage.setItem("userId", userId);
}

// --- ADMIN SETUP ---
const ADMIN_PASS = "inspirex123"; // change this secret password
let isAdmin = localStorage.getItem("isAdmin") === "true";

// Ask for admin access (once)
if (!isAdmin) {
  const ask = prompt("Are you the admin? Enter password (leave blank if not):");
  if (ask === ADMIN_PASS) {
    isAdmin = true;
    localStorage.setItem("isAdmin", "true");
    alert("✅ Admin mode activated!");
  }
}

// Grab DOM elements
const ideaForm = document.getElementById("idea-form");
const ideaGrid = document.getElementById("idea-grid");

// Load saved ideas
let ideas = JSON.parse(localStorage.getItem("ideas")) || [];

// Render ideas
function renderIdeas() {
  ideaGrid.innerHTML = "";
  ideas.forEach((idea, index) => {
    const card = document.createElement("div");
    card.className = "idea-card";
    card.innerHTML = `
      <h3>${idea.title}</h3>
      <p><strong>By:</strong> ${idea.name || "Anonymous"}</p>
      <p>${idea.problem}</p>
    `;

    // Show delete if (owner OR admin)
    if (idea.owner === userId || isAdmin) {
      const delBtn = document.createElement("button");
      delBtn.textContent = "❌ Delete";
      delBtn.className = "delete-btn";
      delBtn.onclick = () => deleteIdea(index);
      card.appendChild(delBtn);
    }

    ideaGrid.appendChild(card);
  });
}

// Delete idea
function deleteIdea(index) {
  if (confirm("Are you sure you want to delete this idea?")) {
    ideas.splice(index, 1);
    localStorage.setItem("ideas", JSON.stringify(ideas));
    renderIdeas();
  }
}

// Handle form submit
ideaForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("student-name").value;
  const title = document.getElementById("idea-title").value;
  const problem = document.getElementById("idea-problem").value;

  const newIdea = { name, title, problem, owner: userId };
  ideas.push(newIdea);

  localStorage.setItem("ideas", JSON.stringify(ideas));
  ideaForm.reset();
  renderIdeas();
});

// Initial render
renderIdeas();
