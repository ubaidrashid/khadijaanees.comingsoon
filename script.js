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
