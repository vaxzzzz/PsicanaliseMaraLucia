const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -50px 0px" },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

window.addEventListener("scroll", () => {
  document.querySelector("nav").style.boxShadow =
    window.scrollY > 40 ? "0 4px 24px rgba(92,61,46,.08)" : "none";
});

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});
function handleNavCta() {
  const desktopCta = document.querySelector(".nav-cta.desktop-only");
  const mobileCta = document.querySelector(".nav-links .mobile-only");
  if (window.innerWidth <= 768) {
    if (desktopCta) desktopCta.style.display = "none";
    if (mobileCta) mobileCta.style.display = "list-item";
  } else {
    if (desktopCta) desktopCta.style.display = "inline-block";
    if (mobileCta) mobileCta.style.display = "none";
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  }
}
window.addEventListener("resize", handleNavCta);
handleNavCta();

const track = document.getElementById("depTrack");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
const cards = Array.from(track.children);
let currentIndex = 0;
let visibleCards = 4;
let cardWidthWithGap = 0;

function updateCarousel() {
  if (cards.length === 0) return;
  const gapPx =
    1.4 * parseFloat(getComputedStyle(document.documentElement).fontSize);
  cardWidthWithGap = cards[0].offsetWidth + gapPx;
  if (window.innerWidth <= 768) visibleCards = 1;
  else if (window.innerWidth <= 1024) visibleCards = 2;
  else visibleCards = 4;
  const maxIndex = cards.length - visibleCards;
  if (currentIndex > maxIndex) currentIndex = Math.max(0, maxIndex);
  track.style.transform = `translateX(-${currentIndex * cardWidthWithGap}px)`;
  prevBtn.classList.toggle("disabled", currentIndex === 0);
  nextBtn.classList.toggle("disabled", currentIndex >= maxIndex);
}

nextBtn.addEventListener("click", () => {
  const maxIndex = cards.length - visibleCards;
  if (currentIndex < maxIndex) {
    currentIndex = Math.min(currentIndex + visibleCards, maxIndex);
    updateCarousel();
  }
});
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex = Math.max(currentIndex - visibleCards, 0);
    updateCarousel();
  }
});

window.addEventListener("resize", updateCarousel);
updateCarousel();
