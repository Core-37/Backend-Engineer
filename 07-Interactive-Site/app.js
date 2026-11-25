const NAV_STRUCTURE = [
  {
    group: "СТАРТ И СИСТЕМНАЯ БАЗА",
    items: [
      { id: "dashboard", icon: "🏠", label: "Главная & Карта Пути", badge: "0–7" },
      { id: "phase01", icon: "🐧", label: "Фаза 0–1: Ядро Linux, epoll, Сети", badge: "Нед 1–4" },
      { id: "phase2", icon: "⚡", label: "Фаза 2: Go/Rust, Потоки & Алго", badge: "Лаба 1" }
    ]
  },
  {
    group: "ДАННЫЕ, ПРОТОКОЛЫ И SCALE",
    items: [
      { id: "phase3", icon: "🗄️", label: "Фаза 3: БД изнутри (PG & Redis)", badge: "Лаба 2" },
      { id: "phase4", icon: "📨", label: "Фаза 4: gRPC, Kafka & Outbox", badge: "Лаба 3" },
      { id: "phase5", icon: "🌐", label: "Фаза 5: CAP, Sharding, Raft", badge: "DDIA" },
      { id: "phase67", icon: "🔭", label: "Фаза 6–7: Docker, HighLoad, SRE", badge: "Прод" }
    ]
  },
  {
    group: "КАРЬЕРА, СПРАВОЧНИКИ И ВСПОМИНАЛКИ",
    items: [
      { id: "projects_interview", icon: "🚀", label: "5 Проектов & System Design", badge: "45 мин" },
      { id: "sources", icon: "🌍", label: "Книги, MIT/CMU & Тренажёры", badge: "Источники" },
      { id: "flashcards_page", icon: "⚡", label: "Окно Вспоминанок (45+)", badge: "Alt+M" },
      { id: "analogies", icon: "💡", label: "Банк Бытовых Аналогий", badge: "8+" },
      { id: "commands", icon: "🩺", label: "Отладка Linux (60с) & SQL", badge: "CLI" },
      { id: "gallery", icon: "🖼️", label: "Галерея 6 Схем & Лабы", badge: "6 SVG" }
    ]
  }
];

const ORDERED_IDS = NAV_STRUCTURE.flatMap(g => g.items.map(i => i.id));
const STORAGE_CHECKS_KEY = "backendsys_academy_checks_v1";
const STORAGE_THEME_KEY = "backendsys_academy_theme_v1";
const STORAGE_TAB_KEY = "backendsys_academy_active_tab_v1";
const STORAGE_CUSTOM_RECALL_KEY = "backendsys_academy_custom_recall_v1";

let currentSectionId = "dashboard";
let currentRecallTag = "all";
let isBlindMode = false;

function getSavedChecks() {
  try { return JSON.parse(localStorage.getItem(STORAGE_CHECKS_KEY) || "{}"); }
  catch (e) { return {}; }
}
function saveChecks(obj) {
  try { localStorage.setItem(STORAGE_CHECKS_KEY, JSON.stringify(obj)); } catch (e) {}
}
function getCustomRecallCards() {
  try { return JSON.parse(localStorage.getItem(STORAGE_CUSTOM_RECALL_KEY) || "[]"); }
  catch (e) { return []; }
}
function saveCustomRecallCards(arr) {
  try { localStorage.setItem(STORAGE_CUSTOM_RECALL_KEY, JSON.stringify(arr)); } catch (e) {}
}

function buildSidebar() {
  const navList = document.getElementById("navList");
  if (!navList) return;
  let html = "";
  for (const group of NAV_STRUCTURE) {
    html += `<li class="nav-group-label">${group.group}</li>`;
    for (const item of group.items) {
      const activeClass = item.id === currentSectionId ? "active" : "";
      html += `
        <li class="nav-item ${activeClass}" data-nav-id="${item.id}" onclick="renderSection('${item.id}')">
          <span class="nav-icon">${item.icon}</span>
          <span>${item.label}</span>
          <span class="nav-badge">${item.badge}</span>
        </li>
      `;
    }
  }
  navList.innerHTML = html;
}

function injectTOC(container) {
  const headings = Array.from(container.querySelectorAll("h2.section-heading"));
  const hero = container.querySelector(".hero-banner");
  if (headings.length > 1 && hero) {
    const tocBar = document.createElement("div");
    tocBar.className = "toc-bar";
    let pillsHtml = `<span class="toc-label">На странице:</span>`;
    headings.forEach((h, i) => {
      const anchorId = `sec-anchor-${i}`;
      h.id = anchorId;
      const cleanTitle = (h.textContent || "").trim();
      pillsHtml += `<button class="toc-pill" onclick="document.getElementById('${anchorId}').scrollIntoView({behavior:'smooth', block:'start'})">${cleanTitle}</button>`;
    });
    tocBar.innerHTML = pillsHtml;
    hero.insertAdjacentElement("afterend", tocBar);
  }
}

function buildFooterNav(sectionId) {
  const idx = ORDERED_IDS.indexOf(sectionId);
  if (idx === -1) return "";
  const prevId = idx > 0 ? ORDERED_IDS[idx - 1] : null;
  const nextId = idx < ORDERED_IDS.length - 1 ? ORDERED_IDS[idx + 1] : null;
  const prevTitle = prevId && window.ACADEMY_DATA[prevId] ? window.ACADEMY_DATA[prevId].title : "";
  const nextTitle = nextId && window.ACADEMY_DATA[nextId] ? window.ACADEMY_DATA[nextId].title : "";

  return `
    <div class="phase-footer-nav">
      <div>${prevId ? `<button class="btn-action" onclick="renderSection('${prevId}')">← ${prevTitle}</button>` : ""}</div>
      <div>${nextId ? `<button class="btn-action" onclick="renderSection('${nextId}')">${nextTitle} →</button>` : ""}</div>
    </div>
  `;
}

function renderSection(sectionId) {
  const data = window.ACADEMY_DATA[sectionId];
  if (!data) return;

  currentSectionId = sectionId;
  try { localStorage.setItem(STORAGE_TAB_KEY, sectionId); } catch (e) {}

  document.querySelectorAll(".nav-item").forEach(el => {
    el.classList.toggle("active", el.dataset.navId === sectionId);
  });

  const sidebar = document.getElementById("sidebar");
  if (sidebar) sidebar.classList.remove("mobile-open");

  const area = document.getElementById("contentArea");
  area.innerHTML = data.html + buildFooterNav(sectionId);

  injectTOC(area);
  bindCheckboxes();
  updateXPProgress();

  if (sectionId === "flashcards_page") {
    renderInlineFlashcards();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindCheckboxes() {
  const saved = getSavedChecks();
  document.querySelectorAll(".check-row[data-check-id]").forEach(row => {
    const id = row.dataset.checkId;
    const cb = row.querySelector("input[type='checkbox']");
    if (!cb) return;
    cb.checked = !!saved[id];
    row.classList.toggle("checked", cb.checked);

    row.onclick = (e) => {
      if (e.target.tagName !== "INPUT") cb.checked = !cb.checked;
      const all = getSavedChecks();
      all[id] = cb.checked;
      saveChecks(all);
      row.classList.toggle("checked", cb.checked);
      updateXPProgress();
    };
  });
}

function getAllCourseCheckIds() {
  const ids = new Set();
  for (const key of Object.keys(window.ACADEMY_DATA || {})) {
    const html = window.ACADEMY_DATA[key].html || "";
    const matches = html.matchAll(/data-check-id="([^"]+)"/g);
    for (const m of matches) ids.add(m[1]);
  }
  return Array.from(ids);
}

function updateXPProgress() {
  const allIds = getAllCourseCheckIds();
  const saved = getSavedChecks();
  const done = allIds.filter(id => saved[id]).length;
  const total = Math.max(allIds.length, 1);
  const pct = Math.round((done / total) * 100);

  const textEl = document.getElementById("xpText");
  const fillEl = document.getElementById("xpFill");
  const rankEl = document.getElementById("xpRank");

  if (textEl) textEl.textContent = `${done} / ${total} (${pct}%)`;
  if (fillEl) fillEl.style.width = `${pct}%`;

  if (rankEl) {
    let rank = "L0 Junior Dev";
    if (pct >= 20) rank = "L1 Kernel & Sockets";
    if (pct >= 40) rank = "L2 Concurrency";
    if (pct >= 60) rank = "L3 DB Internals";
    if (pct >= 80) rank = "L4 Distributed";
    if (pct >= 95) rank = "L5 Systems Architect";
    rankEl.textContent = rank;
  }
}

/* =========================================================
   DEDICATED QUICK-RECALL WINDOW ("ОКНО МАЛЕНЬКИХ ВСПОМИНАНОК")
   ========================================================= */
function openRecallDrawer() {
  document.getElementById("recallBackdrop").classList.add("open");
  document.getElementById("recallDrawer").classList.add("open");
  renderRecallCards();
  const inp = document.getElementById("recallSearchInput");
  if (inp) setTimeout(() => inp.focus(), 120);
}

function closeRecallDrawer() {
  document.getElementById("recallBackdrop").classList.remove("open");
  document.getElementById("recallDrawer").classList.remove("open");
}

function toggleRecallDrawer() {
  const drawer = document.getElementById("recallDrawer");
  if (drawer && drawer.classList.contains("open")) closeRecallDrawer();
  else openRecallDrawer();
}

function setRecallTag(tag) {
  currentRecallTag = tag;
  document.querySelectorAll("#recallTags .tag-pill").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tag === tag);
  });
  renderRecallCards();
}

function toggleBlindMode() {
  isBlindMode = !isBlindMode;
  const btn = document.getElementById("quizBlindBtn");
  if (btn) btn.textContent = isBlindMode ? "👁️ Показать ответы" : "🙈 Скрыть ответы";
  renderRecallCards();
}

function addCustomRecall(e) {
  e.preventDefault();
  const qEl = document.getElementById("customQ");
  const aEl = document.getElementById("customA");
  const q = (qEl.value || "").trim();
  const a = (aEl.value || "").trim();
  if (!q || !a) return;

  const custom = getCustomRecallCards();
  custom.unshift({ id: "custom_" + Date.now(), tag: "custom", q, a, cmd: "" });
  saveCustomRecallCards(custom);

  qEl.value = "";
  aEl.value = "";
  setRecallTag("custom");
}

function deleteCustomRecall(id) {
  const updated = getCustomRecallCards().filter(c => c.id !== id);
  saveCustomRecallCards(updated);
  renderRecallCards();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getAllRecallCards() {
  return [...getCustomRecallCards(), ...(window.RECALL_FLASHCARDS || [])];
}

function renderRecallCards() {
  const listEl = document.getElementById("recallCardsList");
  const countEl = document.getElementById("recallCountLabel");
  if (!listEl) return;

  const query = ((document.getElementById("recallSearchInput") || {}).value || "").toLowerCase().trim();
  const all = getAllRecallCards();
  if (countEl) countEl.textContent = String(all.length);

  const filtered = all.filter(card => {
    const matchTag = currentRecallTag === "all" || card.tag === currentRecallTag;
    const hay = (card.q + " " + card.a + " " + (card.cmd || "")).toLowerCase();
    return matchTag && (!query || hay.includes(query));
  });

  if (filtered.length === 0) {
    listEl.innerHTML = `<div class="card" style="text-align:center; color:var(--text-muted);">По этому фильтру пусто — сбрось тег или добавь свою вспоминалку!</div>`;
    return;
  }

  const tagLabels = { os: "🐧 ОС & Сети", code: "⚡ Go & Алго", db: "🗄️ БД & Redis", msg: "📨 Kafka/gRPC", dist: "🌐 CAP & SRE", custom: "📝 Моё" };

  listEl.innerHTML = filtered.map(c => `
    <div class="recall-card ${isBlindMode ? "blind" : ""}" onclick="this.classList.toggle('revealed')">
      <div class="recall-card-top">
        <span class="recall-card-q">${escapeHtml(c.q)}</span>
        <div style="display:flex; gap:5px; align-items:center;">
          <span class="recall-card-tag">${tagLabels[c.tag] || c.tag}</span>
          ${c.tag === "custom" ? `<button class="btn-action" style="padding:1px 6px; font-size:0.7rem;" onclick="event.stopPropagation(); deleteCustomRecall('${c.id}')" title="Удалить">🗑️</button>` : ""}
        </div>
      </div>
      <div class="recall-card-body">
        <div class="recall-card-a">${escapeHtml(c.a)}</div>
        ${c.cmd ? `<div class="recall-card-cmd">${escapeHtml(c.cmd)}</div>` : ""}
      </div>
    </div>
  `).join("");
}

function renderInlineFlashcards() {
  const mount = document.getElementById("inlineFlashcardsMount");
  if (!mount) return;
  mount.innerHTML = `
    <div class="grid-2">
      ${getAllRecallCards().map(c => `
        <div class="recall-card">
          <div class="recall-card-top">
            <span class="recall-card-q">${escapeHtml(c.q)}</span>
            <span class="recall-card-tag">${escapeHtml(c.tag)}</span>
          </div>
          <div class="recall-card-a">${escapeHtml(c.a)}</div>
          ${c.cmd ? `<div class="recall-card-cmd">${escapeHtml(c.cmd)}</div>` : ""}
        </div>
      `).join("")}
    </div>
  `;
}

function handleGlobalSearch(raw) {
  const q = (raw || "").trim().toLowerCase();
  if (!q) { renderSection(currentSectionId); return; }

  const results = [];
  for (const id of ORDERED_IDS) {
    const sec = window.ACADEMY_DATA[id];
    if (!sec) continue;
    const text = (sec.title + " " + sec.html.replace(/<[^>]+>/g, " ")).toLowerCase();
    if (text.includes(q)) results.push(sec);
  }

  const area = document.getElementById("contentArea");
  if (results.length === 0) {
    area.innerHTML = `<div class="hero-banner"><h1 class="hero-title">Поиск: «${escapeHtml(raw)}»</h1><p class="hero-desc">Не найдено в разделах. Попробуй в <strong>🧠 Окне Вспоминанок (Alt+M)</strong>!</p></div>`;
    return;
  }

  area.innerHTML = `
    <div class="hero-banner"><h1 class="hero-title">🔎 Найдено по запросу «${escapeHtml(raw)}» (${results.length})</h1></div>
    <div class="grid-2">
      ${results.map(r => `
        <div class="card" style="cursor:pointer;" onclick="document.getElementById('globalSearchInput').value=''; renderSection('${r.id}')">
          <div class="card-title">${r.title}</div>
          <span class="badge badge-cyan">${r.badge}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function filterCommandTable(raw) {
  const q = (raw || "").toLowerCase().trim();
  document.querySelectorAll("#cmdMasterTable tbody tr").forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(q) ? "" : "none";
  });
}

function toggleTheme() {
  const isLight = document.body.classList.toggle("light-theme");
  const btn = document.getElementById("themeBtn");
  if (btn) btn.textContent = isLight ? "🌙 Dark" : "☀️ Light";
  try { localStorage.setItem(STORAGE_THEME_KEY, isLight ? "light" : "dark"); } catch (e) {}
}

function toggleMobileSidebar() {
  const sb = document.getElementById("sidebar");
  if (sb) sb.classList.toggle("mobile-open");
}

function openLightbox(src) {
  const modal = document.getElementById("lightboxModal");
  const img = document.getElementById("lightboxImg");
  if (modal && img) { img.src = src; modal.classList.add("open"); }
}

function closeLightbox() {
  const modal = document.getElementById("lightboxModal");
  if (modal) modal.classList.remove("open");
}

function copyCode(btn) {
  const pre = btn.closest(".code-wrap").querySelector("pre");
  if (!pre) return;
  navigator.clipboard.writeText(pre.textContent).then(() => {
    const old = btn.textContent;
    btn.textContent = "Скопировано ✓";
    setTimeout(() => { btn.textContent = old; }, 1400);
  });
}

function exportProgress() {
  const payload = { checks: getSavedChecks(), custom_recalls: getCustomRecallCards(), exported_at: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "backend-systems-progress.json";
  a.click();
  URL.revokeObjectURL(url);
}

function resetProgress() {
  if (!confirm("Точно сбросить все галочки прогресса?")) return;
  localStorage.removeItem(STORAGE_CHECKS_KEY);
  renderSection(currentSectionId);
}

document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    const inp = document.getElementById("globalSearchInput");
    if (inp) inp.focus();
  }
  if (e.altKey && e.key.toLowerCase() === "m") {
    e.preventDefault();
    toggleRecallDrawer();
  }
  if (e.key === "Escape") { closeLightbox(); closeRecallDrawer(); }
});

window.addEventListener("scroll", () => {
  const bar = document.getElementById("readingProgressBar");
  const topBtn = document.getElementById("scrollTopBtn");
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? Math.min(100, Math.round((window.scrollY / docHeight) * 100)) : 0;
  if (bar) bar.style.width = pct + "%";
  if (topBtn) topBtn.classList.toggle("visible", window.scrollY > 360);
});

window.addEventListener("DOMContentLoaded", () => {
  try {
    if (localStorage.getItem(STORAGE_THEME_KEY) === "light") {
      document.body.classList.add("light-theme");
      const btn = document.getElementById("themeBtn");
      if (btn) btn.textContent = "🌙 Dark";
    }
    const savedTab = localStorage.getItem(STORAGE_TAB_KEY);
    if (savedTab && window.ACADEMY_DATA[savedTab]) currentSectionId = savedTab;
  } catch (e) {}

  buildSidebar();
  renderSection(currentSectionId);
  renderRecallCards();
});
