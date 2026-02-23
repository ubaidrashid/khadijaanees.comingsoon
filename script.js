// ✅ Newsletter submit (Front page only)

const API_URL =
  "https://khadijacomingsoon-backend-production.up.railway.app/api/newsletter/subscribe";

// Email validation
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);
}

// Subscribe request
async function subscribe(email, msgEl, btnEl) {
  const value = (email || "").trim().toLowerCase();

  if (!isValidEmail(value)) {
    msgEl.textContent = "Please enter a valid email address.";
    return;
  }

  btnEl.disabled = true;
  const oldText = btnEl.textContent;
  btnEl.textContent = "Joining...";
  msgEl.textContent = "";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: value }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      msgEl.textContent = data?.message || "Something went wrong. Try again.";
      return;
    }

    msgEl.textContent = data?.message || "✅ Subscribed successfully.";
  } catch (e) {
    msgEl.textContent = "Network error. Please try again.";
  } finally {
    btnEl.disabled = false;
    btnEl.textContent = oldText;
  }
}

// Front page form
const nlFormInline = document.getElementById("nlFormInline");
const nlEmailInline = document.getElementById("nlEmailInline");
const nlMsgInline = document.getElementById("nlMsgInline");
const nlBtnInline = document.getElementById("nlBtnInline");

nlFormInline?.addEventListener("submit", (e) => {
  e.preventDefault();
  subscribe(nlEmailInline.value, nlMsgInline, nlBtnInline);
});

const heroTrack = document.getElementById("heroTrack");

// Desktop images
const deskImages = [
  "./assets/hero/desk.jpg",
  "./assets/hero/00.jpg",
  "./assets/hero/NL.png",
];

// Mobile images
const mobImages = [
  "./assets/hero/01.jpg",
  "./assets/hero/02.jpg",
  "./assets/hero/03.jpg",
];

const isMobile = window.innerWidth <= 480;
const images = isMobile ? mobImages : deskImages;

// create slides
images.forEach((img) => {
  const slide = document.createElement("div");
  slide.classList.add("hero-slide");
  slide.style.backgroundImage = `url(${img})`;
  heroTrack.appendChild(slide);
});

// ⭐ clone first slide (IMPORTANT)
const firstClone = heroTrack.children[0].cloneNode(true);
heroTrack.appendChild(firstClone);

let current = 0;

setInterval(() => {
  current++;
  heroTrack.style.transition = "transform 1s ease";
  heroTrack.style.transform = `translateX(-${current * 100}%)`;

  // smooth reset
  if (current === images.length) {
    setTimeout(() => {
      heroTrack.style.transition = "none";
      heroTrack.style.transform = "translateX(0)";
      current = 0;
    }, 1000); // same as transition duration
  }
}, 3000);

window.addEventListener("resize", () => {
  location.reload();
});
