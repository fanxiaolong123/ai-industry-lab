/* ============================================================
   半导体投资学习台 · 公共脚本
   负责：导航渲染、Tab、展开面板、自测题、学习进度、移动端目录
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

    const firstBuiltSpine = (SPINES.find((s) => s.built) || SPINES[0]).file;
    const brand = document.createElement("a");
    brand.className = "rail-brand";
    brand.href = firstBuiltSpine;
    brand.innerHTML = "<b>半导体投资学习台</b><span>AI 半导体投资 · 从零到独立研究</span>";
    frag.appendChild(brand);

    /* 判断当前所在层：骨架卡 or 手册/index */
    const isSpinePage = /^s\d+$/.test(current);

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

    if (!isSpinePage) LAYERS.forEach((layer) => {
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
    const isModule = /^m\d+$/.test(current) || current === "index";

    /* 找到第一个 firstBuilt 的目标：骨架层默认跳 s01，若 s01 未 built 则找第一张 built */
    const firstSpine = (SPINES.find((s) => s.built) || SPINES[0]).file;
    const firstModule = (LAYERS.flatMap((l) => l.items).find((m) => m.built) || SPINES[0]).file;

    const sw = document.createElement("div");
    sw.className = "layer-switch";
    sw.setAttribute("role", "tablist");
    sw.setAttribute("aria-label", "在骨架层与手册层之间切换");
    sw.innerHTML =
      '<a href="' + firstSpine + '"' + (isSpine ? ' aria-current="page"' : "") + '>骨架</a>' +
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
    function paint() {
      const done = !!getProgress()[id];
      btn.setAttribute("aria-pressed", String(done));
      btn.textContent = done ? "已完成 ✓（点击撤销）" : "标记本模块为已完成";
    }
    btn.addEventListener("click", () => {
      setDone(id, !getProgress()[id]);
      paint();
    });
    paint();
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
  });

  window.APP = { SPINES, LAYERS, EXTRAS, getProgress, setDone, svgEl, showTip, hideTip, fmt, fmt1 };
})();
