document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

window.addEventListener("hashchange", () => {
  const id = location.hash.replace("#", "") || "home";
  navigate(id);
});

// All section IDs
const sections = [
  "introduction-section",
  "about-section",
  "projects-section",
  "skills-section",
  "services-section",
  "contact-section",
  "blog-section",
];

// Show only the clicked section
function showSection(id) {
  sections.forEach((sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.style.display = sectionId === id ? "block" : "none";
  });
}

// Wire up nav links
document.querySelectorAll("#nav-link a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").replace("#", "");
    showSection(targetId);
  });
});

// Show Home section by default on load
showSection("introduction-section");
