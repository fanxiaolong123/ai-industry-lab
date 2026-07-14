# 静态学习站点上下文

本文件适用于 `output/` 下的正式页面、存档页面和公共前端资产。上层 `AGENTS.md` 的内容与查证纪律继续生效。

## 文件角色

- `index.html`：兼容入口，只负责跳转到 `spine01.html`。
- `spine01.html` 至 `spine15.html`：骨架层正式页面，`body[data-page]` 使用 `s01` 至 `s15`。
- `m01.html` 至 `m14.html`：手册层正式页面，`body[data-page]` 使用 `m01` 至 `m14`。
- `design-preview.html`：三种视觉方向的历史对比稿，不按正式页契约维护。
- `assets/app.js`：跨页面公共行为与导航数据。
- `assets/style.css`：全站设计令牌、布局、组件、响应式和动效约束。

正式学习页都直接引用 `assets/style.css` 和 `assets/app.js`，页面专属交互使用底部内联脚本，不存在打包或编译步骤。

## 导航与状态模型

`assets/app.js` 中：

- `SPINES` 是 15 张骨架卡的唯一导航清单。
- `LAYERS` 是 14 个手册模块的唯一导航清单。
- 左侧目录只显示当前层；顶栏“骨架/模块”切换到各层第一个已建页面。
- `body.dataset.page` 决定当前导航高亮和问题归属，不能与文件编号不一致。
- 学习完成状态存于 `localStorage` 的 `aisemi.progress.v1`。
- 问题暂存状态存于 `localStorage` 的 `aisemi.questions.v1`，引用正文字符偏移；大幅改写正文后要验证旧标注降级行为不会报错。

不要在单个页面中手写左侧目录。新增或调整页面时改导航数据，并检查页脚前后链接。

## 手册页契约

新建或重写 `mXX.html` 前，先读 `.agents/skills/manual-page/SKILL.md` 和金标准 `m02.html`。基本结构是：

1. 跳到正文链接、顶栏、空的 `nav#rail`、`main#main`。
2. 页头：层级与模块编号、`h1`、核心问题。
3. 三道验收题和概念清单。
4. “本质 / 怎么判断 / 练习”三个可键盘操作的标签页。
5. “本质”现场推导机制并划出“不要学太深”的边界。
6. “怎么判断”中的每个工具提供来源、机制、案例、操作、失效五件套，结尾给落地检查清单。
7. “练习”依次包含先选后看的真实决策复盘、迁移题、自测和 memo 能力。
8. `.src` 完整来源清单、完成按钮和前后模块导航。

## 骨架卡契约

新建或重写 `spineXX.html` 前，先读 `.agents/skills/spine-card/SKILL.md` 和金标准 `spine01.html`。每张卡只讲一个模型，顺序固定为：

1. 真实现象钩子。
2. 机制推导。
3. 至少两个真实锚点。
4. 至少两个“第一反应问句”。
5. 适用边界及正确的跨卡引用。
6. 一道复述题和一道基于已核验事实的迁移题。
7. `.src` 来源清单、完成按钮和前后卡导航。

组件数量不重要，组件必须让零基础读者在十秒内获得文字难以提供的直觉。

## 来源徽章

每个关键数字或重要事实旁必须放可点击的 `<a class="badge ...">`：

```html
<a class="badge badge-verified" href="https://example.com/source" target="_blank" rel="noopener">已核验 · 来源与日期</a>
<a class="badge badge-expert" href="#src-example">专家判断 · 出处</a>
```

- 有一手直链时直接链接，并用 `target="_blank" rel="noopener"`。
- 无公开直链时链接到本页 `.src` 中带语义 `id` 的 `<li>`。
- `badge-assume` 必须写明估算方与年份。
- `<span class="badge ...">` 不合格。
- 不要机械改变尚未回填页面的徽章而不核对断言与来源。当前欠账范围是 `spine04` 至 `spine15`、`m04` 至 `m10`。

## 公共组件与代码边界

优先复用 `style.css` 已有组件：`.note`、`.derive`、`.chain`、`.case`、`.scenario`、`.quiz`、`.checklist`、`.ctl-panel`、`.viz`、`.flow`、`.stackup`、`.timeline`、`.src`。

`app.js` 已提供：

- `[data-tabs]` 标签页与方向键/Home/End 键盘操作。
- `[data-reveal]` 展开面板及同组互斥。
- `[data-quiz]` 自测反馈。
- 完成状态、移动端目录、层切换、问题暂存。
- `APP.svgEl`、`APP.showTip`、`APP.hideTip`、`APP.fmt`、`APP.fmt1`。

只有两页以上确实需要的行为才进入公共脚本。页面模拟器要封装作用域，等待 `DOMContentLoaded`，避免污染全局；高频输入用 `requestAnimationFrame` 节流。用户或页面文本插入 `innerHTML` 前必须转义。

## 视觉与无障碍

- 颜色沿用 `style.css` 的 OKLCH 设计令牌，不在正式页发明第二套主题。
- 正文宽度约 860px，来源区和页脚可到 1080px。
- 桌面是左侧 rail，窄屏是顶栏与抽屉；不大于 560px 时不得出现文字或控件溢出。
- 所有按钮必须有 `type="button"`，展开控件维护 `aria-controls`、`aria-expanded`，标签页维护正确的角色与选中状态。
- 所有交互必须可键盘到达，动态结果用合适的 `aria-live`，图表有标题、引导语和必要的文本读数。
- 动画遵守 `prefers-reduced-motion`，时长保持克制。
- 图表、模拟器和推导组件都要写“看什么”；教学简化要明说。

## 修改后的检查

1. 确认 `data-page`、页头编号、文档标题、`SPINES`/`LAYERS` 条目一致。
2. 确认上一页、下一页和跨层边界正确：`spine15 → m01`，`m01 ← spine15`。
3. 确认公共脚本语法：`node --check output/assets/app.js`。
4. 搜索受影响页面是否残留不合格徽章：`rg '<span class="badge' output/受影响页面.html`。
5. 本地服务器中实际操作标签页、展开、自测、模拟器、完成状态和问题暂存。
6. 检查桌面与窄屏、键盘焦点、控制台报错、来源链接和页面内锚点。
7. 最后执行 `git diff --check`，只保留任务需要的改动。
