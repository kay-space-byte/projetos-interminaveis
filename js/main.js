(() => {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  let lastScrollY = window.scrollY;

  const onScroll = () => {
    const y = window.scrollY;
    navbar.classList.toggle("navbar-scrolled", y > 8);

    if (y > lastScrollY && y > 120) {
      navbar.classList.add("navbar-hide");
    } else {
      navbar.classList.remove("navbar-hide");
    }

    lastScrollY = y;
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

(() => {
  const canvases = Array.from(document.querySelectorAll(".logo-planet-canvas, .planet-canvas"));
  if (canvases.length === 0) return;

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const setupCanvas = (canvas) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
    const cssSize = Number(canvas.dataset.size || 48);
    canvas.style.width = `${cssSize}px`;
    canvas.style.height = `${cssSize}px`;
    canvas.width = cssSize * dpr;
    canvas.height = cssSize * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    return { canvas, ctx, size: cssSize };
  };

  const targets = canvases.map(setupCanvas).filter(Boolean);
  if (targets.length === 0) return;

  const drawPlanet = (ctx, size, t) => {
    ctx.clearRect(0, 0, size, size);

    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.22;

    // preto e branco (em fundo escuro: branco predominante)
    const stroke = "rgba(255,255,255,0.92)";
    const soft = "rgba(255,255,255,0.14)";
    const fill = "rgba(0,0,0,0)";

    // brilho suave atrás
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.95, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fill();

    // planeta
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = stroke;
    ctx.stroke();

    // detalhe de "sombra" minimalista
    ctx.beginPath();
    ctx.arc(cx - r * 0.25, cy - r * 0.1, r * 0.55, 0, Math.PI * 2);
    ctx.strokeStyle = soft;
    ctx.lineWidth = 2;
    ctx.stroke();

    // anel girando
    const a = t * 0.9;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(a);

    const rx = r * 1.85;
    const ry = r * 0.70;

    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.75)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // "corte" do anel na frente (dá sensação 3D)
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(0, 0, r * 1.05, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fill();

    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.arc(0, 0, r * 1.05, 0, Math.PI * 2);
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  };

  if (reduceMotion) {
    targets.forEach(({ ctx, size }) => drawPlanet(ctx, size, 0));
    return;
  }

  let raf = 0;
  const loop = (ms) => {
    const t = ms / 1000;
    targets.forEach(({ ctx, size }) => drawPlanet(ctx, size, t));
    raf = window.requestAnimationFrame(loop);
  };
  raf = window.requestAnimationFrame(loop);

  window.addEventListener("beforeunload", () => window.cancelAnimationFrame(raf));
})();

(() => {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  let w = 0;
  let h = 0;
  let cx = 0;
  let cy = 0;

  const rand = (min, max) => min + Math.random() * (max - min);

  const resize = () => {
    const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
    w = Math.floor(window.innerWidth);
    h = Math.floor(window.innerHeight);
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx = w / 2;
    cy = h / 2;
  };

  // “Feixes” = linhas que nascem no centro e se esticam para fora
  const COUNT = 120;
  const streaks = Array.from({ length: COUNT }, () => ({
    a: rand(0, Math.PI * 2),
    r: rand(0, 60),
    sp: rand(140, 420),           // velocidade radial
    len: rand(50, 220),           // comprimento do feixe
    w: rand(0.6, 2.2),            // espessura
    alpha: rand(0.06, 0.22),      // opacidade
    tw: rand(0.7, 1.6),           // “twinkle” leve
  }));

  const step = (s, dt) => {
    s.r += s.sp * dt;
    if (s.r > Math.max(w, h) * 0.9) {
      s.a = rand(0, Math.PI * 2);
      s.r = rand(0, 60);
      s.sp = rand(140, 420);
      s.len = rand(50, 220);
      s.w = rand(0.6, 2.2);
      s.alpha = rand(0.06, 0.22);
      s.tw = rand(0.7, 1.6);
    }
  };

  const draw = (t) => {
    // fundo bem escuro com um leve “vignette”
    ctx.clearRect(0, 0, w, h);

    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.75);
    g.addColorStop(0, "rgba(255,255,255,0.02)");
    g.addColorStop(1, "rgba(0,0,0,0.0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.lineCap = "round";

    for (const s of streaks) {
      const tw = 0.5 + 0.5 * Math.sin(t * s.tw + s.a * 3);
      const alpha = s.alpha * (0.55 + tw * 0.65);

      const x1 = Math.cos(s.a) * s.r;
      const y1 = Math.sin(s.a) * s.r;
      const x2 = Math.cos(s.a) * (s.r + s.len);
      const y2 = Math.sin(s.a) * (s.r + s.len);

      const lg = ctx.createLinearGradient(x1, y1, x2, y2);
      lg.addColorStop(0, `rgba(255,255,255,0)`);
      lg.addColorStop(0.35, `rgba(255,255,255,${alpha})`);
      lg.addColorStop(1, `rgba(255,255,255,0)`);

      ctx.strokeStyle = lg;
      ctx.lineWidth = s.w;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // núcleo brilhando
    ctx.beginPath();
    ctx.arc(0, 0, 22, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    ctx.fill();
    ctx.restore();
  };

  resize();
  window.addEventListener("resize", resize, { passive: true });

  if (reduceMotion) {
    draw(0);
    return;
  }

  let last = performance.now();
  let raf = 0;
  const loop = (now) => {
    const dt = Math.min(0.033, (now - last) / 1000);
    last = now;

    for (const s of streaks) step(s, dt);
    draw(now / 1000);

    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  window.addEventListener("beforeunload", () => cancelAnimationFrame(raf));
})();

(() => {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  const icon = toggle.querySelector("i");

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    icon.className = theme === "light" ? "bi bi-sun" : "bi bi-moon";
    localStorage.setItem("theme", theme);

    // Update navbar class
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (theme === 'light') {
        navbar.classList.remove('navbar-dark');
        navbar.classList.add('navbar-light');
      } else {
        navbar.classList.remove('navbar-light');
        navbar.classList.add('navbar-dark');
      }
    }
  };

  const savedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(savedTheme);

  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const newTheme = current === "dark" ? "light" : "dark";
    applyTheme(newTheme);
  });
})();

(() => {
  const elements = document.querySelectorAll(".fade-in");
  if (elements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
})();

(() => {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();