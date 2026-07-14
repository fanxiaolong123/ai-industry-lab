# 项目交接文档（供任何新会话续接）

最后更新：2026-07-08。本文件记录建设进度与状态。

## 项目是什么

把两份 AI 半导体投资专家材料（两个 PDF，已完成使命，**成品中不得引用它们**）转化为零基础用户的学习体系，目标：用户能独立研究标的、写投资 memo。用户对制造业零基础，全程高标准验收。

## 文件清单

| 文件 | 作用 |
|---|---|
| `Learn Plan - AI半导体投资.md` | **教练文档**（可移植）。当前节：本文件用途 / 学习合同 / 学习方式：四层体系 / 知识地图 / 常见误区 / 附录建设要求。**注意**（2026-07-08 用户判定）：AI 教练协议、骨架卡教学文本、建设优先级、学习进度——四节已删除；术语表需求已删除。教学文本以 HTML 为准，进度以本 PROGRESS.md 为准 |
| `PRODUCT.md` / `DESIGN.md` | 产品与设计规范。视觉方向已确认「研究台」（白底/克制绿/琥珀），来源徽章三类 |
| `.claude/skills/manual-page/SKILL.md` | 手册页生产 skill（金标准 output/m02.html；查证纪律、五件套、A/B 组件标准、质检清单、徽章可点击）。**产模块页必须走它** |
| `.claude/skills/spine-card/SKILL.md` | 骨架卡生产 skill（金标准 `output/spine01.html`；六段结构、单模型上限、徽章可点击）。**产卡片必须走它** |
| `output/index.html` | **已删除**（2026-07-08）。学习起点直接是 `spine01.html`，rail-brand 与 layer-switch「骨架」按钮均指向它 |
| `output/spine01.html … spine15.html` | **骨架层 15/15 全部完成**。六段结构 + 每张至少 1 个 A 类直观化组件 + 页脚 `.src` + 上下张导航。s01 上一张隐藏、s15 下一张跨层到 m01 |
| `output/m01.html … m14.html` | **手册层 14/14 全部完成**。m02 为深度金标准；m01/m03 已于 2026-07-08 按 manual-page skill 返工本质页，并补齐验收题、可点击徽章与来源清单 |
| `output/assets/style.css` | 研究台方向；正文 860px；`.derive/.case/.chain/.viz/.checklist/.src` 等组件；`body[data-page^="s"] main.page > section:not(.src) { max-width: 860px }` 修骨架卡宽度；`.layer-switch` topbar 按钮样式；**徽章 `<a>` 样式**：`box-shadow: inset 0 -1.5px 0 currentColor` 持续底边 + hover 加粗阴影+提亮 + active 微下沉 + `.src li:target` 命中锚点时高亮 |
| `output/assets/app.js` | 公共脚本。`SPINES` 数据结构（15 张卡）+ `renderRail` 按当前层显示 + `initLayerSwitch` 在 topbar 注入「骨架/模块」两个按钮 + 品牌 logo 指向 spine01；home 条目（"总览与学习合同"）已删；SPINES.built 与 LAYERS.built 由主协调者手动切换（子代理禁改） |
| `output/design-preview.html` | 三方向设计对比页（非正式站点，保留存档） |

记忆文件：`~/.claude/projects/-Users-fanxiaolong-AIResearch/memory/ai-semi-learn-plan-project.md`

## 不可 violate 的纪律（用户多轮确认）

1. **查证铁律**：数字/事实必须一手来源（年报、电话会转录、官方统计、白皮书），写前 WebSearch 核验；查不到→标「估算·估算方+年份」或弃用；凭记忆不上页。曾因查无实据弃用「AEHR 与 Wolfspeed 绑定」说法（卡 15 收官卡把这条作为「查无实据处理动作」教学案例）。
2. **三徽章**：已核验（badge-verified，附来源）/ 专家判断（badge-expert，附出处）/ 估算（badge-assume）。每个关键数字必须带。
3. **推导式写作**：结论当面推导，不许直接断言。压缩品≠学习格式。
4. **规则五件套**：来源→机制→案例→操作→失效，缺一删。（本身是卡 15 的元级模型。）
5. **骨架卡**：一卡一模型，上限是概念数不是字数，六段结构。
6. **组件 A/B 双类**：A 直观化（十秒测试：胜过读三段文字）+ B 推理（参数已查证）；带「看什么」引导语；教学简化必须标注。
7. **语言**：中文白话，术语首现配解释，禁翻译腔/名词化/套话（用户 CLAUDE.md 用词纪律）。
8. 不引用源 PDF；不荐股。
9. **金标准与 skill 同步**：金标准页面（`output/m02.html`、`output/spine01.html`）每次格式演进，必须逐段对照更新对应 skill。
10. **子代理禁改共享文件**：派发任务书里明确禁改 style.css、app.js、index.html、其他模块页、Learn Plan、PROGRESS.md——多个代理并发写共享文件会 last-write-wins 覆盖（历史有 m07 代理和 spine13 代理违反造成过冲突）。SPINES.built / LAYERS.built 切换由主协调者在 QA 通过后手动做。
11. **徽章必须是可点击的 `<a>`**（2026-07-08 新增）：每个 `badge-verified / badge-expert / badge-assume` 都要直接跳到核验源头。有直链的 `href` 指向一手 URL（`target="_blank" rel="noopener"`）；无直链的锚点到页脚 `.src` 的 `<li id="src-XXX">`。页脚 `.src` 每个 `<li>` 必须有 `id`（语义 slug，非纯数字）。`<span class="badge …">` 一律返工。已建成页面的徽链回填是欠账（见 §2）。

## 演进史（防重犯）

第一版模块页「只给概念和结论」被否 → 重写为深查证高密度（m02）→ 用户读后「云里雾里」→ 确立四层体系（骨架卡→案例主线→手册按需查→实盘）→ 卡 1 第一版太薄「就这几句话」被否 → 确立「单模型讲透」规格 → 15 张卡分批 5+5+5 建，每卡按 skill 六段 + A 类组件 → 手册页与骨架卡全建 → UI 收到反馈：卡片折行、rail 罗列两层拥挤、"总览与学习合同"无价值 → **整个 index.html 删除**、topbar 加骨架/模块按钮、rail 只显当前层 → 徽章可点击纪律确立 → 骨架卡回填 Learn Plan 判定作废（HTML 是真源）→ Learn Plan 四节精简（教练协议 / 骨架卡教学文本 / 建设优先级 / 学习进度删除）。

## 网站结构（2026-07-08 定型）

```
无中央入口。学习起点 = spine01.html（品牌 logo 与顶栏"骨架"按钮均指向它）

骨架层：spine01 → spine02 → ... → spine15 → (下一层) → m01
手册层：m01 → m02 → ... → m14 → (末)         ← 上一层 → spine15

顶栏（所有页面固定，桌面端也可见）：
  [目录（移动端）] [骨架 / 模块] [页面标题]
  两个按钮以 aria-current 高亮当前所在层，点击跳到对方层第一张已建页面

左侧 rail：只显示当前所在层的目录（不再同时罗列两层）
  · 骨架卡页：15 张骨架卡列表（num 为纯数字 1-15）
  · 手册页：四层手册目录（第一层零基础 / 第二层产业结构 / 第三层投资判断 / 第四层研究输出）
  · 品牌 logo（左上角）→ spine01.html
```

## 待办队列（优先级序）

### §1 手册层收尾
- **完成**：m01/m03 已按 manual-page skill 串行返工；m11-m14 已建成（2026-07-08 QA 通过 · built:true 已切）

### §2 徽章链接回填（暂停 · 记账在此）
2026-07-08 用户暂停这条主线。**已完成**：m01 / m02 / m03 / m11-m14 / spine01 / spine02 / spine03。**剩余**：m04-m10（7 篇）+ spine04-spine15（12 张）。

**恢复时的策略**：
- 用 **sonnet 模型**（不用 opus，机械性任务够用）
- **一个 agent 做 3-4 篇**（减少每次读 skill/参考页的启动上下文重复）
- 建议分批：spine04-07 / spine08-11 / spine12-15 / m04-m06 / m07-m10

**主协调者 QA 抽检**：curl 抽检每篇的 5+ 个 URL（含浏览器 UA），死链或强反爬链接改锚点。SEC / pr.tsmc.com 类 curl 403 但真实浏览器可用，用 WebFetch 复验后可保留直链。**已知强反爬需锚点**：datacenterdynamics.com、dailypolitical.com。**已知死链需替换**：finance.yahoo.com/quote/*/financials/。

**徽章 CSS 已升级**（`output/assets/style.css`）：`a.badge` 有持续底边 + hover 加粗阴影 + active 微下沉。用户遇到"看不出可点"多半是浏览器缓存旧 CSS，hard refresh 即可。

### §3 四层学习体系剩余两层（大工作）
- **案例主线**：约 12 个真实决策复盘案例。质量六要素 + 七条验收清单（Learn Plan 详）。可迁移的三个已核验案例：台积电 N3 稀释（2024-01-18）、ASML→KLA 传导（2026-01-02）、英特尔 18A 爬坡（2026-02）。剩下 9 个要新建。
- **实盘练习**：判断日志 + 预判卡 + mini-memo + 季度对账工作表模板；跟一个真实财报季走一遍的操作方案

### §4 附录
- **数据源索引**（SEC EDGAR / 财报电话会转录 / SEMI / TrendForce 等在哪查什么）

### §5 教学（用户和 AI 一对一互动，不是建设）
- 卡 1 两道练习题用户还未作答（复述 + 2026 存储市场推演）
- 收到答复 → 点评 → 教卡 2 → ...（教练协议节从 Learn Plan 已删，教练动作由主协调者根据经验执行）
- 15 张骨架卡教完再进案例主线

### §6 候选 skill（用户未拍板）
`case-replay`（案例生产标准，等 §3 案例主线开工前建）／`tutor-session`（教学会话标准）／`memo-review`（实盘阶段）

## 已核验事实库（可直接复用，来源链接在各页脚 .src）

**制造与代工**：台积电 2024 收入 $90.08B、出货 1290 万片 12 吋约当、先进制程 69%；N3 稀释毛利率 3-4pt（2024-01-18 电话会）、N5/N7 回正 8-10 季、N3 预计 10-12 季；2024 季度毛利率 53.1/53.2/57.8/59.0、FY24 56.1%、FY25 59.9%；亚利桑那 $65B→$165B（2025-03，2026-05 再注资 $20B）；机器设备折旧 5 年（部分口径 5-7 年）、折旧占 COGS 约 48%；台积电 2024 客户预付款 NT$291.1B。CoWoS 月产能 2023 ~20K → 2024 35-40K → 2025 目标 75-80K → 2026 目标 140-150K；魏哲家 2024-04-18 与 2024-10-17 电话会「翻倍仍不够」。

**存储**：DRAM 4Q25 份额（三星 36% / SK 32.1% / 美光 22.4% · TrendForce 2026-02）；NAND 4Q25 份额（三星 28% / SK 22.1%）；HDD 2025（WDC 42.3% / STX 40.8% / TOS 17% · Coughlin/Forbes 2026-02）；SK 海力士 CEO Kwak Noh-jung 2024-05-02「HBM 2024 售罄、2025 也差不多」；SK 3Q25 · HBM/DRAM/NAND 2026 全售罄、营业利润率 47%、季度营业利润 11.38 万亿韩元；美光 FY26 Q3 · 16 份 take-or-pay、$100B、2026-2030；美光 FY23 GAAP 毛利率 -9.1%、净亏损 $5.83B → FY24 $25.11B(+62%) → FY25 $37.4B(+49%)、40% 毛利率、HBM+HC DIMM+LP $10B（前一年 5 倍）；三星 DS 2023 全年亏 14.87 万亿韩元 → 2024 盈利 15.09 万亿韩元；三星 2023-04-07 官方宣布 meaningful level 减产；三星 22Q1 营业利润 14.1 万亿→23Q1 0.6 万亿；SanDisk 从 WDC 分拆 2025-02-21 完成分配、2025-02-24 上市；TrendForce 4Q25 常规 DRAM +18-23% QoQ、1Q26 +90-95%、PC DRAM +100%；HBM3E 2026 涨 20%。

**设备与光模块**：ASML 2024 确认销售 44 台 EUV（42 低NA + 2 高NA）、EUV 销售额 €8.3B、低NA 隐含均价约 €1.8 亿、高NA $350-400M（**勘误 2026-07-13**：€227M 是 2025Q1 低NA 季度混合均价，曾误记为 2024 年数，勿再引用）；SEMI 设备市场 2023 $106.3B → 2024 $117.1B（+10%）→ 2025 $135B（+15%）、中国 2024 $49.6B(+35%)；应材 FY24 $27.18B、Lam FY24 $14.9B、KLA FY24 $9.8B（工艺控制 89%）；SEMI book-to-bill 2016-12 停发；Cadence 2024 $4.64B(+13%)、Synopsys FY24 $6.13B(+15%)；Arm FY25 授权 $1.84B(45.9%)+版税 $2.15B(54.1%)。Innolight 2024 收入 238.6 亿元 +122.6%、光模块出货 977→2088 万只；Coherent FY24 $47.1亿；LightCounting 2024 全球 400G+800G >2000 万只、~$90亿；AXT 2024 $99.4M、2025 -11%、Q4 2025 InP 订单积压 $60M+；Aixtron 2024 €633.2M；味之素 ABF 全球 >95%、投 250 亿日元扩产 50%。

**AI 需求**：Nvidia DC FY23 $15.0B → FY24 $47.5B(+217%) → FY25 $115.2B(+142%) → FY26 $193.7B；FY22 数据中心 $10.61B；FY25 GAAP 毛利率 75%；四家云厂 2025 AI CapEx ~$410B、2026 计划 ~$725B(+77%)；Broadcom FY24 AI $12.2B(+220%)；Google TPU + Broadcom 至 2031；Advantest FY25 净销售 4,780 亿日元 +68%、HPC/AI 占比 FY26 90%。DeepSeek 2025-01-27 -17% 单日 $589B 蒸发、1 个月收复、纳德拉杰文斯 tweet 2025-01-27、黄仁勋 2025-02-21 回应。

**其他**：H100 die 814mm²、80B 晶体管、144/132/114 SM；台积电 D0：N5 从 0.10 → 0.06；Intel 18A 陈立武 2026-02 每月 7-8% 良率改善、请了 PDF Solutions/KLA、2H26 客户承诺；Intel Foundry 2024 亏损 $13.408B；Intel 2023 生产设备（production machinery and equipment）折旧年限 5→8 年（**勘误 2026-07-13**：曾误记为「服务器」，8-K 原文是生产设备）；Intel Cannon Lake 2018-04 关核显才出货；Intel Ice Lake 2019H2 量产；Bob Swan 2020-07-23 7nm 承认延期、股价 -16%；Aletheia 2026-01-02 · ASML 卖出→买入、PT $750→$1500；Susquehanna 交期 · 常态 10-14 周、2021-08 破 20 周、2022 中约 27 周、2022-10-17 拐点；Vertiv FY24 净销售 80.1 亿 +16.7%、backlog 71.8 亿；IEA 2024 数据中心 415 TWh（1.5%）→ 2030 945 TWh（3%）；GB200 NVL72 单机柜约 120 千瓦、100% 液冷、无风冷；Bailly 51.2T CPO 每 800G 5.5W vs 15W；SemiAnalysis 2026 报告 CPO 大规模量产推至 2028-2029；多晶硅 2020-06 $6.75/kg → 2022-08 $39/kg → 2023-01 $17.51/kg（Bernreuter）；Lee/Padmanabhan/Whang《Management Science》1997 牛鞭效应论文。
