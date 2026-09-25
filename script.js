const DEMO_CASES = [
  {
    id: "C001",
    type: "case",
    title: "Medical treatment assistance",
    category: "Medical Assistance",
    location: "Malé",
    target: 50000,
    raised: 32500,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    story: "A family is seeking assistance toward urgent medical treatment and related expenses.",
    published: true
  },
  {
    id: "C002",
    type: "case",
    title: "Mobility support for a family member",
    category: "Disability Support",
    location: "Addu City",
    target: 30000,
    raised: 18750,
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80",
    story: "Assistance is needed for essential mobility equipment and related costs.",
    published: true
  },
  {
    id: "C003",
    type: "case",
    title: "Emergency household assistance",
    category: "Emergency Assistance",
    location: "Thulusdhoo",
    target: 25000,
    raised: 14000,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    story: "A household is seeking short-term support after an unexpected financial emergency.",
    published: true
  }
];

const DEMO_PROJECTS = [
  {
    id: "P001",
    type: "project",
    title: "Mosque renovation project",
    category: "Community Project",
    location: "Island community",
    target: 150000,
    raised: 97000,
    image: "https://images.unsplash.com/photo-1564769625392-651b89c7e3c3?auto=format&fit=crop&w=1200&q=80",
    story: "A community project seeking support for approved mosque renovation and essential works.",
    published: true
  },
  {
    id: "P002",
    type: "project",
    title: "Community water project",
    category: "Community Project",
    location: "Island community",
    target: 80000,
    raised: 46000,
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=1200&q=80",
    story: "A community initiative focused on improving access to essential water infrastructure.",
    published: true
  }
];

const DEMO_TRANSACTIONS = [
  {
    date: "2026-09-20",
    ref: "DEMO-1001",
    type: "Donation",
    amount: 5000,
    status: "Recorded"
  },
  {
    date: "2026-09-21",
    ref: "DEMO-1002",
    type: "Assistance",
    amount: -7500,
    status: "Recorded"
  },
  {
    date: "2026-09-22",
    ref: "DEMO-1003",
    type: "Donation",
    amount: 10000,
    status: "Recorded"
  },
  {
    date: "2026-09-23",
    ref: "DEMO-1004",
    type: "Project contribution",
    amount: 2500,
    status: "Recorded"
  }
];

let cases =
  JSON.parse(localStorage.getItem("hitha_cases") || "null") ||
  DEMO_CASES;

let projects =
  JSON.parse(localStorage.getItem("hitha_projects") || "null") ||
  DEMO_PROJECTS;

let adminTab = "cases";

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => [...document.querySelectorAll(selector)];

const money = (number) =>
  "MVR " + Number(number || 0).toLocaleString("en-US");

function save() {
  localStorage.setItem("hitha_cases", JSON.stringify(cases));
  localStorage.setItem("hitha_projects", JSON.stringify(projects));
}

function esc(value = "") {
  return String(value).replace(/[&<>"']/g, (match) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[match]));
}

function card(item) {
  const target = Number(item.target || 0);
  const raised = Number(item.raised || 0);

  const pct =
    target > 0
      ? Math.min(100, Math.round((raised / target) * 100))
      : 0;

  return `
    <article class="case-card">

      <div
        class="case-img"
        style="background-image:url('${esc(
          item.image ||
          "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80"
        )}')">
      </div>

      <div class="case-body">

        <span class="tag">${esc(item.category)}</span>

        <h3>${esc(item.title)}</h3>

        <div class="location">
          📍 ${esc(item.location)}
        </div>

        <p class="story-preview">
          ${esc(item.story)}
        </p>

        <div class="money-row">
          <span>${money(raised)} raised</span>
          <span>${money(target)}</span>
        </div>

        <div class="progress">
          <i style="width:${pct}%"></i>
        </div>

        <div class="money-row">
          <span>${pct}% funded</span>
          <span>
            ${money(Math.max(0, target - raised))}
            remaining
          </span>
        </div>

        <div class="card-actions">

          <button
            class="btn btn-ghost"
            onclick="showDetails('${esc(item.id)}')">
            Read Story
          </button>

          <button
            class="btn btn-primary"
            data-open-donate>
            Donate
          </button>

        </div>

      </div>
    </article>
  `;
}

function render() {

  cases = cases.filter(Boolean);
  projects = projects.filter(Boolean);

  const caseGrid = $("#caseGrid");
  const projectGrid = $("#projectGrid");

  if (caseGrid) {
    caseGrid.innerHTML =
      cases
        .filter((item) => item.published)
        .map(card)
        .join("") ||
      '<div class="empty">No published cases yet.</div>';
  }

  if (projectGrid) {
    projectGrid.innerHTML =
      projects
        .filter((item) => item.published)
        .map(card)
        .join("") ||
      '<div class="empty">No published projects yet.</div>';
  }

  const completedGrid = $("#completedGrid");

  if (completedGrid) {
    completedGrid.innerHTML = `
      <div class="completed-card">
        <b>Demo completed case</b>
        <p>
          Assistance delivered and case closed.
          Real completion records will be connected
          to verified HITHA transactions.
        </p>
      </div>

      <div class="completed-card">
        <b>Demo community support</b>
        <p>
          Project contribution completed.
          Real project updates will be published
          after verification.
        </p>
      </div>
    `;
  }

  const transactionBody = $("#transactionBody");

  if (transactionBody) {
    transactionBody.innerHTML =
      DEMO_TRANSACTIONS.map(
        (transaction) => `
          <tr>
            <td>${esc(transaction.date)}</td>
            <td>${esc(transaction.ref)}</td>
            <td>${esc(transaction.type)}</td>
            <td>${money(transaction.amount)}</td>
            <td class="status">
              ${esc(transaction.status)}
            </td>
          </tr>
        `
      ).join("");
  }

  const raised =
    cases.reduce(
      (total, item) => total + Number(item.raised || 0),
      0
    ) +
    projects.reduce(
      (total, item) => total + Number(item.raised || 0),
      0
    );

  const stats = $("#stats");

  if (stats) {
    stats.innerHTML = `
      <div class="stat">
        <b>${cases.length}</b>
        <small>Demo cases</small>
      </div>

      <div class="stat">
        <b>${projects.length}</b>
        <small>Demo projects</small>
      </div>

      <div class="stat">
        <b>${money(raised)}</b>
        <small>Demo funds raised</small>
      </div>

      <div class="stat">
        <b>100%</b>
        <small>Prototype transparency goal</small>
      </div>
    `;
  }

  renderAdmin();
  bindDonateButtons();
}

function openModal(id) {
  const modal = $(id);

  if (!modal) return;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal(element) {

  const modal = element.closest
    ? element.closest(".modal")
    : element;

  if (!modal) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

$$("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", (event) => {
    closeModal(event.target);
  });
});

$$(".modal").forEach((modal) => {

  modal.addEventListener("click", (event) => {

    if (event.target === modal) {
      closeModal(modal);
    }

  });

});

function bindDonateButtons() {

  $$("[data-open-donate]").forEach((button) => {

    button.onclick = () => {
      openModal("#donateModal");
    };

  });

}

const requestHelpBtn = $("#requestHelpBtn");

if (requestHelpBtn) {
  requestHelpBtn.onclick = () => {
    openModal("#helpModal");
  };
}

const donorBtn = $("#donorBtn");

if (donorBtn) {
  donorBtn.onclick = () => {
    openModal("#donorModal");
  };
}

const donorBtn2 = $("#donorBtn2");

if (donorBtn2) {
  donorBtn2.onclick = () => {
    openModal("#donorModal");
  };
}

$$("[data-help-category]").forEach((button) => {

  button.onclick = () => {

    openModal("#helpModal");

    const category = $("#helpCategory");

    if (category) {
      category.value =
        button.dataset.helpCategory || "";
    }

  };

});

const helpForm = $("#helpForm");

if (helpForm) {

  helpForm.onsubmit = (event) => {

    event.preventDefault();

    const success = $("#helpSuccess");

    if (success) {
      success.classList.add("show");
    }

    event.target.reset();

  };

}

const donorForm = $("#donorForm");

if (donorForm) {

  donorForm.onsubmit = (event) => {

    event.preventDefault();

    const success = $("#donorSuccess");

    if (success) {
      success.classList.add("show");
    }

    event.target.reset();

  };

}

const donateForm = $("#donateForm");

if (donateForm) {

  donateForm.onsubmit = (event) => {

    event.preventDefault();

    const success = $("#donateSuccess");

    if (success) {
      success.classList.add("show");
    }

    event.target.reset();

  };

}

/* =========================
   HERO SLIDER
========================= */

const heroSlides = [

  [
    "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1800&q=85",
    "And whatever good you put forward for yourselves — you will find it with Allah.",
    "Qur’an 2:110 — meaning"
  ],

  [
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1800&q=85",
    "Whoever saves one life — it is as if he had saved all of mankind.",
    "Qur’an 5:32 — meaning"
  ],

  [
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1800&q=85",
    "Whatever good you do, Allah knows it.",
    "Qur’an 2:197 — meaning"
  ]

];

let heroIndex = 0;

function renderHeroDots() {

  const dots = $("#heroDots");

  if (!dots) return;

  dots.innerHTML = "";

  heroSlides.forEach((slide, index) => {

    const button =
      document.createElement("button");

    button.className =
      index === 0 ? "active" : "";

    button.setAttribute(
      "aria-label",
      `Show slide ${index + 1}`
    );

    button.onclick = () => {
      setHero(index);
    };

    dots.appendChild(button);

  });

}

function setHero(index) {

  heroIndex = index;

  const background = $("#heroBg");
  const quote = $("#heroQuote");

  if (background) {
    background.style.backgroundImage =
      `url('${heroSlides[index][0]}')`;
  }

  if (quote) {
    quote.textContent =
      `“${heroSlides[index][1]}”`;

    if (quote.nextElementSibling) {
      quote.nextElementSibling.textContent =
        heroSlides[index][2];
    }
  }

  $$(".hero-dots button").forEach(
    (button, number) => {

      button.classList.toggle(
        "active",
        number === index
      );

    }
  );

}

renderHeroDots();
setHero(0);

setInterval(() => {

  setHero(
    (heroIndex + 1) %
    heroSlides.length
  );

}, 7000);

/* =========================
   MOBILE MENU
========================= */

const menuBtn = $("#menuBtn");

if (menuBtn) {

  menuBtn.onclick = () => {

    const header =
      $(".site-header");

    if (header) {
      header.classList.toggle(
        "nav-open"
      );
    }

  };

}

$$("nav a").forEach((link) => {

  link.onclick = () => {

    const header =
      $(".site-header");

    if (header) {
      header.classList.remove(
        "nav-open"
      );
    }

  };

});

/* =========================
   CASE DETAILS
========================= */

function showDetails(id) {

  const item =
    [...cases, ...projects]
      .find((entry) => entry.id === id);

  if (!item) return;

  const target =
    Number(item.target || 0);

  const raised =
    Number(item.raised || 0);

  const pct =
    target > 0
      ? Math.min(
          100,
          Math.round(
            (raised / target) * 100
          )
        )
      : 0;

  const details =
    $("#caseDetails");

  if (!details) return;

  details.innerHTML = `

    <span class="tag">
      ${esc(item.category)}
    </span>

    <h2>
      ${esc(item.title)}
    </h2>

    <div class="location">
      📍 ${esc(item.location)}
    </div>

    <p>
      ${esc(item.story)}
    </p>

    <div class="money-row">

      <span>
        ${money(raised)} raised
      </span>

      <span>
        ${money(target)} target
      </span>

    </div>

    <div class="progress">
      <i style="width:${pct}%"></i>
    </div>

    <p>
      <b>${pct}% funded.</b>
      This is a prototype record.
      Donation processing is not active.
    </p>

    <button
      class="btn btn-primary full"
      onclick="
        openModal('#donateModal');
        closeModal(
          document.querySelector('#caseModal')
        );
      ">
      Support this case
    </button>

  `;

  openModal("#caseModal");
}

window.showDetails = showDetails;
window.openModal = openModal;
window.closeModal = closeModal;

/* =========================
   ADMIN CONTENT MANAGER
========================= */

const adminBtn = $("#adminBtn");

if (adminBtn) {

  adminBtn.onclick = () => {

    openModal("#adminModal");

    renderAdmin();

  };

}

$$("[data-admin-tab]").forEach((button) => {

  button.onclick = () => {

    adminTab =
      button.dataset.adminTab;

    $$("[data-admin-tab]")
      .forEach((other) => {

        other.classList.toggle(
          "active",
          other === button
        );

      });

    const form =
      $("#contentForm");

    if (form) {
      form.classList.add("hidden");
    }

    renderAdmin();

  };

});

function activeList() {

  return adminTab === "cases"
    ? cases
    : projects;

}

function renderAdmin() {

  const list =
    activeList();

  const adminList =
    $("#adminList");

  if (!adminList) return;

  adminList.innerHTML =
    list.length

      ? list.map((item) => `

        <div class="admin-item">

          <div>

            <b>
              ${esc(item.title)}
            </b>

            <small>
              ${esc(item.location)}
              ·
              ${
                item.published
                  ? "Published"
                  : "Hidden"
              }
            </small>

          </div>

          <div class="admin-item-actions">

            <button
              class="mini-btn"
              onclick="
                editContent('${esc(item.id)}')
              ">
              Edit
            </button>

            <button
              class="mini-btn delete"
              onclick="
                deleteContent('${esc(item.id)}')
              ">
              Delete
            </button>

          </div>

        </div>

      `).join("")

      : '<div class="empty">No items.</div>';

}

function resetContentForm(
  type,
  id = ""
) {

  const form =
    $("#contentForm");

  if (!form) return;

  form.classList.remove("hidden");

  form.reset();

  form.type.value = type;
  form.id.value = id;

  if (form.published) {
    form.published.checked = true;
  }

}

const addContentBtn =
  $("#addContentBtn");

if (addContentBtn) {

  addContentBtn.onclick = () => {

    resetContentForm(
      adminTab === "cases"
        ? "case"
        : "project"
    );

  };

}

window.editContent = (id) => {

  const item =
    activeList()
      .find((entry) => entry.id === id);

  if (!item) return;

  resetContentForm(
    item.type,
    item.id
  );

  const form =
    $("#contentForm");

  if (!form) return;

  [
    "title",
    "location",
    "category",
    "target",
    "raised",
    "image",
    "story"
  ].forEach((key) => {

    if (form.elements[key]) {

      form.elements[key].value =
        item[key] ?? "";

    }

  });

  if (form.published) {
    form.published.checked =
      !!item.published;
  }

};

window.deleteContent = (id) => {

  if (
    !confirm(
      "Delete this demo item?"
    )
  ) {
    return;
  }

  if (adminTab === "cases") {

    cases =
      cases.filter(
        (item) => item.id !== id
      );

  } else {

    projects =
      projects.filter(
        (item) => item.id !== id
      );

  }

  save();
  render();

};

const cancelContent =
  $("#cancelContent");

if (cancelContent) {

  cancelContent.onclick = () => {

    const form =
      $("#contentForm");

    if (form) {
      form.classList.add("hidden");
    }

  };

}

const contentForm =
  $("#contentForm");

if (contentForm) {

  contentForm.onsubmit = (event) => {

    event.preventDefault();

    const form =
      event.target;

    const type =
      form.type.value;

    const list =
      type === "case"
        ? cases
        : projects;

    const obj = {

      id:
        form.id.value ||
        (
          type === "case"
            ? "C"
            : "P"
        ) +
        Date.now()
          .toString()
          .slice(-5),

      type,

      title:
        form.title.value.trim(),

      location:
        form.location.value.trim(),

      category:
        form.category.value.trim(),

      target:
        Number(form.target.value || 0),

      raised:
        Number(form.raised.value || 0),

      image:
        form.image.value.trim(),

      story:
        form.story.value.trim(),

      published:
        form.published.checked

    };

    const existingIndex =
      list.findIndex(
        (item) =>
          item.id === obj.id
      );

    if (existingIndex >= 0) {

      list[existingIndex] =
        obj;

    } else {

      list.push(obj);

    }

    save();

    form.classList.add("hidden");

    render();

    openModal("#adminModal");

  };

}

/* =========================
   ESC KEY
========================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {

      $$(".modal.open")
        .forEach((modal) => {

          modal.classList.remove(
            "open"
          );

          modal.setAttribute(
            "aria-hidden",
            "true"
          );

        });

    }

  }
);

/* =========================
   START HITHA
========================= */

render();
