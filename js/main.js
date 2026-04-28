const body = document.body;

const heroBgVideo = document.querySelector(".hero-video video");
if (heroBgVideo) {
  const setHeroSpeed = () => {
    heroBgVideo.playbackRate = 0.5;
  };
  setHeroSpeed();
  heroBgVideo.addEventListener("loadedmetadata", setHeroSpeed);
  heroBgVideo.addEventListener("play", setHeroSpeed);
}

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const scrollBar = document.querySelector(".scroll-bar");
const revealItems = document.querySelectorAll(".reveal");
const progressBars = document.querySelectorAll(".progress-bar");
const sharedOrb = document.querySelector(".shared-orb");
const sharedTri = document.querySelector(".shared-tri");
const sharedWestern = document.querySelector(".shared-western");
const sharedRing = document.querySelector(".shared-ring");
const heroAnchor = document.querySelector(".hero-orb");
const aboutAnchor = document.querySelector(".about-orb");
const heroTriAnchor = document.querySelector(".hero-tri");
const dividerTriAnchor = document.querySelector(".divider-tri");
const servicesWestAnchor = document.querySelector(".services-west");
const floaterWestAnchor = document.querySelector(".floater-west");
const projectsWestAnchor = document.querySelector(".projects-west");
const aboutRingAnchor = document.querySelector(".about-ring");
const missionRingAnchor = document.querySelector(".mission-ring");
const servicesRingAnchor = document.querySelector(".services-ring");
const heroSection = document.getElementById("hero");
const aboutSection = document.getElementById("about");
const dividerSection = document.querySelector(".section-divider");
const servicesSection = document.getElementById("services");
const floaterSection = document.querySelector(".section-floater");
const missionGrid = document.querySelector(".mission-grid");
const heroBackgroundVideo = document.querySelector(".hero-video video");

const applyDarkThemeOnly = () => {
  body.classList.remove("theme-light");
  body.classList.add("theme-dark");
  localStorage.removeItem("gazillion-theme");
};

applyDarkThemeOnly();

const setHeroVideoPlaybackRate = () => {
  if (!heroBackgroundVideo) return;
  const slowRate = 0.72;
  heroBackgroundVideo.defaultPlaybackRate = slowRate;
  heroBackgroundVideo.playbackRate = slowRate;
};

if (heroBackgroundVideo) {
  heroBackgroundVideo.addEventListener("loadedmetadata", setHeroVideoPlaybackRate);
  heroBackgroundVideo.addEventListener("play", setHeroVideoPlaybackRate);
  setHeroVideoPlaybackRate();
}

menuToggle?.addEventListener("click", () => {
  navLinks?.classList.toggle("open");
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

const updateScrollIndicator = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (scrollBar) {
    scrollBar.style.width = `${progress}%`;
  }
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const lerp = (start, end, t) => start + (end - start) * t;

let orbSize = 0;
const updateOrbMetrics = () => {
  if (!sharedOrb) return;
  orbSize = sharedOrb.getBoundingClientRect().width || 0;
};

let triSize = 0;
const updateTriMetrics = () => {
  if (!sharedTri) return;
  triSize = sharedTri.getBoundingClientRect().width || 0;
};

let westernSize = 0;
const updateWesternMetrics = () => {
  if (!sharedWestern) return;
  westernSize = sharedWestern.getBoundingClientRect().width || 0;
};

let ringSize = 0;
const updateRingMetrics = () => {
  if (!sharedRing) return;
  ringSize = sharedRing.getBoundingClientRect().width || 0;
};

const getCenter = (element) => {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
};

const getPageCenter = (element) => {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2 + window.scrollX,
    y: rect.top + rect.height / 2 + window.scrollY,
  };
};

const updateOrbPosition = () => {
  if (!sharedOrb || !heroAnchor || !aboutAnchor || !heroSection || !aboutSection) return;
  const start = heroSection.offsetTop + heroSection.offsetHeight * 0.2;
  const end = aboutSection.offsetTop + aboutSection.offsetHeight * 0.2;
  const range = end - start;
  const t = range <= 0 ? 1 : clamp((window.scrollY - start) / range, 0, 1);
  const heroCenter = getCenter(heroAnchor);
  const aboutCenter = getCenter(aboutAnchor);
  const x = lerp(heroCenter.x, aboutCenter.x, t);
  const y = lerp(heroCenter.y, aboutCenter.y, t);
  const scale = lerp(1, 0.9, t);
  const rotate = lerp(0, 20, t);
  sharedOrb.style.transform = `translate3d(${x - orbSize / 2}px, ${
    y - orbSize / 2
  }px, 0) scale(${scale}) rotate(${rotate}deg)`;
};

const updateTriPosition = () => {
  if (!sharedTri || !heroTriAnchor || !dividerTriAnchor || !heroSection || !dividerSection) return;
  const start = heroSection.offsetTop + heroSection.offsetHeight * 0.3;
  const end = dividerSection.offsetTop + dividerSection.offsetHeight * 0.5;
  const range = end - start;
  const t = range <= 0 ? 1 : clamp((window.scrollY - start) / range, 0, 1);
  const heroCenter = getCenter(heroTriAnchor);
  const dividerCenter = getCenter(dividerTriAnchor);
  const x = lerp(heroCenter.x, dividerCenter.x, t);
  const y = lerp(heroCenter.y, dividerCenter.y, t);
  const scale = lerp(1, 0.95, t);
  const rotate = lerp(0, -14, t);
  sharedTri.style.transform = `translate3d(${x - triSize / 2}px, ${
    y - triSize / 2
  }px, 0) scale(${scale}) rotate(${rotate}deg)`;
};

const updateWesternPosition = () => {
  if (
    !sharedWestern ||
    !servicesWestAnchor ||
    !projectsWestAnchor ||
    !servicesSection
  )
    return;
  const projectsSection = document.getElementById("projects");
  if (!projectsSection) return;
  const start = servicesSection.offsetTop + servicesSection.offsetHeight * 0.15;
  const end = projectsSection.offsetTop + projectsSection.offsetHeight * 0.25;
  const range = end - start;
  const t = range <= 0 ? 1 : clamp((window.scrollY - start) / range, 0, 1);
  const servicesCenter = getCenter(servicesWestAnchor);
  const projectsCenter = getCenter(projectsWestAnchor);
  const x = lerp(servicesCenter.x, projectsCenter.x, t);
  const y = lerp(servicesCenter.y, projectsCenter.y, t);
  const scale = lerp(0.9, 0.78, t);
  sharedWestern.style.transform = `translate3d(${x - westernSize / 2}px, ${
    y - westernSize / 2
  }px, 0) scale(${scale})`;
  sharedWestern.style.opacity = `${lerp(0.42, 0.58, t)}`;
};

const updateRingPosition = () => {
  if (!sharedRing || !aboutRingAnchor || !missionRingAnchor || !servicesRingAnchor) return;
  const aboutPage = getPageCenter(aboutRingAnchor);
  const missionPage = getPageCenter(missionRingAnchor);
  const servicesPage = getPageCenter(servicesRingAnchor);
  const scrollRef = window.scrollY + window.innerHeight * 0.45;

  const aboutCenter = getCenter(aboutRingAnchor);
  const missionCenter = getCenter(missionRingAnchor);
  const servicesCenter = getCenter(servicesRingAnchor);

  if (scrollRef <= missionPage.y) {
    const range = missionPage.y - aboutPage.y;
    const t = range === 0 ? 1 : clamp((scrollRef - aboutPage.y) / range, 0, 1);
    const x = lerp(aboutCenter.x, missionCenter.x, t);
    const y = lerp(aboutCenter.y, missionCenter.y, t);
    const scale = lerp(1, 0.95, t);
    sharedRing.style.transform = `translate3d(${x - ringSize / 2}px, ${
      y - ringSize / 2
    }px, 0) scale(${scale})`;
    return;
  }

  const range = servicesPage.y - missionPage.y;
  const t = range === 0 ? 1 : clamp((scrollRef - missionPage.y) / range, 0, 1);
  const x = lerp(missionCenter.x, servicesCenter.x, t);
  const y = lerp(missionCenter.y, servicesCenter.y, t);
  const scale = lerp(0.95, 0.9, t);
  sharedRing.style.transform = `translate3d(${x - ringSize / 2}px, ${
    y - ringSize / 2
  }px, 0) scale(${scale})`;
};

revealItems.forEach((item, index) => {
  const staggerDelay = (index % 4) * 70;
  item.style.setProperty("--reveal-delay", `${staggerDelay}ms`);
});

let scrollTicking = false;
window.addEventListener("scroll", () => {
  if (!scrollTicking) {
    scrollTicking = true;
    requestAnimationFrame(() => {
      updateScrollIndicator();
      updateOrbPosition();
      updateTriPosition();
      updateWesternPosition();
      updateRingPosition();
      scrollTicking = false;
    });
  }
});

updateScrollIndicator();
updateOrbMetrics();
updateOrbPosition();
updateTriMetrics();
updateTriPosition();
updateWesternMetrics();
updateWesternPosition();
updateRingMetrics();
updateRingPosition();

window.addEventListener("resize", () => {
  updateOrbMetrics();
  updateOrbPosition();
  updateTriMetrics();
  updateTriPosition();
  updateWesternMetrics();
  updateWesternPosition();
  updateRingMetrics();
  updateRingPosition();
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const animateProgress = (circle, value) => {
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;

  const duration = 1200;
  const startTime = performance.now();

  const animate = (time) => {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const offset = circumference - (value / 100) * circumference * progress;
    circle.style.strokeDashoffset = `${offset}`;
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};

const progressObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const circle = entry.target;
        const targetValue = Number(circle.dataset.progress || 0);
        animateProgress(circle, targetValue);
        progressObserver.unobserve(circle);
      }
    });
  },
  { threshold: 0.4 }
);

progressBars.forEach((circle) => progressObserver.observe(circle));

window.addEventListener("load", () => {
  body.classList.add("loaded");
  updateOrbMetrics();
  updateOrbPosition();
  updateTriMetrics();
  updateTriPosition();
  updateWesternMetrics();
  updateWesternPosition();
  updateRingMetrics();
  updateRingPosition();
});

const gimAssistant = document.querySelector(".gim-assistant");
const gimTrigger = document.querySelector(".gim-trigger");
const gimClose = document.querySelector(".gim-close");
const gimNext = document.querySelector(".gim-next");
const gimMessage = document.querySelector(".gim-message");

const gimTips = [
  "Start in About to see our mission and systems vision.",
  "Explore Services to understand what we build end to end.",
  "Projects show what is live and in progress right now.",
  "Contact is the fastest way to start a discovery session.",
];

let gimIndex = 0;
const updateGimTip = () => {
  if (gimMessage) {
    gimMessage.textContent = gimTips[gimIndex % gimTips.length];
  }
};

const toggleGim = (open) => {
  if (!gimAssistant || !gimTrigger) return;
  gimAssistant.classList.toggle("open", open);
  gimTrigger.setAttribute("aria-expanded", String(open));
};

gimTrigger?.addEventListener("click", () => {
  const isOpen = gimAssistant?.classList.contains("open");
  toggleGim(!isOpen);
});

gimClose?.addEventListener("click", () => {
  toggleGim(false);
});

gimNext?.addEventListener("click", () => {
  gimIndex += 1;
  updateGimTip();
});

updateGimTip();

const contactForm = document.getElementById("contactForm");
const formStatus = contactForm?.querySelector(".form-status");

const setFormStatus = (message, type) => {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.classList.remove("success", "error");
  if (type) {
    formStatus.classList.add(type);
  }
};

const getContactPayload = (form) => {
  const data = new FormData(form);
  return {
    name: String(data.get("name") || "").trim(),
    email: String(data.get("email") || "").trim(),
    company: String(data.get("company") || "").trim(),
    message: String(data.get("message") || "").trim(),
    website: String(data.get("website") || "").trim(),
  };
};

const getContactEndpoint = (form) => {
  const endpoint = form.dataset.endpoint || form.getAttribute("action") || "";
  return endpoint.trim() || "/api/contact";
};

// ── IDE Terminal Animation System ───────────────────────────────────────────
const createIdeAnimator = ({ typedEl, streamEl, command, sequence }) => {
  let active = true;

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const typeText = async (el, text) => {
    for (const char of text) {
      if (!active) return;
      el.textContent += char;
      await sleep(42 + Math.random() * 28);
    }
  };

  const buildProgressLine = (streamEl, { tag, tagClass, text, targetPct }) => {
    const line = document.createElement("div");
    line.className = "ide-out-line";

    const wrap = document.createElement("div");
    wrap.className = "ide-progress-wrap";

    if (tag) {
      const tagEl = document.createElement("span");
      tagEl.className = `ide-tag ${tagClass}`;
      tagEl.textContent = tag;
      wrap.appendChild(tagEl);
    }

    const textEl = document.createElement("span");
    textEl.className = "ide-out-text";
    textEl.textContent = text;
    wrap.appendChild(textEl);

    const barWrap = document.createElement("div");
    barWrap.className = "ide-bar";
    const fill = document.createElement("div");
    fill.className = "ide-bar-fill";
    fill.style.width = "0%";
    barWrap.appendChild(fill);
    wrap.appendChild(barWrap);

    const pctEl = document.createElement("span");
    pctEl.className = "ide-bar-pct";
    pctEl.textContent = "0%";
    wrap.appendChild(pctEl);

    line.appendChild(wrap);
    streamEl.appendChild(line);

    return new Promise((resolve) => {
      const dur = 1300;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / dur, 1);
        const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const current = Math.round(eased * targetPct);
        fill.style.width = current + "%";
        pctEl.textContent = current + "%";
        if (t < 1) {
          requestAnimationFrame(tick);
        } else {
          resolve();
        }
      };
      requestAnimationFrame(tick);
    });
  };

  const appendTextLine = (streamEl, { tag, tagClass, text }) => {
    const line = document.createElement("div");
    line.className = "ide-out-line";

    if (tag) {
      const tagEl = document.createElement("span");
      tagEl.className = `ide-tag ${tagClass}`;
      tagEl.textContent = tag;
      line.appendChild(tagEl);
    }

    const textEl = document.createElement("span");
    textEl.className = "ide-out-text";
    textEl.textContent = text;
    line.appendChild(textEl);

    streamEl.appendChild(line);
  };

  const run = async () => {
    while (active) {
      typedEl.textContent = "";
      streamEl.innerHTML = "";

      await typeText(typedEl, command);
      await sleep(360);

      for (const step of sequence) {
        if (!active) break;
        if (step.delay) await sleep(step.delay);

        if (step.progress !== undefined) {
          await buildProgressLine(streamEl, {
            tag: step.tag,
            tagClass: step.tagClass,
            text: step.text,
            targetPct: step.progress,
          });
        } else {
          appendTextLine(streamEl, step);
        }

        await sleep(step.pause ?? 320);
      }

      await sleep(4000);
    }
  };

  run();
};

// ── Code Panel Animator (Hero IDE upper section) ─────────────────────────────
const startCodePanel = (linesEl) => {
  if (!linesEl) return;

  const codeSequence = [
    { tokens: [{ t: "// AnyService SDK — Gazillion Platform v2.4", c: "cl-comment" }] },
    { tokens: [{ t: "import ", c: "cl-keyword" }, { t: "{ GazillionSDK } ", c: "cl-plain" }, { t: "from ", c: "cl-keyword" }, { t: "'@gazillion/core'", c: "cl-string" }, { t: ";", c: "cl-plain" }] },
    { tokens: [] },
    { tokens: [{ t: "const ", c: "cl-keyword" }, { t: "sdk ", c: "cl-plain" }, { t: "= new ", c: "cl-keyword" }, { t: "GazillionSDK", c: "cl-fn" }, { t: "({", c: "cl-plain" }] },
    { tokens: [{ t: "  project: ", c: "cl-plain" }, { t: "'anyservice'", c: "cl-string" }, { t: ",", c: "cl-plain" }] },
    { tokens: [{ t: "  env: ", c: "cl-plain" }, { t: "'production'", c: "cl-string" }, { t: ",", c: "cl-plain" }] },
    { tokens: [{ t: "  region: ", c: "cl-plain" }, { t: "'af-east-1'", c: "cl-string" }, { t: ",", c: "cl-plain" }] },
    { tokens: [{ t: "});", c: "cl-plain" }] },
    { tokens: [] },
    { tokens: [{ t: "const ", c: "cl-keyword" }, { t: "providers ", c: "cl-plain" }, { t: "= await ", c: "cl-keyword" }, { t: "sdk.discover", c: "cl-fn" }, { t: "({", c: "cl-plain" }] },
    { tokens: [{ t: "  mode: ", c: "cl-plain" }, { t: "'near-me'", c: "cl-string" }, { t: ", radius: ", c: "cl-plain" }, { t: "5", c: "cl-num" }, { t: ",", c: "cl-plain" }] },
    { tokens: [{ t: "  verified: ", c: "cl-plain" }, { t: "true", c: "cl-keyword" }, { t: ", limit: ", c: "cl-plain" }, { t: "20", c: "cl-num" }, { t: ",", c: "cl-plain" }] },
    { tokens: [{ t: "});", c: "cl-plain" }] },
    { tokens: [] },
    { tokens: [{ t: "await ", c: "cl-keyword" }, { t: "sdk.deploy", c: "cl-fn" }, { t: "({ version: ", c: "cl-plain" }, { t: "'2.4.0'", c: "cl-string" }, { t: " });", c: "cl-plain" }] },
  ];

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const run = async () => {
    while (true) {
      linesEl.innerHTML = "";
      for (let i = 0; i < codeSequence.length; i++) {
        const row = codeSequence[i];
        const line = document.createElement("div");
        line.className = "ide-cl";

        const lnSpan = document.createElement("span");
        lnSpan.className = "cl-ln";
        lnSpan.textContent = String(i + 1).padStart(2, " ");
        line.appendChild(lnSpan);

        for (const tok of row.tokens) {
          const span = document.createElement("span");
          span.className = tok.c;
          span.textContent = tok.t;
          line.appendChild(span);
        }

        linesEl.appendChild(line);
        await sleep(140 + Math.random() * 60);
      }
      await sleep(5500);
    }
  };

  run();
};

const heroCodeLinesEl = document.getElementById("heroCodeLines");
startCodePanel(heroCodeLinesEl);

// Project showcase bar animation
const pshowBarFill = document.querySelector(".pshow-bar-fill");
if (pshowBarFill) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          pshowBarFill.style.width = "100%";
        }, 400);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  observer.observe(pshowBarFill);
}

// Hero IDE – navy/cyan deployment terminal
const heroTypedEl = document.getElementById("heroTyped");
const heroStreamEl = document.getElementById("heroStream");

if (heroTypedEl && heroStreamEl) {
  createIdeAnimator({
    typedEl: heroTypedEl,
    streamEl: heroStreamEl,
    command: "./deploy.sh --env production --region auto",
    sequence: [
      { tag: "RUN",  tagClass: "tag-run",  text: "Initializing deployment pipeline...", pause: 340 },
      { tag: "OK",   tagClass: "tag-ok",   text: "Connected to Gazillion Cloud (us-east-1)", pause: 300 },
      { tag: null,   tagClass: null,        text: "Building containers",      progress: 100, pause: 220 },
      { tag: "INFO", tagClass: "tag-info", text: "Pulling gazillion/ai-core:latest", pause: 380 },
      { tag: "RUN",  tagClass: "tag-run",  text: "Starting 14 microservices...", pause: 420 },
      { tag: "OK",   tagClass: "tag-ok",   text: "AI inference engine ready", pause: 280 },
      { tag: "OK",   tagClass: "tag-ok",   text: "API gateway connected  :443", pause: 300 },
      { tag: null,   tagClass: null,        text: "Deploying to edge nodes",  progress: 100, pause: 200 },
      { tag: "OK",   tagClass: "tag-ok",   text: "All 9/9 health checks passed", pause: 340 },
      { tag: "INFO", tagClass: "tag-info", text: "Uptime: 99.97%  (30-day avg)", pause: 560 },
      { tag: "RUN",  tagClass: "tag-run",  text: "monitor --live --interval 2s", pause: 320 },
      { tag: "OK",   tagClass: "tag-ok",   text: "Requests/s: 2,418  ↑ +8%", pause: 340 },
      { tag: "OK",   tagClass: "tag-ok",   text: "Avg latency: 12ms  P99: 38ms", pause: 340 },
      { tag: "INFO", tagClass: "tag-info", text: "Active sessions: 847", pause: 300 },
      { tag: "OK",   tagClass: "tag-ok",   text: "System fully operational ✓", pause: 380 },
    ],
  });
}

// About IDE – green network/hacking terminal
const aboutTypedEl = document.getElementById("aboutTyped");
const aboutStreamEl = document.getElementById("aboutStream");

if (aboutTypedEl && aboutStreamEl) {
  setTimeout(() => {
    createIdeAnimator({
      typedEl: aboutTypedEl,
      streamEl: aboutStreamEl,
      command: "./net_scan.sh --range 10.0.0.0/24 --mode full",
      sequence: [
        { tag: "NET",  tagClass: "tag-net",  text: "Initializing scan on 10.0.0.0/24", pause: 360 },
        { tag: null,   tagClass: null,        text: "Scanning 256 hosts",  progress: 100, pause: 220 },
        { tag: "OK",   tagClass: "tag-ok",   text: "Host 10.0.0.12  — active", pause: 240 },
        { tag: "OK",   tagClass: "tag-ok",   text: "Host 10.0.0.47  — active", pause: 240 },
        { tag: "OK",   tagClass: "tag-ok",   text: "Host 10.0.0.103 — active", pause: 270 },
        { tag: "NET",  tagClass: "tag-net",  text: "Running port analysis on 3 hosts", pause: 380 },
        { tag: "OK",   tagClass: "tag-ok",   text: "Open: 22, 80, 443, 8443", pause: 300 },
        { tag: "WARN", tagClass: "tag-warn", text: "Unusual traffic: 10.0.0.91", pause: 420 },
        { tag: "NET",  tagClass: "tag-net",  text: "Intrusion analysis running...", pause: 360 },
        { tag: null,   tagClass: null,        text: "Analyzing packets",    progress: 100, pause: 200 },
        { tag: "OK",   tagClass: "tag-ok",   text: "No threats detected", pause: 360 },
        { tag: "INFO", tagClass: "tag-info", text: "Bandwidth: 847 MB/s  TX/RX", pause: 320 },
        { tag: "INFO", tagClass: "tag-info", text: "Packets analyzed: 4.2M", pause: 360 },
        { tag: "OK",   tagClass: "tag-ok",   text: "Network integrity: VERIFIED ✓", pause: 400 },
      ],
    });
  }, 1600);
}

// ── End IDE Terminal Animation ───────────────────────────────────────────────

const WHATSAPP_NUMBER = "250784861283";

const buildWhatsappMessage = ({ name, email, company, message }) => {
  const lines = [
    "Hello Gazillion, I just contacted you through your website.",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "Not provided"}`,
    "",
    "Message:",
    message,
  ];
  return lines.join("\n");
};

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const payload = getContactPayload(contactForm);

  if (payload.website) {
    setFormStatus("Thanks! Your message is on its way.", "success");
    contactForm.reset();
    return;
  }

  const submitButton = contactForm.querySelector("button[type='submit']");
  const originalLabel = submitButton?.textContent;

  try {
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Opening WhatsApp...";
    }
    setFormStatus("Opening WhatsApp to send your message...");

    const text = encodeURIComponent(buildWhatsappMessage(payload));
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

    const opened = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (!opened) {
      window.location.href = whatsappUrl;
    }

    setFormStatus("Thanks! Continue the conversation on WhatsApp.", "success");
    contactForm.reset();
  } catch (error) {
    setFormStatus("Could not open WhatsApp. Please try again.", "error");
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      if (originalLabel) submitButton.textContent = originalLabel;
    }
  }
});

// ── Process Timeline: Scroll-Drawn Glowing Path ──────────────────────────────
(function initProcessPath() {
  const timeline = document.getElementById("processTimeline");
  if (!timeline) return;

  const fillPath = timeline.querySelector(".process-path-fill");
  const steps = Array.from(timeline.querySelectorAll(".pt-step"));
  if (!fillPath || steps.length === 0) return;

  let pathLength = 0;
  const setupPathLength = () => {
    pathLength = fillPath.getTotalLength();
    fillPath.style.strokeDasharray = String(pathLength);
    fillPath.style.strokeDashoffset = String(pathLength);
  };

  const updatePath = () => {
    if (window.innerWidth <= 760) {
      fillPath.style.strokeDashoffset = "0";
      steps.forEach((s) => s.classList.add("is-active"));
      return;
    }

    const rect = timeline.getBoundingClientRect();
    const viewH = window.innerHeight;
    const start = viewH * 0.85;
    const end = viewH * 0.25;
    const range = start - end;
    const passed = clamp((start - rect.top) / range, 0, 1);

    fillPath.style.strokeDashoffset = String(pathLength * (1 - passed));

    steps.forEach((step, idx) => {
      const threshold = (idx + 0.6) / steps.length;
      if (passed >= threshold) step.classList.add("is-active");
      else step.classList.remove("is-active");
    });
  };

  setupPathLength();
  updatePath();
  window.addEventListener("scroll", updatePath, { passive: true });
  window.addEventListener("resize", () => {
    setupPathLength();
    updatePath();
  });
})();

// ── Section-Aware Navbar (active link indicator) ─────────────────────────────
(function initActiveNav() {
  const links = Array.from(document.querySelectorAll(".nav-links a[href^='#']"));
  if (links.length === 0) return;

  const map = new Map();
  links.forEach((link) => {
    const id = link.getAttribute("href").slice(1);
    const sec = document.getElementById(id);
    if (sec) map.set(sec, link);
  });
  if (map.size === 0) return;

  const sections = Array.from(map.keys());

  const setActive = (link) => {
    links.forEach((l) => l.classList.remove("is-active"));
    if (link) link.classList.add("is-active");
  };

  const updateActive = () => {
    const probe = window.innerHeight * 0.32;
    let current = sections[0];
    for (const sec of sections) {
      const rect = sec.getBoundingClientRect();
      if (rect.top - probe <= 0) current = sec;
    }
    setActive(map.get(current));
  };

  updateActive();
  window.addEventListener("scroll", updateActive, { passive: true });
  window.addEventListener("resize", updateActive);
})();

// ── Service Cards: 3D Tilt + Cursor Spotlight ───────────────────────────────
(function initCardTilt() {
  const cards = document.querySelectorAll(".service-card");
  if (cards.length === 0) return;
  if (window.matchMedia("(hover: none)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const MAX_TILT = 8;

  cards.forEach((card) => {
    let rafId = null;
    let pending = null;

    const apply = () => {
      if (!pending) return;
      const { rx, ry, mx, my } = pending;
      card.style.setProperty("--rx", `${rx}deg`);
      card.style.setProperty("--ry", `${ry}deg`);
      card.style.setProperty("--mx", `${mx}%`);
      card.style.setProperty("--my", `${my}%`);
      pending = null;
      rafId = null;
    };

    card.addEventListener("mouseenter", () => {
      card.classList.add("is-tilting");
    });

    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      pending = {
        rx: clamp((0.5 - y) * MAX_TILT * 2, -MAX_TILT, MAX_TILT),
        ry: clamp((x - 0.5) * MAX_TILT * 2, -MAX_TILT, MAX_TILT),
        mx: x * 100,
        my: y * 100,
      };
      if (!rafId) rafId = requestAnimationFrame(apply);
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("is-tilting");
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
      card.style.setProperty("--mx", "50%");
      card.style.setProperty("--my", "50%");
    });
  });
})();

// ── AnyService Slide-In Ad ────────────────────────────────────────────────────
(function initAsAd() {
  const asAd    = document.getElementById("asAd");
  const asTab   = document.getElementById("asTab");
  const asClose = document.getElementById("asClose");
  const msgs    = document.querySelectorAll(".as-msg");
  if (!asAd || !asTab || !asClose || !msgs.length) return;

  let open = false;
  let msgIdx = 0;
  let msgTimer = null;

  const openAd = () => {
    open = true;
    asAd.classList.add("is-open");
    asTab.setAttribute("aria-expanded", "true");
    startMsgCycle();
  };

  const closeAd = () => {
    open = false;
    asAd.classList.remove("is-open");
    asTab.setAttribute("aria-expanded", "false");
    clearInterval(msgTimer);
  };

  const showMsg = (idx) => {
    msgs.forEach((m) => m.classList.remove("is-active"));
    msgs[idx].classList.add("is-active");
  };

  const startMsgCycle = () => {
    clearInterval(msgTimer);
    msgTimer = setInterval(() => {
      msgIdx = (msgIdx + 1) % msgs.length;
      showMsg(msgIdx);
    }, 3200);
  };

  asTab.addEventListener("click", () => {
    open ? closeAd() : openAd();
  });

  asClose.addEventListener("click", (e) => {
    e.stopPropagation();
    closeAd();
  });

  // Open on load and stay open — only closes when user dismisses it
  setTimeout(openAd, 900);
})();
