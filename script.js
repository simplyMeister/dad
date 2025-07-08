// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background on scroll - REMOVED to allow dynamic color changes

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Add animation classes and observe elements
document.addEventListener("DOMContentLoaded", () => {
  // About cards
  document.querySelectorAll(".about-card").forEach((card, index) => {
    card.classList.add("fade-in");
    card.style.transitionDelay = `${index * 0.2}s`;
    observer.observe(card);
  });

  // Timeline items
  document.querySelectorAll(".timeline-item").forEach((item, index) => {
    if (index % 2 === 0) {
      item.classList.add("slide-in-left");
    } else {
      item.classList.add("slide-in-right");
    }
    item.style.transitionDelay = `${index * 0.3}s`;
    observer.observe(item);
  });

  // Testimonial cards
  document.querySelectorAll(".testimonial-card").forEach((card, index) => {
    card.classList.add("fade-in");
    card.style.transitionDelay = `${index * 0.2}s`;
    observer.observe(card);
  });

  // Section headers
  document.querySelectorAll(".section-header").forEach((header) => {
    header.classList.add("fade-in");
    observer.observe(header);
  });
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".hero-background");
  const speed = scrolled * 0.5;

  if (parallax) {
    parallax.style.transform = `translateY(${speed}px)`;
  }
});

// Counter animation for hero stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent =
        target === Number.POSITIVE_INFINITY ? "∞" : Math.ceil(target);
      clearInterval(timer);
    } else {
      element.textContent = Math.ceil(start);
    }
  }, 16);
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = document.querySelectorAll(".stat-number");
        statNumbers.forEach((stat, index) => {
          const text = stat.textContent;
          if (text === "60") {
            animateCounter(stat, 60);
          } else if (text === "30+") {
            stat.textContent = "0+";
            animateCounter(stat, 30);
            setTimeout(() => {
              stat.textContent = "30+";
            }, 2000);
          }
        });
        heroObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const heroSection = document.querySelector(".hero");
if (heroSection) {
  heroObserver.observe(heroSection);
}

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Add hover effects to floating shapes
document.querySelectorAll(".shape").forEach((shape) => {
  shape.addEventListener("mouseenter", () => {
    shape.style.animationPlayState = "paused";
    shape.style.transform = "scale(1.2)";
  });

  shape.addEventListener("mouseleave", () => {
    shape.style.animationPlayState = "running";
    shape.style.transform = "scale(1)";
  });
});

// Preload images for better performance
function preloadImages() {
  const images = [
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=400&width=600",
  ];

  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

preloadImages();

// Photo Grid Lightbox functionality
document.addEventListener("DOMContentLoaded", () => {
  const photoItems = document.querySelectorAll(".photo-item");

  // Add click event to each photo for potential lightbox functionality
  photoItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      // You can add lightbox functionality here if needed
      console.log(`Photo ${index + 1} clicked`);
    });

    // Add animation delay for staggered entrance
    item.classList.add("fade-in");
    item.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(item);
  });
});

// Enhanced hover effects for photo grid
document.querySelectorAll(".photo-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.style.zIndex = "10";
  });

  item.addEventListener("mouseleave", () => {
    item.style.zIndex = "1";
  });
});

// Typing Animation with Following Cursor
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = Number.parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = this.txt;

    // Initial Type Speed
    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener("DOMContentLoaded", init);

// Global Bubbles Management
class BubbleManager {
  constructor() {
    this.bubblesContainer = document.getElementById("globalBubbles");
    this.maxBubbles = 15;
    this.bubbles = [];
    this.init();
  }

  init() {
    // Create initial bubbles
    for (let i = 0; i < this.maxBubbles; i++) {
      this.createBubble();
    }

    // Create new bubbles periodically
    setInterval(() => {
      if (this.bubbles.length < this.maxBubbles) {
        this.createBubble();
      }
    }, 2000);
  }

  createBubble() {
    const bubble = document.createElement("div");
    bubble.className = "global-bubble";

    // Random size between 20px and 80px
    const size = Math.random() * 60 + 20;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    // Random starting position along the bottom
    const startX = Math.random() * window.innerWidth;
    bubble.style.left = `${startX}px`;

    // Random animation duration between 12s and 20s
    const duration = Math.random() * 8 + 12;
    bubble.style.animationDuration = `${duration}s`;

    // Random delay
    const delay = Math.random() * 5;
    bubble.style.animationDelay = `${delay}s`;

    // Random horizontal drift
    const drift = (Math.random() - 0.5) * 200;
    bubble.style.setProperty("--drift", `${drift}px`);

    this.bubblesContainer.appendChild(bubble);
    this.bubbles.push(bubble);

    // Remove bubble after animation completes
    setTimeout(() => {
      if (bubble.parentNode) {
        bubble.parentNode.removeChild(bubble);
        this.bubbles = this.bubbles.filter((b) => b !== bubble);
      }
    }, (duration + delay) * 1000);
  }
}

// Init App
function init() {
  const txtElement = document.querySelector("#typed-text");
  const words = [
    "Wonderful Father",
    "Dedicated Leader",
    "Hospitality Expert",
    "Inspiring Mentor",
    "Loving Family Man",
    "Industry Pioneer",
    "Exceptional Manager",
    "Caring Friend",
  ];
  const wait = 2000;

  if (txtElement) {
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
  }

  // Initialize bubble manager
  new BubbleManager();
}

// Dynamic nav color based on section in view
function updateNavColorOnScroll() {
  const nav = document.querySelector(".nav");
  const sections = document.querySelectorAll("section[data-navcolor]");
  const navHeight = nav.offsetHeight;

  let currentColor = "#353f9e"; // default

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top - navHeight <= 0 && rect.bottom - navHeight > 0) {
      currentColor = section.getAttribute("data-navcolor");
    }
  });

  // Add transparency and box shadow
  const rgbaColor = hexToRgba(currentColor, 0.95);
  nav.style.background = rgbaColor;
  nav.style.boxShadow =
    window.scrollY > 100 ? "0 2px 20px rgba(0, 0, 0, 0.1)" : "none";

  // Debug: log the current color
  console.log("Nav color changed to:", currentColor, rgbaColor);
}

// Helper function to convert hex to rgba
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

window.addEventListener("scroll", updateNavColorOnScroll);
window.addEventListener("resize", updateNavColorOnScroll);
document.addEventListener("DOMContentLoaded", updateNavColorOnScroll);

// Birthday Cake Loader Animation and Hide Logic
if (document.getElementById("cake-loader")) {
  // Load GSAP if not already loaded
  function runCakeLoaderAnimation() {
    const timeline = gsap.timeline({ duration: 0.3 });
    timeline.fromTo(
      "#cake-loader .cake-topping",
      { yPercent: -300, opacity: 0.5 },
      { yPercent: 0, opacity: 1 }
    );
    timeline.to("#cake-loader .candle-container", { opacity: 1 });
    timeline.to("#cake-loader .flame-wrap", { scale: 1, ease: "back.out" });
    timeline.to("#cake-loader .greeting", { scale: 1, ease: "back.out" });
    timeline.to("#cake-loader .star", {
      opacity: 0.5,
      stagger: 0.05,
      onComplete: function () {
        gsap.to("#cake-loader .star", {
          scale: 0.25,
          repeat: -1,
          stagger: 0.1,
          yoyo: true,
          yoyoEase: "power1.out",
        });
      },
    });
  }

  // Wait for GSAP to be available
  function waitForGSAPAndRun() {
    if (window.gsap) {
      runCakeLoaderAnimation();
    } else {
      setTimeout(waitForGSAPAndRun, 50);
    }
  }
  waitForGSAPAndRun();

  // Hide loader and show main content after 5 seconds
  setTimeout(function () {
    const loader = document.getElementById("cake-loader");
    loader.style.opacity = 0;
    setTimeout(function () {
      loader.style.display = "none";
      document.getElementById("main-content").style.display = "";
      document.getElementById("birth-css")?.remove();
      document.getElementById("birth-js")?.remove();

      // Start playing music when main content appears
      startBackgroundMusic();
    }, 700);
  }, 5000);
}

// Background Music Control
let isMusicPlaying = false;
let musicVolume = 0.3;

function startBackgroundMusic() {
  const music = document.getElementById("birthday-music");
  const musicBtn = document.getElementById("music-toggle");

  if (music && musicBtn) {
    // Set initial volume
    music.volume = musicVolume;

    // Try to play music automatically
    music
      .play()
      .then(() => {
        isMusicPlaying = true;
        musicBtn.classList.add("playing");
        musicBtn.title = "Pause Music";
      })
      .catch((error) => {
        console.log("Auto-play prevented:", error);
        // User interaction required to play music
      });

    // Music toggle button functionality
    musicBtn.addEventListener("click", function () {
      if (isMusicPlaying) {
        music.pause();
        isMusicPlaying = false;
        musicBtn.classList.remove("playing");
        musicBtn.title = "Play Music";
      } else {
        music.play();
        isMusicPlaying = true;
        musicBtn.classList.add("playing");
        musicBtn.title = "Pause Music";
      }
    });

    // Handle music ending
    music.addEventListener("ended", function () {
      // Music will loop automatically due to loop attribute
    });

    // Handle music errors
    music.addEventListener("error", function () {
      console.log("Error loading music file");
      musicBtn.style.display = "none"; // Hide button if music fails to load
    });
  }
}

// Add music controls to mobile menu
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const musicBtn = document.getElementById("music-toggle");

  if (hamburger && navMenu && musicBtn) {
    // Move music button to mobile menu on small screens
    function handleResize() {
      if (window.innerWidth <= 768) {
        if (!navMenu.contains(musicBtn)) {
          navMenu.appendChild(musicBtn);
        }
      } else {
        const navControls = document.querySelector(".nav-controls");
        if (navControls && !navControls.contains(musicBtn)) {
          navControls.appendChild(musicBtn);
        }
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
  }
});

// --- Supabase config ---
const SUPABASE_URL = "https://ajdyzkcdxdhhxnskqthr.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqZHl6a2NkeGRoaHhuc2txdGhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NzczNTMsImV4cCI6MjA2NzQ1MzM1M30.bAbFN49QDjjX9T870HvyUYcwUJ1PM23qKQ6Ik2JMCk0";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const testimonialForm = document.getElementById("testimonial-form");
const testimonialSuccess = document.getElementById("testimonial-form-success");
const testimonialsGrid = document.querySelector(".testimonials-grid");

// --- Fetch and Render Testimonials ---
async function loadTestimonials() {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading testimonials:", error);
    return;
  }

  // Clear current testimonials
  testimonialsGrid.innerHTML = "";

  // Render each testimonial
  data.forEach((t) => {
    const card = document.createElement("div");
    card.className = "testimonial-card";
    card.innerHTML = `
      <div class="testimonial-content">
        <p>${t.message}</p>
      </div>
      <div class="testimonial-author">
        <div class="author-info">
          <h4>${t.name}</h4>
          <span>${t.relation}</span>
        </div>
      </div>
    `;
    testimonialsGrid.appendChild(card);
  });
}

// --- Handle Form Submission ---
if (testimonialForm) {
  testimonialForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("testimonial-name").value.trim();
    const relation = document
      .getElementById("testimonial-relation")
      .value.trim();
    const message = document.getElementById("testimonial-message").value.trim();

    if (!name || !relation || !message) return;

    const { error } = await supabase
      .from("testimonials")
      .insert([{ name, relation, message }]);

    if (error) {
      alert("Error submitting testimonial. Please try again.");
      return;
    }

    testimonialForm.reset();
    testimonialSuccess.style.display = "block";
    setTimeout(() => {
      testimonialSuccess.style.display = "none";
    }, 3000);

    loadTestimonials();
  });
}

// --- Initial load ---
if (testimonialsGrid) {
  loadTestimonials();
}
