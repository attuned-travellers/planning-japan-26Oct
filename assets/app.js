(function () {
  const TRIP = window.TRIP;
  const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
  const STORE_KEY = `trip-schedule:${TRIP.start}`;
  const STEP = 30; // 분

  // ---------- helpers ----------
  const $ = (id) => document.getElementById(id);
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const toMin = (hhmm) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };
  const toHHMM = (min) => `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;
  const parseDate = (iso) => { const [y, m, d] = iso.split("-").map(Number); return new Date(y, m - 1, d); };
  const isoOf = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const dateLabel = (iso) => { const d = parseDate(iso); return `${d.getMonth() + 1}/${d.getDate()} (${WEEKDAYS[d.getDay()]})`; };
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  const DAY_START = toMin(TRIP.dayStart || "00:00");
  const DAY_END = toMin(TRIP.dayEnd || "24:00");
  const SLOTS = (DAY_END - DAY_START) / STEP;
  const slotH = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--slot-h")) || 26;
  const tagOf = (ev) => TRIP.tags[ev.tag] || { label: "", color: "#7a7466" };

  // ---------- state (localStorage 는 개인 편의용, 실패해도 동작) ----------
  // 일정 내용 비교용 서명 — 순서·키 순서·파일 포맷이 달라도 내용이 같으면 같은 값
  const sig = (list) => JSON.stringify(
    list.map((e) => [e.id, e.date, e.start, e.end, e.title, e.tag || "", e.note || ""]).sort()
  );
  const BASE = sig(TRIP.events);
  let events = JSON.parse(JSON.stringify(TRIP.events));
  const STALE_KEY = `${STORE_KEY}:stale`;
  let dirty = false;
  let stale = null; // 원본이 바뀌기 전에 이 브라우저에서 편집해 둔 일정 (복원 대기)
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
    if (saved && Array.isArray(saved.events)) {
      if (saved.base === BASE) { events = saved.events; dirty = sig(events) !== BASE; }
      else {
        // schedule.js 원본이 바뀜 → 편집은 버리지 않고 따로 보관해 두고 복원 안내
        // (내보내기 → 커밋한 경우처럼 내용이 같으면 조용히 정리)
        localStorage.removeItem(STORE_KEY);
        if (sig(saved.events) !== BASE) localStorage.setItem(STALE_KEY, JSON.stringify(saved));
      }
    }
    stale = JSON.parse(localStorage.getItem(STALE_KEY) || "null");
    if (stale && Array.isArray(stale.events) && sig(stale.events) === BASE) {
      localStorage.removeItem(STALE_KEY);
      stale = null;
    }
  } catch (_) { /* storage 사용 불가 */ }

  function persist() {
    dirty = sig(events) !== BASE;
    try {
      if (dirty) localStorage.setItem(STORE_KEY, JSON.stringify({ base: BASE, events, savedAt: Date.now() }));
      else localStorage.removeItem(STORE_KEY);
    } catch (_) { /* ignore */ }
    updateSaveState();
  }

  function dropStale() {
    stale = null;
    try { localStorage.removeItem(STALE_KEY); } catch (_) { /* ignore */ }
    $("restore").hidden = true;
  }

  function renderRestoreBanner() {
    const box = $("restore");
    if (!stale || !Array.isArray(stale.events)) { box.hidden = true; return; }
    const when = stale.savedAt
      ? (() => { const d = new Date(stale.savedAt); return ` (${d.getMonth() + 1}/${d.getDate()} ${toHHMM(d.getHours() * 60 + d.getMinutes())} 편집)`; })()
      : "";
    $("restore-when").textContent = when;
    box.hidden = false;
  }
  $("btn-restore").addEventListener("click", () => {
    if (dirty && !confirm("지금 화면의 편집 대신 보관된 편집으로 바꿀까요?")) return;
    events = stale.events;
    dropStale();
    persist(); // 새 원본 기준으로 다시 저장 → 이후 새로고침에도 유지
    renderEvents();
  });
  $("btn-discard").addEventListener("click", () => {
    if (!confirm("보관된 예전 편집을 지울까요? 되돌릴 수 없어요.")) return;
    dropStale();
  });
  function updateSaveState() {
    $("save-state").textContent = dirty ? "● 이 브라우저에 변경 저장됨" : "";
  }

  // ---------- header ----------
  function renderHeader() {
    $("eyebrow").textContent = TRIP.eyebrow || "";
    $("title").textContent = TRIP.title;
    const s = parseDate(TRIP.start), e = parseDate(TRIP.end);
    const nights = Math.round((e - s) / 86400000);
    const today = parseDate(isoOf(new Date()));
    const dday = Math.round((s - today) / 86400000);
    const stats = $("stats");
    const ddText = dday > 0 ? `D-${dday}` : isoOf(new Date()) <= TRIP.end ? "여행 중" : "다녀옴";
    stats.appendChild(el("span", "stat accent", ddText));
    const range = el("span", "stat");
    range.innerHTML = `<b>${s.getMonth() + 1}/${s.getDate()} – ${e.getMonth() + 1}/${e.getDate()}</b> · ${nights}박 ${nights + 1}일`;
    stats.appendChild(range);
    for (const note of TRIP.notes || []) {
      const n = el("div", "note");
      n.appendChild(el("b", null, note.title));
      n.appendChild(document.createTextNode(note.text));
      $("notes").appendChild(n);
    }
    for (const box of [$("legend"), $("legend-manual")]) {
      for (const t of Object.values(TRIP.tags)) {
        const p = el("span", "pill");
        p.style.setProperty("--c", t.color);
        p.appendChild(el("i"));
        p.appendChild(document.createTextNode(t.label));
        box.appendChild(p);
      }
    }
  }

  // ---------- calendar ----------
  const cal = $("cal");
  const scroller = $("cal-scroll");
  const cols = new Map(); // date -> column element

  function buildGrid() {
    cal.style.setProperty("--days", TRIP.days.length);
    cal.appendChild(el("div", "corner"));
    const todayIso = isoOf(new Date());

    TRIP.days.forEach((day, i) => {
      const city = TRIP.cities[day.city];
      const h = el("div", "day-head" + (day.date === todayIso ? " today" : ""));
      h.dataset.date = day.date;
      if (city) h.style.setProperty("--c", city.color);
      const top = el("div", "top");
      top.appendChild(el("span", "num", `DAY ${i + 1}`));
      const wd = parseDate(day.date).getDay();
      top.appendChild(el("span", "date" + (wd === 0 ? " sun" : wd === 6 ? " sat" : ""), dateLabel(day.date)));
      h.appendChild(top);
      cal.appendChild(h);
    });

    const times = el("div", "times");
    for (let i = 0; i < SLOTS; i++) {
      const m = DAY_START + i * STEP;
      const t = el("div", "time" + (m % 60 === 0 ? " hour" : ""));
      t.appendChild(el("span", null, i === 0 ? "" : toHHMM(m)));
      times.appendChild(t);
    }
    cal.appendChild(times);

    for (const day of TRIP.days) {
      const col = el("div", "col" + (day.date === todayIso ? " today" : ""));
      col.dataset.date = day.date;
      col.style.height = `calc(var(--slot-h) * ${SLOTS})`;
      col.addEventListener("click", (e) => {
        if (e.target !== col) return;
        const r = col.getBoundingClientRect();
        const start = clamp(DAY_START + Math.floor((e.clientY - r.top) / slotH()) * STEP, DAY_START, DAY_END - STEP);
        openEditor(null, { date: day.date, start: toHHMM(start), end: toHHMM(Math.min(start + 60, DAY_END)), tag: "sight", title: "" });
      });
      cols.set(day.date, col);
      cal.appendChild(col);
    }
  }

  // ---------- 보기: 모바일은 하루씩 (날짜 탭·스와이프), 원하면 전체 ----------
  const VIEW_KEY = "trip-schedule:view";
  const mobileMq = window.matchMedia("(max-width: 640px)");
  let viewPref = "day";
  try { viewPref = localStorage.getItem(VIEW_KEY) || "day"; } catch (_) { /* ignore */ }
  let activeDate = (() => {
    const t = isoOf(new Date());
    return TRIP.days.some((d) => d.date === t) ? t : TRIP.days[0].date;
  })();
  const dayMode = () => mobileMq.matches && viewPref === "day";

  function buildDayTabs() {
    const box = $("day-tabs");
    TRIP.days.forEach((day, i) => {
      const b = el("button", "day-tab");
      b.type = "button";
      b.dataset.date = day.date;
      b.setAttribute("role", "tab");
      const city = TRIP.cities[day.city];
      if (city) b.style.setProperty("--c", city.color);
      const d = parseDate(day.date);
      b.appendChild(el("span", "n", `D${i + 1} · ${WEEKDAYS[d.getDay()]}`));
      b.appendChild(el("span", "d", `${d.getMonth() + 1}/${d.getDate()}`));
      b.setAttribute("aria-label", dateLabel(day.date));
      b.addEventListener("click", () => {
        activeDate = day.date;
        if (dayMode()) applyView();
        else {
          applyView();
          const col = cols.get(day.date);
          scroller.scrollTo({ left: col.offsetLeft - col.parentElement.firstChild.offsetWidth, behavior: "smooth" });
        }
      });
      box.appendChild(b);
    });
    $("btn-view").addEventListener("click", () => {
      viewPref = viewPref === "day" ? "all" : "day";
      try { localStorage.setItem(VIEW_KEY, viewPref); } catch (_) { /* ignore */ }
      applyView();
    });
  }

  function applyView() {
    const dm = dayMode();
    cal.classList.toggle("day-mode", dm);
    cal.querySelectorAll(".day-head, .col").forEach((n) => n.classList.toggle("active", n.dataset.date === activeDate));
    for (const b of $("day-tabs").children) {
      const on = b.dataset.date === activeDate;
      b.setAttribute("aria-selected", on);
      if (on && dm) b.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
    $("btn-view").textContent = dm ? "전체" : "하루씩";
    if (dm) scroller.scrollLeft = 0;
    renderNowLine();
  }

  function stepDay(delta) {
    const i = TRIP.days.findIndex((d) => d.date === activeDate);
    const next = TRIP.days[i + delta];
    if (!next) return;
    activeDate = next.date;
    applyView();
  }

  // 하루 보기에서 좌우 스와이프로 날짜 이동
  let swipe = null;
  scroller.addEventListener("touchstart", (e) => {
    if (!dayMode() || e.touches.length !== 1) { swipe = null; return; }
    swipe = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });
  scroller.addEventListener("touchend", (e) => {
    if (!swipe || touchDragging || justDragged) { swipe = null; return; }
    const t = e.changedTouches[0];
    const dx = t.clientX - swipe.x, dy = t.clientY - swipe.y;
    swipe = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 2) stepDay(dx < 0 ? 1 : -1);
  });

  // 캘린더 높이 = 화면에서 고정 툴바를 뺀 만큼
  const toolbar = document.querySelector(".toolbar");
  const innerScroll = () => scroller.scrollHeight > scroller.clientHeight + 1;
  const syncToolbarH = () => document.documentElement.style.setProperty("--toolbar-h", `${toolbar.offsetHeight}px`);
  window.addEventListener("resize", syncToolbarH);
  mobileMq.addEventListener("change", () => { syncToolbarH(); applyView(); });

  // 겹치는 일정은 나란히 배치
  function layoutLanes(list) {
    const sorted = [...list].sort((a, b) => toMin(a.start) - toMin(b.start) || toMin(b.end) - toMin(a.end));
    const out = new Map();
    let cluster = [], clusterEnd = -1, laneEnds = [];
    const flush = () => { for (const c of cluster) out.set(c.ev.id, { lane: c.lane, lanes: laneEnds.length }); cluster = []; laneEnds = []; };
    for (const ev of sorted) {
      const s = toMin(ev.start), e = toMin(ev.end);
      if (s >= clusterEnd) { flush(); clusterEnd = -1; }
      let lane = laneEnds.findIndex((end) => end <= s);
      if (lane === -1) { lane = laneEnds.length; laneEnds.push(e); } else laneEnds[lane] = e;
      cluster.push({ ev, lane });
      clusterEnd = Math.max(clusterEnd, e);
    }
    flush();
    return out;
  }

  function place(node, ev, lane) {
    const h = slotH();
    const s = toMin(ev.start), e = toMin(ev.end);
    node.style.top = `${((s - DAY_START) / STEP) * h + 1}px`;
    node.style.height = `${Math.max(((e - s) / STEP) * h - 2, h - 2)}px`;
    if (lane && lane.lanes > 1) {
      node.style.left = `calc(3px + (100% - 6px) * ${lane.lane / lane.lanes})`;
      node.style.right = "auto";
      node.style.width = `calc((100% - 6px) / ${lane.lanes} - 2px)`;
    } else {
      node.style.left = node.style.right = node.style.width = "";
    }
    node.classList.toggle("short", e - s <= STEP);
    node.querySelector(".t").textContent = `${ev.start}–${ev.end}`;
  }

  function renderEvents() {
    for (const col of cols.values()) col.querySelectorAll(".ev").forEach((n) => n.remove());
    for (const [date, col] of cols) {
      const list = events.filter((ev) => ev.date === date);
      const lanes = layoutLanes(list);
      for (const ev of list) {
        const node = el("div", "ev");
        node.tabIndex = 0;
        node.dataset.id = ev.id;
        node.style.setProperty("--c", tagOf(ev).color);
        node.setAttribute("role", "button");
        node.setAttribute("aria-label", `${ev.title}, ${dateLabel(ev.date)} ${ev.start}–${ev.end}`);
        node.appendChild(el("div", "t"));
        node.appendChild(el("div", "ttl", ev.title));
        if (ev.note) node.appendChild(el("div", "nt", ev.note));
        node.appendChild(el("div", "grip"));
        place(node, ev, lanes.get(ev.id));
        node.addEventListener("pointerdown", (e) => startDrag(e, ev, node));
        node.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openEditor(ev); } });
        col.appendChild(node);
      }
    }
    renderNowLine();
  }

  function renderNowLine() {
    cal.querySelectorAll(".now-line").forEach((n) => n.remove());
    const now = new Date();
    const col = cols.get(isoOf(now));
    const m = now.getHours() * 60 + now.getMinutes();
    if (!col || m < DAY_START || m > DAY_END) return;
    const line = el("div", "now-line");
    line.style.top = `${((m - DAY_START) / STEP) * slotH()}px`;
    col.appendChild(line);
  }

  // ---------- drag & drop (pointer events: 마우스·터치 공통) ----------
  function colAt(x) {
    let best = null;
    for (const col of cols.values()) {
      const r = col.getBoundingClientRect();
      if (!r.width) continue; // 하루 보기에서 숨겨진 날짜
      if (x >= r.left && x < r.right) return col;
      if (!best || Math.abs(x - (r.left + r.width / 2)) < Math.abs(x - (best.r.left + best.r.width / 2))) best = { col, r };
    }
    return best.col;
  }

  // 터치: 길게 눌러야 드래그 시작 (그냥 쓸면 스크롤). 드래그 중엔 스크롤을 막음.
  const LONG_PRESS = 350;
  let touchDragging = false;
  let justDragged = false;
  document.addEventListener("touchmove", (e) => { if (touchDragging) e.preventDefault(); }, { passive: false });
  cal.addEventListener("contextmenu", (e) => { if (e.target.closest(".ev")) e.preventDefault(); });

  function startDrag(e, ev, node) {
    if (e.button !== 0) return;
    const isTouch = e.pointerType === "touch";
    const mode = e.target.classList.contains("grip") ? "resize" : "move";
    const h = slotH();
    const nodeRect = node.getBoundingClientRect();
    const grabOffset = e.clientY - nodeRect.top;
    const x0 = e.clientX, y0 = e.clientY;
    const dur = toMin(ev.end) - toMin(ev.start);
    const draft = { ...ev };
    let started = false, lastTarget = null, lastPt = { x: x0, y: y0 };
    let autoScroll = null; // { x, y } px/frame
    let armed = !isTouch, moved = false;
    let pressTimer = null;
    if (isTouch) {
      pressTimer = setTimeout(() => {
        armed = true;
        touchDragging = true;
        node.classList.add("armed");
        try { navigator.vibrate && navigator.vibrate(12); } catch (_) { /* ignore */ }
      }, LONG_PRESS);
    }

    const update = () => {
      const { x, y } = lastPt;
      if (mode === "move") {
        const col = colAt(x);
        const r = col.getBoundingClientRect();
        const s = clamp(DAY_START + Math.round((y - grabOffset - r.top) / h) * STEP, DAY_START, DAY_END - dur);
        draft.date = col.dataset.date;
        draft.start = toHHMM(s);
        draft.end = toHHMM(s + dur);
        if (node.parentElement !== col) col.appendChild(node);
        if (lastTarget !== col) { lastTarget?.classList.remove("drop-target"); col.classList.add("drop-target"); lastTarget = col; }
      } else {
        const r = node.parentElement.getBoundingClientRect();
        const end = clamp(DAY_START + Math.round((y - r.top) / h) * STEP, toMin(draft.start) + STEP, DAY_END);
        draft.end = toHHMM(end);
      }
      place(node, draft, null);
    };

    const tick = () => {
      if (!autoScroll) return;
      if (innerScroll()) scroller.scrollTop += autoScroll.y;
      else window.scrollBy(0, autoScroll.y);
      scroller.scrollLeft += autoScroll.x;
      update();
      requestAnimationFrame(tick);
    };

    const onMove = (m) => {
      lastPt = { x: m.clientX, y: m.clientY };
      const dist = Math.hypot(m.clientX - x0, m.clientY - y0);
      if (!armed) {
        // 길게 누르기 전에 움직임 → 스크롤로 보고 드래그 포기
        if (dist > 8) { moved = true; cleanup(); }
        return;
      }
      if (!started) {
        if (dist < 5) return;
        started = true;
        node.classList.add("dragging");
      }
      const sr = scroller.getBoundingClientRect();
      // 세로 자동 스크롤: 데스크톱은 캘린더 안쪽, 모바일은 페이지 전체
      const inner = innerScroll();
      const vTop = inner ? sr.top + 90 : toolbar.getBoundingClientRect().bottom + 30;
      const vBottom = inner ? sr.bottom : window.innerHeight;
      const canUp = inner ? scroller.scrollTop > 0 : window.scrollY > 0;
      const y = m.clientY > vBottom - 40 ? 8 : m.clientY < vTop && canUp ? -8 : 0;
      const x = m.clientX > sr.right - 30 ? 8 : m.clientX < sr.left + 70 && scroller.scrollLeft > 0 ? -8 : 0;
      const had = !!autoScroll;
      autoScroll = x || y ? { x, y } : null;
      if (autoScroll && !had) requestAnimationFrame(tick);
      update();
    };

    const cleanup = () => {
      clearTimeout(pressTimer);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      autoScroll = null;
      touchDragging = false;
      lastTarget?.classList.remove("drop-target");
      node.classList.remove("dragging", "armed");
    };

    const onUp = (u) => {
      cleanup();
      if (!started) {
        // 탭(또는 제자리 길게 누르기) → 편집. 스크롤·취소였다면 아무것도 안 함.
        if (u.type === "pointerup" && !moved) openEditor(ev);
        return;
      }
      justDragged = true;
      setTimeout(() => (justDragged = false), 50);
      Object.assign(ev, { date: draft.date, start: draft.start, end: draft.end });
      if (dayMode()) activeDate = ev.date;
      persist();
      renderEvents();
      applyView();
      cal.querySelector(`.ev[data-id="${ev.id}"]`)?.focus({ preventScroll: true });
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  }

  // ---------- editor ----------
  const editor = $("editor");
  const form = editor.querySelector("form");
  let editing = null;

  function fillSelects() {
    for (const d of TRIP.days) form.date.appendChild(new Option(dateLabel(d.date), d.date));
    for (const [k, t] of Object.entries(TRIP.tags)) form.tag.appendChild(new Option(t.label, k));
    for (let m = DAY_START; m <= DAY_END; m += STEP) {
      if (m < DAY_END) form.start.appendChild(new Option(toHHMM(m), toHHMM(m)));
      if (m > DAY_START) form.end.appendChild(new Option(toHHMM(m), toHHMM(m)));
    }
  }

  function openEditor(ev, draft) {
    editing = ev;
    const src = ev || draft;
    $("ed-heading").textContent = ev ? "일정 수정" : "일정 추가";
    $("ed-delete").hidden = !ev;
    form.title.value = src.title || "";
    form.date.value = src.date;
    form.tag.value = src.tag || "sight";
    form.start.value = src.start;
    form.end.value = src.end;
    form.note.value = src.note || "";
    editor.showModal();
    form.title.focus();
  }

  // Enter 는 항상 '저장' (폼의 첫 버튼인 '삭제'로 제출되지 않게)
  form.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.tagName === "INPUT") {
      e.preventDefault();
      form.requestSubmit(form.querySelector('button[value="save"]'));
    }
  });

  form.start.addEventListener("change", () => {
    if (toMin(form.end.value) <= toMin(form.start.value)) form.end.value = toHHMM(Math.min(toMin(form.start.value) + 60, DAY_END));
  });

  editor.addEventListener("close", () => {
    const action = editor.returnValue;
    editor.returnValue = "";
    if (action === "delete" && editing) {
      events = events.filter((e) => e !== editing);
    } else if (action === "save") {
      const s = toMin(form.start.value);
      const e = Math.max(toMin(form.end.value), s + STEP);
      const data = {
        date: form.date.value, start: toHHMM(s), end: toHHMM(Math.min(e, DAY_END)),
        title: form.title.value.trim() || "새 일정", tag: form.tag.value,
      };
      const note = form.note.value.trim();
      if (editing) {
        Object.assign(editing, data);
        if (note) editing.note = note; else delete editing.note;
      } else {
        events.push({ id: "e" + Date.now().toString(36), ...data, ...(note ? { note } : {}) });
      }
    } else return;
    if (action === "save" && dayMode()) activeDate = form.date.value; // 날짜를 바꿨으면 그 날로 이동
    editing = null;
    persist();
    renderEvents();
    applyView();
  });

  // ---------- export / reset ----------
  function exportText() {
    const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date) || toMin(a.start) - toMin(b.start));
    const trip = { ...TRIP, events: "__EVENTS__" };
    let lastDate = null;
    const lines = sorted.map((ev) => {
      const gap = lastDate && lastDate !== ev.date ? "\n" : "";
      lastDate = ev.date;
      return `${gap}    ${JSON.stringify(ev)},`;
    });
    const body = JSON.stringify(trip, null, 2)
      .replace('"__EVENTS__"', `[\n${lines.join("\n")}\n  ]`);
    return `/*
 * 여행 일정 데이터 — 이 파일만 수정하면 index.html 캘린더가 바뀝니다.
 * (페이지에서 드래그로 바꾼 내용은 '내보내기'로 이 파일 형식 그대로 받을 수 있어요)
 *
 * ⚠️ 공개 페이지(GitHub Pages)입니다. 이름·연락처·숙소·항공편·예약번호는 넣지 마세요.
 */
window.TRIP = ${body};
`;
  }

  $("btn-manual").addEventListener("click", () => $("manual").showModal());
  $("btn-notes").hidden = !(TRIP.notes && TRIP.notes.length);
  $("btn-notes").addEventListener("click", () => $("notes-dialog").showModal());

  $("btn-export").addEventListener("click", () => {
    $("export-text").value = exportText();
    $("exporter").showModal();
    $("export-text").select();
  });
  $("btn-copy").addEventListener("click", async () => {
    const ta = $("export-text");
    try { await navigator.clipboard.writeText(ta.value); }
    catch (_) { ta.select(); document.execCommand("copy"); }
    $("btn-copy").textContent = "복사됨 ✓";
    setTimeout(() => ($("btn-copy").textContent = "복사"), 1500);
  });
  $("btn-reset").addEventListener("click", () => {
    if (!dirty) return;
    if (!confirm("이 브라우저에서 바꾼 내용을 지우고 schedule.js 원본으로 되돌릴까요?")) return;
    events = JSON.parse(JSON.stringify(TRIP.events));
    persist();
    renderEvents();
  });

  // ---------- init ----------
  renderHeader();
  buildGrid();
  buildDayTabs();
  fillSelects();
  renderEvents();
  applyView();
  updateSaveState();
  renderRestoreBanner();
  syncToolbarH();
  // 아침 첫 일정 근처로 스크롤 (자정 넘어 이어지는 일정은 건너뜀)
  const mornings = events.map((e) => toMin(e.start)).filter((m) => m >= 5 * 60);
  const first = Math.min(...mornings, 8 * 60);
  const offset = Math.max(0, ((first - DAY_START) / STEP - 1) * slotH());
  if (innerScroll()) scroller.scrollTop = offset;
  else {
    const col = cols.get(activeDate);
    window.scrollTo(0, col.getBoundingClientRect().top + window.scrollY + offset - toolbar.offsetHeight - 8);
  }
  setInterval(renderNowLine, 60000);
})();
