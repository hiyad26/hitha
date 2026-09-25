/* =========================================================
   HITHA — Main JavaScript
   ========================================================= */


/* ================= HERO SLIDER ================= */

const slides = document.querySelectorAll(".hero-background");
const dots = document.querySelectorAll(".dot");

const heroQuotes = [
  {
    arabic:
      "وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ",

    quote:
      "Whatever good you put forward for yourselves—you will find it with Allah.",

    reference:
      "Qur'an 2:110",

    meaning:
      "Every sincere act of goodness matters."
  },

  {
    arabic:
      "مَنْ أَحْيَا أَرْضًا مَيْتَةً فَهِيَ لَهُ",

    quote:
      "Whoever brings life to a barren land, it belongs to him.",

    reference:
      "Sahih al-Bukhari",

    meaning:
      "Small acts of restoration can create lasting benefit."
  },

  {
    arabic:
      "وَمَا أَنفَقْتُم مِّن شَيْءٍ فَهُوَ يُخْلِفُهُ",

    quote:
      "Whatever you spend in charity, He will replace it.",

    reference:
      "Qur'an 34:39",

    meaning:
      "Giving is an act of trust and generosity."
  }
];

let currentSlide = 0;

const heroArabic = document.getElementById("heroArabic");
const heroQuote = document.getElementById("heroQuote");
const heroReference = document.getElementById("heroReference");
const heroMeaning = document.getElementById("heroMeaning");


function showSlide(index) {

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  const quote = heroQuotes[index];

  heroArabic.textContent = quote.arabic;
  heroQuote.textContent = quote.quote;
  heroReference.textContent = "— " + quote.reference;
  heroMeaning.textContent = quote.meaning;

  currentSlide = index;
}


function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}


dots.forEach((dot) => {

  dot.addEventListener("click", () => {

    const index = Number(dot.dataset.slide);

    showSlide(index);

  });

});


setInterval(nextSlide, 6500);


/* ================= MOBILE MENU ================= */

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileNav = document.getElementById("mobileNav");

mobileMenuBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
});


document.querySelectorAll(".mobile-nav a").forEach((link) => {

  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
  });

});


/* ================= REQUEST HELP MODAL ================= */

const helpModal = document.getElementById("helpModal");
const needHelpBtn = document.getElementById("needHelpBtn");
const aboutHelpBtn = document.getElementById("aboutHelpBtn");
const footerHelpBtn = document.getElementById("footerHelpBtn");

const modalClose = document.getElementById("modalClose");
const modalBackdrop = document.getElementById("modalBackdrop");


function openHelpModal() {
  helpModal.classList.add("open");
  document.body.style.overflow = "hidden";
}


function closeHelpModal() {
  helpModal.classList.remove("open");
  document.body.style.overflow = "";
}


needHelpBtn.addEventListener("click", openHelpModal);
aboutHelpBtn.addEventListener("click", openHelpModal);
footerHelpBtn.addEventListener("click", openHelpModal);

modalClose.addEventListener("click", closeHelpModal);
modalBackdrop.addEventListener("click", closeHelpModal);


/* ================= REQUEST HELP FORM ================= */

const helpForm = document.getElementById("helpForm");

helpForm.addEventListener("submit", (event) => {

  event.preventDefault();

  /*
    IMPORTANT:

    This is currently a demonstration only.

    In the real HITHA system this form will send the
    application securely to the HITHA backend/database.

    We will add:
      - secure database storage
      - admin dashboard
      - application ID
      - verification workflow
      - file uploads
      - privacy controls
      - notifications
  */

  alert(
    "Thank you. Your request has been received for review.\n\n" +
    "The secure HITHA application system will be connected in the next stage."
  );

  helpForm.reset();
  closeHelpModal();

});


/* ================= DONATION MODAL ================= */

const donateModal = document.getElementById("donateModal");
const donateClose = document.getElementById("donateClose");
const donateBackdrop = document.getElementById("donateBackdrop");
const donateCaseTitle = document.getElementById("donateCaseTitle");

const donationButtons =
  document.querySelectorAll(".small-donate");

const amountButtons =
  document.querySelectorAll(".amount-buttons button");

const customAmount =
  document.getElementById("customAmount");

const continueDonation =
  document.getElementById("continueDonation");

let selectedAmount = 0;
let selectedCase = "";


function openDonationModal(caseName) {

  selectedCase = caseName;

  donateCaseTitle.textContent =
    "Support " + caseName;

  selectedAmount = 0;

  customAmount.value = "";

  amountButtons.forEach((button) => {
    button.classList.remove("selected");
  });

  donateModal.classList.add("open");

  document.body.style.overflow = "hidden";
}


function closeDonationModal() {

  donateModal.classList.remove("open");

  document.body.style.overflow = "";
}


donationButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const caseName =
      button.dataset.case;

    openDonationModal(caseName);

  });

});


amountButtons.forEach((button) => {

  button.addEventListener("click", () => {

    amountButtons.forEach((btn) => {
      btn.classList.remove("selected");
    });

    button.classList.add("selected");

    selectedAmount =
      Number(button.dataset.amount);

    customAmount.value = "";
  });

});


customAmount.addEventListener("input", () => {

  selectedAmount =
    Number(customAmount.value);

  amountButtons.forEach((button) => {
    button.classList.remove("selected");
  });

});


donateClose.addEventListener(
  "click",
  closeDonationModal
);


donateBackdrop.addEventListener(
  "click",
  closeDonationModal
);


/* ================= DONATION CONTINUE ================= */

continueDonation.addEventListener("click", () => {

  if (!selectedAmount || selectedAmount <= 0) {

    alert("Please select or enter a donation amount.");

    return;
  }


  /*
    DEMO PAYMENT FLOW

    The real version will connect this button to
    the official HITHA payment provider/account.

    The payment system will then create a transaction
    record in the HITHA database.
  */

  alert(
    "Donation selected:\n\n" +
    selectedCase +
    "\n" +
    "Amount: MVR " +
    selectedAmount.toLocaleString() +
    "\n\n" +
    "The secure payment gateway will be connected in the next stage."
  );

  closeDonationModal();

});


/* ================= NUMBER COUNTERS ================= */

const counters =
  document.querySelectorAll("[data-count]");


let countersStarted = false;


function animateCounters() {

  if (countersStarted) return;

  const statsSection =
    document.querySelector(".stats");

  const sectionTop =
    statsSection.getBoundingClientRect().top;

  if (sectionTop < window.innerHeight * 0.85) {

    countersStarted = true;

    counters.forEach((counter) => {

      const target =
        Number(counter.dataset.count);

      let current = 0;

      const duration = 1400;

      const startTime = performance.now();


      function updateCounter(timestamp) {

        const progress =
          Math.min(
            (timestamp - startTime) / duration,
            1
          );

        const eased =
          1 - Math.pow(1 - progress, 3);

        current =
          Math.floor(target * eased);


        if (target >= 1000) {

          counter.textContent =
            current.toLocaleString();

        } else {

          counter.textContent =
            current.toLocaleString();

        }


        if (progress < 1) {

          requestAnimationFrame(updateCounter);

        } else {

          counter.textContent =
            target.toLocaleString();

        }

      }


      requestAnimationFrame(updateCounter);

    });

  }

}


window.addEventListener(
  "scroll",
  animateCounters
);

window.addEventListener(
  "load",
  animateCounters
);


/* ================= ESC KEY ================= */

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {

    closeHelpModal();
    closeDonationModal();

  }

});
