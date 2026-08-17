const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");
const header = document.querySelector(".header");
const topBtn = document.querySelector("#topBtn");
const typing = document.querySelector("#typing");

menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("open");
});

document.querySelectorAll(".navbar a").forEach(link => {
  link.addEventListener("click", () => navbar.classList.remove("open"));
});

const roles = [
  "IT Student",
  "Java Developer",
  "Web Developer",
  "Problem Solver"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {
  const word = roles[roleIndex];

  if (!deleting) {
    typing.textContent = word.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === word.length) {
      deleting = true;
      setTimeout(typeRole, 1200);
      return;
    }
  } else {
    typing.textContent = word.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeRole, deleting ? 45 : 90);
}

typeRole();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a");

function updateActiveNav() {
  let current = "home";

  sections.forEach(section => {
    const top = section.offsetTop - 180;
    if (window.scrollY >= top) current = section.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });
}

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
  topBtn.classList.toggle("show", window.scrollY > 500);
  updateActiveNav();
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelector("#year").textContent = new Date().getFullYear();
