/* ============================================================
   AI 投资学习台 · 公共脚本
   负责：导航渲染、Tab、展开面板、自测题、学习进度、移动端目录、问题暂存
   页面专属的模拟器逻辑写在各页面的内联脚本里。
   ============================================================ */

(function () {
  "use strict";

  /* ---------- 学习路径数据（新增模块页时只改这里） ---------- */

  /* 骨架层 · 15 张核心模型卡：先全局过一遍，给一切细节搭架子 */
  const SPINES = [
    { id: "s01", file: "spine01.html", num: "1",  title: "供给慢、需求快",           sub: "扩产 24-36 个月 · 一切周期的根源",     built: true  },
    { id: "s02", file: "spine02.html", num: "2",  title: "固定成本主导",             sub: "涨价与利用率的利润弹性是跳变",          built: true  },
    { id: "s03", file: "spine03.html", num: "3",  title: "良率 = 成本曲线",         sub: "爬坡斜率就是毛利率的日历",             built: true  },
    { id: "s04", file: "spine04.html", num: "4",  title: "出货 = 最短板",           sub: "瓶颈拿走定价权 · 且瓶颈会漂移",         built: true  },
    { id: "s05", file: "spine05.html", num: "5",  title: "缺货是牛鞭极值信号",       sub: "渠道逐层放大 · 反转常在其后几个月",     built: true  },
    { id: "s06", file: "spine06.html", num: "6",  title: "库存结构决定波动结构",     sub: "直供品类平缓 · 商品化品类最凶",         built: true  },
    { id: "s07", file: "spine07.html", num: "7",  title: "需求分两种",              sub: "换机式（周期）与范式革命（台阶）",       built: true  },
    { id: "s08", file: "spine08.html", num: "8",  title: "技术代际是生死",           sub: "掉队瞒不住 · 掌门人押注决定命运",        built: true  },
    { id: "s09", file: "spine09.html", num: "9",  title: "生态分工与耦合度",         sub: "门槛降低但工艺-设计耦合越深周期越凶",   built: true  },
    { id: "s10", file: "spine10.html", num: "10", title: "需求传导链",              sub: "模型→云→芯片→制造→设备→电力",         built: true  },
    { id: "s11", file: "spine11.html", num: "11", title: "领先指标来自扩产时序",     sub: "设备订单 · 交期 · 测试设备",           built: true  },
    { id: "s12", file: "spine12.html", num: "12", title: "价格是滞后读数",           sub: "先行量是交期 · 长约 · 预付款",          built: true  },
    { id: "s13", file: "spine13.html", num: "13", title: "标题层与流程层",           sub: "市场定价在标题层 · 超额认知在流程层",    built: true  },
    { id: "s14", file: "spine14.html", num: "14", title: "产业周期与股价错位",       sub: "产业刚开始 ≠ 股价便宜",                 built: true  },
    { id: "s15", file: "spine15.html", num: "15", title: "规则五件套齐全",           sub: "来源 · 机制 · 案例 · 操作 · 失效",     built: true  },
  ];

  const LAYERS = [
    {
      name: "第一层 · 零基础体感",
      desc: "先建立行业直觉，让术语变成可感的东西。",
      items: [
        { id: "m01", file: "m01.html", num: "1", title: "AI 为什么会变成硬件和制造业问题", sub: "token · 训练与推理 · 内存墙 · CapEx 传导", built: true },
        { id: "m02", file: "m02.html", num: "2", title: "芯片前端制造 101", sub: "晶圆 · 光刻 · 良率 · WFE 设备", built: true },
        { id: "m03", file: "m03.html", num: "3", title: "封装、测试与系统集成 101", sub: "CoWoS · HBM 堆叠 · capable 与 delivery", built: true },
        { id: "m04", file: "m04.html", num: "4", title: "半导体行业前史", sub: "50 年兴衰 · 牛鞭效应 · 掌门人决定论", built: true },
      ],
    },
    {
      name: "第二层 · 产业结构",
      desc: "把公司和技术名词放到地图上，先定位、再判断。",
      items: [
        { id: "m05", file: "m05.html", num: "5", title: "半导体产业链总地图", sub: "设计 · 制造 · 封装 · 设备 · 材料 · 生态分工", built: true },
        { id: "m06", file: "m06.html", num: "6", title: "AI Infra 十层传导链", sub: "从云到电力的十层地图", built: true },
        { id: "m07", file: "m07.html", num: "7", title: "Memory / Storage 深水区", sub: "DRAM · HBM · NAND · eSSD · HDD", built: true },
        { id: "m08", file: "m08.html", num: "8", title: "光、电力、液冷与上游材料", sub: "光模块 · InP · ABF · 液冷电力", built: true },
      ],
    },
    {
      name: "第三层 · 投资判断",
      desc: "把产业理解转成可打分、可验证的投资判断。",
      items: [
        { id: "m09", file: "m09.html", num: "9", title: "四铁律", sub: "瓶颈 · 垄断 · 库存弹性 · 扩产创伤", built: true },
        { id: "m10", file: "m10.html", num: "10", title: "周期、库存与供需拐点", sub: "Secular 与 Cyclic · 泡沫观察信号", built: true },
        { id: "m11", file: "m11.html", num: "11", title: "财务语言与估值", sub: "毛利率 · 经营杠杆 · PB/PE/DCF", built: true },
        { id: "m12", file: "m12.html", num: "12", title: "美股 / A 股 / 港股 / 台韩日市场差异", sub: "同一逻辑在不同市场的验证与折扣", built: true },
      ],
    },
    {
      name: "第四层 · 研究输出",
      desc: "从看懂别人观点，转向自己研究、自己判断、自己复盘。",
      items: [
        { id: "m13", file: "m13.html", num: "13", title: "证据链与研究流程", sub: "财报电话会 · 10-Q · 买方视角", built: true },
        { id: "m14", file: "m14.html", num: "14", title: "投资 Memo 与个人系统", sub: "memo 模板 · 仓位与策略匹配", built: true },
      ],
    },
  ];

  /* 案例层 · 12 个真实决策复盘：用真实历史决策把骨架卡练成体感 */
  const CASES = [
    { id: "c01", file: "case01.html", num: "1",  title: "台积电 N3 稀释",           sub: "2024-01-18 · Q4 2023 电话会散会 · 稀释是暂时还是永久", built: true  },
    { id: "c02", file: "case02.html", num: "2",  title: "ASML→KLA 传导",           sub: "2026-01-02 · Aletheia 上调 · 信号硬度与卖方视角",     built: false },
    { id: "c03", file: "case03.html", num: "3",  title: "Intel 18A 爬坡",         sub: "2026-02 · 陈立武发言 · 叙事与证据辨别",                built: false },
    { id: "c04", file: "case04.html", num: "4",  title: "2020-22 缺货到骤然逆转", sub: "牛鞭极值信号如何在实盘认出",                             built: false },
    { id: "c05", file: "case05.html", num: "5",  title: "存储 2023 减产到 2026 紧缺",sub: "库存结构决定波动结构 · 长约的双刃",                     built: false },
    { id: "c06", file: "case06.html", num: "6",  title: "量跌价涨的利润结构",       sub: "存储厂季报 · 固定成本主导的经营杠杆",                    built: false },
    { id: "c07", file: "case07.html", num: "7",  title: "云厂商 CapEx 拐点识别",    sub: "从「发债融资」到「节奏放缓」的前置信号",                    built: false },
    { id: "c08", file: "case08.html", num: "8",  title: "A 股映射类炒作辨伪",       sub: "国产替代 vs 真实订单 vs 交易性映射",                     built: false },
    { id: "c09", file: "case09.html", num: "9",  title: "DeepSeek 2025-01 冲击", sub: "推理成本骤降 · 训练需求是否见顶",                        built: false },
    { id: "c10", file: "case10.html", num: "10", title: "英伟达数据中心节奏",       sub: "FY23 到 FY26 · 需求台阶的判断与兑现",                     built: false },
    { id: "c11", file: "case11.html", num: "11", title: "AAOI 类模块厂",           sub: "有缺口但无垄断和交付风险",                               built: false },
    { id: "c12", file: "case12.html", num: "12", title: "掌门人换帅翻身",           sub: "AMD 苏姿丰 · Intel 陈立武 · 押注决定命运",                built: false },
  ];

  const EXTRAS = [];

  /* ---------- 学习进度（localStorage） ---------- */

  const PKEY = "aisemi.progress.v1";

  function getProgress() {
    try { return JSON.parse(localStorage.getItem(PKEY)) || {}; }
    catch (e) { return {}; }
  }
  function setDone(id, done) {
    const p = getProgress();
    if (done) p[id] = true; else delete p[id];
    try { localStorage.setItem(PKEY, JSON.stringify(p)); } catch (e) { /* 隐私模式下忽略 */ }
  }

  /* ---------- 左侧导航渲染 ---------- */

  function renderRail() {
    const rail = document.getElementById("rail");
    if (!rail) return;
    const current = document.body.dataset.page || "";
    const progress = getProgress();

    const frag = document.createDocumentFragment();

    const brand = document.createElement("a");
    brand.className = "rail-brand";
    brand.href = "index.html";
    brand.innerHTML = "<b>AI 投资学习台</b><span>从入门到独立投研</span>";
    frag.appendChild(brand);

    /* 判断当前所在层：主页 · 骨架卡 · 案例 · 手册 */
    const isHome = current === "index";
    const isSpinePage = /^s\d+$/.test(current);
    const isCasePage = /^c\d+$/.test(current);

    /* 主页只保留品牌 logo,不渲染任何层的目录 */
    if (isHome) {
      rail.appendChild(frag);
      return;
    }

    if (isCasePage) {
      /* 案例页 · 只显示案例目录 */
      const gCase = document.createElement("div");
      gCase.className = "rail-group";
      const nameCase = document.createElement("div");
      nameCase.className = "rail-group-name";
      const builtCount = CASES.filter((c) => c.built).length;
      nameCase.textContent = "案例层 · " + builtCount + " / 12 决策复盘";
      gCase.appendChild(nameCase);
      CASES.forEach((it) => {
        let el;
        if (it.built) {
          el = document.createElement("a");
          el.href = it.file;
          el.className = "rail-item";
          if (progress[it.id]) el.classList.add("is-done");
          if (current === it.id) el.setAttribute("aria-current", "page");
          el.innerHTML = '<span class="num">' + it.num + "</span><span>" + it.title + "</span>" +
            (progress[it.id] ? '<span class="done-mark" title="已标记完成">✓</span>' : "");
        } else {
          el = document.createElement("span");
          el.className = "rail-item is-todo";
          el.innerHTML = '<span class="num">' + it.num + "</span><span>" + it.title + '</span><span class="todo-chip">待建</span>';
        }
        gCase.appendChild(el);
      });
      frag.appendChild(gCase);
    }

    if (isSpinePage) {
      /* 骨架卡页 · 只显示 15 张骨架卡目录 */
      const gSpine = document.createElement("div");
      gSpine.className = "rail-group";
      const nameSpine = document.createElement("div");
      nameSpine.className = "rail-group-name";
      nameSpine.textContent = "骨架层 · 15 张核心模型卡";
      gSpine.appendChild(nameSpine);
      SPINES.forEach((it) => {
        let el;
        if (it.built) {
          el = document.createElement("a");
          el.href = it.file;
          el.className = "rail-item";
          if (progress[it.id]) el.classList.add("is-done");
          if (current === it.id) el.setAttribute("aria-current", "page");
          el.innerHTML = '<span class="num">' + it.num + "</span><span>" + it.title + "</span>" +
            (progress[it.id] ? '<span class="done-mark" title="已标记完成">✓</span>' : "");
        } else {
          el = document.createElement("span");
          el.className = "rail-item is-todo";
          el.innerHTML = '<span class="num">' + it.num + "</span><span>" + it.title + '</span><span class="todo-chip">待建</span>';
        }
        gSpine.appendChild(el);
      });
      frag.appendChild(gSpine);
    }

    if (!isSpinePage && !isCasePage) LAYERS.forEach((layer) => {
      const g = document.createElement("div");
      g.className = "rail-group";
      const name = document.createElement("div");
      name.className = "rail-group-name";
      name.textContent = layer.name;
      g.appendChild(name);

      layer.items.forEach((it) => {
        let el;
        if (it.built) {
          el = document.createElement("a");
          el.href = it.file;
          el.className = "rail-item";
          if (progress[it.id]) el.classList.add("is-done");
          if (current === it.id) el.setAttribute("aria-current", "page");
          el.innerHTML = '<span class="num">' + it.num + "</span><span>" + it.title + "</span>" +
            (progress[it.id] ? '<span class="done-mark" title="已标记完成">✓</span>' : "");
        } else {
          el = document.createElement("span");
          el.className = "rail-item is-todo";
          el.innerHTML = '<span class="num">' + it.num + "</span><span>" + it.title + '</span><span class="todo-chip">待建</span>';
        }
        g.appendChild(el);
      });
      frag.appendChild(g);
    });

    if (EXTRAS.length) {
      const g = document.createElement("div");
      g.className = "rail-group";
      const name = document.createElement("div");
      name.className = "rail-group-name";
      name.textContent = "附录";
      g.appendChild(name);
      EXTRAS.forEach((it) => {
        const el = document.createElement("a");
        el.href = it.file;
        el.className = "rail-item";
        if (current === it.id) el.setAttribute("aria-current", "page");
        el.innerHTML = '<span class="num">附</span><span>' + it.title + "</span>";
        g.appendChild(el);
      });
      frag.appendChild(g);
    }

    rail.appendChild(frag);
  }

  /* ---------- topbar 层切换 · 骨架 / 模块 ---------- */

  function initLayerSwitch() {
    const topbar = document.querySelector(".topbar");
    if (!topbar) return;
    const current = document.body.dataset.page || "";
    const isSpine = /^s\d+$/.test(current);
    const isCase = /^c\d+$/.test(current);
    const isModule = /^m\d+$/.test(current);
    /* 主页(current === "index")三个 tab 都不高亮 */

    /* 找到各层第一个已建页面作为跳转目标 */
    const firstSpine = (SPINES.find((s) => s.built) || SPINES[0]).file;
    const firstCase = (CASES.find((c) => c.built) || CASES[0]).file;
    const firstModule = (LAYERS.flatMap((l) => l.items).find((m) => m.built) || SPINES[0]).file;

    const sw = document.createElement("div");
    sw.className = "layer-switch";
    sw.setAttribute("role", "tablist");
    sw.setAttribute("aria-label", "在骨架层 · 案例层 · 手册层之间切换");
    sw.innerHTML =
      '<a href="' + firstSpine + '"' + (isSpine ? ' aria-current="page"' : "") + '>骨架</a>' +
      '<a href="' + firstCase + '"' + (isCase ? ' aria-current="page"' : "") + '>案例</a>' +
      '<a href="' + firstModule + '"' + (isModule ? ' aria-current="page"' : "") + '>模块</a>';

    /* 插到 navToggle 之后（若存在），否则插在最前 */
    const nav = topbar.querySelector("#navToggle");
    if (nav) nav.after(sw); else topbar.prepend(sw);
  }

  /* ---------- 移动端目录开关 ---------- */

  function initDrawer() {
    const btn = document.getElementById("navToggle");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      btn.setAttribute("aria-expanded", String(open));
      btn.textContent = open ? "关闭" : "目录";
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.body.classList.contains("nav-open")) {
        document.body.classList.remove("nav-open");
        btn.setAttribute("aria-expanded", "false");
        btn.textContent = "目录";
        btn.focus();
      }
    });
  }

  /* ---------- Tab 组件 ---------- */

  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach((root) => {
      const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
      const panels = tabs.map((t) => document.getElementById(t.getAttribute("aria-controls")));

      function select(i, focus) {
        tabs.forEach((t, j) => {
          const on = i === j;
          t.setAttribute("aria-selected", String(on));
          t.tabIndex = on ? 0 : -1;
          if (panels[j]) panels[j].hidden = !on;
        });
        if (focus) tabs[i].focus();
      }

      tabs.forEach((t, i) => {
        t.addEventListener("click", () => select(i, false));
        t.addEventListener("keydown", (e) => {
          let n = null;
          if (e.key === "ArrowRight") n = (i + 1) % tabs.length;
          else if (e.key === "ArrowLeft") n = (i - 1 + tabs.length) % tabs.length;
          else if (e.key === "Home") n = 0;
          else if (e.key === "End") n = tabs.length - 1;
          if (n !== null) { e.preventDefault(); select(n, true); }
        });
      });

      const initial = tabs.findIndex((t) => t.getAttribute("aria-selected") === "true");
      select(initial >= 0 ? initial : 0, false);
    });
  }

  /* ---------- 展开面板（情景卡、时间轴、链条图等通用） ---------- */

  function initReveals() {
    document.querySelectorAll("[data-reveal]").forEach((btn) => {
      const panel = document.getElementById(btn.getAttribute("aria-controls"));
      if (!panel) return;
      panel.hidden = true;
      btn.setAttribute("aria-expanded", "false");
      btn.addEventListener("click", () => {
        const open = panel.hidden;
        /* 同组互斥：data-reveal-group 相同的面板一次只开一个 */
        const group = btn.dataset.revealGroup;
        if (open && group) {
          document.querySelectorAll('[data-reveal][data-reveal-group="' + group + '"]').forEach((other) => {
            if (other === btn) return;
            const op = document.getElementById(other.getAttribute("aria-controls"));
            if (op) op.hidden = true;
            other.setAttribute("aria-expanded", "false");
          });
        }
        panel.hidden = !open;
        btn.setAttribute("aria-expanded", String(open));
        if (btn.dataset.openText) {
          btn.textContent = open ? btn.dataset.openText : btn.dataset.closedText;
        }
      });
      if (btn.dataset.openText) btn.dataset.closedText = btn.textContent;
    });
  }

  /* ---------- 自测题 ---------- */

  function initQuiz() {
    document.querySelectorAll("[data-quiz]").forEach((q) => {
      const btn = q.querySelector(".quiz-check");
      const fb = q.querySelector(".quiz-fb");
      if (!btn || !fb) return;
      fb.hidden = true;
      btn.addEventListener("click", () => {
        const chosen = q.querySelector("input:checked");
        if (!chosen) {
          fb.hidden = false;
          fb.innerHTML = "先选一个答案再检查。";
          return;
        }
        q.classList.add("is-checked");
        q.querySelectorAll(".quiz-opts label").forEach((l) => {
          l.classList.remove("opt-correct", "opt-wrong");
          const input = l.querySelector("input");
          if (input.dataset.correct === "1") l.classList.add("opt-correct");
          else if (input.checked) l.classList.add("opt-wrong");
        });
        const right = chosen.dataset.correct === "1";
        fb.hidden = false;
        fb.innerHTML = (right ? '<b class="ok">对。</b>' : '<b class="no">不对。</b>') + (q.dataset.explain || "");
      });
    });
  }

  /* ---------- 「标记完成」 ---------- */

  function initComplete() {
    const btn = document.getElementById("markDone");
    if (!btn) return;
    const id = document.body.dataset.page;
    const originalText = btn.textContent;
    function paint() {
      const done = !!getProgress()[id];
      btn.setAttribute("aria-pressed", String(done));
      btn.textContent = done ? "已完成 ✓（点击撤销）" : originalText;
    }
    btn.addEventListener("click", () => {
      setDone(id, !getProgress()[id]);
      paint();
    });
    paint();
  }

  /* ---------- 问题暂存（localStorage） ---------- */

  const QKEY = "aisemi.questions.v1";

  function getQuestions() {
    try {
      const data = JSON.parse(localStorage.getItem(QKEY)) || [];
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return [];
    }
  }

  function setQuestions(items) {
    try { localStorage.setItem(QKEY, JSON.stringify(items)); } catch (e) { /* 隐私模式下忽略 */ }
  }

  function escapeHTML(text) {
    return String(text || "").replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[ch]);
  }

  function currentPageTitle() {
    const title = document.querySelector(".topbar-title");
    return (title ? title.textContent : document.title).trim();
  }

  function normalizeQuote(text) {
    return String(text || "").replace(/\s+/g, " ").trim().slice(0, 240);
  }

  function skippedTextHost(node, options) {
    const parent = node.parentElement;
    if (!parent || parent.closest(".question-drawer, script, style, textarea, button, input, select")) return true;
    return !options?.includeMarks && parent.closest(".question-mark");
  }

  function textNodesUnder(root, options) {
    const nodes = [];
    if (!root) return nodes;
    const walker = document.createTreeWalker(root, 4, {
      acceptNode(node) {
        return skippedTextHost(node, options) ? 2 : 1;
      },
    });
    let node;
    while ((node = walker.nextNode())) nodes.push(node);
    return nodes;
  }

  function selectionOffsets(range) {
    const main = document.getElementById("main");
    if (!main || !range) return null;
    const nodes = textNodesUnder(main, { includeMarks: true });
    let pos = 0;
    let start = null;
    let end = null;
    nodes.forEach((node) => {
      if (node === range.startContainer) start = pos + range.startOffset;
      if (node === range.endContainer) end = pos + range.endOffset;
      pos += node.nodeValue.length;
    });
    if (start === null || end === null || end <= start) return null;
    return { start, end };
  }

  function pageQuestions() {
    const pageId = document.body.dataset.page || location.pathname;
    return getQuestions().filter((q) => q.pageId === pageId);
  }

  function questionPageMeta(pageId) {
    const spine = SPINES.find((it) => it.id === pageId);
    if (spine) return { file: spine.file, title: "卡 " + spine.num + " · " + spine.title };
    const caseIt = CASES.find((it) => it.id === pageId);
    if (caseIt) return { file: caseIt.file, title: "案例 " + caseIt.num + " · " + caseIt.title };
    const module = LAYERS.flatMap((layer) => layer.items).find((it) => it.id === pageId);
    if (module) return { file: module.file, title: "模块 " + module.num + " · " + module.title };
    return { file: "", title: pageId || "未知页面" };
  }

  function unresolved(items) {
    return items.filter((q) => !q.resolved);
  }

  function attrSelectorValue(text) {
    return String(text || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  }

  function removeQuestionMark(id) {
    document.querySelectorAll('.question-mark[data-question-id="' + attrSelectorValue(id) + '"]').forEach((mark) => {
      const parent = mark.parentNode;
      while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
      parent.removeChild(mark);
      parent.normalize();
    });
  }

  function markRangeSegments(startOffset, endOffset, q) {
    const main = document.getElementById("main");
    if (!main || typeof startOffset !== "number" || typeof endOffset !== "number" || endOffset <= startOffset) return false;
    let pos = 0;
    let painted = false;
    textNodesUnder(main, { includeMarks: true }).forEach((node) => {
      const next = pos + node.nodeValue.length;
      const start = Math.max(startOffset, pos);
      const end = Math.min(endOffset, next);
      if (end > start && !node.parentElement.closest(".question-mark")) {
        const range = document.createRange();
        range.setStart(node, start - pos);
        range.setEnd(node, end - pos);
        const mark = document.createElement("mark");
        mark.className = "question-mark";
        if (q.resolved) mark.classList.add("is-resolved");
        mark.dataset.questionId = q.id;
        mark.title = q.resolved ? "已处理的问题" : "已暂存问题";
        try {
          range.surroundContents(mark);
          painted = true;
        } catch (e) {
          /* 被复杂节点切开时跳过这一段，列表里仍保留问题。 */
        }
      }
      pos = next;
    });
    return painted;
  }

  function quoteOffsets(quote) {
    const main = document.getElementById("main");
    if (!main || !quote) return null;
    let pos = 0;
    const nodes = textNodesUnder(main, { includeMarks: true });
    for (const node of nodes) {
      const i = node.nodeValue.indexOf(quote);
      if (i >= 0) return { start: pos + i, end: pos + i + quote.length };
      pos += node.nodeValue.length;
    }
    return null;
  }

  function highlightQuestion(q) {
    if (!q.id || !q.quote || document.querySelector('.question-mark[data-question-id="' + attrSelectorValue(q.id) + '"]')) return;
    const anchor = typeof q.start === "number" && typeof q.end === "number"
      ? { start: q.start, end: q.end }
      : quoteOffsets(q.quote);
    if (!anchor) return;
    markRangeSegments(anchor.start, anchor.end, q);
  }

  function highlightPageQuestions() {
    pageQuestions().forEach(highlightQuestion);
  }

  function scrollToQuestion(q) {
    highlightQuestion(q);
    const mark = document.querySelector('.question-mark[data-question-id="' + attrSelectorValue(q.id) + '"]');
    if (mark) {
      mark.scrollIntoView({ block: "center", behavior: "smooth" });
      mark.classList.add("is-pulsing");
      window.setTimeout(() => mark.classList.remove("is-pulsing"), 900);
    }
  }

  function syncQuestionMarks(q) {
    document.querySelectorAll('.question-mark[data-question-id="' + attrSelectorValue(q.id) + '"]').forEach((mark) => {
      mark.classList.toggle("is-resolved", !!q.resolved);
      mark.title = q.resolved ? "已处理的问题" : "已暂存问题";
    });
  }

  function initQuestionStash() {
    const topbar = document.querySelector(".topbar");
    const main = document.getElementById("main");
    if (!topbar || !main) return;

    const pageId = document.body.dataset.page || location.pathname;
    const stashBtn = document.createElement("button");
    stashBtn.type = "button";
    stashBtn.className = "btn btn-ghost question-stash-toggle";
    stashBtn.setAttribute("aria-expanded", "false");
    topbar.appendChild(stashBtn);

    const selectBtn = document.createElement("button");
    selectBtn.type = "button";
    selectBtn.className = "question-select-btn";
    selectBtn.hidden = true;
    selectBtn.textContent = "标注问题";
    document.body.appendChild(selectBtn);

    const drawer = document.createElement("aside");
    drawer.className = "question-drawer";
    drawer.setAttribute("aria-label", "问题暂存");
    drawer.setAttribute("aria-hidden", "true");
    drawer.innerHTML =
      '<div class="question-drawer-head">' +
        '<div><b>问题暂存</b><span>只记录，不打断阅读</span></div>' +
        '<button class="question-icon-btn" type="button" data-q-close aria-label="关闭问题暂存">×</button>' +
      '</div>' +
      '<form class="question-form">' +
        '<label class="question-form-label" for="questionText">当前标注</label>' +
        '<blockquote class="question-quote" data-q-quote>先选中正文中的一句话，再点“标注问题”。</blockquote>' +
        '<textarea id="questionText" rows="3" placeholder="这里哪里没想明白？可以很短，读完再集中处理。"></textarea>' +
        '<div class="question-form-actions">' +
          '<button class="btn" type="submit" data-q-submit>保存问题</button>' +
          '<button class="btn btn-ghost" type="button" data-q-cancel-edit hidden>取消编辑</button>' +
          '<button class="btn btn-ghost" type="button" data-q-clear>清空</button>' +
        '</div>' +
      '</form>' +
      '<div class="question-scope-tabs" role="tablist" aria-label="问题范围">' +
        '<button type="button" role="tab" aria-selected="true" data-q-scope="page">当前页 <span data-q-page-count>0</span></button>' +
        '<button type="button" role="tab" aria-selected="false" data-q-scope="all">全部 <span data-q-all-count>0</span></button>' +
      '</div>' +
      '<div class="question-list-head" data-q-list-head>当前页问题</div>' +
      '<div class="question-list" data-q-list></div>';
    document.body.appendChild(drawer);

    const quoteEl = drawer.querySelector("[data-q-quote]");
    const textEl = drawer.querySelector("textarea");
    const listEl = drawer.querySelector("[data-q-list]");
    const submitBtn = drawer.querySelector("[data-q-submit]");
    const cancelEditBtn = drawer.querySelector("[data-q-cancel-edit]");
    const listHead = drawer.querySelector("[data-q-list-head]");
    const pageCountEl = drawer.querySelector("[data-q-page-count]");
    const allCountEl = drawer.querySelector("[data-q-all-count]");
    let draftQuote = "";
    let draftAnchor = null;
    let editingId = "";
    let activeScope = "page";

    function updateCount() {
      const count = unresolved(pageQuestions()).length;
      const allCount = unresolved(getQuestions()).length;
      stashBtn.textContent = "问题 " + count;
      stashBtn.classList.toggle("has-items", count > 0);
      pageCountEl.textContent = String(count);
      allCountEl.textContent = String(allCount);
    }

    function openDrawer() {
      document.body.classList.add("question-open");
      drawer.setAttribute("aria-hidden", "false");
      stashBtn.setAttribute("aria-expanded", "true");
    }

    function closeDrawer() {
      document.body.classList.remove("question-open");
      drawer.setAttribute("aria-hidden", "true");
      stashBtn.setAttribute("aria-expanded", "false");
    }

    function setDraft(quote, anchor) {
      editingId = "";
      draftQuote = normalizeQuote(quote);
      draftAnchor = anchor || null;
      quoteEl.textContent = draftQuote || "先选中正文中的一句话，再点“标注问题”。";
      textEl.value = "";
      submitBtn.textContent = "保存问题";
      cancelEditBtn.hidden = true;
    }

    function setEditing(q) {
      editingId = q.id;
      draftQuote = q.quote;
      draftAnchor = typeof q.start === "number" && typeof q.end === "number" ? { start: q.start, end: q.end } : null;
      quoteEl.textContent = q.quote;
      textEl.value = q.question || "";
      submitBtn.textContent = "保存修改";
      cancelEditBtn.hidden = false;
      textEl.focus();
    }

    function scopedQuestions() {
      const items = activeScope === "all" ? getQuestions() : pageQuestions();
      return items.sort((a, b) => Number(!!a.resolved) - Number(!!b.resolved) || b.createdAt - a.createdAt);
    }

    function paintScopeTabs() {
      drawer.querySelectorAll("[data-q-scope]").forEach((btn) => {
        btn.setAttribute("aria-selected", String(btn.dataset.qScope === activeScope));
      });
      listHead.textContent = activeScope === "all" ? "全部问题" : "当前页问题";
    }

    function renderList() {
      const items = scopedQuestions();
      paintScopeTabs();
      if (!items.length) {
        listEl.innerHTML = '<p class="question-empty">' + (activeScope === "all" ? "还没有暂存过问题。" : "这一页还没有暂存问题。") + '</p>';
        updateCount();
        return;
      }
      listEl.innerHTML = items.map((q) => {
        const meta = questionPageMeta(q.pageId);
        const onThisPage = q.pageId === pageId;
        const pageLine = activeScope === "all"
          ? '<div class="question-page-ref">' + escapeHTML(q.pageTitle || meta.title) + '</div>'
          : "";
        const jumpAction = onThisPage
          ? '<button type="button" class="btn btn-ghost" data-q-jump>跳到原文</button>'
          : (meta.file ? '<a class="btn btn-ghost" href="' + escapeHTML(meta.file) + '">打开页面</a>' : "");
        return (
        '<article class="question-item' + (q.resolved ? " is-resolved" : "") + '" data-q-id="' + escapeHTML(q.id) + '">' +
          pageLine +
          '<blockquote>' + escapeHTML(q.quote) + '</blockquote>' +
          '<p>' + escapeHTML(q.question || "这里需要回头看。") + '</p>' +
          '<div class="question-item-actions">' +
            jumpAction +
            '<button type="button" class="btn btn-ghost" data-q-edit>编辑</button>' +
            '<button type="button" class="btn btn-ghost" data-q-resolve>' + (q.resolved ? "恢复" : "已处理") + '</button>' +
            '<button type="button" class="btn btn-ghost" data-q-delete>删除</button>' +
          '</div>' +
        '</article>'
      ); }).join("");
      updateCount();
    }

    function getReadableSelection() {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return null;
      const range = sel.getRangeAt(0);
      const host = range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
        ? range.commonAncestorContainer
        : range.commonAncestorContainer.parentElement;
      if (!host || !host.closest("#main") || host.closest(".question-drawer, button, textarea, input")) return null;
      const quote = normalizeQuote(sel.toString());
      if (quote.length < 2) return null;
      const rect = range.getBoundingClientRect();
      if (!rect.width && !rect.height) return null;
      return { quote, rect, anchor: selectionOffsets(range) };
    }

    function showSelectionButton() {
      const data = getReadableSelection();
      if (!data) {
        selectBtn.hidden = true;
        return;
      }
      draftQuote = data.quote;
      draftAnchor = data.anchor;
      selectBtn.hidden = false;
      selectBtn.style.left = Math.min(window.innerWidth - 110, Math.max(8, data.rect.left + data.rect.width / 2 - 45)) + "px";
      selectBtn.style.top = Math.max(8, data.rect.top - 42) + "px";
    }

    stashBtn.addEventListener("click", () => {
      renderList();
      openDrawer();
    });
    drawer.querySelector("[data-q-close]").addEventListener("click", closeDrawer);
    drawer.querySelector("[data-q-clear]").addEventListener("click", () => setDraft(""));
    cancelEditBtn.addEventListener("click", () => setDraft(""));
    drawer.querySelectorAll("[data-q-scope]").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeScope = btn.dataset.qScope;
        renderList();
      });
    });
    selectBtn.addEventListener("mousedown", (e) => e.preventDefault());
    selectBtn.addEventListener("click", () => {
      setDraft(draftQuote, draftAnchor);
      selectBtn.hidden = true;
      renderList();
      openDrawer();
      textEl.focus();
    });

    drawer.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      if (!draftQuote) return;
      const items = getQuestions();
      if (editingId) {
        const existing = items.find((it) => it.id === editingId);
        if (existing) {
          existing.question = textEl.value.trim() || "这里需要回头看。";
          existing.updatedAt = Date.now();
          setQuestions(items);
        }
        setDraft("");
        renderList();
        return;
      }
      const q = {
        id: "q" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
        pageId,
        pageTitle: currentPageTitle(),
        quote: draftQuote,
        question: textEl.value.trim() || "这里需要回头看。",
        createdAt: Date.now(),
        resolved: false,
      };
      if (draftAnchor) {
        q.start = draftAnchor.start;
        q.end = draftAnchor.end;
      }
      items.push(q);
      setQuestions(items);
      setDraft("");
      renderList();
      highlightQuestion(q);
    });

    listEl.addEventListener("click", (e) => {
      const item = e.target.closest(".question-item");
      if (!item) return;
      const id = item.dataset.qId;
      const items = getQuestions();
      const q = items.find((it) => it.id === id);
      if (!q) return;
      if (e.target.closest("[data-q-jump]")) scrollToQuestion(q);
      if (e.target.closest("[data-q-edit]")) setEditing(q);
      if (e.target.closest("[data-q-resolve]")) {
        q.resolved = !q.resolved;
        q.updatedAt = Date.now();
        setQuestions(items);
        syncQuestionMarks(q);
        renderList();
      }
      if (e.target.closest("[data-q-delete]")) {
        setQuestions(items.filter((it) => it.id !== id));
        removeQuestionMark(id);
        if (editingId === id) setDraft("");
        renderList();
      }
    });

    document.addEventListener("click", (e) => {
      const mark = e.target.closest(".question-mark");
      if (!mark) return;
      renderList();
      openDrawer();
    });
    document.addEventListener("selectionchange", () => window.setTimeout(showSelectionButton, 40));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        selectBtn.hidden = true;
        if (document.body.classList.contains("question-open")) closeDrawer();
      }
    });
    window.addEventListener("scroll", () => { selectBtn.hidden = true; }, { passive: true });
    window.addEventListener("resize", () => { selectBtn.hidden = true; });

    renderList();
    highlightPageQuestions();
  }

  /* ---------- 工具：SVG 与提示框（供页面脚本用） ---------- */

  const SVG_NS = "http://www.w3.org/2000/svg";
  function svgEl(tag, attrs) {
    const el = document.createElementNS(SVG_NS, tag);
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }

  let tipEl = null;
  function tip() {
    if (!tipEl) {
      tipEl = document.createElement("div");
      tipEl.className = "viz-tip";
      tipEl.setAttribute("role", "status");
      document.body.appendChild(tipEl);
    }
    return tipEl;
  }
  function showTip(html, x, y) {
    const t = tip();
    t.innerHTML = html;
    t.style.display = "block";
    const pad = 14;
    const w = t.offsetWidth, h = t.offsetHeight;
    let left = x + pad, top = y + pad;
    if (left + w > window.innerWidth - 8) left = x - w - pad;
    if (top + h > window.innerHeight - 8) top = y - h - pad;
    t.style.left = left + "px";
    t.style.top = top + "px";
  }
  function hideTip() { if (tipEl) tipEl.style.display = "none"; }

  const fmt = new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 0 });
  const fmt1 = new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 1 });

  /* ---------- 启动 ---------- */

  document.addEventListener("DOMContentLoaded", () => {
    renderRail();
    initLayerSwitch();
    initDrawer();
    initTabs();
    initReveals();
    initQuiz();
    initComplete();
    initQuestionStash();
  });

  window.APP = { SPINES, CASES, LAYERS, EXTRAS, getProgress, setDone, svgEl, showTip, hideTip, fmt, fmt1 };
})();
