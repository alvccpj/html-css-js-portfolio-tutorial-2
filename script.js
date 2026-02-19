// ============================================
// HAMBURGER MENU
// ============================================
function toggleMenu() {
  const menu = document.getElementById("menu-links");
  const icon = document.getElementById("hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// ============================================
// TRANSLATIONS
// ============================================
const translations = {
  en: {
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    "profile.greeting": "Hello, I'm",
    "profile.role": "Salesforce & Fullstack Developer",
    "profile.downloadCV": "Download CV",
    "profile.contactInfo": "Contact info",

    "about.subheading": "Get To Know More",
    "about.title": "About Me",
    "about.experienceTitle": "Experience",
    "about.experienceRole": "Junior Salesforce Developer Analyst",
    "about.experiencePeriod": "October/2024 - Now",
    "about.educationTitle": "Education",
    "about.educationDesc": "Computer Science — UNINASSAU",
    "about.educationShift": "Shift: Night",
    "about.bio": "Hi, my name is Álvaro, I'm a 7th period Computer Science student and a Salesforce Developer focused on Full Stack. I am also interested in Data Analysis, DevOps, Cloud Computing, AI, and Machine Learning.",

    "experience.subheading": "Explore My",
    "experience.title": "Experience",
    "experience.backendTitle": "Backend Development",
    "experience.frontendTitle": "Frontend Development",

    "level.intermediate": "Intermediate",
    "level.basic": "Basic",
    "level.advanced": "Advanced",

    "projects.subheading": "Browse My Recent",
    "projects.title": "Projects",
    "projects.p1Title": "Barbearia Unity",
    "projects.p2Title": "Auto Center Caxangá",
    "projects.p3Title": "Master BPO: Finance Management",
    "projects.inDevelopment": "In Development",

    "contact.subheading": "Get In Touch",
    "contact.title": "Contact Me",

    "footer.copyright": "Copyright © 2025 Álvaro Jordão. All Rights Reserved.",
  },
  pt: {
    "nav.about": "Sobre",
    "nav.experience": "Experiência",
    "nav.projects": "Projetos",
    "nav.contact": "Contato",

    "profile.greeting": "Olá, eu sou",
    "profile.role": "Desenvolvedor Salesforce & Fullstack",
    "profile.downloadCV": "Baixar CV",
    "profile.contactInfo": "Contato",

    "about.subheading": "Conheça Mais Sobre",
    "about.title": "Sobre Mim",
    "about.experienceTitle": "Experiência",
    "about.experienceRole": "Analista Jr. Desenvolvedor Salesforce",
    "about.experiencePeriod": "Outubro/2024 - Atual",
    "about.educationTitle": "Educação",
    "about.educationDesc": "Ciência da Computação — UNINASSAU",
    "about.educationShift": "Turno: Noturno",
    "about.bio": "Olá, meu nome é Álvaro, sou estudante do 7º período de Ciência da Computação e Desenvolvedor Salesforce com foco em Full Stack. Também tenho interesse em Análise de Dados, DevOps, Cloud Computing, IA e Machine Learning.",

    "experience.subheading": "Explore Minha",
    "experience.title": "Experiência",
    "experience.backendTitle": "Desenvolvimento Backend",
    "experience.frontendTitle": "Desenvolvimento Frontend",

    "level.intermediate": "Intermediário",
    "level.basic": "Básico",
    "level.advanced": "Avançado",

    "projects.subheading": "Veja Meus Recentes",
    "projects.title": "Projetos",
    "projects.p1Title": "Barbearia Unity",
    "projects.p2Title": "Auto Center Caxangá",
    "projects.p3Title": "Master BPO: Gestão Financeira",
    "projects.inDevelopment": "Em Desenvolvimento",

    "contact.subheading": "Entre em Contato",
    "contact.title": "Fale Comigo",

    "footer.copyright": "Copyright © 2025 Álvaro Jordão. Todos os direitos reservados.",
  },
};

// ============================================
// LANGUAGE
// ============================================
let currentLang = localStorage.getItem("portfolio-lang") || "en";

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("portfolio-lang", lang);
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val = translations[lang]?.[key];
    if (val !== undefined) el.textContent = val;
  });

  // Label shows what you'll switch TO
  const nextLang = lang === "en" ? "PT" : "EN";
  document.querySelectorAll("#lang-label, #lang-label-mobile").forEach(
    (el) => (el.textContent = nextLang)
  );
}

function toggleLang() {
  applyLanguage(currentLang === "en" ? "pt" : "en");
}

// ============================================
// THEME
// ============================================
let currentTheme = localStorage.getItem("portfolio-theme") || "dark";

function applyTheme(theme) {
  currentTheme = theme;
  localStorage.setItem("portfolio-theme", theme);
  document.documentElement.setAttribute("data-theme", theme);

  const emoji = theme === "dark" ? "☀️" : "🌙";
  document.querySelectorAll("#theme-icon, #theme-icon-mobile").forEach(
    (el) => (el.textContent = emoji)
  );
}

function toggleTheme() {
  applyTheme(currentTheme === "dark" ? "light" : "dark");
}

// ============================================
// SCROLL REVEAL (Intersection Observer)
// ============================================
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // once visible, unobserve to save resources
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

// ============================================
// NAV: active link on scroll
// ============================================
function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-links a");

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((a) => a.classList.remove("active"));
          const active = document.querySelector(
            `.nav-links a[href="#${entry.target.id}"]`
          );
          if (active) active.classList.add("active");
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((s) => io.observe(s));
}

// ============================================
// INIT
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  applyTheme(currentTheme);
  applyLanguage(currentLang);
  initScrollReveal();
  initActiveNav();

  // Desktop toggle buttons
  document.getElementById("theme-toggle")?.addEventListener("click", toggleTheme);
  document.getElementById("lang-toggle")?.addEventListener("click", toggleLang);
});
