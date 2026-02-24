<<<<<<< HEAD
// scripts de scroll
window.addEventListener("scroll", function(){
  const nav = document.querySelector(".navbar");
  nav.classList.toggle("navbar-scrolled", window.scrollY > 50);
});

// hide on scroll down
let lastScroll = window.pageYOffset;
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll) {
    navbar.classList.add("navbar-hide");
  } else {
    navbar.classList.remove("navbar-hide");
  }
  lastScroll = currentScroll;
});

// scripts do background (fade out SOMENTE se NÃO for a página index)
window.addEventListener('load', () => {
  // Detecta se estamos na página inicial
  const isIndexPage = 
    window.location.pathname === '/' || 
    window.location.pathname.endsWith('index.html') ||
    window.location.pathname.endsWith('/index.html');

  // Se NÃO for a página index → faz o fade out normal
  if (!isIndexPage) {
    const videoDuration = 3000; // 3 segundos (ou ajuste para o tempo que quiser)

    setTimeout(() => {
      document.body.classList.add('fade-out-video');
    }, videoDuration);
  }
  // Se for index → não faz nada, o vídeo fica rodando para sempre
=======
// scripts de scroll
window.addEventListener("scroll", function(){
  const nav = document.querySelector(".navbar");
  nav.classList.toggle("navbar-scrolled", window.scrollY > 50);
});

// hide on scroll down
let lastScroll = window.pageYOffset;
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll) {
    navbar.classList.add("navbar-hide");
  } else {
    navbar.classList.remove("navbar-hide");
  }
  lastScroll = currentScroll;
});

// scripts do background (fade out SOMENTE se NÃO for a página index)
window.addEventListener('load', () => {
  // Detecta se estamos na página inicial
  const isIndexPage = 
    window.location.pathname === '/' || 
    window.location.pathname.endsWith('index.html') ||
    window.location.pathname.endsWith('/index.html');

  // Se NÃO for a página index → faz o fade out normal
  if (!isIndexPage) {
    const videoDuration = 3000; // 3 segundos (ou ajuste para o tempo que quiser)

    setTimeout(() => {
      document.body.classList.add('fade-out-video');
    }, videoDuration);
  }
  // Se for index → não faz nada, o vídeo fica rodando para sempre
>>>>>>> 357ceaa325e01950473259d66efa448233079110
});