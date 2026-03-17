const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const scrollBar = document.querySelector(".scroll-bar");
const revealItems = document.querySelectorAll(".reveal");
const progressBars = document.querySelectorAll(".progress-bar");
const sharedOrb = document.querySelector(".shared-orb");
const sharedTri = document.querySelector(".shared-tri");
const sharedWestern = document.querySelector(".shared-western");
const sharedRing = document.querySelector(".shared-ring");
const sharedPalm = document.querySelector(".shared-palm");
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
const testimonialsPalmAnchor = document.querySelector(".testimonials-palm");
const contactPalmAnchor = document.querySelector(".contact-palm");
const heroSection = document.getElementById("hero");
const aboutSection = document.getElementById("about");
const dividerSection = document.querySelector(".section-divider");
const servicesSection = document.getElementById("services");
const floaterSection = document.querySelector(".section-floater");
const missionGrid = document.querySelector(".mission-grid");

const updateThemeUI = (isLight) => {
  if (!themeToggle) return;
  themeToggle.setAttribute("aria-pressed", String(isLight));
  const label = themeToggle.querySelector(".toggle-label");
  if (label) {
    label.textContent = isLight ? "Dark" : "Light";
  }
};

const applyTheme = (theme) => {
  body.classList.toggle("theme-light", theme === "light");
  body.classList.toggle("theme-dark", theme !== "light");
  updateThemeUI(theme === "light");
};

const storedTheme = localStorage.getItem("gazillion-theme");
applyTheme(storedTheme || "dark");

themeToggle?.addEventListener("click", () => {
  const isLight = body.classList.contains("theme-light");
  const nextTheme = isLight ? "dark" : "light";
  localStorage.setItem("gazillion-theme", nextTheme);
  applyTheme(nextTheme);
});

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

let palmSize = 0;
const updatePalmMetrics = () => {
  if (!sharedPalm) return;
  palmSize = sharedPalm.getBoundingClientRect().width || 0;
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
  const scale = lerp(1, 0.85, t);
  const rotate = lerp(0, 40, t);
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
  const scale = lerp(1, 0.9, t);
  const rotate = lerp(0, -24, t);
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
  const scale = lerp(0.9, 0.7, t);
  sharedWestern.style.transform = `translate3d(${x - westernSize / 2}px, ${
    y - westernSize / 2
  }px, 0) scale(${scale})`;
  sharedWestern.style.opacity = `${lerp(0.5, 0.75, t)}`;
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
    const scale = lerp(1, 0.92, t);
    sharedRing.style.transform = `translate3d(${x - ringSize / 2}px, ${
      y - ringSize / 2
    }px, 0) scale(${scale})`;
    return;
  }

  const range = servicesPage.y - missionPage.y;
  const t = range === 0 ? 1 : clamp((scrollRef - missionPage.y) / range, 0, 1);
  const x = lerp(missionCenter.x, servicesCenter.x, t);
  const y = lerp(missionCenter.y, servicesCenter.y, t);
  const scale = lerp(0.92, 0.85, t);
  sharedRing.style.transform = `translate3d(${x - ringSize / 2}px, ${
    y - ringSize / 2
  }px, 0) scale(${scale})`;
};

const updatePalmPosition = () => {
  if (!sharedPalm || !testimonialsPalmAnchor || !contactPalmAnchor) return;
  const testimonialsPage = getPageCenter(testimonialsPalmAnchor);
  const contactPage = getPageCenter(contactPalmAnchor);
  const scrollRef = window.scrollY + window.innerHeight * 0.5;
  const range = contactPage.y - testimonialsPage.y;
  const t = range === 0 ? 1 : clamp((scrollRef - testimonialsPage.y) / range, 0, 1);
  const testimonialsCenter = getCenter(testimonialsPalmAnchor);
  const contactCenter = getCenter(contactPalmAnchor);
  const x = lerp(testimonialsCenter.x, contactCenter.x, t);
  const y = lerp(testimonialsCenter.y, contactCenter.y, t);
  const scale = lerp(1, 0.8, t);
  sharedPalm.style.transform = `translate3d(${x - palmSize / 2}px, ${
    y - palmSize / 2
  }px, 0) scale(${scale})`;
  sharedPalm.style.opacity = `${lerp(0.35, 0.55, t)}`;
};

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
      updatePalmPosition();
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
updatePalmMetrics();
updatePalmPosition();

window.addEventListener("resize", () => {
  updateOrbMetrics();
  updateOrbPosition();
  updateTriMetrics();
  updateTriPosition();
  updateWesternMetrics();
  updateWesternPosition();
  updateRingMetrics();
  updateRingPosition();
  updatePalmMetrics();
  updatePalmPosition();
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
  { threshold: 0.2 }
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
  updatePalmMetrics();
  updatePalmPosition();
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

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const endpoint = contactForm.dataset.endpoint;
  if (!endpoint) {
    setFormStatus("Set the contact form endpoint before sending.", "error");
    return;
  }

  const payload = getContactPayload(contactForm);
  const submitButton = contactForm.querySelector("button[type='submit']");
  const originalLabel = submitButton?.textContent;

  try {
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }
    setFormStatus("Sending your request...");

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setFormStatus("Thanks! Your message is on its way.", "success");
      contactForm.reset();
      setTimeout(() => {
        window.location.href = "thank-you.html";
      }, 800);
      return;
    }

    let errorMessage = "Something went wrong. Please try again.";
    try {
      const data = await response.json();
      if (data && data.error) {
        errorMessage = data.error;
      }
    } catch (error) {
      // Ignore JSON parse issues and use the default message.
    }
    setFormStatus(errorMessage, "error");
  } catch (error) {
    setFormStatus("Network error. Please try again.", "error");
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      if (originalLabel) submitButton.textContent = originalLabel;
    }
  }
});
