"use strict";

// V2.0 原型的六个 9×9 像素角色。
const sprites = {
  A: ["000000000", "011100111", "122101221", "122101221", "122101221", "122101221", "011101110", "003030300", "000000000"],
  B: ["000333000", "003222300", "032222230", "322322223", "322222223", "032111230", "003333300", "003030300", "003030300"],
  C: ["000000000", "011111110", "012222210", "012333210", "012333210", "012222210", "011111110", "000000000", "000000000"],
  D: ["033303330", "031313130", "033333330", "032222230", "032111230", "032222230", "033333330", "000000000", "000000000"],
  E: ["000033000", "000323000", "000323000", "000323000", "032323000", "322323000", "322330000", "033000000", "000000000"],
  F: ["000111000", "001222100", "012323210", "123222321", "123323321", "012222210", "001111100", "000000000", "000000000"],
};

const spread = document.querySelector("#spread");
const compact = matchMedia("(max-width: 760px)");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const videoById = new Map(videoIndex.videos.map(video => [video.id, video]));
const homeRoute = { categoryId: null, productId: null };
let currentRoute = readRoute();
let turning = false;
let pendingHistoryRoute = null;
let turnAnimation = null;

function node(tag, className, label) {
  const item = document.createElement(tag);
  if (className) item.className = className;
  if (label !== undefined) item.textContent = label;
  return item;
}

function chapterProducts(categoryId) {
  return products.filter(product => product.categoryId === categoryId);
}

function chapterRoute(categoryId, requestedId) {
  const selected = chapterProducts(categoryId).find(product => product.id === requestedId);
  return { categoryId, productId: selected?.id ?? null };
}

function readRoute() {
  const [categoryId, productId] = location.hash.slice(1).split("/");
  return categories.some(category => category.id === categoryId)
    ? chapterRoute(categoryId, productId)
    : homeRoute;
}

function routeHash(route) {
  if (!route.categoryId) return "#atlas";
  return "#" + route.categoryId + (route.productId ? "/" + route.productId : "");
}

function sprite(categoryId) {
  const art = node("span", "sprite");
  art.setAttribute("aria-hidden", "true");
  for (const pixel of sprites[categoryId].join("")) {
    art.append(node("i", "pixel-" + pixel));
  }
  return art;
}

function action(label, route, className = "paper-button") {
  const button = node("button", className, label);
  button.type = "button";
  button.dataset.route = route;
  return button;
}

function page(side, folio) {
  const element = node("section", "page page-" + side);
  element.setAttribute("aria-label", side === "left" ? "书本左页" : "书本右页");
  const content = node("div", "page-content");
  element.append(content, node("span", "folio", folio));
  return { element, content };
}

function categoryCard(category) {
  const members = chapterProducts(category.id);
  const frontier = members.every(product => product.isFrontier);
  const card = action(undefined, category.id, "category-card");
  card.dataset.category = category.id;
  card.style.setProperty("--category-paper", category.color);
  const meta = node("span", "category-meta");
  meta.append(node("span", "mono", category.id + " / " + category.label));
  meta.append(frontier
    ? node("span", "tag frontier", "前沿观察 · 1项")
    : node("span", "category-count", members.length + " 个应用"));
  const art = node("span", "category-art");
  art.append(sprite(category.id));
  card.append(meta, node("span", "category-title", category.title),
    node("span", "category-description", category.description), art);
  return card;
}

function homePages() {
  const left = page("left", "A—C");
  const right = page("right", "D—F");
  const title = node("h1", "map-title");
  title.append("AI ", node("em", "", "能力"), "地图");
  title.tabIndex = -1;
  title.dataset.focus = "";
  const instruction = "先选能力领域，再选应用查看详情。";
  const header = node("header", "map-head");
  header.append(title, node("p", "map-subtitle", "六大能力领域 · 14个代表对象"),
    node("p", "map-instruction compact-instruction", instruction));
  const guide = node("div", "map-head map-guide");
  guide.append(node("p", "map-instruction", instruction), sprite("B"));
  const leftCards = node("div", "category-list");
  const rightCards = node("div", "category-list");
  leftCards.append(...categories.slice(0, 3).map(categoryCard));
  rightCards.append(...categories.slice(3).map(categoryCard));
  left.content.append(header, leftCards);
  right.content.append(guide, rightCards);
  return [left.element, right.element];
}

function chapterIndex(members, selectedId) {
  const directory = !selectedId;
  const nav = node("nav", directory ? "chapter-index chapter-directory" : "chapter-index");
  const directoryTitle = members.every(product => product.isFrontier) ? "前沿观察" : "选择应用";
  const title = directory ? directoryTitle : "本章目录";
  nav.setAttribute("aria-label", title);
  const label = node("div", "chapter-index-label");
  label.append(node("h2", "", title), node("span", "muted", members.length + " 个对象"));
  const list = node("ul", "chapter-list");
  for (const member of members) {
    const item = node("li");
    const tab = action(undefined, member.id, "chapter-tab");
    const name = node("span", "entry-name", member.name);
    tab.append(node("span", "entry-id mono", member.id));
    if (directory) {
      const description = node("span", "directory-description muted", profiles[member.id].summary);
      const text = node("span", "directory-entry");
      text.append(name, description);
      tab.append(text);
    } else {
      tab.append(name);
    }
    if (member.id === selectedId) {
      tab.setAttribute("aria-current", "page");
      tab.append(node("span", "entry-state", "当前阅读"));
    }
    item.append(tab);
    list.append(item);
  }
  nav.append(label, list);
  return nav;
}

function chapterPage(category, members, selectedId) {
  const left = page("left", category.id + " · 目录");
  const directory = !selectedId;
  if (directory) left.element.classList.add("directory-cover");
  const header = node("header", "chapter-head");
  const kicker = node("div", "chapter-kicker");
  kicker.append(node("span", "mono", category.id + " / " + category.label));
  const frontier = members.every(product => product.isFrontier);
  if (frontier) kicker.append(node("span", "tag frontier", "前沿观察"));
  const title = node(directory ? "h1" : "h2", "", category.title);
  if (directory) {
    title.tabIndex = -1;
    title.dataset.focus = "";
  }
  header.append(kicker, title, node("p", "muted", category.intro));
  const illustration = node("div", "chapter-art");
  illustration.style.setProperty("--category-paper", category.color);
  illustration.append(node("span", "pixel-star"), sprite(category.id), node("span", "pixel-star"));
  illustration.setAttribute("aria-hidden", "true");
  const back = directory
    ? action("返回六类地图", "home", "paper-button return-button")
    : action("返回分类目录", "chapter", "paper-button return-button");
  left.content.append(back, header, illustration);
  if (!directory) left.content.append(chapterIndex(members, selectedId));
  return left.element;
}

function factList(title, items, className) {
  const section = node("section", "fact " + className);
  const list = node("ul", "fact-list");
  list.append(...items.map(item => node("li", "", item)));
  section.append(node("h3", "fact-title", title), list);
  return section;
}

function exampleCard(example) {
  const section = node("section", "fact example-card");
  const heading = node("div", "fact-heading");
  heading.append(node("h3", "fact-title", "任务示例"), node("span", "tag evidence", example.evidenceType));
  const flow = node("dl", "example-flow");
  const steps = node("ol", "example-steps");
  steps.append(...example.steps.map(step => node("li", "", step)));
  const stepRow = node("dd");
  stepRow.append(steps);
  flow.append(node("dt", "", "输入"), node("dd", "", example.input),
    node("dt", "", "步骤"), stepRow, node("dt", "", "产出"), node("dd", "", example.output));
  section.append(heading, node("p", "example-name", example.title), flow);
  if (example.note) section.append(node("p", "evidence-note muted", example.note));
  return section;
}

function researchNotes(example) {
  const details = node("details", "research-notes");
  const source = node("p", "research-source");
  const link = node("a", "", example.source.title);
  link.href = example.source.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  source.append(node("strong", "", "案例来源"), "　", link);

  const dates = node("p", "research-dates muted");
  dates.append(node("span", "", "资料基准 " + researchDates.base),
    node("span", "", "关键结论补核 " + researchDates.review));
  details.append(node("summary", "", "研究依据"), source, dates);
  return details;
}

function duration(seconds) {
  return Math.floor(seconds / 60) + ":" + String(seconds % 60).padStart(2, "0");
}

function videoCard(video) {
  const row = node("li", "video-card");
  const head = node("div", "video-row");
  const playMark = node("span", "play-mark");
  playMark.setAttribute("aria-hidden", "true");
  const caption = node("div", "video-caption");
  const meta = node("div", "video-meta");
  const role = { main: "主推荐", "main-part": "组合 · 第" + video.part + "段", supplement: "可选补充", backup: "备选" };
  const cta = { main: "观看视频", "main-part": "观看第" + video.part + "段", supplement: "观看补充视频", backup: "查看备选视频" };
  meta.append(node("span", "tag video-role", role[video.role]),
    node("span", "mono video-time", duration(video.durationSeconds)));
  if (video.userSelected) meta.append(node("span", "tag selected-video", "用户已选择"));
  const platform = new URL(video.url).hostname === "www.bilibili.com" ? "哔哩哔哩" : "YouTube";
  caption.append(meta, node("h4", "video-title", video.title), node("p", "video-platform", platform));
  const watch = node("a", video.role === "backup" ? "paper-button" : "paper-button primary", cta[video.role]);
  watch.href = video.url;
  watch.target = "_blank";
  watch.rel = "noopener noreferrer";
  watch.setAttribute("aria-label", cta[video.role] + "：" + video.title + "（新标签页）");
  head.append(playMark, caption, watch);
  row.append(head);
  return row;
}

function videoSection(product) {
  const section = node("section", "video-section");
  const header = node("div", "video-heading");
  header.append(node("h3", "", "演示视频"),
    node("span", "video-edition mono", videoIndex.sourceVersion + " · " + videoIndex.indexDate));
  const list = node("ul", "video-list");
  list.append(...product.videoIds.map(id => videoCard(videoById.get(id))));
  section.append(header, list);
  return section;
}

function pageControls(members, selectedId) {
  const nav = node("nav", "page-controls");
  nav.setAttribute("aria-label", "翻页导航");
  if (members.length === 1) {
    nav.append(action("返回分类目录", "chapter", "paper-button return-button"));
    return nav;
  }
  const index = members.findIndex(product => product.id === selectedId);
  const previous = action("上一应用", members[index - 1]?.id ?? "");
  const next = action("下一应用", members[index + 1]?.id ?? "");
  previous.disabled = index === 0;
  next.disabled = index === members.length - 1;
  nav.append(previous, node("span", "muted", "本章 " + (index + 1) + " / " + members.length), next);
  return nav;
}

function profilePage(product, members) {
  const profile = profiles[product.id];
  const right = page("right", product.id + " / " + products.length);
  const header = node("header", "profile-head");
  const meta = node("div", "profile-meta");
  meta.append(node("span", "id-stamp mono", product.id), node("span", "company", "开发主体 · " + product.company));
  if (product.isFrontier) meta.append(node("span", "tag frontier", "前沿观察 · 受限预览"));
  const videoJump = node("button", "video-jump", "查看视频");
  videoJump.type = "button";
  videoJump.dataset.videoJump = "";
  meta.append(videoJump);
  const title = node("h1", "product-title", product.name);
  title.tabIndex = -1;
  title.dataset.focus = "";
  header.append(meta, title, node("p", "profile-summary", profile.summary));
  const facts = node("div", "facts");
  facts.append(factList("能做什么", profile.canDo, "can-do"),
    factList("交付什么", profile.deliverables, "outputs"),
    exampleCard(profile.example),
    factList("使用条件", profile.conditions.map(condition => condition.text), "conditions"));
  const dossier = node("a", "paper-button dossier-link", "深入了解 · 六问档案");
  dossier.href = "dossiers/" + product.researchRef.anchor + ".html";
  dossier.target = "_blank";
  dossier.rel = "noopener noreferrer";
  dossier.setAttribute("aria-label", "深入了解 · 六问档案（" + product.name + "，新标签页）");
  right.element.dataset.product = product.id;
  right.content.append(header, facts, videoSection(product), dossier, researchNotes(profile.example),
    pageControls(members, product.id));
  return right.element;
}

function makePages(route) {
  if (!route.categoryId) return homePages();
  const category = categories.find(item => item.id === route.categoryId);
  const members = chapterProducts(category.id);
  const left = chapterPage(category, members, route.productId);
  const product = members.find(member => member.id === route.productId);
  if (product) return [left, profilePage(product, members)];
  const right = page("right", category.id + " · 选读");
  right.content.append(chapterIndex(members, null));
  return [left, right.element];
}

function getDirection(from, to) {
  if (!to.categoryId) return "backward";
  if (!from.categoryId) return "forward";
  if (from.categoryId !== to.categoryId) return to.categoryId < from.categoryId ? "backward" : "forward";
  return (to.productId ?? "") < (from.productId ?? "") ? "backward" : "forward";
}

async function turnPage(incoming, direction) {
  const [outgoingLeft, outgoingRight] = spread.children;
  const [incomingLeft, incomingRight] = incoming;
  const backward = direction === "backward";
  const leaf = node("div", "turn-leaf " + direction);
  const front = node("div", "turn-face turn-front");
  const back = node("div", "turn-face turn-back");

  spread.style.height = spread.getBoundingClientRect().height + "px";
  spread.dataset.turning = direction;
  spread.inert = true;
  // 前侧保留读过的纸面，背侧是摊开后真正显示的另一页。
  front.append(backward ? outgoingLeft : outgoingRight);
  back.append(backward ? incomingRight : incomingLeft);
  leaf.append(front, back);
  spread.replaceChildren(backward ? incomingLeft : outgoingLeft, backward ? outgoingRight : incomingRight, leaf);
  turnAnimation = leaf.animate([
    { transform: "rotateY(0deg)" },
    { transform: backward ? "rotateY(180deg)" : "rotateY(-180deg)" },
  ], { duration: 680, easing: "cubic-bezier(.44,.08,.55,.97)", fill: "both" });
  try {
    await turnAnimation.finished;
  } catch (error) {
    if (error.name !== "AbortError") throw error;
  } finally {
    spread.replaceChildren(...incoming);
    spread.style.removeProperty("height");
    delete spread.dataset.turning;
    spread.inert = false;
    turnAnimation = null;
  }
}

function updateTitle(route) {
  const product = products.find(item => item.id === route.productId);
  const category = categories.find(item => item.id === route.categoryId);
  const name = product?.name ?? category?.title;
  document.title = name ? name + "｜AI 能力地图" : "AI 能力地图";
}

async function navigate(next, writeHistory = true) {
  if (turning) {
    if (!writeHistory) pendingHistoryRoute = next;
    return;
  }
  if (routeHash(currentRoute) === routeHash(next)) return;
  const previous = currentRoute;
  const incoming = makePages(next);
  turning = true;
  if (writeHistory) history.pushState(null, "", routeHash(next));
  window.scrollTo(0, 0);
  try {
    if (!reducedMotion.matches && !compact.matches) {
      await turnPage(incoming, getDirection(previous, next));
    } else {
      spread.replaceChildren(...incoming);
      if (!reducedMotion.matches) {
        spread.animate([{ opacity: .55 }, { opacity: 1 }], { duration: 160, easing: "ease-out" });
      }
    }
    currentRoute = next;
    updateTitle(next);
    const previousCategory = !next.categoryId && previous.categoryId;
    const target = previousCategory
      ? spread.querySelector('[data-category="' + previous.categoryId + '"]')
      : spread.querySelector("[data-focus]");
    target?.focus({ preventScroll: true });
    if (compact.matches && next.productId && next.categoryId === previous.categoryId) {
      target?.scrollIntoView({ block: "start" });
    }
  } finally {
    turning = false;
    if (pendingHistoryRoute) {
      const queued = pendingHistoryRoute;
      pendingHistoryRoute = null;
      void navigate(queued, false);
    }
  }
}

spread.addEventListener("click", event => {
  if (turning) return;
  if (event.target.closest("[data-video-jump]")) {
    const videos = spread.querySelector(".video-section");
    videos.scrollIntoView({ block: "start" });
    videos.querySelector("a").focus({ preventScroll: true });
    return;
  }
  const control = event.target.closest("button[data-route]");
  if (!control || control.disabled) return;
  const target = control.dataset.route;
  if (target === "home") void navigate(homeRoute);
  else if (target === "chapter") void navigate(chapterRoute(currentRoute.categoryId));
  else if (control.dataset.category) void navigate(chapterRoute(target));
  else void navigate(chapterRoute(currentRoute.categoryId, target));
});

spread.addEventListener("keydown", event => {
  if (turning || !currentRoute.productId || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (event.target.closest("input, textarea, select, [contenteditable]")) return;
  const offset = { ArrowLeft: -1, ArrowRight: 1 }[event.key];
  if (!offset) return;
  const members = chapterProducts(currentRoute.categoryId);
  const index = members.findIndex(product => product.id === currentRoute.productId);
  const next = members[index + offset];
  if (next) {
    event.preventDefault();
    void navigate(chapterRoute(currentRoute.categoryId, next.id));
  }
});

addEventListener("hashchange", () => { void navigate(readRoute(), false); });
for (const preference of [compact, reducedMotion]) {
  preference.addEventListener("change", () => turnAnimation?.cancel());
}
spread.replaceChildren(...makePages(currentRoute));
updateTitle(currentRoute);
