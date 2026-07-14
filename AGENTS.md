# AI Industry Lab 项目上下文

## 项目目标

这是面向中文零基础学习者的 AI 半导体投资学习台。目标不是整理术语或推荐股票，而是训练学习者独立完成产业定位、需求传导、供需与周期判断、证据核验、估值分析和投资 memo。

产品语气应当像克制、严谨的买方研究台：信息密度足够，但必须让初学者能进入；所有判断都要暴露来源、机制和失效条件。

## 开始工作前先读什么

按任务只读必要文件：

1. 通用产品或内容任务：`PRODUCT.md`、`DESIGN.md`、`PROGRESS.md`。
2. 学习体系或课程结构任务：再读 `Learn Plan - AI半导体投资.md`。
3. 手册页 `output/mXX.html`：必须读 `.agents/skills/manual-page/SKILL.md`，金标准是 `output/m02.html`。
4. 骨架卡 `output/spineXX.html`：必须读 `.agents/skills/spine-card/SKILL.md`，金标准是 `output/spine01.html`。
5. 正式内容评审任务：必须读 `.claude/skills/page-review/SKILL.md`。
6. 站点代码任务：再读 `output/AGENTS.md`、`output/assets/app.js`、`output/assets/style.css`。

`manual-page` 与 `spine-card` 在 `.agents/skills/` 和 `.claude/skills/` 下各有一套逐字相同的兼容副本。修改其中任何一套时必须同步另一套，并用 `cmp` 验证一致。`page-review` 当前只存在于 `.claude/skills/`。

## 真源优先级

出现冲突时按以下顺序判断：

1. 当前用户明确要求。
2. 当前工作树中的实际文件和可运行行为。
3. 本文件及目录内更具体的 `AGENTS.md`。
4. 对应页面生产 skill。
5. `PRODUCT.md`、`DESIGN.md`、`Learn Plan - AI半导体投资.md`。
6. `PROGRESS.md`，它是交接与待办记录，不应覆盖已经变化的文件事实。

特别注意：正式教学文本以 `output/spineXX.html` 和 `output/mXX.html` 为准；`Learn Plan - AI半导体投资.md` 只维护学习体系、知识地图和案例/实盘标准。当前 `output/index.html` 是跳转到 `spine01.html` 的兼容入口，不是中央首页；`PROGRESS.md` 中“已删除 index.html”指删除旧首页形态。

## 仓库结构

- `output/spine01.html` 至 `output/spine15.html`：15 张骨架卡，一卡一个模型。
- `output/m01.html` 至 `output/m14.html`：14 篇参考手册页。
- `output/assets/app.js`：导航、层切换、标签页、展开、自测、进度和问题暂存等公共行为。
- `output/assets/style.css`：全站研究台视觉和公共组件。
- `output/design-preview.html`：设计方向存档，不是正式学习页。
- `PRODUCT.md`、`DESIGN.md`：产品与视觉约束。
- `PROGRESS.md`：项目状态、已核验事实库和待办。
- `.github/workflows/pages.yml`：将 `output/` 原样部署到 GitHub Pages。

项目没有构建步骤、包管理器或外部前端依赖。正式站点是原生 HTML、CSS、JavaScript。

## 当前状态

- 骨架层 15/15、手册层 14/14 均已建成，`output/assets/app.js` 中对应 `built` 均为 `true`。
- 学习入口是 `output/spine01.html`，骨架卡依次到 `spine15.html`，再进入 `m01.html`；手册页依次到 `m14.html`。
- 徽章链接回填已完成：`spine01` 至 `spine03`、`m01` 至 `m03`、`m11` 至 `m14`。
- 徽章链接回填仍欠：`spine04` 至 `spine15`、`m04` 至 `m10`。这些页面仍有 `<span class="badge ...">`，不要误报为已完成。
- 尚未建设的主要内容是案例主线、实盘练习和数据源索引。不要把候选想法写成已完成功能。

## 内容纪律

1. 关键数字、事实、事件和规则必须先查证。一手来源优先：公司法定披露、投资者关系公告、财报电话会、官方统计、技术白皮书。
2. 一手来源找不到时，可靠专业研究只能标为“估算”，写明估算方和年份；仍无法核验就弃用。
3. 每个关键数字使用可点击的三类徽章之一：`badge-verified`、`badge-expert`、`badge-assume`。
4. 结论必须从来源、机制和数字当面推导，不直接宣布结论。
5. 可操作规则必须具备“来源、机制、案例、操作、失效”五件套，缺一就删或降级为明确的页面推导。
6. 不引用项目最初使用的两份 PDF，不荐股，不把市场行情写成永久事实。
7. 中文白话，术语首次出现就解释。避免翻译腔、营销话术、抽象套话和无证据的确定语气。
8. 只修改任务涉及的文件。不要顺手重构邻近页面，也不要删除不理解的内容。

涉及当前市场数据、公司动态、财务数字、政策、论文或来源链接时必须联网重新核验，不能仅复用 `PROGRESS.md` 的旧结论。

## 修改规则

- 新建或重写手册页，严格执行 `manual-page` skill；改变金标准结构时，同时更新两套 `manual-page/SKILL.md`。
- 新建或重写骨架卡，严格执行 `spine-card` skill；改变金标准结构时，同时更新两套 `spine-card/SKILL.md`。
- 评审正式内容时严格执行 `.claude/skills/page-review/SKILL.md`，不要自行改写评审范围和严重度标准。
- 页面专属模拟器保留在页面底部内联脚本；跨页面复用的行为才进入 `output/assets/app.js`。
- 公共视觉进入 `output/assets/style.css`；单页专属样式只有在确实不能复用时才内联。
- 新增、重命名或删除正式页面时，同步检查 `SPINES`、`LAYERS`、页脚前后导航、`data-page`、问题暂存的页面元数据和 `PROGRESS.md`。
- 多人并行时，不让多个执行者同时编辑 `output/assets/app.js`、`output/assets/style.css`、同一页面或进度文档。

## 验证

仓库没有自动测试，改动完成前至少执行与范围相称的检查：

```sh
git diff --check
node --check output/assets/app.js
cmp .agents/skills/manual-page/SKILL.md .claude/skills/manual-page/SKILL.md
cmp .agents/skills/spine-card/SKILL.md .claude/skills/spine-card/SKILL.md
```

修改正式页面或公共前端资产时，再用本地服务器打开受影响页面：

```sh
python3 -m http.server 8000 --directory output
```

浏览器验收至少覆盖：控制台无报错、桌面和不大于 560px 的窄屏无横向溢出、键盘可达、标签页/展开/自测/模拟器可用、前后导航正确、来源徽章可点击、刷新后 `localStorage` 中的进度与问题仍可恢复。不要把 `tidy` 作为唯一 HTML 验证器，本机版本不能正确识别本项目使用的现代 HTML 和中文编码。

## 发布

推送到 `main` 且改动命中 `output/**` 或 Pages 工作流时，GitHub Actions 会把 `output/` 直接部署到 GitHub Pages。除非用户明确要求，不要提交、推送或触发发布。
