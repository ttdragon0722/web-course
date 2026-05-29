/* =============================================================
 * ppt/script.js — 通用簡報放映腳本
 * -------------------------------------------------------------
 * 適用任何遵循 ppt.md 規範的簡報（投影片為 <section class="slide">）。
 * 在 HTML 結尾加入：<script src="script.js"></script> 即可。
 *
 * 不破壞原本行為：
 *   - 預設仍是「捲動瀏覽」模式（多頁堆疊）。
 *   - 列印（Ctrl/Cmd+P）會自動退出放映，維持每頁一張的 PDF 輸出。
 *
 * 快捷鍵：
 *   F / 雙擊投影片 ........ 進入放映模式（並嘗試全螢幕）
 *   Esc .................. 退出放映 / 關閉總覽
 *   → ↓ Space PageDown ... 下一張
 *   ← ↑ PageUp ........... 上一張
 *   Home / End .......... 第一張 / 最後一張
 *   O ................... 縮圖總覽（再按一次或點縮圖跳轉）
 *   數字 + Enter ......... 跳到指定頁
 *
 * 滑鼠 / 觸控（放映模式）：
 *   點畫面右半 → 下一張、左半 → 上一張；滾輪 / 左右滑動切換。
 * ============================================================= */
(function () {
  "use strict";

  /* ---------- 設定 ---------- */
  const CONFIG = {
    slideSelector: ".slide",
    activeClass: "is-active",
    presentingClass: "is-presenting",
    overviewClass: "is-overview",
    hudHideDelay: 2500, // 滑鼠靜止後隱藏控制列（ms）
  };

  /* ---------- 啟動 ---------- */
  function init() {
    const slides = Array.from(document.querySelectorAll(CONFIG.slideSelector));
    if (slides.length === 0) return; // 沒有投影片就不啟動

    injectStyles();
    const ui = buildUI(slides.length);

    // 集中狀態（盡量以「重算」取代散落的可變狀態）
    const state = {
      slides,
      current: clampIndex(readHashIndex(), slides.length),
      presenting: false,
      overview: false,
      numberBuffer: "",
      hudTimer: null,
    };

    bindEvents(state, ui);
    layoutThumbs(state, ui);
    render(state, ui);
  }

  /* ---------- 索引工具 ---------- */
  const clampIndex = (i, len) => Math.max(0, Math.min(len - 1, i | 0));

  function readHashIndex() {
    const m = /^#slide-(\d+)$/.exec(window.location.hash || "");
    return m ? parseInt(m[1], 10) - 1 : 0;
  }

  function writeHash(index) {
    const next = "#slide-" + (index + 1);
    if (window.location.hash !== next) {
      history.replaceState(null, "", next);
    }
  }

  /* ---------- 樣式注入 ---------- */
  function injectStyles() {
    const css = `
      .ppt-controls, .ppt-overview-hint { display: none; }

      /* === 放映模式 === */
      body.${CONFIG.presentingClass} {
        overflow: hidden;
        background: #0a0a0a;
      }
      body.${CONFIG.presentingClass} .${CONFIG.slideSelector.slice(1)} {
        position: fixed;
        top: 50%;
        left: 50%;
        margin: 0;
        display: none;
        box-shadow: 0 8px 40px rgba(0,0,0,0.5);
        transform-origin: center center;
        will-change: transform;
      }
      body.${CONFIG.presentingClass} .${CONFIG.slideSelector.slice(1)}.${CONFIG.activeClass} {
        display: flex;
      }

      /* === 控制列 HUD === */
      body.${CONFIG.presentingClass} .ppt-controls {
        display: flex;
        position: fixed;
        bottom: 18px;
        left: 50%;
        transform: translateX(-50%);
        align-items: center;
        gap: 14px;
        padding: 8px 16px;
        background: rgba(20,20,20,0.82);
        backdrop-filter: blur(8px);
        border-radius: 999px;
        color: #fff;
        font: 500 13px/1 "Inter", -apple-system, "Noto Sans TC", sans-serif;
        z-index: 9999;
        opacity: 1;
        transition: opacity .35s ease;
        user-select: none;
      }
      body.${CONFIG.presentingClass}.ppt-idle .ppt-controls { opacity: 0; }
      .ppt-controls button {
        all: unset;
        cursor: pointer;
        padding: 6px 10px;
        border-radius: 999px;
        color: #fff;
        font-size: 14px;
        line-height: 1;
        transition: background .2s ease;
      }
      .ppt-controls button:hover { background: rgba(255,255,255,0.15); }
      .ppt-controls .ppt-counter {
        min-width: 56px;
        text-align: center;
        font-variant-numeric: tabular-nums;
        letter-spacing: 0.04em;
        color: #e5e7eb;
      }

      /* === 進度條 === */
      body.${CONFIG.presentingClass} .ppt-progress {
        display: block;
        position: fixed;
        top: 0; left: 0;
        height: 3px;
        background: #fff;
        z-index: 9999;
        transition: width .3s ease;
      }
      .ppt-progress { display: none; }

      /* === 浮動「放映」按鈕（非放映時顯示） === */
      .ppt-play-fab {
        position: fixed;
        right: 22px;
        bottom: 22px;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 18px;
        background: #111;
        color: #fff;
        border-radius: 999px;
        font: 600 13px/1 "Inter", -apple-system, "Noto Sans TC", sans-serif;
        box-shadow: 0 4px 16px rgba(0,0,0,0.25);
        cursor: pointer;
        z-index: 9998;
        transition: transform .2s ease, opacity .2s ease;
      }
      .ppt-play-fab:hover { transform: translateY(-2px); }
      body.${CONFIG.presentingClass} .ppt-play-fab { display: none; }

      /* === 縮圖總覽 === */
      body.${CONFIG.overviewClass} { overflow: auto; background: #0a0a0a; }
      body.${CONFIG.overviewClass} .${CONFIG.slideSelector.slice(1)} { display: none !important; }
      .ppt-overview {
        display: none;
        position: fixed;
        inset: 0;
        z-index: 10000;
        overflow-y: auto;
        padding: 32px;
        background: #0a0a0a;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 20px;
        align-content: start;
      }
      body.${CONFIG.overviewClass} .ppt-overview { display: grid; }
      .ppt-thumb {
        position: relative;
        aspect-ratio: 297 / 210;
        background: #fff;
        border-radius: 6px;
        overflow: hidden;
        cursor: pointer;
        border: 3px solid transparent;
        box-shadow: 0 2px 12px rgba(0,0,0,0.4);
        transition: border-color .2s ease, transform .2s ease;
      }
      .ppt-thumb:hover { transform: translateY(-3px); }
      .ppt-thumb.is-current { border-color: #fff; }
      .ppt-thumb .ppt-thumb-stage {
        position: absolute;
        top: 0; left: 0;
        transform-origin: top left;
        pointer-events: none;
      }
      .ppt-thumb .ppt-thumb-num {
        position: absolute;
        bottom: 6px; right: 8px;
        font: 600 11px/1 "Inter", sans-serif;
        color: #fff;
        background: rgba(0,0,0,0.6);
        padding: 3px 7px;
        border-radius: 4px;
        z-index: 2;
      }

      /* === 列印：移除所有放映 UI === */
      @media print {
        .ppt-controls, .ppt-progress, .ppt-play-fab, .ppt-overview { display: none !important; }
      }
    `;
    const style = document.createElement("style");
    style.id = "ppt-script-styles";
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ---------- 建立 UI 元件 ---------- */
  function buildUI(total) {
    const progress = el("div", "ppt-progress");

    const counter = el("span", "ppt-counter");
    const controls = el("div", "ppt-controls");
    const btnPrev = iconBtn("‹", "上一張");
    const btnOverview = iconBtn("▦", "總覽 (O)");
    const btnNext = iconBtn("›", "下一張");
    const btnExit = iconBtn("✕", "退出 (Esc)");
    controls.append(btnPrev, counter, btnNext, btnOverview, btnExit);

    const fab = el("div", "ppt-play-fab");
    fab.append(document.createTextNode("▶ 放映"));

    const overview = el("div", "ppt-overview");

    document.body.append(progress, controls, fab, overview);

    return {
      progress,
      controls,
      counter,
      btnPrev,
      btnNext,
      btnOverview,
      btnExit,
      fab,
      overview,
      total,
    };
  }

  const el = (tag, className) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    return node;
  };

  function iconBtn(label, title) {
    const b = el("button");
    b.type = "button";
    b.textContent = label;
    b.title = title;
    b.setAttribute("aria-label", title);
    return b;
  }

  /* ---------- 事件綁定 ---------- */
  function bindEvents(state, ui) {
    // 控制列按鈕
    ui.btnPrev.addEventListener("click", () => go(state, ui, -1));
    ui.btnNext.addEventListener("click", () => go(state, ui, +1));
    ui.btnExit.addEventListener("click", () => exitPresent(state, ui));
    ui.btnOverview.addEventListener("click", () => toggleOverview(state, ui));
    ui.fab.addEventListener("click", () => enterPresent(state, ui));

    // 雙擊投影片進入放映
    document.addEventListener("dblclick", (e) => {
      if (!state.presenting && e.target.closest(CONFIG.slideSelector)) {
        enterPresent(state, ui);
      }
    });

    // 鍵盤
    document.addEventListener("keydown", (e) => onKey(e, state, ui));

    // 放映時：點擊左右半切換
    document.addEventListener("click", (e) => {
      if (!state.presenting || state.overview) return;
      if (e.target.closest(".ppt-controls")) return;
      const mid = window.innerWidth / 2;
      go(state, ui, e.clientX > mid ? +1 : -1);
    });

    // 滾輪切換（節流）
    let wheelLock = false;
    document.addEventListener(
      "wheel",
      (e) => {
        if (!state.presenting || state.overview) return;
        if (wheelLock) return;
        wheelLock = true;
        setTimeout(() => (wheelLock = false), 450);
        go(state, ui, (e.deltaY || e.deltaX) > 0 ? +1 : -1);
      },
      { passive: true }
    );

    // 觸控滑動
    let touchX = null;
    document.addEventListener("touchstart", (e) => {
      if (state.presenting) touchX = e.touches[0].clientX;
    }, { passive: true });
    document.addEventListener("touchend", (e) => {
      if (!state.presenting || touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) go(state, ui, dx < 0 ? +1 : -1);
      touchX = null;
    }, { passive: true });

    // 視窗縮放：重算 scale
    window.addEventListener("resize", () => {
      if (state.presenting) scaleActive(state);
      if (state.overview) layoutThumbs(state, ui);
    });

    // 滑鼠移動 → 顯示控制列後自動隱藏
    document.addEventListener("mousemove", () => poke(state, ui));

    // 列印前自動退出放映
    window.addEventListener("beforeprint", () => {
      if (state.presenting) exitPresent(state, ui);
    });

    // 全螢幕被使用者退出時，同步退出放映
    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement && state.presenting && !state.overview) {
        exitPresent(state, ui);
      }
    });
  }

  /* ---------- 鍵盤處理 ---------- */
  function onKey(e, state, ui) {
    const k = e.key;

    // 數字跳頁緩衝
    if (/^\d$/.test(k)) {
      state.numberBuffer += k;
      return;
    }
    if (k === "Enter" && state.numberBuffer) {
      const idx = clampIndex(parseInt(state.numberBuffer, 10) - 1, state.slides.length);
      state.numberBuffer = "";
      goTo(state, ui, idx);
      return;
    }
    state.numberBuffer = "";

    switch (k) {
      case "f":
      case "F":
        if (!state.presenting) enterPresent(state, ui);
        e.preventDefault();
        break;
      case "Escape":
        if (state.overview) toggleOverview(state, ui);
        else if (state.presenting) exitPresent(state, ui);
        break;
      case "o":
      case "O":
        if (state.presenting) {
          toggleOverview(state, ui);
          e.preventDefault();
        }
        break;
      case "ArrowRight":
      case "ArrowDown":
      case " ":
      case "PageDown":
        if (state.presenting) {
          go(state, ui, +1);
          e.preventDefault();
        }
        break;
      case "ArrowLeft":
      case "ArrowUp":
      case "PageUp":
        if (state.presenting) {
          go(state, ui, -1);
          e.preventDefault();
        }
        break;
      case "Home":
        if (state.presenting) goTo(state, ui, 0);
        break;
      case "End":
        if (state.presenting) goTo(state, ui, state.slides.length - 1);
        break;
    }
  }

  /* ---------- 導覽 ---------- */
  function go(state, ui, delta) {
    goTo(state, ui, clampIndex(state.current + delta, state.slides.length));
  }

  function goTo(state, ui, index) {
    state.current = index;
    render(state, ui);
  }

  /* ---------- 進入 / 退出放映 ---------- */
  function enterPresent(state, ui) {
    state.presenting = true;
    document.body.classList.add(CONFIG.presentingClass);
    requestFullscreen();
    render(state, ui);
    poke(state, ui);
  }

  function exitPresent(state, ui) {
    state.presenting = false;
    state.overview = false;
    document.body.classList.remove(CONFIG.presentingClass, CONFIG.overviewClass);
    clearTransforms(state);
    exitFullscreen();
    // 退出後讓目前投影片回到視窗內
    const target = state.slides[state.current];
    if (target) target.scrollIntoView({ block: "start" });
  }

  function requestFullscreen() {
    const root = document.documentElement;
    if (root.requestFullscreen) root.requestFullscreen().catch(() => {});
  }

  function exitFullscreen() {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  }

  /* ---------- 縮圖總覽 ---------- */
  function toggleOverview(state, ui) {
    state.overview = !state.overview;
    document.body.classList.toggle(CONFIG.overviewClass, state.overview);
    if (state.overview) layoutThumbs(state, ui);
    render(state, ui);
  }

  // 用 CSS scale 把真實投影片縮成縮圖（clone 內容，避免重繪成本過高）
  function layoutThumbs(state, ui) {
    if (ui.overview.childElementCount === state.slides.length) {
      // 已建立，只更新縮放
      Array.from(ui.overview.children).forEach((thumb, i) =>
        fitThumb(thumb, state.slides[i])
      );
      markCurrentThumb(state, ui);
      return;
    }
    ui.overview.innerHTML = "";
    state.slides.forEach((slide, i) => {
      const thumb = el("div", "ppt-thumb");
      thumb.dataset.index = String(i);
      const stage = el("div", "ppt-thumb-stage");
      stage.appendChild(slide.cloneNode(true));
      const num = el("div", "ppt-thumb-num");
      num.textContent = i + 1;
      thumb.append(stage, num);
      thumb.addEventListener("click", () => {
        state.overview = false;
        document.body.classList.remove(CONFIG.overviewClass);
        goTo(state, ui, i);
      });
      ui.overview.appendChild(thumb);
      fitThumb(thumb, slide);
    });
    markCurrentThumb(state, ui);
  }

  function fitThumb(thumb, slide) {
    const stage = thumb.querySelector(".ppt-thumb-stage");
    if (!stage) return;
    const w = slide.offsetWidth || 1;
    const scale = thumb.clientWidth / w;
    stage.style.width = w + "px";
    stage.style.transform = "scale(" + scale + ")";
  }

  function markCurrentThumb(state, ui) {
    Array.from(ui.overview.children).forEach((thumb, i) =>
      thumb.classList.toggle("is-current", i === state.current)
    );
  }

  /* ---------- 控制列自動隱藏 ---------- */
  function poke(state, ui) {
    if (!state.presenting) return;
    document.body.classList.remove("ppt-idle");
    if (state.hudTimer) clearTimeout(state.hudTimer);
    state.hudTimer = setTimeout(() => {
      if (state.presenting && !state.overview) {
        document.body.classList.add("ppt-idle");
      }
    }, CONFIG.hudHideDelay);
  }

  /* ---------- 渲染 ---------- */
  function render(state, ui) {
    const { slides, current } = state;

    slides.forEach((slide, i) =>
      slide.classList.toggle(CONFIG.activeClass, i === current)
    );

    // 計數器與進度條
    ui.counter.textContent = current + 1 + " / " + slides.length;
    ui.progress.style.width =
      ((current + 1) / slides.length) * 100 + "%";

    writeHash(current);

    if (state.presenting && !state.overview) {
      scaleActive(state);
    }
    if (state.overview) {
      markCurrentThumb(state, ui);
    }
  }

  // 把目前投影片等比縮放並置中（slide 為固定 mm 尺寸）
  function scaleActive(state) {
    const slide = state.slides[state.current];
    if (!slide) return;
    const w = slide.offsetWidth || 1;
    const h = slide.offsetHeight || 1;
    const margin = 0.94; // 四周留一點邊
    const scale = Math.min(
      (window.innerWidth / w) * margin,
      (window.innerHeight / h) * margin
    );
    slide.style.transform =
      "translate(-50%, -50%) scale(" + scale + ")";
  }

  function clearTransforms(state) {
    state.slides.forEach((slide) => {
      slide.style.transform = "";
    });
  }

  /* ---------- DOM ready ---------- */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
